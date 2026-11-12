/* Onaylı örnekler: Tek Kalem (masa), Göz İzi (telefon), Kalem Bakışı (renk alanları). Yeni videolar bunları şablon alır. */
/* ---- Tek Kalem · masa: "Bu cümle müşteri kaçırır" ---- */
const F1=(function(){
 const DESK='#1F1B17',PAPER='#F5F0E6',D=15,CX=540,CY=1060,W=860,H=560;
 const L1={s:'Fiyat için',size:76,w:600,x:60,y:200},L2={s:'DM’den bilgi alın.',size:76,w:600,x:60,y:300};
 const N1={s:'Fiyat: 450 ₺',size:88,w:700,x:60,y:210},N2={s:'Sipariş için tek mesaj yeter.',size:48,w:500,x:60,y:300};
 function card(inner,ox,oy,rot,sc=1){return `<g transform="translate(${f2(CX+ox)} ${f2(CY+oy)}) rotate(${f2(rot)}) scale(${f2(sc)}) translate(${-W/2} ${-H/2})"><rect x="0" y="22" width="${W}" height="${H}" rx="18" fill="#000" opacity=".35"/><rect width="${W}" height="${H}" rx="18" fill="${PAPER}"/>${inner}</g>`}
 return {id:'f1',dur:D,bg:DESK,render(t){
  let s=`<rect width="1080" height="1920" fill="${DESK}"/>`;
  const z=1+.14*eIO(P(t,2.4,3.0))-.14*eIO(P(t,9.6,10.2));
  let pens=[];
  // kart 1: eski açıklama
  let w='';
  if(t<6.8){const p=eIO(P(t,6.0,6.6));
   let c=T(60,90,'eski açıklama:',{f:FC,size:52,w:600,fill:'#8a8070'})+T(L1.x,L1.y,L1.s,{f:FF,size:L1.size,w:600})+T(L2.x,L2.y,L2.s,{f:FF,size:L2.size,w:600});
   const b=BOXL(L2.s,L2.size,L2.w,L2.x,L2.y),sd=`M${b.x0-10},${b.cy+4} C${lerp(b.x0,b.x1,.35)},${b.cy-8} ${lerp(b.x0,b.x1,.7)},${b.cy+10} ${b.x1+12},${b.cy-2}`;
   const st=eIO(P(t,3.0,3.55));c+=PEN.stroke(sd,0,st,{lw:11});
   c+=PEN.note('f1n1','fiyat sormak = zahmet',60,410,66,P(t,3.8,4.4))+PEN.note('f1n2','zahmet = vazgeçmek',60,490,66,P(t,4.6,5.2),0,{fill:O});
   w+=card(c,-1200*p,0,-2-8*p);
   if(st>0&&st<1){const q=PEN.at(sd,st);pens.push([q[0]-W/2+CX,q[1]-H/2+CY])}}
  // kart 2: yeni açıklama
  if(t>=6.1){const p=eIO(P(t,6.15,6.75)),k=eIO(P(t,10.0,10.7));
   const b=BOXL(N1.s,N1.size,N1.w,N1.x,N1.y,7),lp=PEN.loop(b.cx,b.cy,b.w/2+26,b.h/2+24,1.15,4),lb=eIO(P(t,7.2,7.9));
   let c=T(60,90,'yeni açıklama:',{f:FC,size:52,w:600,fill:'#8a8070'})+T(N1.x,N1.y,N1.s,{f:FF,size:N1.size,w:700})+T(N2.x,N2.y,N2.s,{f:FF,size:N2.size,w:500,fill:'#4a453e'});
   c+=PEN.stroke(lp,0,lb,{lw:10})+PEN.note('f1n3','sorulacak soru kalmadı',60,430,68,P(t,8.0,8.6),0,{fill:'#2a2a2a'});
   w+=card(c,1200*(1-p),260*k,2-3.5*p,1-.3*k);
   if(lb>0&&lb<1){const q=PEN.at(lp,lb);pens.push([q[0]-W/2+CX,q[1]-H/2+CY])}}
  s+=`<g transform="translate(${CX} ${CY}) scale(${f2(z)}) translate(${-CX} ${-CY})">${w}</g>`;
  pens=pens.map(p=>[CX+(p[0]-CX)*z,CY+(p[1]-CY)*z]);
  // masa üstü başlıklar (beyaz, ortalı)
  s+=CT(540,470,'Bu cümle',104,-9,2.4,t,{fill:'#F5F0E6'})+CT(540,590,'müşteri kaçırır.',104,-9,2.45,t,{fill:'#F5F0E6'});
  s+=CT(540,490,'Fiyatı saklama,',108,10.3,99,t,{fill:'#F5F0E6'})+CT(540,615,`<tspan fill="${O}">zahmeti</tspan> kaldır.`,108,10.5,99,t,{fill:'#F5F0E6',raw:1});
  s+=WM2(true);
  if(pens.length)s+=PRING(pens[pens.length-1]);
  return s}};
})();

