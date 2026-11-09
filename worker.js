/* Soldados Socorristas — backend (Cloudflare Worker + D1).
   Autenticação própria (usuário + senha), sessões por cookie HttpOnly, permissões validadas aqui no servidor. */

const SESSION_MS = 7 * 24 * 3600 * 1000;
const CFGC = ['cfg', 'cmods', 'cacts', 'csims', 'cach', 'cbank'];
const ALL_COLLS = [...CFGC, 'public', 'priv', 'grades', 'teachers'];
const MAX_DOC = 900000;
const enc = new TextEncoder();

class HttpErr extends Error { constructor(s, m, code) { super(m); this.s = s; this.code = code; } }
const J = (o, s = 200, h = {}) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...h } });
const now = () => Date.now();

/* ---------- criptografia ---------- */
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const rand = (n) => crypto.getRandomValues(new Uint8Array(n));
const randHex = (n) => hex(rand(n));
async function sha256(s) { return hex(await crypto.subtle.digest('SHA-256', enc.encode(s))); }
async function pbkdf2(pw, saltHex, iter) {
  const key = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
  const salt = new Uint8Array(saltHex.match(/../g).map((h) => parseInt(h, 16)));
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter }, key, 256));
}
function safeEq(a, b) { a = String(a); b = String(b); let d = a.length ^ b.length; for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0); return d === 0; }
const iterOf = (env) => Math.min(100000, Math.max(1000, parseInt(env.PBKDF2_ITER, 10) || 100000));
async function mkPass(env, pw) { const salt = randHex(16); const iter = iterOf(env); return { salt, iter, hash: await pbkdf2(pw, salt, iter) }; }

/* ---------- utilitários ---------- */
function dmerge(t, s) { for (const k in s) { const v = s[k]; if (v && typeof v === 'object' && !Array.isArray(v)) t[k] = dmerge(t[k] && typeof t[k] === 'object' && !Array.isArray(t[k]) ? t[k] : {}, v); else t[k] = v; } return t; }
async function body(req) { try { const b = await req.json(); if (!b || typeof b !== 'object') throw 0; return b; } catch (e) { throw new HttpErr(400, 'Requisição inválida.'); } }
const clean = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, n);
function validUser(u) { u = String(u || '').trim().toLowerCase(); if (!/^[a-z0-9._-]{3,24}$/.test(u)) throw new HttpErr(400, 'Nome de usuário: 3 a 24 caracteres, só letras minúsculas, números, ponto, hífen ou sublinhado.'); return u; }
function validPass(p, role) { p = String(p || ''); const min = role === 'student' ? 6 : 8; if (p.length < min) throw new HttpErr(400, 'A senha precisa ter pelo menos ' + min + ' caracteres.'); if (p.length > 100) throw new HttpErr(400, 'Senha muito longa.'); return p; }
const ipOf = (req) => req.headers.get('CF-Connecting-IP') || req.headers.get('x-forwarded-for') || 'local';
const pub = (u) => ({ id: u.id, username: u.username, ident: u.ident, role: u.role, status: u.status, mustChange: !!u.must_change, created: u.created, lastLogin: u.last_login });

/* ---------- limite de tentativas ---------- */
async function lockLeft(env, keys) { for (const k of keys) { const r = await env.DB.prepare('SELECT until FROM attempts WHERE k=?1').bind(k).first(); if (r && r.until > now()) return Math.ceil((r.until - now()) / 1000); } return 0; }
async function bump(env, k, limit, baseMs) {
  const r = await env.DB.prepare('SELECT n,t FROM attempts WHERE k=?1').bind(k).first();
  const fresh = !r || now() - r.t > 3600 * 1000; const n = fresh ? 1 : r.n + 1;
  const until = n >= limit ? now() + Math.min(900000, baseMs * Math.pow(2, n - limit)) : 0;
  await env.DB.prepare('INSERT INTO attempts(k,n,until,t) VALUES(?1,?2,?3,?4) ON CONFLICT(k) DO UPDATE SET n=?2,until=?3,t=?4').bind(k, n, until, now()).run();
}
const clearAtt = (env, k) => env.DB.prepare('DELETE FROM attempts WHERE k=?1').bind(k).run();

