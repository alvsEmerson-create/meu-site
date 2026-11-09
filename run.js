/* ===================== MOTOR DE QUESTÕES ===================== */
const QLBL={mc:'Múltipla escolha',tf:'Verdadeiro ou falso',short:'Resposta curta',essay:'Discursiva',match:'Associação',seq:'Sequência',err:'Encontre o erro',hot:'Imagem'};
function mkQ(q){const o=Object.assign({},q);
 if(q.type==='mc')o._ord=shuffle([...q.options.keys()]);
 if(q.type==='err')o._ord=shuffle([...q.items.keys()]);
 if(q.type==='match'){o._R=shuffle([...q.pairs.keys()])}
 if(q.type==='seq'){let s;let g=0;do{s=shuffle([...q.items.keys()])}while(g++<8&&s.every((v,i)=>v===i));o._ord=s}
 if(q.type==='hot'){o._items=shuffle(q.items||(q.scene&&q.scene.items)||[])}
 return o}
function grade(q,v){
 switch(q.type){
 case 'mc':case 'err':return{ok:v===q.answer,frac:v===q.answer?1:0};
 case 'tf':return{ok:v===q.answer,frac:v===q.answer?1:0};
 case 'hot':return{ok:v===q.answer,frac:v===q.answer?1:0};
 case 'short':{const n=norm(v);const ok=!!n&&(q.answers||[]).some(a=>{a=norm(a);return a&&(n===a||n.includes(a))});return{ok,frac:ok?1:0}}
 case 'match':{let c=0;q.pairs.forEach((p,i)=>{if(v&&v[i]===i)c++});return{ok:c===q.pairs.length,frac:c/q.pairs.length}}
 case 'seq':{let c=0;(v||[]).forEach((x,i)=>{if(x===i)c++});return{ok:c===q.items.length,frac:c/q.items.length}}
 case 'essay':return{ok:null,frac:0,pend:true}}
 return{ok:false,frac:0}}
function ansText(q,v){try{switch(q.type){
 case 'mc':return q.options[v];case 'err':return q.items[v];case 'tf':return v?'Verdadeiro':'Falso';case 'short':case 'essay':return v||'(em branco)';
 case 'match':return q.pairs.map((p,i)=>p[0]+' → '+(v&&q.pairs[v[i]]?q.pairs[v[i]][1]:'?')).join(' · ');
 case 'seq':return (v||[]).map(i=>q.items[i]).join(' → ');
 case 'hot':{const it=(q.items||[]).find(i=>i.id===v);return it?it.label:'—'}}}catch(e){}return '—'}
function corrText(q){switch(q.type){
 case 'mc':return q.options[q.answer];case 'err':return q.items[q.answer];case 'tf':return q.answer?'Verdadeiro':'Falso';case 'short':return (q.answers||[])[0]||'';
 case 'match':return q.pairs.map(p=>p[0]+' → '+p[1]).join(' · ');case 'seq':return q.items.join(' → ');case 'hot':{const it=q.items.find(i=>i.id===q.answer);return it?it.label:''}
 case 'essay':return 'Correção feita pelo professor'}return ''}
function startRun(c){clearInterval(S.runIv);S.run=Object.assign({i:0,ans:[],cur:{},done:false,t0:now()},c);S.run.qs=c.qs.map(mkQ);S.lock=true;
 if(c.timer){S.run.left=c.timer;S.runIv=setInterval(()=>{const r=S.run;if(!r||r.done){clearInterval(S.runIv);return}r.left--;const e=$('#tm');if(e)e.textContent=r.left+'s';if(r.left<=0){clearInterval(S.runIv);finishRun()}},1000)}
 render();window.scrollTo(0,0)}
function curQ(){return S.run.qs[S.run.i]}
function commit(v){const r=S.run,q=curQ(),res=grade(q,v);r.ans[r.i]={val:v,res};if(r.onAns)r.onAns(q,res);
 if(r.imm){r.cur.res=res;r.cur.val=v;render();if(r.auto){const idx=r.i;setTimeout(()=>{if(S.run===r&&r.i===idx&&!r.done)nextQ()},1100)}}else nextQ()}