/* ---- Göz İzi · telefon: "Bu gönderide göz nereye gidiyor?" ---- */
const F2=(function(){
 const BG='#1C1B1F',D=15,PX=280,PY=470,PW=520,PH=1060,SX=296,SY=486,SW=488,SH=1028,IMY=585,IMH=488;
 function heart(x,y){return `<path d="M${x},${y+12} C${x-26},${y-6} ${x-14},${y-30} ${x},${y-14} C${x+14},${y-30} ${x+26},${y-6} ${x},${y+12} Z" fill="none" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>`}
 function cupD(cx,cy,s,fill){return `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M-90,-110 L90,-110 L72,110 Q70,126 54,126 L-54,126 Q-70,126 -72,110 Z" fill="${fill}" stroke="${K}" stroke-width="6" stroke-linejoin="round"/><path d="M-100,-110 H100" stroke="${K}" stroke-width="6" stroke-linecap="round"/><path d="M-70,-20 H70" stroke="${K}" stroke-width="5" opacity=".5"/></g>`}
 function post(v){let s=`<rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#fff"/>`;
  s+=`<circle cx="336" cy="545" r="22" fill="#F2C9B3"/>`+T(370,554,'mola.kahve',{size:26,w:600});
  if(v===0){s+=`<rect x="${SX}" y="${IMY}" width="${SW}" height="${IMH}" fill="#F2E3D3"/>`+cupD(540,820,1,'#D9B48F')+T(768,1055,'%20 indirim',{size:22,w:600,fill:'#7b6a59',anchor:'end'})}
  else{s+=`<rect x="${SX}" y="${IMY}" width="${SW}" height="${IMH}" fill="${O}"/>`+T(330,820,'%20',{f:FF,size:200,w:800,fill:'#fff'})+T(336,890,'bu hafta indirim',{f:FF,size:40,w:600,fill:'#fff'})+cupD(690,980,.48,'#F5E6D6')}
  s+=heart(330,1112)+`<circle cx="392" cy="1110" r="16" fill="none" stroke="${K}" stroke-width="4"/><path d="M432,1098 L462,1110 L432,1122 Z" fill="none" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>`;
  s+=`<rect x="320" y="1160" width="380" height="16" rx="8" fill="#E6E2DB"/><rect x="320" y="1192" width="300" height="16" rx="8" fill="#E6E2DB"/><rect x="320" y="1224" width="220" height="16" rx="8" fill="#EFECE6"/>`;
  return s}
 const FA=[[540,800,.6,1.2],[380,545,2.0,.25],[400,1110,2.45,.2],[480,1185,2.8,.3]];
 const FB=[[430,760,7.2,1.0],[400,1110,8.4,.2],[480,1185,8.75,.3]];
 function gz(F,t){for(let k=0;k<F.length;k++){const [x,y,t0,d]=F[k];if(t<t0){if(!k)return [x,y];const [px,py,pt,pd]=F[k-1],p=eIO(P(t,pt+pd,t0));return [lerp(px,x,p),lerp(py,y,p)]}if(t<=t0+d)return [x+2*Math.sin(t*31),y+2*Math.cos(t*27)]}const l=F[F.length-1];return [l[0],l[1]]}
 function overlay(F,t,seed){let s='';const pts=[];
  F.forEach(([x,y,t0,d],k)=>{if(t<t0)return;pts.push([x,y]);const el=Math.min(t-t0,d);
   if(d>=.5){for(let j=0;j<5;j++){const g=P(el,j*.15,j*.15+.3);if(g<=0)continue;s+=`<path d="${PEN.ring(x,y,(70+j*44)*(.9+.1*g),.62,seed,1-j*.15)}" fill="none" stroke="${O}" stroke-width="4" opacity="${f2(g*(1-j*.12))}"/>`}}
   else s+=`<circle cx="${x}" cy="${y}" r="${f2(16+56*Math.sqrt(el))}" fill="none" stroke="${O}" stroke-width="3"/>`});
  if(pts.length){const g=gz(F,t);s=`<polyline points="${[...pts,g].map(p=>p.map(f2).join(',')).join(' ')}" fill="none" stroke="${O}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" opacity=".7"/>`+s}
  const [gx,gy]=gz(F,t);const e=F[F.length-1],op=P(t,F[0][2]-.3,F[0][2])*(1-P(t,e[2]+e[3]+.3,e[2]+e[3]+.6));
  if(op>0)s+=`<g opacity="${f2(op)}" transform="translate(${f2(gx)} ${f2(gy)})"><circle r="40" fill="none" stroke="${K}" stroke-width="3"/><path d="M-56,0H-44M44,0H56M0,-56V-44M0,44V56" stroke="${K}" stroke-width="3"/></g>`;
  return s}
 return {id:'f2',dur:D,bg:BG,render(t){
  let s=`<rect width="1080" height="1920" fill="${BG}"/>`;
  const k=eIO(P(t,10.8,11.5)),sc=lerp(1,.62,k),cy=lerp(PY+PH/2,1200,k),sw=eIO(P(t,6.3,6.9));
  let ph=`<rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#0B0B0C" stroke="#3a3840" stroke-width="3"/><clipPath id="f2scr"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="50"/></clipPath><g clip-path="url(#f2scr)">`;
  ph+=`<g transform="translate(${f2(-SW*sw)} 0)">${post(0)}${overlay(FA,t,2.1)}`;
  const dashOp=P(t,3.4,3.8);if(dashOp>0)ph+=`<rect x="618" y="1024" width="160" height="44" rx="22" fill="none" stroke="${K}" stroke-width="3" stroke-dasharray="6 8" opacity="${f2(dashOp)}"/>`+PEN.note('f2n1','kimse bakmadı ↓',560,1000,48,P(t,3.6,4.2),0,{fill:'#2a2a2a'});
  ph+=`</g><g transform="translate(${f2(SW*(1-sw))} 0)">${post(1)}${overlay(FB,t,4.4)}${PEN.note('f2n2','ilk bakış: teklif',336,1040,56,P(t,8.2,8.8),0,{fill:'#fff'})}</g>`;
  ph+=`</g><rect x="${540-50}" y="${SY+10}" width="100" height="26" rx="13" fill="#0B0B0C"/>`;
  s+=`<g transform="translate(540 ${f2(cy)}) scale(${f2(sc)}) translate(-540 ${-(PY+PH/2)})">${ph}</g>`;
  const L='#F5F0E6';
  s+=CT(540,310,'Bu gönderide',80,-9,3.2,t,{fill:L})+CT(540,410,'göz nereye gidiyor?',80,-9,3.25,t,{fill:L});
  s+=CT(540,360,'İndirimi kimse görmedi.',72,3.4,6.2,t,{fill:L});
  s+=CT(540,360,'Aynı gönderi, düzeltilmiş:',68,6.45,10.7,t,{fill:L});
  s+=CT(540,420,'Teklifi küçük yazma.',90,11.0,99,t,{fill:L})+CT(540,540,'Gözün ilk durduğu',72,11.3,99,t,{fill:L,w:600})+CT(540,630,`<tspan fill="${O}">yere koy.</tspan>`,72,11.45,99,t,{raw:1,w:700});
  s+=WM2(true);
  return s}};
})();

