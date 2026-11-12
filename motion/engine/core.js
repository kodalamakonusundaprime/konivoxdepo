/* TilkiSoft motion çekirdeği: 1080x1920 SVG, her video render(t) ile kare kare çizilir (deterministik).
   Global yardımcılar: zamanlama (P, eIO, eOut, spr...), T() metin, FR() maskeli Fraunces satırı, RISE() turuncu dolgu,
   CT() ortalı metin, PEN (kalem çizgisi, halka, kontur, Caveat not), DRAW(), BOXC/BOXL (harf kutusu), WM2() köşe yazısı. */

const NS='http://www.w3.org/2000/svg';
const clamp=(x,a=0,b=1)=>x<a?a:x>b?b:x;
const P=(t,a,b)=>clamp((t-a)/(b-a));
const lerp=(a,b,x)=>a+(b-a)*x;
const eOut=x=>1-Math.pow(1-x,3);
const eIn=x=>x*x*x;
const eIO=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const eOutBack=x=>{const c1=1.6,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const eInBack=x=>{const c1=1.6,c3=c1+1;return c3*x*x*x-c1*x*x};
const spr=(u,f=1.6,d=6)=>u<=0?0:1-Math.exp(-d*u)*Math.cos(f*2*Math.PI*u);
const hash=(a,b,c)=>{let h=Math.imul(a+1,73856093)^Math.imul(b+7,19349663)^Math.imul(c+3,83492791);h=Math.imul(h^(h>>>13),1274126177);return (h^(h>>>16))>>>0};
const f2=n=>Math.round(n*100)/100;
const O='#FF5A1F',K='#0E0E0E';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const FD="'Inter Display','Inter',sans-serif",FI="'Inter',sans-serif",FP="'Poppins',sans-serif",FL="'Fraunces',serif",FF=FL,FC="'Caveat',cursive",FM="'JetBrains Mono','DejaVu Sans Mono',monospace";
function T(x,y,s,o={}){return `<text x="${f2(x)}" y="${f2(y)}" font-family="${o.f||FI}" font-size="${o.size||40}" font-weight="${o.w||400}" fill="${o.fill||K}"${o.anchor?` text-anchor="${o.anchor}"`:''}${o.ls!=null?` letter-spacing="${o.ls}"`:''}${o.op!=null?` opacity="${f2(o.op)}"`:''}${o.style?` font-style="${o.style}"`:''}${o.f===FL?` style="font-variation-settings:'SOFT' 100,'WONK' 0"`:''}${o.extra||''}>${o.raw?s:esc(s)}</text>`}
const hex=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
const mixC=(a,b,x)=>{const A=hex(a),B=hex(b);return '#'+A.map((v,i)=>Math.round(lerp(v,B[i],clamp(x))).toString(16).padStart(2,'0')).join('')};

/* ============ 1. KALKIŞ TAHTASI (split-flap) ============ */

const SER=()=>'';

/* ============ ORTAK: kalem + ölçüm yardımcıları (birleşik tarzlar) ============ */
const PEN=(function(){
 let sv=null,mp=null,mt=null;const pc={},tc={};
 function host(){if(!sv){sv=document.createElementNS(NS,'svg');sv.setAttribute('style','position:absolute;left:-9999px;top:0;width:10px;height:10px;overflow:hidden');document.body.appendChild(sv);mp=document.createElementNS(NS,'path');sv.appendChild(mp);mt=document.createElementNS(NS,'text');sv.appendChild(mt)}}
 function meas(d){if(pc[d])return pc[d];host();mp.setAttribute('d',d);const L=mp.getTotalLength(),N=300,pts=[];for(let i=0;i<=N;i++){const p=mp.getPointAtLength(L*i/N);pts.push([p.x,p.y])}return pc[d]={L,pts,N}}
 // metindeki harflerin konumu (fontlar yüklendikten sonra önbelleğe alınır)
 function glyphs(s,size,w,fam,ital){const k=[s,size,w,fam,ital].join('|');if(tc[k])return tc[k];host();
  mt.setAttribute('font-family',fam);mt.setAttribute('font-size',size);mt.setAttribute('font-weight',w);mt.setAttribute('font-style',ital?'italic':'normal');
  mt.setAttribute('style',fam===FF?"font-variation-settings:'SOFT' 100,'WONK' 0":'');mt.setAttribute('x',0);mt.setAttribute('y',0);mt.textContent=s;
  const out=[];for(let i=0;i<s.length;i++){try{const x=mt.getStartPositionOfChar(i).x,e=mt.getExtentOfChar(i);out.push({x,w:e.width})}catch(_){out.push({x:0,w:0})}}
  if(document.fonts&&document.fonts.status==='loaded')tc[k]=out;return out}
 // turuncu kalem çizgisi: [a,b] aralığı görünür
 function stroke(d,a,b,o={}){if(b<=a+1e-4)return '';meas(d);return `<path d="${d}" pathLength="1" fill="${o.fill||'none'}" stroke="${o.c||O}" stroke-width="${o.lw||14}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f2(b-a+.0001)} 3" stroke-dashoffset="${-a}"${o.op!=null?` opacity="${f2(o.op)}"`:''}/>`}
 const at=(d,p)=>{const m=meas(d);return m.pts[Math.round(clamp(p)*m.N)]};
 // elle çizilmiş halka (birden fazla tur, hafif titrek)
 function loop(cx,cy,rx,ry,turns=1.15,seed=1){let d='';const n=Math.round(70*turns);for(let i=0;i<=n;i++){const th=-0.7+i/n*Math.PI*2*turns,k=1+.05*(i/n)*turns+.035*Math.sin(th*3+seed),j=1-.05*Math.cos(th*2+seed*1.7);d+=(i?'L':'M')+f2(cx+rx*k*Math.cos(th))+','+f2(cy+ry*k*j*Math.sin(th))}return d}
 // kapalı titrek kontur (eş-yükselti çizgisi)
 function ring(cx,cy,R,ry,seed,amp=1){let d='';for(let i=0;i<=84;i++){const th=-1.2+i/84*(Math.PI*2+.18),r=R*(1+amp*(.1*Math.sin(3*th+seed)+.06*Math.sin(5*th+seed*2.3)+.03*Math.cos(8*th+seed)));d+=(i?'L':'M')+f2(cx+r*Math.cos(th))+','+f2(cy+r*ry*Math.sin(th))}return d}
 // Caveat ile kalemin "yazdığı" not: soldan sağa açılır, sağdan silinir
 function note(id,s,x,y,size,p,q=0,o={}){if(p<=0||q>=1)return '';const W=size*s.length*.42+60,x1=x-12+W*q,x2=x-12+W*p;
  return `<clipPath id="${id}"><rect x="${f2(x1)}" y="${f2(y-size*1.05)}" width="${f2(Math.max(0,x2-x1))}" height="${f2(size*1.5)}"/></clipPath><g clip-path="url(#${id})">${T(x,y,s,{f:FC,size,w:o.w||600,fill:o.fill||'#2a2a2a',anchor:o.anchor})}</g>`}
 const penDot=(x,y,r=17)=>`<circle cx="${f2(x)}" cy="${f2(y)}" r="${r}" fill="${K}"/>`;
 return {meas,glyphs,stroke,at,loop,ring,note,penDot};
})();
// Fraunces metin: alttan maskeyle yükselerek gelir, yukarı çıkarak gider
function FR(id,t,s,x,y,size,o={}){const tin=o.tin??-9,tout=o.tout??99;const pin=tin<-5?1:eOut(P(t,tin,tin+.6)),pout=eIn(P(t,tout,tout+.45));if(pin<=0||pout>=1)return '';
 const dy=(1-pin)*size*1.15-pout*size*1.15;
 return `<clipPath id="${id}"><rect x="0" y="${f2(y-size*1.08)}" width="1080" height="${f2(size*1.5)}"/></clipPath><g clip-path="url(#${id})"><g transform="translate(0 ${f2(dy)})">${T(x,y,s,{f:FF,size,w:o.w||600,fill:o.fill||K,style:o.it?'italic':null,raw:o.raw,extra:o.extra})}${o.over||''}</g></g>`}
// turuncunun harfin içini alttan yukarı doldurması (renk tek karede değişmez)
function RISE(id,pre,rest,x,y,size,w,p,o={}){if(p<=0)return '';const top=y+size*.1-size*.9*p;return `<clipPath id="${id}"><rect x="0" y="${f2(top)}" width="1080" height="${f2(y+size*.1-top)}"/></clipPath><g clip-path="url(#${id})">${T(x,y,`<tspan fill="${O}">${pre}</tspan><tspan fill-opacity="0">${rest}</tspan>`,{f:FF,size,w,raw:1,style:o.it?'italic':null,extra:o.extra})}</g>`}


/* ============ BÖLÜM DENEMELERİ (15 sn, sessiz) ============ */
const WM=n=>T(70,250,`tilkisoft · psikoloji ${n}`,{f:FF,size:36,w:600,fill:'#8a8378'});
const RING=(p)=>p?`<circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="20" fill="none" stroke="${O}" stroke-width="6"/><circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="5" fill="${O}"/>`:'';
// kalemle çizim: [t0,t1] arası çizilir, er aralığında silinir; kalem ucunu döndürür
function DRAW(d,t0,t1,er,t,o={}){const b=eIO(P(t,t0,t1)),a=er?eIO(P(t,er[0],er[1])):0;return {s:PEN.stroke(d,o.fade?0:a,b,{...o,op:o.fade?1-a:o.op}),pen:b>0&&b<1&&a<=0?PEN.at(d,b):null}}
// ortalı, hafifçe yükselerek gelen metin
function CT(x,y,s,size,tin,tout,t,o={}){const pin=eOut(P(t,tin,tin+.45)),po=P(t,tout,tout+.35);if(pin<=0||po>=1)return '';return `<g opacity="${f2(pin*(1-po))}" transform="translate(0 ${f2((1-pin)*30)})">${T(x,y,s,{f:o.f||FF,size,w:o.w||700,fill:o.fill||K,anchor:o.anchor||'middle',raw:o.raw,extra:o.extra})}</g>`}


/* ============ YENİ YÖN: kitap sayfası hissi yok (masa, telefon, renk alanları) ============ */
const WM2=(dark,c)=>T(70,250,'tilkisoft',{f:FF,size:40,w:600,fill:c||(dark?'#8f877c':'#8a8378')});
const PRING=(p,c=O)=>p?`<circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="20" fill="none" stroke="${c}" stroke-width="6"/><circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="5" fill="${c}"/>`:'';
// ortalı metindeki harf aralığının kutusu
function BOXC(s,size,w,cx,y,i0=0,i1,ital){const g=PEN.glyphs(s,size,w,FF,!!ital);const L=g[g.length-1].x+g[g.length-1].w,x0=cx-L/2;const a=g[i0],b=g[i1??g.length-1];return {cx:x0+(a.x+b.x+b.w)/2,cy:y-size*.34,w:b.x+b.w-a.x,h:size*.72,x0:x0+a.x,x1:x0+b.x+b.w}}
function BOXL(s,size,w,x,y,i0=0,i1,ital){const g=PEN.glyphs(s,size,w,FF,!!ital);const a=g[i0],b=g[i1??g.length-1];return {cx:x+(a.x+b.x+b.w)/2,cy:y-size*.34,w:b.x+b.w-a.x,h:size*.72,x0:x+a.x,x1:x+b.x+b.w}}


window.VIDEOS=window.VIDEOS||{};