function nextQ(){const r=S.run;r.i++;r.cur={};if(r.i>=r.qs.length)finishRun();else{render();window.scrollTo(0,0)}}
function finishRun(){const r=S.run;if(r.done)return;clearInterval(S.runIv);r.done=true;
 const gr=r.ans.filter(a=>a&&!a.res.pend);r.right=gr.filter(a=>a.res.ok).length;r.total=gr.length;{const W=(i)=>(r.qs[i]&&r.qs[i].w)||1;let sw=0,sf=0;r.ans.forEach((a,i)=>{if(a&&!a.res.pend){sw+=W(i);sf+=W(i)*a.res.frac}});r.pct=sw?Math.round(100*sf/sw):0}
 r.pend=r.ans.filter(a=>a&&a.res.pend).length;r.pts=0;try{if(r.onFinish)r.onFinish(r)}catch(e){console.error(e)}render();window.scrollTo(0,0)}
function qHead(q,i,n){return '<div class="row sb"><span class="chip t">'+QLBL[q.type]+'</span><span class="xs mut">Pergunta '+(i+1)+(n?' de '+n:'')+'</span></div>'}
function qView(){const r=S.run;
 if(r.done)return runResult();
 const q=curQ(),c=r.cur,res=c.res,n=r.qs.length;let b='';
 const done=!!res;
 const lt='ABCD';
 if(q.type==='mc'||q.type==='err'){const L=q.type==='mc'?q.options:q.items;
  b=q._ord.map((oi,k)=>{let cl='opt';if(done){if(oi===q.answer)cl+=' ok';else if(oi===c.val)cl+=' no'}else if(c.sel===oi)cl+=' sel';
   return '<button class="'+cl+'" data-act="rq-pick" data-v="'+oi+'" '+(done?'disabled':'')+'><span class="k">'+lt[k]+'</span><span>'+esc(L[oi])+'</span></button>'}).join('')}
 else if(q.type==='tf'){b='<div class="grid g2">'+[true,false].map(v=>{let cl='opt';if(done){if(v===q.answer)cl+=' ok';else if(v===c.val)cl+=' no'}else if(c.sel===v)cl+=' sel';return '<button class="'+cl+'" data-act="rq-pick" data-v="'+v+'" '+(done?'disabled':'')+'>'+(v?ic('check')+' Verdadeiro':ic('x')+' Falso')+'</button>'}).join('')+'</div>'}
 else if(q.type==='short')b='<input type="text" id="rq-in" placeholder="Digite sua resposta" autocomplete="off" '+(done?'disabled value="'+esc(c.val)+'"':'data-autofocus')+'>';
 else if(q.type==='essay')b='<textarea id="rq-in" placeholder="Escreva sua resposta com suas palavras…" '+(done?'disabled':'data-autofocus')+'>'+esc(c.val||'')+'</textarea><p class="xs mut">Esta resposta será corrigida por um professor.</p>';
 else if(q.type==='match'){b='<div class="col">'+q.pairs.map((p,i)=>'<div class="card flat"><div class="b" style="margin-bottom:6px">'+esc(p[0])+'</div><select data-mi="'+i+'" '+(done?'disabled':'')+'><option value="">Escolha a correspondência…</option>'+q._R.map(j=>'<option value="'+j+'" '+((done?c.val[i]:(c.sel&&c.sel[i]))===j?'selected':'')+'>'+esc(q.pairs[j][1])+'</option>').join('')+'</select>'+(done?'<div class="xs '+(c.val[i]===i?'':'mut')+'" style="margin-top:4px">'+(c.val[i]===i?'✔ Correto':'Correto: '+esc(p[1]))+'</div>':'')+'</div>').join('')+'</div>'}
 else if(q.type==='seq'){const ord=c.order||(c.order=q._ord.slice());b='<div class="col">'+ord.map((ix,k)=>'<div class="seqi"><span class="chip">'+(k+1)+'</span><span class="t">'+esc(q.items[ix])+'</span>'+(done?'':'<button class="btn sec sm" data-act="rq-mv" data-k="'+k+'" data-d="-1" aria-label="Subir" '+(k===0?'disabled':'')+'>'+ic('up')+'</button><button class="btn sec sm" data-act="rq-mv" data-k="'+k+'" data-d="1" aria-label="Descer" '+(k===ord.length-1?'disabled':'')+'>'+ic('down')+'</button>')+'</div>').join('')+'</div>'}
 else if(q.type==='hot'){const rs={};if(done){rs[q.answer]='ok';if(c.val!==q.answer)rs[c.val]='no'}b=sceneSvg(q.env||'park',q._items,{hot:true,act:'rq-hot',res:rs,reveal:done})+'<p class="xs mut tc" style="margin-top:6px">Toque no elemento da cena.</p>'}
 const need=!r.imm||['short','essay','match','seq'].includes(q.type);
 let fbk='';
 if(done){const ok=res.ok,pend=res.pend;fbk='<div class="fb fbm '+(pend?'nt':ok?'ok':'no')+'"><span class="fbav">'+mascotSvg(pend?'focus':ok?'happy':'wow','mascot')+'</span><div><b>'+(pend?'Resposta enviada para o professor.':ok?'Isso aí!':(res.frac>0?'Quase! Acertou '+Math.round(res.frac*100)+'%.':'Não foi dessa vez.'))+'</b><div style="margin-top:4px">'+(ok||pend?'':'<b>Resposta correta:</b> '+esc(corrText(q))+'<br>')+esc(q.exp||'')+'</div></div></div>'}
 let btn='';
 if(done)btn='<button class="btn" data-act="rq-next">'+(r.i+1>=n?'Ver resultado':'Próxima')+' '+ic('right')+'</button>';
 else if(need){const ok=q.type==='mc'||q.type==='err'||q.type==='tf'?c.sel!==undefined:true;btn='<button class="btn" data-act="rq-ok" '+(ok?'':'disabled')+'>'+(r.imm?'Responder':(r.i+1>=n?'Confirmar e finalizar':'Confirmar e avançar'))+'</button>'}
 const timer=r.timer?'<span class="timer" id="tm">'+r.left+'s</span>':'';
 return '<div class="wrap" style="max-width:720px"><div class="row sb"><button class="btn ghost" data-act="rq-exit">'+ic('left')+' Sair</button><div class="b grow tc">'+esc(r.title)+'</div>'+timer+(r.score!=null?'<span class="chip g">'+r.right+' ✔</span>':'')+'</div>'+
 '<div class="bar"><i style="width:'+Math.round(100*(r.i+(done?1:0))/n)+'%"></i></div>'+
 '<div class="card col">'+qHead(q,r.i,r.timer?0:n)+(q.img?'<img src="'+q.img+'" alt="Imagem da questão" style="border-radius:12px;max-height:240px;object-fit:contain">':'')+'<h3>'+esc(q.q)+'</h3>'+b+fbk+'<div class="row" style="justify-content:flex-end">'+btn+'</div></div></div>'}