/* ---- Kalem Bakışı · renk alanları: "Müşteri önce neye bakar?" ---- */
const F3=(function(){
 const D=15,BK='#111111',CR='#F5F0E6';
 const SC=[[0,BK],[2.5,CR],[5.8,O],[9.4,BK]]; // [başlangıç, renk]
 const WIPE=.42;
 function stars(cx,y,n,fill){let s='';for(let i=0;i<n;i++){const x=cx+(i-(n-1)/2)*70;let d='';for(let k=0;k<10;k++){const r=k%2?13:30,a=-Math.PI/2+k*Math.PI/5;d+=(k?'L':'M')+f2(x+r*Math.cos(a))+','+f2(y+r*Math.sin(a))}s+=`<path d="${d}Z" fill="${fill}"/>`}return s}
 const H1={s:'neye bakar?',size:120,w:700,cx:540,y:1010};
 const PR={s:'4,7 · 128 yorum',size:62,w:600,cx:540,y:1090};
 const CM={s:'tam fotoğraftaki gibi.',size:50,w:500,x:160,y:1000};
 return {id:'f3',dur:D,bg:BK,render(t){
  let s='';
  // zemin + silme geçişi (yeni renk alttan yükselir)
  let cur=0;for(let i=0;i<SC.length;i++)if(t>=SC[i][0])cur=i;
  s+=`<rect width="1080" height="1920" fill="${SC[cur][1]}"/>`;
  if(cur+1<SC.length){const n=SC[cur+1],p=eIO(P(t,n[0]-WIPE,n[0]));if(p>0)s+=`<rect x="0" y="${f2(1920*(1-p))}" width="1080" height="${f2(1920*p)}" fill="${n[1]}"/>`}
  let pen=null;
  // 1: siyah — kanca
  if(t<2.4){s+=CT(540,870,'Müşteri önce',120,-9,2.0,t,{fill:CR})+CT(540,1010,'neye bakar?',120,-9,2.05,t,{fill:CR});
   const b=BOXC(H1.s,H1.size,H1.w,H1.cx,H1.y,0,3),lp=PEN.loop(b.cx,b.cy,b.w/2+30,b.h/2+26,1.15,2),lb=eIO(P(t,.5,1.3)),la=eIO(P(t,1.9,2.2));
   s+=PEN.stroke(lp,0,lb,{lw:11,op:1-la});pen=lb<1?PEN.at(lp,lb):(t<2.0?PEN.at(lp,1):null)}
  // 2: krem — fiyat atlanır, yorum sayısına bakılır
  if(t>=2.5&&t<5.8){s+=CT(540,860,'450 ₺',150,2.6,5.4,t,{w:800,fill:'#B3ABA0'})+stars(540,960,5,K)+CT(540,1090,PR.s,62,2.75,5.4,t,{w:600});
   const b=BOXC(PR.s,PR.size,PR.w,PR.cx,PR.y,6),lp=PEN.loop(b.cx,b.cy,b.w/2+32,b.h/2+30,2.2,3),lb=eIO(P(t,3.5,4.5)),la=eIO(P(t,5.3,5.6));
   s+=PEN.stroke(lp,0,lb,{lw:12,op:1-la});
   s+=PEN.note('f3n1','önce başkalarına bakar',300,1260,74,P(t,4.6,5.2),eIO(P(t,5.3,5.6)));
   pen=t<3.5?[lerp(540,PEN.at(lp,0)[0],eIO(P(t,2.9,3.5))),lerp(820,PEN.at(lp,0)[1],eIO(P(t,2.9,3.5)))]:(lb<1?PEN.at(lp,lb):PEN.at(lp,1))}
  // 3: turuncu — hangi yorum ikna eder (kalem siyah)
  if(t>=5.8&&t<9.4){s+=CT(540,600,'Hangi yorum',88,6.0,9.0,t,{fill:K})+CT(540,700,'ikna eder?',88,6.1,9.0,t,{fill:K});
   const op=P(t,6.3,6.7)*(1-P(t,9.0,9.3));
   s+=`<g opacity="${f2(op)}"><rect x="110" y="790" width="860" height="300" rx="36" fill="#fff"/><circle cx="190" cy="860" r="34" fill="#F2C9B3"/>`+T(244,872,'Ayşe K.',{size:32,w:600})+stars(760,862,5,K).replace(/<path /g,'<path transform="scale(1)" ')+T(CM.x,940,'Kargo 2 günde geldi,',{f:FF,size:50,w:500})+T(CM.x,CM.y,CM.s,{f:FF,size:50,w:500})+`</g>`;
   const b=BOXL(CM.s,CM.size,CM.w,CM.x,CM.y),ul=`M${b.x0-6},${b.cy+34} C${lerp(b.x0,b.x1,.4)},${b.cy+42} ${lerp(b.x0,b.x1,.7)},${b.cy+28} ${b.x1+10},${b.cy+36}`,ub=eIO(P(t,7.0,7.7));
   s+=PEN.stroke(ul,0,ub,{lw:10,c:K,op:1-P(t,9.0,9.3)});
   s+=PEN.note('f3n2','somut yorum, övgüden güçlüdür',190,1250,72,P(t,7.9,8.6),eIO(P(t,9.0,9.3)),{fill:K});
   pen=t<9.0?(t<7.0?[lerp(540,b.x0,eIO(P(t,6.4,7.0))),lerp(700,b.cy+34,eIO(P(t,6.4,7.0)))]:PEN.at(ul,ub)):null;
   if(pen){s+=PRING(pen,K);pen=null}}
  // 4: siyah — ne yapmalı
  if(t>=9.4){s+=CT(540,760,'Yorum isteme,',110,9.55,99,t,{fill:CR})+CT(540,890,'soru sor:',110,9.75,99,t,{fill:CR});
   s+=PEN.note('f3n3','“Ürün beklediğin',175,1110,104,P(t,10.4,11.1),0,{fill:O,w:700})+PEN.note('f3n4','gibi miydi?”',265,1225,104,P(t,11.1,11.7),0,{fill:O,w:700})}
  s+=WM2(SC[cur][1]===BK,SC[cur][1]===O?'#8a2a08':null);
  if(pen)s+=PRING(pen);
  return s}};
})();

VIDEOS['ornek-tek-kalem-dm']=F1;
VIDEOS['ornek-goz-izi-gonderi']=F2;
VIDEOS['ornek-kalem-bakisi-yorum']=F3;
