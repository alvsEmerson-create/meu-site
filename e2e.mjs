// Teste de ponta a ponta no navegador (Playwright) contra o servidor local (mesmo worker.js + D1 simulado).
import { start } from '../tools/dev-server.mjs'; import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
const { srv, port } = await start(8802); const URL_ = 'http://localhost:' + port + '/'; let fails = 0; const errs = [];
const ok = (c, m) => { if (!c) { fails++; console.log('FALHOU:', m); } else console.log('ok  ', m); };
const b = await chromium.launch();
async function ctx(w = 1100, h = 850) { const c = await b.newContext({ viewport: { width: w, height: h } }); const p = await c.newPage(); p.on('pageerror', (e) => errs.push('PAGEERR ' + e.message)); p.on('console', (m) => { if (m.type() === 'error' && !/fonts|ERR_|status of 4\d\d/.test(m.text())) errs.push('CONSOLE ' + m.text()); }); return { c, p }; }
const txt = (p) => p.evaluate(() => document.body.innerText);
async function login(p, u, pw) { await p.goto(URL_); await p.waitForSelector('#lg-user'); await p.fill('#lg-user', u); await p.fill('#lg-pw', pw); await p.click('[data-act=lg-go]'); }
// 1) instalação
let A = await ctx(); await A.p.goto(URL_); await A.p.waitForSelector('#su-code');
ok(/Instalação/.test(await txt(A.p)), 'primeira execução mostra instalação do administrador');
await A.p.fill('#su-code', 'errado'); await A.p.fill('#su-ident', 'Admin Geral'); await A.p.fill('#su-user', 'admin'); await A.p.fill('#su-pw', 'senhaforte1'); await A.p.fill('#su-pw2', 'senhaforte1'); await A.p.click('[data-act=su-go]'); await A.p.waitForTimeout(500);
ok(/incorreto/.test(await txt(A.p)), 'código de instalação errado é recusado na tela');
await A.p.fill('#su-code', 'codigo-de-teste'); await A.p.fill('#su-ident', 'Admin Geral'); await A.p.fill('#su-user', 'admin'); await A.p.fill('#su-pw', 'senhaforte1'); await A.p.fill('#su-pw2', 'senhaforte1'); await A.p.click('[data-act=su-go]');
await A.p.waitForSelector('.side', { timeout: 10000 }); ok(true, 'administrador criado e painel aberto');
// 2) admin cria aluno
await A.p.evaluate(() => ago('acc')); await A.p.waitForSelector('#ac-ident'); await A.p.waitForTimeout(500);
await A.p.fill('#ac-ident', 'Lia Souza'); await A.p.fill('#ac-user', 'lia'); await A.p.fill('#ac-pw', 'abc234'); await A.p.click('[data-act=acc-create]'); await A.p.waitForTimeout(700);
ok(/abc234/.test(await txt(A.p)), 'credenciais do aluno exibidas uma vez para entrega');
await A.p.click('[data-act=mclose]'); await A.p.fill('#ac-ident', 'Davi Lima'); await A.p.fill('#ac-user', 'davi'); await A.p.fill('#ac-pw', 'abc234'); await A.p.click('[data-act=acc-create]'); await A.p.waitForTimeout(400); await A.p.click('[data-act=mclose]');
await A.p.waitForTimeout(500); ok((await txt(A.p)).includes('@lia') && (await txt(A.p)).includes('@davi'), 'alunos aparecem na lista de contas');
await A.p.screenshot({ path: '/tmp/e_acc.png', fullPage: true });
// 3) aluno Lia: login, troca senha, onboarding, progresso
let L = await ctx(400, 850); await login(L.p, 'lia', 'errada'); await L.p.waitForTimeout(600); ok(/incorretos/.test(await txt(L.p)), 'login com senha errada mostra erro');
await L.p.fill('#lg-pw', 'abc234'); await L.p.click('[data-act=lg-go]'); await L.p.waitForSelector('#cp-new'); ok(true, 'primeiro acesso exige trocar a senha');
await L.p.fill('#cp-cur', 'abc234'); await L.p.fill('#cp-new', 'liasenha1'); await L.p.fill('#cp-new2', 'liasenha1'); await L.p.click('[data-act=cp-go]');
await L.p.waitForSelector('#ob-nick'); await L.p.fill('#ob-nick', 'Lia7'); await L.p.check('#ob-ok'); await L.p.click('[data-act=ob-go]'); await L.p.waitForSelector('.hero');
ok(true, 'aluno cria perfil de jogo');
await L.p.evaluate(() => { startAct('m1-act'); }); await L.p.waitForTimeout(200);
for (let i = 0; i < 6; i++) { const q = await L.p.evaluate(() => (S.run && !S.run.done) ? curQ().type : null); if (!q) break; if (['mc', 'err', 'tf'].includes(q)) await L.p.click('.opt:not([disabled])'); else if (q === 'short' || q === 'essay') { await L.p.fill('#rq-in', 'x'); await L.p.click('[data-act=rq-ok]'); } else if (q === 'match') { await L.p.evaluate(() => { document.querySelectorAll('select[data-mi]').forEach((s) => { s.value = s.options[1].value; s.dispatchEvent(new Event('change', { bubbles: true })); }); }); await L.p.click('[data-act=rq-ok]'); } else await L.p.click('[data-act=rq-ok]'); await L.p.waitForTimeout(120); if (await L.p.$('[data-act=rq-next]')) await L.p.click('[data-act=rq-next]'); await L.p.waitForTimeout(100); }
await L.p.waitForTimeout(1500); const pts = await L.p.evaluate(() => myTotal()); ok(pts > 0, 'aluno ganhou pontos (' + pts + ')');
await L.p.screenshot({ path: '/tmp/e_stu.png' });
// 4) persistência: outro navegador (outro dispositivo)
let L2 = await ctx(400, 850); await login(L2.p, 'lia', 'liasenha1'); await L2.p.waitForSelector('.hero', { timeout: 10000 }); await L2.p.waitForTimeout(800);
ok((await L2.p.evaluate(() => myTotal())) === pts, 'progresso aparece em outro dispositivo após entrar de novo');
await L2.p.reload(); await L2.p.waitForSelector('.hero', { timeout: 10000 }); ok(true, 'sessão continua após recarregar a página');
// 5) isolamento: Davi
let D = await ctx(400, 850); await login(D.p, 'davi', 'abc234'); await D.p.waitForSelector('#cp-new'); await D.p.fill('#cp-cur', 'abc234'); await D.p.fill('#cp-new', 'davisenha1'); await D.p.fill('#cp-new2', 'davisenha1'); await D.p.click('[data-act=cp-go]');
await D.p.waitForSelector('#ob-nick'); await D.p.fill('#ob-nick', 'Davi9'); await D.p.check('#ob-ok'); await D.p.click('[data-act=ob-go]'); await D.p.waitForSelector('.hero'); await D.p.waitForTimeout(1200);
const dv = await D.p.evaluate(async () => { const r = await fetch('/api/sync?since=0', { headers: { 'x-ss': '1' } }); const j = await r.json(); return { priv: Object.keys(j.docs.priv || {}).length, pubNick: Object.values(j.docs.public || {}).map((x) => x.nick).sort(), hasFull: JSON.stringify(j.docs.public).includes('Lia Souza'), uid: S.uid, mine: myTotal() }; });
ok(dv.priv === 1, 'aluno só recebe o próprio progresso detalhado'); ok(dv.pubNick.includes('Lia7') && dv.pubNick.includes('Davi9') && !dv.hasFull, 'ranking mostra apelidos, sem nome real');
ok(dv.mine < pts && (await D.p.evaluate(() => S.priv.nick)) === 'Davi9', 'pontos da Lia não aparecem na conta do Davi (Davi tem só os dele: ' + dv.mine + ')');
const hack = await D.p.evaluate(async () => { const r = await fetch('/api/doc/priv/' + Object.keys(DB.cache.priv)[0] + 'x', { method: 'PUT', headers: { 'x-ss': '1', 'content-type': 'application/json' }, body: '{}' }); const r2 = await fetch('/api/users', { headers: { 'x-ss': '1' } }); return [r.status, r2.status]; }); ok(hack[0] === 403 && hack[1] === 403, 'aluno tenta gravar dados alheios e listar contas: recusado');
await D.p.evaluate(() => go('rank')); await D.p.screenshot({ path: '/tmp/e_rank.png' });
// 6) professor: cadastro pendente → aprovação
let T = await ctx(); await T.p.goto(URL_); await T.p.waitForSelector('[data-act=au-reg]'); await T.p.click('[data-act=au-reg]'); await T.p.fill('#rg-ident', 'Prof Carla'); await T.p.fill('#rg-user', 'carla'); await T.p.fill('#rg-pw', 'professora1'); await T.p.fill('#rg-pw2', 'professora1'); await T.p.click('[data-act=rg-go]'); await T.p.waitForSelector('#lg-user'); await T.p.waitForTimeout(200);
ok(/aguarde o administrador/i.test(await txt(T.p)), 'cadastro de professor fica pendente');
await T.p.fill('#lg-user', 'carla'); await T.p.fill('#lg-pw', 'professora1'); await T.p.click('[data-act=lg-go]'); await T.p.waitForTimeout(600); ok(/aguarda aprovação/.test(await txt(T.p)), 'professor pendente não entra');
await A.p.evaluate(() => { S.users = null; render(); }); await A.p.waitForSelector('[data-act=acc-status][data-s=active]'); ok(/Prof Carla/.test(await txt(A.p)), 'administrador vê o pedido de professor'); await A.p.click('[data-act=acc-status][data-s=active]'); await A.p.waitForTimeout(600);
await T.p.fill('#lg-pw', 'professora1'); await T.p.click('[data-act=lg-go]'); await T.p.waitForSelector('.side', { timeout: 10000 }); ok(true, 'professor aprovado entra no painel');
await T.p.evaluate(() => ago('stu')); await T.p.waitForTimeout(1200); const tt = await txt(T.p); ok(tt.includes('Lia7') && tt.includes('Davi9'), 'professor acompanha os alunos');
ok(!(await T.p.evaluate(() => [...document.querySelectorAll('.side button')].some((x) => /Convites/.test(x.textContent)))), 'professor não vê convites');
await T.p.evaluate(() => ago('acc')); await T.p.waitForTimeout(800); ok(!/Convites para professores/.test(await txt(T.p)), 'professor não vê área de convites/administração');
const tAdm = await T.p.evaluate(async () => { const r = await fetch('/api/invites', { method: 'POST', headers: { 'x-ss': '1', 'content-type': 'application/json' }, body: '{}' }); const r2 = await fetch('/api/users', { method: 'POST', headers: { 'x-ss': '1', 'content-type': 'application/json' }, body: JSON.stringify({ username: 'xx1', password: 'professora2', role: 'admin' }) }); return [r.status, r2.status]; }); ok(tAdm[0] === 403 && tAdm[1] === 403, 'professor não consegue virar administrador nem gerar convites (servidor recusa)');
await T.p.screenshot({ path: '/tmp/e_teacher.png' });
// 7) professor redefine senha da Lia e exclui Davi
await T.p.evaluate(() => { S.users = null; render(); }); await T.p.waitForSelector('[data-act=acc-reset]'); await T.p.click('.row:has-text("@lia") [data-act=acc-reset]'); await T.p.waitForSelector('#rs-pw'); await T.p.fill('#rs-pw', 'nova123'); await T.p.click('[data-act=acc-reset2]'); await T.p.waitForTimeout(500);
await T.p.click('[data-act=mclose]');
const l2s = await L2.p.evaluate(async () => (await fetch('/api/me')).status); ok(l2s === 401, 'redefinir a senha encerra as sessões abertas da aluna');
// 8) aluno exclui a própria conta pelo perfil
await D.p.evaluate(() => go('me', { tab: 'conta' })); await D.p.click('[data-act=del-me]'); await D.p.fill('#del-in', 'EXCLUIR'); await D.p.fill('#del-pw', 'davisenha1'); await D.p.click('[data-act=del-me2]'); await D.p.waitForSelector('#lg-user'); console.log('   tela:', (await txt(D.p)).slice(0,160).replace(/\n/g,' | ')); ok(/excluída/.test(await txt(D.p)), 'aluno exclui a própria conta e volta ao login');
await login(D.p, 'davi', 'davisenha1'); await D.p.waitForTimeout(500); ok(/incorretos/.test(await txt(D.p)), 'conta excluída não entra mais');
// 9) logout
await login(L2.p, 'lia', 'nova123'); await L2.p.waitForSelector('#cp-new'); ok(true, 'após redefinição a aluna entra com a senha nova e deve trocá-la'); await L2.p.click('[data-act=logout]'); await L2.p.waitForSelector('#lg-user'); await L2.p.reload(); await L2.p.waitForSelector('#lg-user'); ok(true, 'sair encerra a sessão');
// 10) admin: exclusão de aluno via aba Estudantes (dados somem)
await A.p.evaluate(() => { S.users = null; ago('acc'); }); await A.p.waitForTimeout(800);
console.log(errs.join('\n') || 'sem erros no console'); ok(errs.length === 0, 'nenhum erro de JavaScript');
await b.close(); srv.close(); console.log(fails ? '\n' + fails + ' FALHA(S)' : '\nTODOS OS TESTES E2E PASSARAM'); process.exit(fails ? 1 : 0);