function runResult(){const r=S.run;const good=r.pct>=70;
 const rows=r.qs.map((q,i)=>{const a=r.ans[i];if(!a)return '';const ok=a.res.ok;return '<details class="card flat"><summary class="row" style="gap:8px">'+(a.res.pend?'<span class="chip y">Aguardando</span>':ok?'<span class="chip g">Certa</span>':a.res.frac>0?'<span class="chip y">Parcial</span>':'<span class="chip r">Errada</span>')+'<span class="grow">'+esc(q.q)+'</span></summary><div class="col" style="margin-top:8px"><div><b>Sua resposta:</b> '+esc(ansText(q,a.val))+'</div>'+(ok?'':'<div><b>Resposta correta:</b> '+esc(corrText(q))+'</div>')+'<div class="mut">'+esc(q.exp||'')+'</div></div></details>'}).join('');
 return '<div class="wrap" style="max-width:720px"><div class="card tc col" style="align-items:center">'+mascotSvg(good?'happy':'focus','mascot big')+'<div style="width:110px;height:110px;border-radius:50%;display:grid;place-items:center;background:conic-gradient('+(good?'var(--green)':'var(--orange)')+' '+r.pct*3.6+'deg,var(--bg2) 0)"><div style="width:84px;height:84px;border-radius:50%;background:var(--card);display:grid;place-items:center;font-family:var(--f-d);font-weight:800;font-size:1.6rem">'+r.pct+'%</div></div>'+
 '<h2>'+esc(r.title)+'</h2><p class="mut">Você acertou '+r.right+' de '+r.total+(r.pend?' questões automáticas. '+r.pend+' discursiva(s) aguardam a correção do professor.':' questões.')+'</p>'+
 (r.pts?'<span class="chip p">'+ic('star')+' +'+r.pts+' pontos</span>':'')+(r.note?'<p class="sm">'+r.note+'</p>':'')+
 '<div class="row" style="justify-content:center"><button class="btn" data-act="rq-done">Concluir</button>'+(r.retry?'<button class="btn sec" data-act="rq-retry">Tentar de novo</button>':'')+'</div></div>'+
 '<h3>Revisão das respostas</h3><div class="col">'+rows+'</div></div>'}