/* ---------- documentos (sincronização) ---------- */
async function putDoc(env, coll, id, data, deleted = 0) {
  await env.DB.batch([
    env.DB.prepare("UPDATE meta SET v=v+1 WHERE k='seq'"),
    env.DB.prepare("INSERT INTO docs(coll,id,data,seq,deleted) VALUES(?1,?2,?3,(SELECT v FROM meta WHERE k='seq'),?4) ON CONFLICT(coll,id) DO UPDATE SET data=?3,seq=(SELECT v FROM meta WHERE k='seq'),deleted=?4").bind(coll, id, JSON.stringify(data), deleted),
  ]);
}
async function getDoc(env, coll, id) { const r = await env.DB.prepare('SELECT data FROM docs WHERE coll=?1 AND id=?2 AND deleted=0').bind(coll, id).first(); return r ? JSON.parse(r.data) : null; }
async function tomb(env, coll, id) { const r = await env.DB.prepare('SELECT 1 x FROM docs WHERE coll=?1 AND id=?2 AND deleted=0').bind(coll, id).first(); if (r) await putDoc(env, coll, id, {}, 1); }
async function wipeUserData(env, uid) { for (const c of ['public', 'priv', 'grades', 'teachers']) await tomb(env, c, uid); }
async function ensureTeacherDoc(env, u) { if (u.role === 'student') return; if (!(await getDoc(env, 'teachers', u.id))) await putDoc(env, 'teachers', u.id, { nick: u.ident, created: now() }); }

function canRead(u, coll, id) {
  const staff = u.role !== 'student';
  if (CFGC.includes(coll) || coll === 'public') return true;
  if (coll === 'priv' || coll === 'grades') return staff || id === u.id;
  if (coll === 'teachers') return staff;
  return false;
}
/* decide se a operação é permitida e devolve o dado que deve ser gravado */
async function checkWrite(env, u, coll, id, op, data) {
  const staff = u.role !== 'student', admin = u.role === 'admin';
  const deny = () => { throw new HttpErr(403, 'Sem permissão para esta operação.'); };
  if (!ALL_COLLS.includes(coll)) throw new HttpErr(404, 'Coleção desconhecida.');
  if (op === 'delete') { if (CFGC.includes(coll) && staff) return null; if (coll === 'grades' && staff) return null; deny(); }
  if (CFGC.includes(coll)) { if (!staff) deny(); return data; }
  if (coll === 'public') {
    if (id === u.id) { const d = { ...data }; delete d.adj; return d; }
    if (!staff || op !== 'patch') deny();
    const keys = Object.keys(data); if (keys.some((k) => k !== 'adj')) deny();
    return data;
  }
  if (coll === 'priv') { if (id !== u.id) deny(); return data; }
  if (coll === 'grades') { if (!staff) deny(); return data; }
  if (coll === 'teachers') { if (!staff || (id !== u.id && !admin)) deny(); return data; }
  deny();
}

/* ---------- sessão ---------- */
function cookieOf(req, name) { const c = req.headers.get('cookie') || ''; const m = c.split(/;\s*/).find((x) => x.startsWith(name + '=')); return m ? m.slice(name.length + 1) : null; }
async function currentUser(req, env) {
  const tk = cookieOf(req, 'ss_sess'); if (!tk || tk.length < 20) return null;
  const th = await sha256(tk);
  const r = await env.DB.prepare('SELECT u.* FROM sessions s JOIN users u ON u.id=s.uid WHERE s.th=?1 AND s.expires>?2 AND u.status=\'active\'').bind(th, now()).first();
  return r || null;
}
function setCookie(req, token, maxAge) {
  const secure = new URL(req.url).protocol === 'https:' ? '; Secure' : '';
  return 'ss_sess=' + token + '; HttpOnly; SameSite=Strict; Path=/; Max-Age=' + maxAge + secure;
}
async function newSession(env, uid) {
  const token = randHex(32); await env.DB.prepare('INSERT INTO sessions(th,uid,expires) VALUES(?1,?2,?3)').bind(await sha256(token), uid, now() + SESSION_MS).run();
  if (Math.random() < 0.05) await env.DB.prepare('DELETE FROM sessions WHERE expires<?1').bind(now()).run();
  return token;
}

