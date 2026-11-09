/* ===== IDENTIDADE ARTÍSTICA — PERSONAGENS (um único sistema para avatar, módulos, simulações e conquistas) =====
   Regras fixas: contorno #1b2a4a, cabeça grande (≈3,5 cabeças), olhos ovais com 2 brilhos, sobrancelhas expressivas,
   sombreamento "cel" (sobreposição translúcida do lado direito), luz do alto-esquerda, blush leve. */
const OL='#1b2a4a';
const SKIN=['#F9D9BE','#EDBB93','#D29A6E','#AE7249','#80502F','#5A3520'];
const skinSh=h=>h; // sombras são sobreposições translúcidas
function _P(d,fill,sw,extra){return '<path d="'+d+'" fill="'+fill+'" stroke="'+OL+'" stroke-width="'+(sw==null?2:sw)+'" stroke-linejoin="round" stroke-linecap="round" '+(extra||'')+'/>'}
function _E(cx,cy,rx,ry,fill,sw){return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" stroke="'+OL+'" stroke-width="'+(sw==null?2:sw)+'"/>'}
function _SH(d,a){return '<path d="'+d+'" fill="#0b1e3f" opacity="'+(a||.16)+'"/>'}
function _HL(d,a){return '<path d="'+d+'" fill="#fff" opacity="'+(a||.35)+'"/>'}
function _limb(pts,w,col){const d='M'+pts.map(p=>p.join(' ')).join(' L');return '<path d="'+d+'" fill="none" stroke="'+OL+'" stroke-width="'+(w+3.6)+'" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function _hand(x,y,sk){return '<circle cx="'+x+'" cy="'+y+'" r="4.6" fill="'+sk+'" stroke="'+OL+'" stroke-width="2"/>'}
function _shade(col){ // escurece cor #rrggbb
 const n=parseInt(col.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;r=Math.round(r*.78);g=Math.round(g*.78);b=Math.round(b*.78);return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}

const AV={
 skin:SKIN,
 hair:[{id:'short',n:'Curto'},{id:'spiky',n:'Espetado'},{id:'buzz',n:'Raspado'},{id:'long',n:'Longo'},{id:'bob',n:'Chanel'},{id:'curly',n:'Cacheado'},{id:'bun',n:'Coque'},{id:'pony',n:'Rabo de cavalo'},{id:'braids',n:'Tranças'},{id:'afro',n:'Black power'}],
 hairColor:[{id:'black',hex:'#231a16',n:'Preto'},{id:'brown',hex:'#6b4423',n:'Castanho'},{id:'auburn',hex:'#a8501f',n:'Ruivo'},{id:'blond',hex:'#e6b95c',n:'Loiro'},{id:'blue',hex:'#3b82f6',n:'Azul',lock:1},{id:'purple',hex:'#8b5cf6',n:'Roxo',lock:1}],
 outfit:[{id:'navy',n:'Camiseta marinho',c:'#1c4a9a',k:'tee'},{id:'teal',n:'Camiseta água',c:'#19B5A5',k:'tee'},{id:'orange',n:'Camiseta laranja',c:'#FF8A3D',k:'tee'},{id:'purple',n:'Camiseta roxa',c:'#7C5CFF',k:'tee'},{id:'green',n:'Moletom verde',c:'#2FB66A',k:'hoodie'},{id:'denim',n:'Jaqueta jeans',c:'#4C7BC9',k:'denim'},{id:'sport',n:'Camisa esportiva',c:'#E5484D',k:'sport'},{id:'polo',n:'Polo clara',c:'#8EC5FF',k:'polo'},{id:'vest',n:'Colete de resgate',c:'#FFB020',k:'vest',lock:1},{id:'uniform',n:'Uniforme de socorrista',c:'#D83A3F',k:'uniform',lock:1},{id:'jaleco',n:'Jaleco branco',c:'#F4F7FB',k:'coat',lock:1}],
 acc:[{id:'none',n:'Nenhum'},{id:'glasses',n:'Óculos',lock:1},{id:'cap',n:'Boné'},{id:'bandana',n:'Bandana'},{id:'headset',n:'Fone de rádio',lock:1},{id:'scarf',n:'Cachecol'},{id:'badge',n:'Cruz no peito'},{id:'medal',n:'Medalha',lock:1},{id:'helmet',n:'Capacete',lock:1},{id:'cape',n:'Capa de herói',lock:1},{id:'star',n:'Estrela de ouro',lock:1}],
 expr:[{id:'happy',n:'Alegre'},{id:'cool',n:'Descolado'},{id:'wow',n:'Surpreso'},{id:'focus',n:'Concentrado'}],
 bg:['#D6F4F0','#E8E2FF','#FFE9D9','#FFF3CC','#D9F5E4','#DCE8FF']
};
const AVDEF={skin:1,hair:'short',hairColor:'brown',outfit:'navy',acc:'none',bg:0,expr:'happy'};

/* ---- cabelo ---- */
function hairBack(st,hc){const hl=_HL;let s='';
 switch(st){
 case 'long':s=_P('M29 34C20 60 24 90 36 100L64 100C76 90 80 60 71 34Z',hc)+_SH('M62 40C74 60 70 88 60 98L66 100C76 90 80 60 71 34Z',.18);break;
 case 'bob':s=_P('M28 34C22 54 24 70 32 74L68 74C76 70 78 54 72 34Z',hc)+_SH('M64 40C72 56 70 68 62 72L68 74C76 70 78 54 72 34Z',.18);break;
 case 'pony':s=_P('M66 24C86 22 92 48 82 72C80 60 76 54 68 48Z',hc)+_SH('M80 40C88 52 86 64 82 72C84 60 82 50 76 42Z',.2);break;
 case 'bun':s='<circle cx="50" cy="9" r="10" fill="'+hc+'" stroke="'+OL+'" stroke-width="2"/>'+hl('M44 5C46 2 52 2 55 5',.4);break;
 case 'afro':s='<circle cx="50" cy="28" r="31" fill="'+hc+'" stroke="'+OL+'" stroke-width="2"/>'+_SH('M70 12C86 28 84 52 66 58C78 46 78 26 70 12Z',.18)+hl('M30 16C36 8 44 6 52 6',.3);break;
 case 'curly':s=[[30,30,11],[70,30,11],[26,44,9],[74,44,9],[50,14,13],[36,18,11],[64,18,11]].map(c=>'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="'+hc+'" stroke="'+OL+'" stroke-width="2"/>').join('');break;
 case 'braids':s=[30,70].map((x,i)=>{let b='';for(let k=0;k<5;k++)b+='<ellipse cx="'+(x+(i?3:-3)*(k%2?1:-1)*.3+(i?3:-3))+'" cy="'+(52+k*10)+'" rx="5" ry="5.4" fill="'+hc+'" stroke="'+OL+'" stroke-width="1.8"/>';return b+'<circle cx="'+(x+(i?3:-3))+'" cy="104" r="3" fill="#FF8A3D" stroke="'+OL+'" stroke-width="1.5"/>'}).join('');break;
 }return s}
function hairFront(st,hc){const hl=_HL;
 const cap='M29 42C26 18 40 10 50 10C62 10 74 18 71 42C67 31 60 24 50 24C40 24 33 31 29 42Z';
 switch(st){
 case 'spiky':return _P('M29 42L26 22L37 27L37 10L47 21L53 6L58 21L68 12L67 27L74 22L71 42C65 31 59 27 50 27C41 27 35 31 29 42Z',hc)+hl('M38 14L44 22M56 12L58 20',.4);
 case 'buzz':return _P('M30 40C29 20 40 14 50 14C60 14 71 20 70 40C65 31 59 28 50 28C41 28 35 31 30 40Z',hc)+hl('M38 18C44 15 50 15 56 16',.3);
 case 'curly':return _P('M30 38C29 22 38 16 50 16C62 16 71 22 70 38C65 30 59 27 50 27C41 27 35 30 30 38Z',hc)+[[38,20,6],[50,16,6.5],[62,20,6]].map(c=>'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="'+hc+'" stroke="'+OL+'" stroke-width="2"/>').join('')+hl('M40 18C44 14 50 13 54 14',.4);
 case 'afro':return _P('M31 38C30 24 38 17 50 17C62 17 70 24 69 38C64 30 58 27 50 27C42 27 36 30 31 38Z',hc)+hl('M38 21C43 18 50 17 56 18',.35);
 case 'long':case 'bob':case 'braids':return _P('M28 46C24 18 40 9 50 9C62 9 76 18 72 46C69 33 62 24 50 23C45 31 38 35 29 44Z',hc)+_SH('M62 14C74 20 74 34 72 46C70 34 64 26 56 22Z',.18)+hl('M36 16C41 12 48 10 54 11',.4);
 default:return _P(cap,hc)+_SH('M62 13C72 19 72 33 71 42C68 33 63 27 56 25Z',.2)+hl('M36 17C41 13 48 11 54 12',.4)
 }}

/* ---- rosto ---- */
function faceSvg(sk,expr,hairHex){
 const sh='<path d="M62 22C73 30 73 50 60 59C67 49 68 34 62 22Z" fill="#7a3a1a" opacity=".14"/>';
 let eyes='',brows='',mouth='';
 const eye=(x,r)=>'<ellipse cx="'+x+'" cy="40" rx="3.6" ry="'+r+'" fill="'+OL+'"/><circle cx="'+(x+1.2)+'" cy="'+(40-r*.35)+'" r="1.4" fill="#fff"/><circle cx="'+(x-1.4)+'" cy="'+(40+r*.4)+'" r=".7" fill="#fff"/>';
 const bw='stroke="'+hairHex+'" stroke-width="2.2" fill="none" stroke-linecap="round"';
 switch(expr){
 case 'cool':eyes=eye(41,3.6)+eye(59,3.6)+'<path d="M36.5 37.5Q41 36 45.5 37.5M54.5 37.5Q59 36 63.5 37.5" stroke="'+OL+'" stroke-width="2" fill="none" stroke-linecap="round"/>';brows='<path d="M36 33Q41 31 46 33" '+bw+'/><path d="M54 31Q59 29 64 32" '+bw+'/>';mouth='<path d="M44 50Q51 55 58 48" stroke="#7a2f3a" stroke-width="2.2" fill="none" stroke-linecap="round"/>';break;
 case 'wow':eyes=eye(41,5.2)+eye(59,5.2);brows='<path d="M36 31Q41 28 46 31" '+bw+'/><path d="M54 31Q59 28 64 31" '+bw+'/>';mouth='<ellipse cx="50" cy="51" rx="3.4" ry="4.2" fill="#7a2f3a" stroke="'+OL+'" stroke-width="1.6"/><ellipse cx="50" cy="53" rx="2" ry="1.4" fill="#e86a7a"/>';break;
 case 'focus':eyes=eye(41,4.2)+eye(59,4.2);brows='<path d="M36 32L46 35" '+bw+'/><path d="M64 32L54 35" '+bw+'/>';mouth='<path d="M45 51Q50 52 55 51" stroke="#7a2f3a" stroke-width="2.2" fill="none" stroke-linecap="round"/>';break;
 case 'worried':eyes=eye(41,4.8)+eye(59,4.8);brows='<path d="M36 35L46 31" '+bw+'/><path d="M64 35L54 31" '+bw+'/>';mouth='<path d="M44 53Q50 48 56 53" stroke="#7a2f3a" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M70 30q3 4 0 7q-3-3 0-7z" fill="#8fd3ff" stroke="'+OL+'" stroke-width="1"/>';break;
 case 'closed':eyes='<path d="M36 41Q41 45 46 41M54 41Q59 45 64 41" stroke="'+OL+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';brows='<path d="M36 34Q41 32 46 34M54 34Q59 32 64 34" '+bw+'/>';mouth='<path d="M45 51Q50 53 55 51" stroke="#7a2f3a" stroke-width="2.2" fill="none" stroke-linecap="round"/>';break;
 case 'pain':eyes='<path d="M36 38L45 41L36 44M64 38L55 41L64 44" stroke="'+OL+'" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';brows='<path d="M36 33L46 30M64 33L54 30" '+bw+'/>';mouth='<path d="M43 53Q47 49 50 53Q53 49 57 53" stroke="#7a2f3a" stroke-width="2.2" fill="none" stroke-linecap="round"/>';break;
 default:eyes=eye(41,4.6)+eye(59,4.6);brows='<path d="M36 33Q41 30.5 46 32.5" '+bw+'/><path d="M54 32.5Q59 30.5 64 33" '+bw+'/>';mouth='<path d="M43 48Q50 58 57 48Z" fill="#8a2f3f" stroke="'+OL+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M45 49.4Q50 51 55 49.4" stroke="#fff" stroke-width="1.8" fill="none"/><path d="M46 54.6Q50 52.4 54 54.6" fill="#e86a7a"/>'}
 return '<ellipse cx="31.5" cy="41" rx="4" ry="5.4" fill="'+sk+'" stroke="'+OL+'" stroke-width="2"/><ellipse cx="68.5" cy="41" rx="4" ry="5.4" fill="'+sk+'" stroke="'+OL+'" stroke-width="2"/>'+
  '<path d="M31 36C31 20 40 16 50 16C60 16 69 20 69 36C69 52 61 60 50 60C39 60 31 52 31 36Z" fill="'+sk+'" stroke="'+OL+'" stroke-width="2.2"/>'+sh+
  '<ellipse cx="37" cy="48" rx="4" ry="2.6" fill="#ff7a7a" opacity=".28"/><ellipse cx="63" cy="48" rx="4" ry="2.6" fill="#ff7a7a" opacity=".28"/>'+
  '<path d="M49 43q1 3 3 3.2" stroke="#7a3a1a" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/>'+eyes+brows+mouth}

/* ---- roupa (tronco) ---- */
function torsoSvg(of,sk,opt){opt=opt||{};const c=of.c,k=of.k,d=_shade(c);
 const base=_P('M33 62C28 64 26 72 26 84L28 100C40 104 60 104 72 100L74 84C74 72 72 64 67 62C62 66 38 66 33 62Z',c);
 const shd='<path d="M62 64C72 66 74 74 74 84L72 100C68 101 66 102 62 102C66 90 66 76 62 64Z" fill="#0b1e3f" opacity=".16"/>';
 const neck=_P('M43 56L43 66C47 70 53 70 57 66L57 56Z',sk)+'<path d="M43 63C47 68 53 68 57 63L57 58C53 62 47 62 43 58Z" fill="#7a3a1a" opacity=".2"/>';
 let x='';
 switch(k){
 case 'hoodie':x=_P('M34 62C38 74 62 74 66 62C62 58 38 58 34 62Z',d)+'<path d="M45 70L44 82M55 70L56 82" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>'+_P('M38 90L62 90L66 100C56 102 44 102 34 100Z',d,1.6);break;
 case 'denim':x='<path d="M42 62L50 100L58 62Z" fill="#f4f7fb" stroke="'+OL+'" stroke-width="1.6"/>'+_P('M33 62L43 62L50 100L28 100Z',c,1.8)+_P('M67 62L57 62L50 100L72 100Z',c,1.8)+'<path d="M36 80h6M64 80h-6" stroke="#2a4b88" stroke-width="1.4"/>';break;
 case 'sport':x='<path d="M42 62C46 70 54 70 58 62" fill="none" stroke="#fff" stroke-width="3"/><text x="50" y="92" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="800" font-size="15" fill="#fff" stroke="'+OL+'" stroke-width=".6">10</text><path d="M27 76L28 82M73 76L72 82" stroke="#fff" stroke-width="3"/>';break;
 case 'polo':x='<path d="M44 62L50 74L56 62" fill="#fff" stroke="'+OL+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M50 74V86" stroke="'+OL+'" stroke-width="1.4"/><circle cx="50" cy="78" r="1" fill="'+OL+'"/><circle cx="50" cy="83" r="1" fill="'+OL+'"/>';break;
 case 'vest':x='<path d="M33 64L43 64L40 101L29 100Z" fill="'+c+'" stroke="'+OL+'" stroke-width="1.6" opacity="0"/>'+_P('M33 62L44 64L42 102C38 102 32 101 28 100L28 84C28 72 29 66 33 62Z',c,1.8)+_P('M67 62L56 64L58 102C62 102 68 101 72 100L72 84C72 72 71 66 67 62Z',c,1.8)+'<path d="M36 70L34 100M64 70L66 100" stroke="#e9eef7" stroke-width="3.4"/><path d="M28 92H72" stroke="#e9eef7" stroke-width="3.2" opacity=".9"/>';break;
 case 'uniform':x='<path d="M42 62L50 76L58 62Z" fill="#fff" stroke="'+OL+'" stroke-width="1.6" stroke-linejoin="round"/>'+'<path d="M27 70L36 66M73 70L64 66" stroke="#FFC93C" stroke-width="3" stroke-linecap="round"/><rect x="55" y="80" width="12" height="11" rx="2" fill="#fff" stroke="'+OL+'" stroke-width="1.4"/><path d="M59.5 82.6h3v2.4h2.4v3h-2.4v2.4h-3V88h-2.4v-3h2.4z" fill="#E5484D"/><path d="M28 98H72" stroke="#fff" stroke-width="2.4" opacity=".85"/>';break;
 case 'coat':x=_P('M28 100C26 86 26 72 33 62L43 62L50 72L50 102C42 103 34 102 28 100Z',c,1.8)+_P('M72 100C74 86 74 72 67 62L57 62L50 72L50 102C58 103 66 102 72 100Z',c,1.8)+_P('M43 62L37 80L50 72Z','#fff',1.6)+_P('M57 62L63 80L50 72Z','#fff',1.6)+'<rect x="31" y="86" width="11" height="9" rx="1.5" fill="none" stroke="#b8c4d6" stroke-width="1.5"/><path d="M40 64C38 80 43 88 50 88" stroke="#19B5A5" stroke-width="2.2" fill="none"/><circle cx="50" cy="90" r="2.6" fill="#19B5A5" stroke="'+OL+'" stroke-width="1.2"/>';break;
 default:x='<path d="M43 62C46 68 54 68 57 62" fill="none" stroke="'+d+'" stroke-width="3.2" stroke-linecap="round"/><path d="M31 98H69" stroke="'+d+'" stroke-width="1.6" opacity=".6"/>';
 }
 if(k==='vest')return neck+_P('M33 62C28 64 26 72 26 84L28 100C40 104 60 104 72 100L74 84C74 72 72 64 67 62C62 66 38 66 33 62Z','#1c4a9a')+x+shd;
 if(k==='coat')return neck+_P('M33 62C28 64 26 72 26 84L28 100C40 104 60 104 72 100L74 84C74 72 72 64 67 62C62 66 38 66 33 62Z','#1c4a9a')+x+shd;
 return neck+base+x+shd}

/* ---- acessórios ---- */
function accSvg(id){switch(id){
 case 'glasses':return '<g fill="rgba(160,220,255,.28)" stroke="'+OL+'" stroke-width="2"><circle cx="41" cy="40" r="7.2"/><circle cx="59" cy="40" r="7.2"/></g><path d="M48 40h4M34 39L31 38M66 39L69 38" stroke="'+OL+'" stroke-width="2"/><path d="M37 36l3-2M55 36l3-2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>';
 case 'cap':return _P('M29 30C28 12 40 7 50 7C62 7 72 12 71 30Z','#2B6CE4')+_P('M44 30C58 30 76 28 82 34C76 38 56 36 44 34Z','#1d4fb0',1.8)+'<circle cx="50" cy="7.5" r="2.2" fill="#fff" stroke="'+OL+'" stroke-width="1.2"/>'+_HL('M36 16C41 11 48 9 54 10',.35)+'<path d="M49 20l1.4 3 3.2.3-2.4 2.1.7 3.2-2.9-1.6-2.9 1.6.7-3.2-2.4-2.1 3.2-.3z" fill="#fff"/>';
 case 'bandana':return _P('M29 28C30 18 40 14 50 14C60 14 70 18 71 28C60 24 40 24 29 28Z','#E5484D',2)+'<path d="M34 24l1 .5M42 21.5l1 .4M50 21l1 .4M58 21.5l1 .4M65 24l1 .5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>'+_P('M70 26L80 30L72 33Z','#E5484D',1.8);
 case 'headset':return '<path d="M30 36C28 14 42 8 50 8C58 8 72 14 70 36" fill="none" stroke="'+OL+'" stroke-width="5" stroke-linecap="round"/><path d="M30 36C28 14 42 8 50 8C58 8 72 14 70 36" fill="none" stroke="#4b5568" stroke-width="2.6" stroke-linecap="round"/>'+_P('M24 36h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-8a3 3 0 0 1-3-3V39a3 3 0 0 1 3-3z','#2b3347',1.8)+_P('M68 36h8a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-8a2 2 0 0 1-2-2V38a2 2 0 0 1 2-2z','#2b3347',1.8)+'<path d="M76 48q0 12-16 14" stroke="'+OL+'" stroke-width="2.2" fill="none"/><circle cx="59" cy="62" r="2.6" fill="#FF8A3D" stroke="'+OL+'" stroke-width="1.4"/>';
 case 'scarf':return _P('M33 64C42 72 58 72 67 64L69 73C58 82 42 82 31 73Z','#FF8A3D')+_P('M58 74L66 74L68 98L58 96Z','#e07220',1.8)+'<path d="M36 70l-3 2M44 74l-2 3M52 75l-1 3" stroke="#fff" stroke-width="1.6" opacity=".7"/>';
 case 'badge':return '<circle cx="62" cy="82" r="7.4" fill="#fff" stroke="'+OL+'" stroke-width="1.8"/><path d="M60.4 77.6h3.2v3.6h3.6v3.2h-3.6V88h-3.2v-3.6h-3.6v-3.2h3.6z" fill="#E5484D"/>';
 case 'medal':return '<path d="M42 64L50 86L58 64" stroke="'+OL+'" stroke-width="6" fill="none" stroke-linejoin="round"/><path d="M42 64L50 86L58 64" stroke="#7C5CFF" stroke-width="3.2" fill="none" stroke-linejoin="round"/><circle cx="50" cy="90" r="7" fill="#FFC93C" stroke="'+OL+'" stroke-width="2"/><path d="M50 85.5l1.5 3 3.3.4-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.4z" fill="#fff" opacity=".85"/>';
 case 'helmet':return _P('M28 32C26 12 40 5 50 5C60 5 74 12 72 32Z','#FFC93C')+_P('M26 30H74C74 35 70 36 66 36H34C30 36 26 35 26 30Z','#e0a000',1.8)+'<path d="M50 5V30" stroke="'+OL+'" stroke-width="1.6"/><path d="M45 5H55V30H45Z" fill="#e0a000" opacity=".55"/>'+_HL('M34 14C39 9 45 7 50 7',.45)+'<rect x="44" y="14" width="12" height="8" rx="2" fill="#fff" stroke="'+OL+'" stroke-width="1.2"/><path d="M48.5 16h3v2h2v3h-2v2h-3v-2h-2v-3h2z" fill="#E5484D" transform="translate(0 -1) scale(.98)"/>';
 case 'star':return '<path d="M64 76l3 6.2 6.8.9-5 4.6 1.3 6.6-6.1-3.3-6.1 3.3 1.3-6.6-5-4.6 6.8-.9z" fill="#FFC93C" stroke="'+OL+'" stroke-width="1.8" stroke-linejoin="round"/>'+_HL('M64 78l1.5 3',.7);
 }return ''}
function capeBack(){return _P('M22 70C16 90 18 112 20 122L80 122C82 112 84 90 78 70C66 78 34 78 22 70Z','#E5484D')+_SH('M64 76C76 88 78 108 76 122L80 122C82 112 84 90 78 70Z',.2)+'<path d="M26 112h48" stroke="#FFC93C" stroke-width="3" opacity=".9"/>'}

/* ---- avatar (busto) ---- */
function avatarSvg(a){a=Object.assign({},AVDEF,a||{});
 const sk=AV.skin[a.skin]||AV.skin[1],hc=(AV.hairColor.find(h=>h.id===a.hairColor)||AV.hairColor[1]).hex,of=(AV.outfit.find(o=>o.id===a.outfit)||AV.outfit[0]);
 const bg=AV.bg[a.bg]||AV.bg[0];
 const noHair=(a.acc==='helmet');
 const hf=noHair?'':hairFront(a.hair,hc);
 return '<svg viewBox="12 0 76 94" role="img" aria-label="Avatar" class="avsvg"><defs><radialGradient id="avg'+(a.bg||0)+'" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect x="0" y="0" width="100" height="100" fill="'+bg+'"/><rect x="0" y="0" width="100" height="100" fill="url(#avg'+(a.bg||0)+')"/>'+
 (a.acc==='cape'?capeBack():'')+hairBack(a.hair,hc)+torsoSvg(of,sk)+accSvg(a.acc==='scarf'?'scarf':a.acc==='badge'?'badge':a.acc==='medal'?'medal':a.acc==='star'?'star':'')+faceSvg(sk,a.expr,hc)+hf+
 (['glasses','cap','bandana','headset','helmet'].includes(a.acc)?accSvg(a.acc):'')+'</svg>'}

/* ---- personagem de corpo inteiro: 100x140, pés em (50,140) ---- */
const PANTS={navy:'#2b3b66',dark:'#2d303c',khaki:'#b79b6b',jeans:'#3a5a96',red:'#8f2d34'};
function legsSvg(pose,pc,shoe){
 const leg=(x,y1,y2)=>_P('M'+(x-6)+' '+y1+'L'+(x+6)+' '+y1+'L'+(x+5.4)+' '+y2+'L'+(x-5.4)+' '+y2+'Z',pc,2);
 const sh=(x,w)=>_P('M'+(x-w)+' 140C'+(x-w)+' 133 '+(x-1)+' 131 '+(x+1)+' 131L'+(x+w+4)+' 134C'+(x+w+5)+' 138 '+(x+w+3)+' 140 '+(x+w)+' 140Z',shoe,1.8);
 switch(pose){
 case 'sit':return _P('M34 96L44 100L72 102L72 114L44 114L34 108Z',pc,2)+_P('M60 98L78 100L82 130L70 130L66 112Z',pc,2)+sh(70,5)+'<path d="M36 96H66" stroke="#fff" stroke-width="1" opacity="0"/>';
 case 'kneel':return _P('M36 96L48 96L50 126L38 126Z',pc,2)+_P('M52 96L66 98L80 112L80 126L66 126L58 112Z',pc,2)+sh(42,4).replace(/140/g,'138')+_P('M44 126L38 138L56 138Z',shoe,1.8);
 default:return leg(42,94,134)+leg(58,94,134)+sh(41,6).replace('M35','M34')+sh(57,6)+_SH('M52 96L64 96L63.4 134L53 134Z',.16)}}
function armsSvg(pose,sk,sc){
 const L=(pts,w)=>_limb(pts,w||7.4,sc),F=(pts)=>_limb(pts,6,sk);
 const sleeve=(a,b)=>L([a,b]);
 switch(pose){
 case 'wave':return L([[34,66],[28,84]])+F([[28,84],[28,92]])+_hand(28,95,sk)+L([[66,66],[78,60]])+F([[78,60],[80,44]])+_hand(80,40,sk)+'<path d="M88 36q4 3 4 8M92 32q6 5 6 14" stroke="#FFC93C" stroke-width="2" fill="none" stroke-linecap="round"/>';
 case 'phone':return L([[34,66],[28,84]])+F([[28,84],[28,92]])+_hand(28,95,sk)+L([[66,66],[76,70]])+F([[76,70],[70,44]])+'<rect x="66" y="30" width="8" height="15" rx="2" fill="#2b3347" stroke="'+OL+'" stroke-width="1.6"/><rect x="67.4" y="32" width="5.2" height="9" rx="1" fill="#6ec1ff"/>'+_hand(72,46,sk);
 case 'hold':return L([[34,66],[34,84]])+F([[34,84],[46,92]])+L([[66,66],[66,84]])+F([[66,84],[54,92]])+_hand(46,93,sk)+_hand(54,93,sk);
 case 'clutch':return L([[34,66],[36,78]])+F([[36,78],[46,64]])+_hand(46,63,sk)+L([[66,66],[64,78]])+F([[64,78],[54,64]])+_hand(54,63,sk);
 case 'point':return L([[34,66],[28,84]])+F([[28,84],[28,92]])+_hand(28,95,sk)+L([[66,66],[78,68]])+F([[78,68],[92,64]])+_hand(94,63,sk);
 case 'cpr':return L([[34,66],[44,84]])+F([[44,84],[52,104]])+L([[66,66],[58,84]])+F([[58,84],[52,104]])+_hand(52,106,sk);
 case 'cheer':return L([[34,66],[24,56]])+F([[24,56],[20,42]])+_hand(19,38,sk)+L([[66,66],[76,56]])+F([[76,56],[80,42]])+_hand(81,38,sk);
 default:return L([[34,66],[29,84]])+F([[29,84],[30,94]])+_hand(30,97,sk)+L([[66,66],[71,84]])+F([[71,84],[70,94]])+_hand(70,97,sk)}}
/* o:{skin,hair,hc,outfit,pose,expr,pants,acc} */
function charG(o){o=o||{};
 const sk=AV.skin[o.skin==null?1:o.skin]||SKIN[1],hcol=(AV.hairColor.find(h=>h.id===(o.hc||'brown'))||AV.hairColor[1]).hex;
 const of=(AV.outfit.find(x=>x.id===(o.outfit||'navy'))||AV.outfit[0]);
 const pose=o.pose||'stand',pc=PANTS[o.pants]||PANTS.navy,hair=o.hair||'short';
 const ex=o.expr||'happy';const noHair=(o.acc==='helmet');
 const sc=of.k==='coat'||of.k==='vest'?(of.k==='vest'?'#1c4a9a':of.c):of.c;
 const body=legsSvg(pose,pc,o.shoe||'#f4f7fb')+torsoSvg(of,sk)+armsSvg(pose,sk,sc)+accSvg(['scarf','badge','medal','star'].includes(o.acc)?o.acc:'');
 const head=hairBack(hair,hcol)+faceSvg(sk,ex,hcol)+(noHair?'':hairFront(hair,hcol))+(['glasses','cap','bandana','headset','helmet'].includes(o.acc)?accSvg(o.acc):'');
 let g=(o.acc==='cape'?capeBack():'')+'<g>'+body+'</g>'+'<g transform="translate(0 4)">'+head+'</g>';
 if(pose==='kneel'||pose==='cpr')g='<g transform="translate(0 0)">'+(pose==='cpr'?_P('M36 96L48 96L50 126L38 126Z',pc,2)+_P('M52 96L66 98L84 112L84 126L66 126L58 112Z',pc,2)+_P('M46 126L38 138L58 138Z',o.shoe||'#f4f7fb',1.8):'')+g+'</g>';
 return g}
/* mascote (uniforme + boné) */
function mascotSvg(expr,cls){return '<svg viewBox="12 0 76 94" class="'+(cls||'mascot')+'" aria-hidden="true">'+hairBack('short','#231a16')+torsoSvg(AV.outfit.find(o=>o.id==='uniform'),SKIN[1])+accSvg('badge')+faceSvg(SKIN[1],expr||'happy','#231a16')+accSvg('cap')+'</svg>'}
function mascotUri(expr){return 'url("data:image/svg+xml,'+encodeURIComponent(mascotSvg(expr).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '))+'")'}