ACT['rq-pick']=t=>{const r=S.run,v=t.dataset.v,q=curQ();const val=q.type==='tf'?v==='true':+v;if(r.imm&&!r.cur.res){commit(val)}else if(!r.cur.res){r.cur.sel=val;render()}};
ACT['rq-hot']=t=>{const r=S.run;if(r.cur.res)return;commit(t.dataset.id)};
ACT['rq-ok']=()=>{const r=S.run,q=curQ();if(r.cur.res)return;let v;
 if(q.type==='short'||q.type==='essay'){v=($('#rq-in').value||'').trim();if(!v){toast('Escreva uma resposta antes de confirmar.','err');return}}
 else if(q.type==='match'){v=[...document.querySelectorAll('select[data-mi]')].map(s=>s.value===''?-1:+s.value);if(v.some(x=>x<0)){toast('Associe todos os itens.','err');return}}
 else if(q.type==='seq')v=r.cur.order.slice();
 else v=r.cur.sel;commit(v)};
ACT['rq-mv']=t=>{const o=S.run.cur.order,k=+t.dataset.k,d=+t.dataset.d;[o[k],o[k+d]]=[o[k+d],o[k]];render()};
ACT['rq-next']=()=>nextQ();
ACT['rq-exit']=()=>confirmBox('Sair desta atividade?','O progresso desta tentativa não será salvo.','rq-exit2',{},'Sair');
ACT['rq-exit2']=()=>{closeModal();const b=S.run&&S.run.back;clearInterval(S.runIv);S.run=null;S.lock=false;b?b():go('home')};
ACT['rq-done']=()=>{const b=S.run.back;clearInterval(S.runIv);S.run=null;S.lock=false;b?b():go('home')};
ACT['rq-retry']=()=>{const r=S.run;if(r.retry){clearInterval(S.runIv);S.run=null;r.retry()}};
document.addEventListener('change',e=>{const s=e.target.closest('select[data-mi]');if(s&&S.run&&!S.run.done){const c=S.run.cur;c.sel=c.sel||[];c.sel[+s.dataset.mi]=s.value===''?undefined:+s.value}});

/* ===== registro de desempenho por pergunta ===== */
function recQ(q,res){const p=S.priv;if(!p||res.pend)return;const v=p.qs[q.id]=p.qs[q.id]||[0,0];if(res.ok)v[0]++;else v[1]++}

/* ===== atividades e avaliações ===== */
function modAccess(m){if(!m||m.st==='draft')return 'hidden';if(m.st==='locked')return 'locked';
 if(S.cfg.sequential){const pub=S.mods.filter(x=>x.st!=='draft');const i=pub.findIndex(x=>x.id===m.id);for(let k=0;k<i;k++){const pm=pub[k];if(pm.st==='published'&&!(S.priv&&S.priv.mods[pm.id]&&S.priv.mods[pm.id].done))return 'locked'}}return 'open'}
