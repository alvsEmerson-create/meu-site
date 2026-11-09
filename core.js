/* ===================== UTILITÁRIOS ===================== */
const $=(s,r)=>(r||document).querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const pad=n=>String(n).padStart(2,'0');
const dk=(t)=>{const d=t?new Date(t):new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const now=()=>Date.now();
const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
const uid8=()=>Math.random().toString(36).slice(2,9);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sum=o=>Object.values(o||{}).reduce((a,b)=>a+(+b||0),0);
const fdate=t=>t?new Date(t).toLocaleDateString('pt-BR'):'—';
const fdt=t=>t?new Date(t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'—';
const pct=(a,b)=>b?Math.round(100*a/b):0;
function dmerge(t,s){for(const k in s){const v=s[k];if(v&&typeof v==='object'&&!Array.isArray(v)){t[k]=dmerge(t[k]&&typeof t[k]==='object'&&!Array.isArray(t[k])?t[k]:{},v)}else t[k]=v}return t}
const tryLS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const ACT={};

/* ===================== BANCO DE DADOS (API própria + D1) ===================== */
const DB={cache:{},ls:{},qs:{},seq:0,timer:null,firstDone:false,busy:false,
 async api(method,path,body){let r;try{r=await fetch('/api'+path,{method,headers:{'content-type':'application/json','x-ss':'1'},credentials:'same-origin',cache:'no-store',body:body!=null?JSON.stringify(body):undefined})}catch(e){const er=new Error('Sem conexão com o servidor.');er.code='network';throw er}
  let j={};try{j=await r.json()}catch(e){}
  if(!r.ok){const e=new Error(j.error||('Erro '+r.status));e.code=j.code||('http_'+r.status);e.status=r.status;if(r.status===401&&j.code==='auth'&&S.auth==='ok'&&!S.leaving)sessionLost();if(j.code==='must_change'&&S.auth==='ok'){S.auth='change';DB.stop();render()}throw e}
  return j},
 split(p){const i=p.indexOf('/');return [p.slice(0,i),p.slice(i+1)]},
 note(c){(this.ls[c]||[]).forEach(f=>f())},
 apply(c,i,doc){const m=this.cache[c]=this.cache[c]||{};if(doc)m[i]=doc;else delete m[i];this.note(c)},
 async get(p){const[c,i]=this.split(p);return (await this.api('GET','/doc/'+c+'/'+encodeURIComponent(i))).doc},
 async set(p,d){const[c,i]=this.split(p);const j=await this.api('PUT','/doc/'+c+'/'+encodeURIComponent(i),d);this.apply(c,i,j.doc)},
 async upd(p,d){const[c,i]=this.split(p);const j=await this.api('PATCH','/doc/'+c+'/'+encodeURIComponent(i),d);this.apply(c,i,j.doc)},
 async del(p){const[c,i]=this.split(p);await this.api('DELETE','/doc/'+c+'/'+encodeURIComponent(i));this.apply(c,i,null)},
 w(p,fn){const prev=this.qs[p]||Promise.resolve();const n=prev.catch(()=>{}).then(fn);this.qs[p]=n;return n},
 listen(c,cb){const f=()=>cb(clone(this.cache[c]||{}));(this.ls[c]=this.ls[c]||[]).push(f);if(this.firstDone)setTimeout(f,0);return()=>{this.ls[c]=(this.ls[c]||[]).filter(x=>x!==f)}},
 async sync(){if(this.busy)return;this.busy=true;try{const j=await this.api('GET','/sync?since='+this.seq);const first=this.seq===0&&!this.firstDone;const ch=new Set();
   Object.entries(j.docs||{}).forEach(([c,m])=>{const t=this.cache[c]=this.cache[c]||{};Object.entries(m).forEach(([i,d])=>{t[i]=d});ch.add(c)});
   Object.entries(j.del||{}).forEach(([c,ids])=>{const t=this.cache[c]=this.cache[c]||{};ids.forEach(i=>delete t[i]);ch.add(c)});
   this.seq=j.seq;S.offline=false;
   if(first){this.firstDone=true;Object.keys(this.ls).forEach(c=>this.note(c))}else ch.forEach(c=>this.note(c))}
  catch(e){if(e.code==='network'){S.offline=true}}finally{this.busy=false}},
 start(){this.stop();this.cache={};this.seq=0;this.firstDone=false;const tick=async()=>{await this.sync();this.timer=setTimeout(tick,document.hidden?30000:10000)};tick()},
 stop(){clearTimeout(this.timer);this.timer=null}};
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&DB.timer)DB.sync()});
function sessionLost(){DB.stop();S.auth='login';S.authMsg='Sua sessão expirou. Entre novamente.';S.priv=null;render()}

