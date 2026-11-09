// Testes da API (sem navegador): contas, permissões, isolamento de dados.
import { start } from '../tools/dev-server.mjs';
const { srv, port } = await start(8801);
const B = 'http://localhost:' + port; let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FALHOU:', m); } else console.log('ok  ', m); };
function client() { let ck = ''; return async (method, p, body) => { const r = await fetch(B + p, { method, headers: { 'content-type': 'application/json', 'x-ss': '1', cookie: ck }, body: body ? JSON.stringify(body) : undefined }); const sc = r.headers.getSetCookie(); if (sc.length) { const v = sc[0].split(';')[0]; ck = v.endsWith('=') ? '' : v; } let j = {}; try { j = await r.json(); } catch (e) {} return { s: r.status, j }; }; }
const adm = client(), t1 = client(), s1 = client(), s2 = client(), anon = client();
let r = await anon('GET', '/api/status'); ok(r.j.needsSetup === true, 'status: precisa de setup');
r = await anon('POST', '/api/setup', { code: 'errado', username: 'admin', password: 'senhaforte1' }); ok(r.s === 403, 'setup com código errado é recusado');
r = await adm('POST', '/api/setup', { code: 'codigo-de-teste', username: 'admin', ident: 'Admin', password: 'senhaforte1' }); ok(r.s === 200 && r.j.user.role === 'admin', 'setup cria administrador');
r = await anon('POST', '/api/setup', { code: 'codigo-de-teste', username: 'admin2', password: 'senhaforte1' }); ok(r.s === 403, 'setup só funciona uma vez');
r = await anon('GET', '/api/sync'); ok(r.s === 401, 'sem login não lê dados');
r = await anon('POST', '/api/login', { username: 'admin', password: 'x' }); ok(r.s === 401, 'senha errada recusada');
// professor: cadastro pendente
r = await t1('POST', '/api/register-teacher', { username: 'carla', ident: 'Carla', password: 'professora1' }); ok(r.j.status === 'pending', 'professor se cadastra como pendente');
r = await t1('POST', '/api/login', { username: 'carla', password: 'professora1' }); ok(r.s === 403 && r.j.code === 'pending', 'professor pendente não entra');
r = await adm('GET', '/api/users'); const carla = r.j.users.find((u) => u.username === 'carla'); ok(!!carla && carla.status === 'pending', 'admin vê professor pendente');
r = await adm('POST', '/api/users/' + carla.id + '/status', { status: 'active' }); ok(r.s === 200, 'admin aprova professor');
r = await t1('POST', '/api/login', { username: 'carla', password: 'professora1' }); ok(r.s === 200 && r.j.user.role === 'teacher', 'professor aprovado entra');
// convite
r = await adm('POST', '/api/invites'); const code = r.j.code; ok(/^SS-/.test(code), 'admin gera convite');
const t2 = client(); r = await t2('POST', '/api/register-teacher', { username: 'pedro', ident: 'Pedro', password: 'professor22', invite: code }); ok(r.j.status === 'active', 'convite ativa professor direto');
r = await client()('POST', '/api/register-teacher', { username: 'pedro2', ident: 'P', password: 'professor22', invite: code }); ok(r.s === 400, 'convite não pode ser reutilizado');
r = await client()('POST', '/api/register-teacher', { username: 'CARLA', ident: 'Xis', password: 'professor22' }); ok(r.s === 409, 'usuário duplicado (sem diferenciar maiúsculas) recusado');
// alunos
r = await t1('POST', '/api/users', { username: 'ana', ident: 'Ana', password: 'abc123' }); ok(r.s === 200, 'professor cria aluno');
r = await t1('POST', '/api/users', { username: 'x1', ident: 'X', password: 'professor22', role: 'teacher' }); ok(r.s === 403, 'professor NÃO cria professor');
r = await t1('POST', '/api/users/bulk', { students: [{ ident: 'Bia', username: 'bia', password: 'abc123' }, { ident: 'Ana2', username: 'ana', password: 'abc123' }] }); ok(r.j.results[0].ok && !r.j.results[1].ok, 'cadastro em lote com duplicado');
r = await s1('POST', '/api/login', { username: 'ana', password: 'abc123' }); ok(r.j.user.mustChange === true, 'aluno deve trocar senha inicial');
r = await s1('GET', '/api/sync'); ok(r.s === 403 && r.j.code === 'must_change', 'bloqueado até trocar senha');
r = await s1('POST', '/api/password', { current: 'abc123', new: '123' }); ok(r.s === 400, 'senha curta recusada');
r = await s1('POST', '/api/password', { current: 'abc123', new: 'minhasenha' }); ok(r.s === 200, 'aluno troca senha');
r = await s2('POST', '/api/login', { username: 'bia', password: 'abc123' }); await s2('POST', '/api/password', { current: 'abc123', new: 'senhabia1' });
r = await s1('GET', '/api/me'); const ana = r.j.user; r = await s2('GET', '/api/me'); const bia = r.j.user;
// dados
r = await s1('PUT', '/api/doc/priv/' + ana.id, { nick: 'Ana', pts: { d1: 10 } }); ok(r.s === 200, 'aluno grava o próprio progresso');
r = await s1('PUT', '/api/doc/priv/' + bia.id, { nick: 'hack' }); ok(r.s === 403, 'aluno NÃO grava progresso de outro');
r = await s2('PUT', '/api/doc/priv/' + bia.id, { nick: 'Bia', pts: { d1: 5 } });
r = await s2('GET', '/api/doc/priv/' + ana.id); ok(r.s === 403, 'aluno NÃO lê progresso de outro');
r = await s2('GET', '/api/sync'); ok(r.j.docs.priv && Object.keys(r.j.docs.priv).length === 1 && r.j.docs.priv[bia.id], 'sync do aluno só traz o próprio priv');
r = await s1('PUT', '/api/doc/cmods/m1', { title: 'x' }); ok(r.s === 403, 'aluno NÃO edita conteúdo');
r = await s1('PUT', '/api/doc/grades/' + ana.id, { es: {} }); ok(r.s === 403, 'aluno NÃO grava notas');
r = await s1('PUT', '/api/doc/public/' + ana.id, { nick: 'Ana', pts: { d1: 10 }, adj: { d1: 9999 } }); ok(r.s === 200 && !r.j.doc.adj, 'aluno não consegue gravar ajuste de pontos (adj)');
r = await t1('PATCH', '/api/doc/public/' + ana.id, { adj: { d1: 20 } }); ok(r.s === 200 && r.j.doc.adj.d1 === 20 && r.j.doc.nick === 'Ana', 'professor ajusta pontos (adj) sem apagar o resto');
r = await s1('PUT', '/api/doc/public/' + ana.id, { nick: 'Ana', pts: { d1: 11 } }); ok(r.j.doc.adj && r.j.doc.adj.d1 === 20, 'novo salvamento do aluno preserva o ajuste do professor');
r = await t1('PATCH', '/api/doc/public/' + ana.id, { nick: 'zzz' }); ok(r.s === 403, 'professor só altera adj no público do aluno');
r = await t1('PUT', '/api/doc/cmods/m1', { title: 'Novo' }); ok(r.s === 200, 'professor edita conteúdo');
r = await t1('GET', '/api/sync'); ok(r.j.docs.priv[ana.id] && r.j.docs.priv[bia.id], 'professor lê progresso de todos');
r = await s1('GET', '/api/users'); ok(r.s === 403, 'aluno NÃO lista contas');
r = await s1('GET', '/api/doc/teachers/x'); ok(r.s === 403, 'aluno NÃO lê professores');
// sync incremental e exclusão
const head = (await s1('GET', '/api/sync')).j.seq; await s2('PATCH', '/api/doc/public/' + bia.id, { nick: 'Bia2' });
r = await s1('GET', '/api/sync?since=' + head); ok(r.j.docs.public && r.j.docs.public[bia.id].nick === 'Bia2' && !r.j.docs.priv, 'sync incremental traz só o que mudou');
// reset e exclusão
r = await t1('POST', '/api/users/' + bia.id + '/reset', { password: 'novabia1' }); ok(r.s === 200, 'professor redefine senha do aluno');
r = await s2('GET', '/api/me'); ok(r.s === 401, 'sessões do aluno encerram após redefinição');
r = await s2('POST', '/api/login', { username: 'bia', password: 'novabia1' }); ok(r.j.user.mustChange, 'após redefinição precisa trocar a senha');
r = await t1('POST', '/api/users/' + carla.id + '/reset', { password: 'qualquer12' }); ok(r.s === 400 || r.s === 403, 'professor não redefine a própria via painel de alunos/outros professores');
r = await t1('DELETE', '/api/users/' + ana.id); ok(r.s === 200, 'professor exclui aluno');
r = await t1('GET', '/api/sync'); ok(!r.j.docs.priv || !r.j.docs.priv[ana.id], 'dados do aluno excluído somem (priv)');
r = await s1('GET', '/api/me'); ok(r.s === 401, 'aluno excluído perde o acesso');
r = await t1('DELETE', '/api/users/' + (await adm('GET', '/api/users')).j.users.find((u) => u.username === 'pedro').id); ok(r.s === 403, 'professor NÃO exclui professor');
// aluno exclui a própria conta
const s3 = client(); await adm('POST', '/api/users', { username: 'caio', ident: 'Caio', password: 'abc123' }); await s3('POST', '/api/login', { username: 'caio', password: 'abc123' }); await s3('POST', '/api/password', { current: 'abc123', new: 'caio1234' });
const caio = (await s3('GET', '/api/me')).j.user; await s3('PUT', '/api/doc/priv/' + caio.id, { nick: 'Caio' });
r = await s3('DELETE', '/api/me', { password: 'errada' }); ok(r.s === 403, 'exclusão da própria conta exige a senha');
r = await s3('DELETE', '/api/me', { password: 'caio1234' }); ok(r.s === 200, 'aluno exclui a própria conta');
r = await adm('GET', '/api/users'); ok(!r.j.users.some((u) => u.username === 'caio'), 'conta excluída some da lista');
r = await adm('DELETE', '/api/me', { password: 'senhaforte1' }); ok(r.s === 400, 'último administrador não pode se excluir');
// força bruta
const bf = client(); for (let i = 0; i < 5; i++) await bf('POST', '/api/login', { username: 'bia', password: 'x' + i }); r = await bf('POST', '/api/login', { username: 'bia', password: 'novabia1' }); ok(r.s === 429, 'bloqueio após várias tentativas erradas');
// CSRF
r = await fetch(B + '/api/logout', { method: 'POST', headers: { origin: 'http://evil.example' } }); ok(r.status === 403, 'origem externa recusada');
r = await fetch(B + '/'); ok(r.status === 200 || r.status === 404, 'assets respondem');
srv.close(); console.log(fails ? '\n' + fails + ' FALHA(S)' : '\nTODOS OS TESTES DE API PASSARAM'); process.exit(fails ? 1 : 0);