function startAct(id){const a=S.acts.find(x=>x.id===id);if(!a)return;const exam=a.kind==='assessment';
 const qs=(a.questions||[]).map(q=>Object.assign({},q,{id:q.id||('q'+uid8())}));
 startRun({title:a.title,qs,imm:!exam,back:()=>{if(S.view==='mods'&&S.p&&S.p.id)go('mods',S.p);else go('acts')},retry:()=>startAct(id),
  onAns:(q,res)=>{if(res.pend)return},onFinish:r=>finishAct(a,r)})}
function finishAct(a,r){const p=S.priv;if(!p)return;touchDay();const rec=p.acts[a.id]=p.acts[a.id]||{n:0,best:0};rec.n++;
 const ans={},rr={};r.qs.forEach((q,i)=>{const x=r.ans[i];if(!x)return;ans[q.id]=x.val;rr[q.id]=x.res.pend?-1:Math.round(x.res.frac*100)/100;recQ(q,x.res)});
 rec.last={at:now(),pct:r.pct,ans,r:rr};rec.best=Math.max(rec.best,r.pct);rec.at=now();
 const g=award('activity','act:'+a.id,(a.kind==='assessment'?'Avaliação: ':'Atividade: ')+a.title);r.pts+=g;
 const m=S.mods.find(x=>x.id===a.mod);if(m){const was=p.mods[m.id]&&p.mods[m.id].done;r.pts+=checkModDone(m);if(!was&&p.mods[m.id]&&p.mods[m.id].done)r.note='Módulo concluído! '+ic('check')}
 if(g)gain(g,'atividade');checkAch();persist()}
function checkModDone(m){const p=S.priv;const mp=p.mods[m.id]=p.mods[m.id]||{r:{}};if(mp.done)return 0;
 const secs=(m.sections||[]).every(s=>mp.r&&mp.r[s.id]);const act=S.acts.find(a=>a.mod===m.id&&a.kind==='activity'&&a.st==='published');const ass=S.acts.find(a=>a.mod===m.id&&a.kind==='assessment'&&a.st==='published');
 const okA=!act||(p.acts[act.id]&&p.acts[act.id].n>0);const okS=!ass||(p.acts[ass.id]&&p.acts[ass.id].best>=S.cfg.modPass);
 if(secs&&okA&&okS){mp.done=now();const g=award('module','mod:'+m.id,'Módulo concluído: '+m.title);gain(g,'módulo concluído');return g}return 0}

/* ===== MINIGAMES ===== */
function availMods(){const open=S.mods.filter(m=>m.st==='published'&&modAccess(m)==='open');const p=S.priv;
 const st=open.filter(m=>{const mp=p.mods[m.id];return (mp&&(mp.done||Object.keys(mp.r||{}).length))||S.acts.some(a=>a.mod===m.id&&p.acts[a.id])});return st.length?st:open.slice(0,1)}
function poolQs(types){const am=availMods().map(m=>m.id);let out=[];
 S.acts.filter(a=>a.st==='published'&&am.includes(a.mod)).forEach(a=>(a.questions||[]).forEach(q=>{if(types.includes(q.type)&&q.id)out.push(Object.assign({},q,{_mod:a.mod}))}));
 if(types.includes('hot')){HOT.filter(h=>am.includes(h.mod)).forEach(h=>out.push({id:h.id,type:'hot',q:h.q,env:h.env,items:h.items,answer:h.answer,exp:h.exp,_mod:h.mod}))}
 S.bank.filter(b=>am.includes(b.mod)&&types.includes(b.type)).forEach(b=>out.push(Object.assign({},b,{_mod:b.mod})));return out}