/* ===================== ESTADO ===================== */
const S={auth:'loading',user:null,ready:false,uid:null,canEdit:false,isOwner:false,canWrite:true,local:true,localWhy:'',mode:'student',view:'home',p:{},aview:'ov',ap:{},
 raw:{cfg:{},cmods:{},cacts:{},csims:{},cach:{},cbank:{},public:{},priv:{},grades:{},teachers:{}},
 cfg:clone(DEF_CFG),state:{},mods:[],acts:[],sims:[],ach:[],bank:[],priv:null,privLoaded:false,flushed:0,run:null,sim:null,game:null,lock:false,more:false,slow:false,subs:[],top3:false};
const COLLS_ALL=['cfg','cmods','cacts','csims','cach','cbank','public','priv','grades'];

function effList(defs,ov,key,defSt){const map=new Map();defs.forEach((d,i)=>map.set(d.id,Object.assign({},d,{_def:1,ord:d.n!=null?d.n:i+1})));
 Object.entries(ov||{}).forEach(([id,o])=>{if(!o||o.deleted){map.delete(id);return}const b=map.get(id)||{};map.set(id,Object.assign({},b,o,{id,_ov:1,ord:b.ord!=null?b.ord:(o.ord!=null?o.ord:999)}))});
 const st=S.state[key]||{};
 return [...map.values()].map(x=>{const s=st[x.id]||{};return Object.assign({},x,{st:s.st||x.st||defSt,ord:s.ord!=null?s.ord:(x.ord!=null?x.ord:999)})}).sort((a,b)=>a.ord-b.ord)}
const DEFMODS=(window.__MODS||[]).slice().sort((a,b)=>a.n-b.n);
const DEFACTS=[];DEFMODS.forEach(m=>{DEFACTS.push({id:m.id+'-act',mod:m.id,kind:'activity',title:'Fixação — '+m.title,questions:m.activity,counts:false,n:m.n*2-1});DEFACTS.push({id:m.id+'-ass',mod:m.id,kind:'assessment',title:'Avaliação — '+m.title,questions:m.assessment,counts:true,n:m.n*2})});
const DEFSIMS=(window.__SIMS||[]).map((s,i)=>Object.assign({},s,{n:i+1}));
function rebuild(){const R=S.raw;S.cfg=dmerge(clone(DEF_CFG),clone(R.cfg.main||{}));S.state=R.cfg.state||{};
 S.mods=effList(DEFMODS,R.cmods,'mods','published');S.acts=effList(DEFACTS,R.cacts,'acts','published');S.sims=effList(DEFSIMS,R.csims,'sims','published');S.ach=effList(ACH0,R.cach,'ach','on');
 S.bank=Object.entries(R.cbank||{}).filter(([k,v])=>v&&!v.deleted).map(([k,v])=>Object.assign({id:k},v));
 S.acts.forEach(a=>{a.questions=(a.questions||[]);a.questions.forEach(q=>{q._act=a.id;q._mod=a.mod})});
 if(S.privLoaded&&S.uid){const mine=R.priv[S.uid];if(!mine&&S.priv&&S.priv.created&&S.flushed&&now()-S.flushed>3500&&!S.dirty){S.priv=null;S.removedNote=true}}
 else if(!S.privLoaded&&S.loadedSet&&S.loadedSet.priv){S.privLoaded=true;const mine=R.priv[S.uid];S.priv=mine?normPriv(clone(mine)):null}}
function normPriv(p){p.mods=p.mods||{};p.acts=p.acts||{};p.earned=p.earned||{};p.ach=p.ach||{};p.sims=p.sims||{};p.games=p.games||{};p.qs=p.qs||{};p.hist=p.hist||[];p.days=p.days||{};p.pts=p.pts||{};p.dayCh=p.dayCh||{};p.cards=p.cards||0;p.av=p.av||clone(AVDEF);return p}
function newPriv(nick,full,av){return normPriv({v:1,nick,full,av,created:now()})}

/* ===================== INICIALIZAÇÃO ===================== */
function setMascot(){try{document.documentElement.style.setProperty('--mascot',mascotUri('happy'))}catch(e){}}
async function boot(){S.leaving=0;setMascot();S.ready=false;S.loadedSet={};S.privLoaded=false;S.subs.forEach(f=>{try{f()}catch(e){}});S.subs=[];S.priv=null;DB.stop();render();
 let me=null;
 try{me=(await DB.api('GET','/me')).user}catch(e){if(e.status&&e.status!==401){S.auth='error';S.authMsg=e.message;render();return}if(e.code==='network'){S.auth='error';S.authMsg=e.message;render();return}}
 if(!me){try{S.needsSetup=(await DB.api('GET','/status')).needsSetup}catch(e){}S.auth=S.needsSetup?'setup':(S.auth==='register'?'register':'login');S.user=null;render();return}
 S.user=me;if(me.mustChange){S.auth='change';render();return}
 S.auth='ok';S.uid=me.id;S.canEdit=me.role!=='student';S.isOwner=me.role==='admin';S.canWrite=true;
 S.mode=S.canEdit&&tryLS.get('ss_mode')!=='student'?'admin':'student';
 const need=COLLS_ALL.concat(S.canEdit?['teachers']:[]);let t=setTimeout(()=>{if(!S.ready){S.ready=true;S.slow=true;render()}},12000);
 need.forEach(c=>{S.subs.push(DB.listen(c,(m)=>{
  if(c==='cfg'){S.raw.cfg=m}else S.raw[c]=m;S.loadedSet[c]=true;rebuild();if(!S.ready&&COLLS_ALL.every(k=>S.loadedSet[k])){S.ready=true;clearTimeout(t);S.slow=false;initView();render()}else if(S.ready)softRender()}))});
 DB.start()}