/* ---------- criação de contas ---------- */
async function createUser(env, { username, ident, password, role, status, mustChange }) {
  const id = 'u' + randHex(8); const p = await mkPass(env, password);
  try {
    await env.DB.prepare('INSERT INTO users(id,username,ident,role,status,hash,salt,iter,must_change,created) VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)').bind(id, username, ident, role, status, p.hash, p.salt, p.iter, mustChange ? 1 : 0, now()).run();
  } catch (e) { if (/UNIQUE/i.test(String(e.message || e))) throw new HttpErr(409, 'Esse nome de usuário já existe.'); throw e; }
  const u = { id, username, ident, role, status };
  if (status === 'active') await ensureTeacherDoc(env, u);
  return u;
}
async function deleteUserFully(env, uid) {
  await env.DB.batch([env.DB.prepare('DELETE FROM sessions WHERE uid=?1').bind(uid), env.DB.prepare('DELETE FROM users WHERE id=?1').bind(uid)]);
  await wipeUserData(env, uid);
}

/* ---------- roteador ---------- */
async function handle(req, env) {
  const url = new URL(req.url); const path = url.pathname; const m = req.method;
  if (m !== 'GET' && m !== 'HEAD') {
    const o = req.headers.get('origin'); if (o && new URL(o).host !== url.host) throw new HttpErr(403, 'Origem não permitida.');
    if (req.headers.get('x-ss') !== '1') throw new HttpErr(403, 'Requisição não permitida.');
  }
  /* públicas */
  if (path === '/api/status' && m === 'GET') { const a = await env.DB.prepare("SELECT 1 x FROM users WHERE role='admin' LIMIT 1").first(); return J({ needsSetup: !a, setupConfigured: !!env.SETUP_CODE }); }
  if (path === '/api/setup' && m === 'POST') {
    const b = await body(req); const ip = ipOf(req);
    const wait = await lockLeft(env, ['setup:' + ip]); if (wait) throw new HttpErr(429, 'Muitas tentativas. Aguarde ' + wait + 's.');
    const a = await env.DB.prepare("SELECT 1 x FROM users WHERE role='admin' LIMIT 1").first(); if (a) throw new HttpErr(403, 'O administrador já foi criado.');
    if (!env.SETUP_CODE) throw new HttpErr(503, 'O código de instalação (SETUP_CODE) ainda não foi configurado no servidor. Veja o guia.');
    if (!safeEq(b.code || '', env.SETUP_CODE)) { await bump(env, 'setup:' + ip, 5, 30000); throw new HttpErr(403, 'Código de instalação incorreto.'); }
    const username = validUser(b.username), ident = clean(b.ident, 60) || username, pw = validPass(b.password, 'admin');
    const u = await createUser(env, { username, ident, password: pw, role: 'admin', status: 'active', mustChange: false });
    const token = await newSession(env, u.id);
    return J({ user: { id: u.id, username, ident, role: 'admin', mustChange: false } }, 200, { 'set-cookie': setCookie(req, token, SESSION_MS / 1000) });
  }
  if (path === '/api/login' && m === 'POST') {
    const b = await body(req); const username = String(b.username || '').trim().toLowerCase(); const pw = String(b.password || '');
    if (!username || !pw || pw.length > 100) throw new HttpErr(400, 'Informe usuário e senha.');
    const keys = ['u:' + username, 'ip:' + ipOf(req)];
    const wait = await lockLeft(env, keys); if (wait) throw new HttpErr(429, 'Muitas tentativas. Aguarde ' + wait + ' segundos.');
    const u = await env.DB.prepare('SELECT * FROM users WHERE username=?1').bind(username).first();
    const salt = u ? u.salt : '00'.repeat(16); const calc = await pbkdf2(pw, salt, u ? u.iter : iterOf(env));
    if (!u || !safeEq(calc, u.hash)) { await bump(env, keys[0], 5, 30000); await bump(env, keys[1], 20, 30000); throw new HttpErr(401, 'Usuário ou senha incorretos.'); }
    if (u.status === 'pending') throw new HttpErr(403, 'Seu cadastro de professor ainda aguarda aprovação do administrador.', 'pending');
    if (u.status === 'disabled') throw new HttpErr(403, 'Esta conta está desativada. Fale com o administrador.', 'disabled');
    await clearAtt(env, keys[0]);
    await env.DB.prepare('UPDATE users SET last_login=?1 WHERE id=?2').bind(now(), u.id).run();
    const token = await newSession(env, u.id);
    await ensureTeacherDoc(env, u);
    return J({ user: pub(u) }, 200, { 'set-cookie': setCookie(req, token, SESSION_MS / 1000) });
  }
  if (path === '/api/register-teacher' && m === 'POST') {
    const b = await body(req); const ip = 'reg:' + ipOf(req);
    const wait = await lockLeft(env, [ip]); if (wait) throw new HttpErr(429, 'Muitas tentativas. Aguarde um pouco.');
    const username = validUser(b.username), ident = clean(b.ident, 60), pw = validPass(b.password, 'teacher');
    if (ident.length < 2) throw new HttpErr(400, 'Informe sua identificação (nome).');
    if (b.password2 != null && b.password2 !== b.password) throw new HttpErr(400, 'As senhas não coincidem.');
    let inv = null;
    if (b.invite) { inv = await env.DB.prepare('SELECT * FROM invites WHERE th=?1').bind(await sha256(String(b.invite).trim().toUpperCase())).first(); if (!inv || inv.used_by || inv.expires < now()) { await bump(env, ip, 8, 60000); throw new HttpErr(400, 'Convite inválido, usado ou expirado.'); } }
    await bump(env, ip, 30, 60000);
    const u = await createUser(env, { username, ident, password: pw, role: 'teacher', status: inv ? 'active' : 'pending', mustChange: false });
    if (inv) await env.DB.prepare('UPDATE invites SET used_by=?1 WHERE id=?2').bind(u.id, inv.id).run();
    return J({ ok: true, status: u.status });
  }

  /* autenticadas */
  const me = await currentUser(req, env);
  if (!me) throw new HttpErr(401, 'Sessão expirada. Entre novamente.', 'auth');
  if (path === '/api/logout' && m === 'POST') {
    const tk = cookieOf(req, 'ss_sess'); if (tk) await env.DB.prepare('DELETE FROM sessions WHERE th=?1').bind(await sha256(tk)).run();
    return J({ ok: true }, 200, { 'set-cookie': setCookie(req, '', 0) });
  }
  if (path === '/api/me' && m === 'GET') { await ensureTeacherDoc(env, me); return J({ user: pub(me) }); }
  if (path === '/api/password' && m === 'POST') {
    const b = await body(req); const calc = await pbkdf2(String(b.current || ''), me.salt, me.iter);
    if (!safeEq(calc, me.hash)) throw new HttpErr(403, 'Senha atual incorreta.');
    const np = validPass(b.new, me.role); if (np === b.current) throw new HttpErr(400, 'A nova senha precisa ser diferente da atual.');
    const p = await mkPass(env, np); const tk = cookieOf(req, 'ss_sess'); const th = await sha256(tk);
    await env.DB.batch([env.DB.prepare('UPDATE users SET hash=?1,salt=?2,iter=?3,must_change=0 WHERE id=?4').bind(p.hash, p.salt, p.iter, me.id), env.DB.prepare('DELETE FROM sessions WHERE uid=?1 AND th<>?2').bind(me.id, th)]);
    return J({ ok: true });
  }
  if (me.must_change) throw new HttpErr(403, 'Você precisa trocar a senha inicial antes de continuar.', 'must_change');

  if (path === '/api/me' && m === 'DELETE') {
    const b = await body(req); const calc = await pbkdf2(String(b.password || ''), me.salt, me.iter);
    if (!safeEq(calc, me.hash)) throw new HttpErr(403, 'Senha incorreta.');
    if (me.role === 'admin') { const c = await env.DB.prepare("SELECT COUNT(*) n FROM users WHERE role='admin' AND status='active'").first(); if (c.n <= 1) throw new HttpErr(400, 'Você é o único administrador. Crie outro administrador antes de excluir esta conta.'); }
    await deleteUserFully(env, me.id);
    return J({ ok: true }, 200, { 'set-cookie': setCookie(req, '', 0) });
  }

  /* contas (professor/administrador) */
  const staff = me.role !== 'student', admin = me.role === 'admin';
  if (path.startsWith('/api/users') || path.startsWith('/api/invites')) {
    if (!staff) throw new HttpErr(403, 'Sem permissão.');
    const seg = path.split('/').filter(Boolean); // api, users, id, action
    if (path === '/api/users' && m === 'GET') {
      const rows = (await (admin ? env.DB.prepare('SELECT * FROM users ORDER BY role,username') : env.DB.prepare("SELECT * FROM users WHERE role='student' ORDER BY username")).all()).results;
      return J({ users: rows.map(pub) });
    }
    if (path === '/api/users' && m === 'POST') {
      const b = await body(req); const role = b.role || 'student';
      if (!['student', 'teacher', 'admin'].includes(role)) throw new HttpErr(400, 'Perfil inválido.');
      if (role !== 'student' && !admin) throw new HttpErr(403, 'Só o administrador cria contas de professor ou administrador.');
      const u = await createUser(env, { username: validUser(b.username), ident: clean(b.ident, 60) || validUser(b.username), password: validPass(b.password, role), role, status: 'active', mustChange: true });
      return J({ user: u });
    }
    if (path === '/api/users/bulk' && m === 'POST') {
      const b = await body(req); const list = Array.isArray(b.students) ? b.students.slice(0, 10) : []; const out = []; /* máx. 10 por requisição: cada senha exige um hash (CPU) */
      for (const s of list) {
        try { const u = await createUser(env, { username: validUser(s.username), ident: clean(s.ident, 60) || validUser(s.username), password: validPass(s.password, 'student'), role: 'student', status: 'active', mustChange: true }); out.push({ username: u.username, ok: true }); }
        catch (e) { out.push({ username: String(s.username || ''), ok: false, error: e instanceof HttpErr ? e.message : 'Erro' }); }
      }
      return J({ results: out });
    }
    if (seg[1] === 'users' && seg[2]) {
      const t = await env.DB.prepare('SELECT * FROM users WHERE id=?1').bind(seg[2]).first(); if (!t) throw new HttpErr(404, 'Conta não encontrada.');
      if (!admin && t.role !== 'student') throw new HttpErr(403, 'Sem permissão para esta conta.');
      if (seg[3] === 'reset' && m === 'POST') {
        const b = await body(req); const pw = validPass(b.password, t.role); const p = await mkPass(env, pw);
        await env.DB.batch([env.DB.prepare('UPDATE users SET hash=?1,salt=?2,iter=?3,must_change=1 WHERE id=?4').bind(p.hash, p.salt, p.iter, t.id), env.DB.prepare('DELETE FROM sessions WHERE uid=?1').bind(t.id), env.DB.prepare('DELETE FROM attempts WHERE k=?1').bind('u:' + t.username)]);
        return J({ ok: true });
      }
      if (seg[3] === 'status' && m === 'POST') {
        const b = await body(req); const st = b.status; if (!['active', 'disabled'].includes(st)) throw new HttpErr(400, 'Status inválido.');
        if (t.id === me.id) throw new HttpErr(400, 'Você não pode alterar a própria conta aqui.');
        if (t.status === 'pending' && !admin) throw new HttpErr(403, 'Sem permissão.');
        await env.DB.prepare('UPDATE users SET status=?1 WHERE id=?2').bind(st, t.id).run();
        if (st === 'disabled') await env.DB.prepare('DELETE FROM sessions WHERE uid=?1').bind(t.id).run(); else await ensureTeacherDoc(env, t);
        return J({ ok: true });
      }
      if (seg.length === 3 && m === 'DELETE') {
        if (t.id === me.id) throw new HttpErr(400, 'Use "Excluir minha conta" para apagar a própria conta.');
        await deleteUserFully(env, t.id); return J({ ok: true });
      }
    }
    if (seg[1] === 'invites') {
      if (!admin) throw new HttpErr(403, 'Só o administrador gerencia convites.');
      if (m === 'GET' && seg.length === 2) {
        const rows = (await env.DB.prepare('SELECT i.id,i.hint,i.created,i.expires,u.username used FROM invites i LEFT JOIN users u ON u.id=i.used_by ORDER BY i.created DESC LIMIT 50').all()).results; return J({ invites: rows });
      }
      if (m === 'POST' && seg.length === 2) {
        const al = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; const r = rand(8); const c = [...r].map((x) => al[x % al.length]).join(''); const code = 'SS-' + c.slice(0, 4) + '-' + c.slice(4);
        await env.DB.prepare('INSERT INTO invites(id,th,hint,created_by,created,expires) VALUES(?1,?2,?3,?4,?5,?6)').bind('i' + randHex(6), await sha256(code), code.slice(0, 7), me.id, now(), now() + 7 * 24 * 3600 * 1000).run();
        return J({ code });
      }
      if (m === 'DELETE' && seg.length === 3) { await env.DB.prepare('DELETE FROM invites WHERE id=?1').bind(seg[2]).run(); return J({ ok: true }); }
    }
    throw new HttpErr(404, 'Rota não encontrada.');
  }

  /* documentos */
  if (path === '/api/sync' && m === 'GET') {
    const since = parseInt(url.searchParams.get('since'), 10) || 0;
    const head = (await env.DB.prepare("SELECT v FROM meta WHERE k='seq'").first()).v;
    const colls = ALL_COLLS.filter((c) => canRead(me, c, me.id) || (me.role !== 'student' && c === 'teachers'));
    const ph = colls.map((_, i) => '?' + (i + 3)).join(',');
    let sql = 'SELECT coll,id,data,deleted FROM docs WHERE seq>?1 AND seq<=?2 AND coll IN (' + ph + ')';
    const args = [since, head, ...colls];
    if (!staff) { sql += " AND (coll NOT IN ('priv','grades') OR id=?" + (args.length + 1) + ')'; args.push(me.id); }
    if (since === 0) sql += ' AND deleted=0';
    const rows = (await env.DB.prepare(sql).bind(...args).all()).results;
    const docs = {}, del = {};
    for (const r of rows) { if (r.deleted) (del[r.coll] = del[r.coll] || []).push(r.id); else (docs[r.coll] = docs[r.coll] || {})[r.id] = JSON.parse(r.data); }
    return J({ seq: head, docs, del, colls });
  }
  if (path.startsWith('/api/doc/')) {
    const [, , , coll, id] = path.split('/'); if (!ALL_COLLS.includes(coll) || !/^[A-Za-z0-9_.-]{1,80}$/.test(id || '')) throw new HttpErr(404, 'Documento inválido.');
    if (m === 'GET') { if (!canRead(me, coll, id) && !(me.role !== 'student' && coll === 'teachers')) throw new HttpErr(403, 'Sem permissão.'); return J({ doc: await getDoc(env, coll, id) }); }
    if (m === 'PUT' || m === 'PATCH' || m === 'DELETE') {
      const op = m === 'PUT' ? 'set' : m === 'PATCH' ? 'patch' : 'delete';
      let data = null;
      if (op !== 'delete') { data = await body(req); if (JSON.stringify(data).length > MAX_DOC) throw new HttpErr(413, 'Documento grande demais.'); }
      data = await checkWrite(env, me, coll, id, op, data);
      if (op === 'delete') { await tomb(env, coll, id); return J({ ok: true }); }
      if (op === 'patch') { const cur = (await getDoc(env, coll, id)) || {}; data = dmerge(cur, data); }
      else if (coll === 'public' && id === me.id) { const cur = await getDoc(env, coll, id); if (cur && cur.adj) data.adj = cur.adj; }
      if (JSON.stringify(data).length > MAX_DOC) throw new HttpErr(413, 'Documento grande demais.');
      await putDoc(env, coll, id, data);
      return J({ ok: true, doc: data });
    }
  }
  throw new HttpErr(404, 'Rota não encontrada.');
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(req);
    try { return await handle(req, env); }
    catch (e) {
      if (e instanceof HttpErr) return J({ error: e.message, code: e.code }, e.s);
      console.error('erro interno', e && e.stack || e);
      return J({ error: 'Erro interno do servidor.' }, 500);
    }
  },
};