function cardsOf(){const am=availMods();const out=[];am.forEach(m=>(m.cards||[]).forEach((c,i)=>out.push({id:'c:'+m.id+':'+i,mod:m.id,q:c.q,a:c.a})));return out}
function tfFromCards(n){const cs=cardsOf();if(cs.length<4)return[];return shuffle(cs).slice(0,n).map((c,k)=>{const truth=k%2===0;const other=shuffle(cs.filter(x=>x.id!==c.id))[0];return{id:(truth?'ctf:':'cff:')+c.id+(truth?'':'~'+other.id),type:'tf',q:c.q+': '+(truth?c.a:other.a),answer:truth,exp:'Correto: '+c.q+' — '+c.a,_mod:c.mod}})}
function startGame(g){const p=S.priv;if(!S.cfg.games[g]){toast('Este minigame está desativado pelo professor.','err');return}
 const info=GAMES.find(x=>x.id===g);
 const back=()=>go('games');
 const mk=(qs,extra)=>{if(qs.length<(extra&&extra.min||3)){toast('Estude mais um módulo para liberar mais perguntas deste jogo.','err',3800);return}
  startRun(Object.assign({title:info.n,qs,imm:true,back,retry:()=>startGame(g),game:g,score:0,onAns:(q,res)=>gameAns(q,res),onFinish:r=>finishGame(g,r)},extra||{}))};
 if(g==='quiz')return mk(shuffle(poolQs(['mc'])).slice(0,10));
 if(g==='tf'){const pq=shuffle(poolQs(['tf']));const qs=shuffle(pq.slice(0,6).concat(tfFromCards(10-Math.min(6,pq.length))));return mk(qs.slice(0,10))}
 if(g==='seq')return mk(shuffle(poolQs(['seq'])).slice(0,4),{min:1});
 if(g==='err')return mk(shuffle(poolQs(['err'])).slice(0,5),{min:1});
 if(g==='illus')return mk(shuffle(poolQs(['hot'])).slice(0,6),{min:1});
 if(g==='rapid'){const qs=shuffle(poolQs(['mc','tf','err']).concat(tfFromCards(12)));return mk(qs.slice(0,40),{timer:60,auto:true,min:5})}
 if(g==='memo'){const cs=shuffle(cardsOf()).slice(0,10);if(cs.length<3){toast('Abra um módulo para liberar cartões.','err');return}S.game={t:'memo',cards:cs,i:0,fl:false,know:0,again:0,done:false};S.lock=true;render();return}
 if(g==='match'){const cs=cardsOf();if(cs.length<4){toast('Abra um módulo para liberar este jogo.','err');return}newMatch();return}}