function initView(){S.view='home';S.aview='ov'}

/* ===================== GRAVAÇÃO ===================== */
let saveT=null;
function persist(){S.dirty=true;clearTimeout(saveT);saveT=setTimeout(flush,400)}
function lvlOf(t){const b=S.cfg.levelBase||100;const L=Math.max(1,Math.floor((1+Math.sqrt(1+8*t/b))/2));const cur=b*L*(L-1)/2,nxt=b*L*(L+1)/2;return{L,cur,nxt,pr:Math.min(1,(t-cur)/(nxt-cur)),name:LEVELS[Math.min(L-1,LEVELS.length-1)]}}
function totalOf(u){const p=S.raw.public[u];return sum(p&&p.pts)+sum(p&&p.adj)}
function myTotal(){return sum(S.priv&&S.priv.pts)+sum(S.raw.public[S.uid]&&S.raw.public[S.uid].adj)}
function pubPatch(p){const t=myTotal();return{nick:p.nick,av:p.av,lvl:lvlOf(t).L,ach:Object.keys(p.ach).length,mods:Object.values(p.mods).filter(m=>m.done).length,acts:Object.values(p.acts).filter(a=>a.n>0).length,sims:Object.values(p.sims).filter(s=>s.n>0).length,upd:now(),since:p.created,pts:p.pts}}
async function flush(){const p=S.priv,u=S.uid;if(!p||!u)return;if(!S.canWrite){return}S.dirty=false;const pp=pubPatch(p);
 try{await DB.w('priv/'+u,()=>DB.set('priv/'+u,p));await DB.w('public/'+u,()=>DB.upd('public/'+u,pp));S.flushed=now();S.saveErr=null}catch(e){S.saveErr=e;toast('Não consegui salvar seu progresso ('+(e.code||e.message)+'). Verifique sua permissão de acesso.','err',6000)}}

/* ===================== PONTOS, CONQUISTAS ===================== */
function touchDay(){const p=S.priv;if(!p)return;p.days[dk()]=1;const ks=Object.keys(p.days).sort();while(ks.length>120)delete p.days[ks.shift()]}
function award(kind,key,label,pts){const p=S.priv;if(!p||p.earned[key])return 0;let n=pts!=null?pts:(S.cfg.pts[kind]||0);const d=dk();
 if(kind==='challenge'){const used=p.dayCh[d]||0;n=Math.min(n,Math.max(0,(S.cfg.dailyCap||0)-used));if(n<=0){S.capHit=true;return 0}p.dayCh[d]=used+n}
 p.earned[key]=now();p.pts[d]=(p.pts[d]||0)+n;p.hist.unshift({t:now(),k:kind,x:label,p:n});if(p.hist.length>120)p.hist.length=120;persist();return n}
function streakOf(p){let n=0;const d=new Date();if(!p.days[dk(d)])d.setDate(d.getDate()-1);while(p.days[dk(d)]){n++;d.setDate(d.getDate()-1)}return n}
function statsOf(p){const T=myTotal();const pm=S.mods.filter(m=>m.st==='published');const A=Object.entries(p.acts);
 return{mods:Object.values(p.mods).filter(m=>m.done).length,acts:A.filter(([i,a])=>a.n>0).length,perfect:A.filter(([i,a])=>(S.acts.find(x=>x.id===i)||{}).kind==='assessment'&&a.best>=100).length,
 sims:Object.values(p.sims).filter(s=>s.n>0).length,great:Object.values(p.sims).filter(s=>s.best>=90).length,obs:Object.values(p.sims).filter(s=>s.obs>=1).length,
 correct:Object.values(p.qs).filter(v=>v[0]>0).length,streak:streakOf(p),level:lvlOf(T).L,points:T,plays:Object.values(p.games).reduce((a,g)=>a+(g.n||0),0),variety:Object.values(p.games).filter(g=>g.n>0).length,cards:p.cards||0,
 avatar:p.avSaved?1:0,top3:isTop3()?1:0,all:pm.length&&pm.every(m=>p.mods[m.id]&&p.mods[m.id].done)?1:0,profile:1}}
function critMet(a,st){if(a.type==='mod')return !!(S.priv.mods[a.ref]&&S.priv.mods[a.ref].done);return (st[a.type]||0)>=(+a.value||1)}
function rewardsOf(p){const r={};S.ach.forEach(a=>{if(a.reward&&p.ach[a.id])r[a.reward]=a.id});return r}
function checkAch(){const p=S.priv;if(!p)return;let again=true,g=0;while(again&&g++<6){again=false;const st=statsOf(p);S.ach.filter(a=>a.st!=='off'&&!p.ach[a.id]).forEach(a=>{if(critMet(a,st)){p.ach[a.id]=now();award('ach','ach:'+a.id,'Conquista: '+a.name);toastAch(a);again=true}})}persist()}
function gain(n,txt){if(n>0)toast('+'+n+' pontos'+(txt?' · '+txt:''),'ok',2200)}

/* ===================== NOTIFICAÇÕES / MODAL ===================== */
function toast(msg,type,ms){const c=$('#toasts');if(!c)return;const d=document.createElement('div');d.className='toast '+(type||'');d.innerHTML=msg;c.appendChild(d);setTimeout(()=>d.remove(),ms||3200)}
function toastAch(a){const c=$('#toasts');if(!c)return;const d=document.createElement('div');d.className='toast ach';d.innerHTML='<span class="tm">'+medalSvg(a.icon||'medal',a.cat,false)+'</span><div><b>Conquista desbloqueada!</b><br>'+esc(a.name)+(a.reward?' · novo item de avatar':'')+'</div>';c.appendChild(d);confettiBurst(d);setTimeout(()=>d.remove(),5200)}
function openModal(html){const m=$('#modal');m.innerHTML='<div class="modal" data-act="mclose-bg"><div class="box" role="dialog" aria-modal="true">'+html+'</div></div>'}
function closeModal(){$('#modal').innerHTML=''}
ACT['mclose-bg']=(t,e)=>{if(e.target===t)closeModal()};ACT.mclose=()=>closeModal();
function confirmBox(title,msg,actName,data,btn,danger){openModal('<h3>'+esc(title)+'</h3><p class="mut" style="margin-top:8px">'+msg+'</p><div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn sec" data-act="mclose">Cancelar</button><button class="btn '+(danger===false?'':'danger')+'" data-act="'+actName+'" '+Object.entries(data||{}).map(([k,v])=>'data-'+k+'="'+esc(v)+'"').join(' ')+'>'+esc(btn||'Confirmar')+'</button></div>')}

/* ===================== RENDER ===================== */
let rT=null;
function softRender(){if(S.lock)return;const ae=document.activeElement;if(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)&&ae.type!=='checkbox'){S.pend=1;return}clearTimeout(rT);rT=setTimeout(render,60)}
function render(){const root=$('#root');if(!root)return;const y=window.scrollY;const key=S.mode+S.view+S.aview;
 let h;if(S.auth!=='ok')h=authView();else if(!S.ready)h='<div class="main"><div class="wrap"><div class="spin"></div><p class="tc mut">Carregando a plataforma…</p></div></div>';
 else{try{h=shell()}catch(e){console.error(e);h='<div class="main"><div class="card"><h3>Algo deu errado ao montar esta tela</h3><p class="mut">'+esc(e.message)+'</p><button class="btn" data-act="go" data-v="home">Voltar ao início</button></div></div>'}}
 root.innerHTML=h;if(S.lastKey===key)window.scrollTo(0,y);S.lastKey=key;const af=document.querySelector('[data-autofocus]');if(af)af.focus()}
ACT.go=t=>go(t.dataset.v,t.dataset.p?JSON.parse(t.dataset.p):{});
function go(v,p){S.view=v;S.p=p||{};S.lock=false;S.more=false;S.run=null;if(v!=='sims')S.sim=null;if(v!=='games')S.game=null;render();window.scrollTo(0,0)}
function ago(v,p){S.aview=v;S.ap=p||{};S.lock=false;render();window.scrollTo(0,0)}
ACT.ago=t=>ago(t.dataset.v,t.dataset.p?JSON.parse(t.dataset.p):{});

function shell(){
 if(S.mode==='admin')return adminShell();
 if(!S.priv)return onboarding();
 return studentShell()}
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;const f=ACT[t.dataset.act];if(f){if(t.tagName==='A')e.preventDefault();f(t,e)}});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[role=button][data-act]')){e.preventDefault();e.target.click()}});

document.addEventListener('focusout',()=>{if(S.pend){S.pend=0;setTimeout(()=>{const ae=document.activeElement;if(!(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)))softRender()},120)}});