function gameAns(q,res){const p=S.priv;recQ(q,res);touchDay();const r=S.run;if(res.ok){r.score=(r.score||0)+1;const g=award('challenge','q:'+q.id,'Desafio',null);if(g){r.pts=(r.pts||0)+g;gain(g)}else if(S.capHit){S.capHit=false;toast('Limite diário de pontos de desafio atingido. Continue treinando sem pressa!','',2600)}}}
function finishGame(g,r){const p=S.priv;const rec=p.games[g]=p.games[g]||{n:0,right:0,total:0,best:0};rec.n++;rec.right+=r.right;rec.total+=r.total;rec.best=Math.max(rec.best,r.right);rec.last=now();touchDay();r.note=r.pts?'':'Perguntas já pontuadas antes não rendem pontos de novo. Use para revisar!';checkAch();persist()}
function newMatch(){const cs=shuffle(cardsOf()).slice(0,4);S.game={t:'match',pairs:cs,R:shuffle([0,1,2,3]),sel:null,done:{},wrong:0,right:0,fin:false};S.lock=true;render()}
ACT['gm-l']=t=>{S.game.sel=+t.dataset.i;render()};
ACT['gm-r']=t=>{const G=S.game;if(G.sel==null)return;const j=+t.dataset.i;if(G.sel===j){G.done[j]=1;G.right++;const g=award('challenge','mg:'+G.pairs[j].id,'Associação');if(g)gain(g);if(Object.keys(G.done).length===G.pairs.length){G.fin=true;const rec=S.priv.games.match=S.priv.games.match||{n:0,right:0,total:0,best:0};rec.n++;rec.right+=G.right;rec.total+=G.right+G.wrong;rec.best=Math.max(rec.best,G.right);touchDay();checkAch();persist()}}else{G.wrong++;toast('Essa não combina. Tente outra!','err',1400)}G.sel=null;render()};
ACT['mm-flip']=()=>{S.game.fl=!S.game.fl;render()};
ACT['mm-rate']=t=>{const G=S.game;if(t.dataset.k==='k')G.know++;else G.again++;G.i++;G.fl=false;if(G.i>=G.cards.length){G.done=true;S.priv.cards=(S.priv.cards||0)+G.cards.length;const rec=S.priv.games.memo=S.priv.games.memo||{n:0,right:0,total:0,best:0};rec.n++;rec.right+=G.know;rec.total+=G.cards.length;rec.best=Math.max(rec.best,G.know);touchDay();checkAch();persist()}render()};
function gameView(){const G=S.game;
 if(G.t==='memo'){if(G.done)return '<div class="wrap" style="max-width:560px"><div class="card tc col" style="align-items:center"><h2>Revisão concluída!</h2><p class="mut">Você marcou '+G.know+' cartões como "sei" e '+G.again+' para rever.</p><p class="sm">Cartões de memorização não valem pontos (a autoavaliação não é verificável), mas contam para conquistas.</p><div class="row"><button class="btn" data-act="go" data-v="games">Concluir</button><button class="btn sec" data-act="gstart" data-g="memo">Nova rodada</button></div></div></div>';
  const c=G.cards[G.i];return '<div class="wrap" style="max-width:560px"><div class="row sb"><button class="btn ghost" data-act="go" data-v="games">'+ic('left')+' Sair</button><span class="b">Cartões</span><span class="xs mut">'+(G.i+1)+'/'+G.cards.length+'</span></div><div class="bar"><i style="width:'+Math.round(100*G.i/G.cards.length)+'%"></i></div>'+
  '<div class="fc '+(G.fl?'fl':'')+'" data-act="mm-flip" role="button" tabindex="0" aria-label="Virar cartão"><div><div class="f f1"><span>'+esc(c.q)+'<br><small style="opacity:.7;font-weight:500">toque para virar</small></span></div><div class="f f2"><span>'+esc(c.a)+'</span></div></div></div>'+
  (G.fl?'<div class="grid g2"><button class="btn org" data-act="mm-rate" data-k="a">Preciso rever</button><button class="btn" data-act="mm-rate" data-k="k">Eu sabia!</button></div>':'<p class="tc mut sm">Tente lembrar a resposta antes de virar.</p>')+'</div>'}
 if(G.t==='match'){const P=G.pairs;
  const L=P.map((c,i)=>'<button class="opt '+(G.done[i]?'done':'')+' '+(G.sel===i?'sel':'')+'" data-act="gm-l" data-i="'+i+'">'+esc(c.q)+'</button>').join('');
  const R=G.R.map(j=>'<button class="opt '+(G.done[j]?'done':'')+'" data-act="gm-r" data-i="'+j+'">'+esc(P[j].a)+'</button>').join('');
  return '<div class="wrap" style="max-width:720px"><div class="row sb"><button class="btn ghost" data-act="go" data-v="games">'+ic('left')+' Sair</button><span class="b">Associação</span><span class="chip g">'+G.right+' ✔ · '+G.wrong+' ✘</span></div>'+
  (G.fin?'<div class="card tc col" style="align-items:center"><h2>Rodada completa!</h2><p class="mut">'+G.right+' acertos e '+G.wrong+' tentativas erradas.</p><div class="row"><button class="btn" data-act="gstart" data-g="match">Nova rodada</button><button class="btn sec" data-act="go" data-v="games">Concluir</button></div></div>':'<p class="mut sm">Toque em um termo à esquerda e depois na definição que combina.</p>')+
  '<div class="mt"><div class="col">'+L+'</div><div class="col">'+R+'</div></div></div>'}
 return ''}
ACT.gstart=t=>startGame(t.dataset.g);
