/* yarim-saat (zamanın geçişi): saatteki küçük turuncu dilim üç işe bölünür; kalem dilimi her gün baştan çizer,
   takvim kareleri dolar, kareler tek bir ay sayfasına toplanır (≈22 iş günü); notlar "sistem" kartına akar, dilim boşalır. */
const TYS=(function(){
 const CX=540,CY=960,R=190,TK=['paylaşım','cevap','hatırlatma'],DST=[[215,900],[865,900],[540,700]],ROT=[-4,3,-2];
 const pt=(deg,r)=>{const a=deg*Math.PI/180;return [CX+r*Math.cos(a),CY+r*Math.sin(a)]};
 const W=pt(-82.5,115),GX0=540-(7*72-12)/2,GY0=1330,PG=[540,1478];
 const CYC=[[5.6,6.1],[6.1,6.6],[6.6,7.1],[7.1,7.6]];
 const ntip=(x,y,size,s,p)=>[x-12+(size*s.length*.42+60)*p,y-size*.3];
 function wedge(w){if(w<=.01)return '';const r=R-22,p0=pt(-90,r),p1=pt(-90+15*w,r);
  return `<path d="M${CX},${CY} L${f2(p0[0])},${f2(p0[1])} A${r},${r} 0 0 1 ${f2(p1[0])},${f2(p1[1])} Z" fill="${O}"/>`}
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.28*end,oy=120*end,C=1150;
  let s=TH.bg()+`<g transform="translate(540 ${f2(C+oy)}) scale(${f2(sc)}) translate(-540 ${-C})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,C+oy+(q[1]-C)*sc]}return [s,pen]}
 return {id:'tys',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  // saat
  const rot=TH.sway(t,0,1.2);let c='';
  c+=`<circle cx="${CX}" cy="${CY+16}" r="${R}" fill="${TS.SH}" opacity=".09"/><circle cx="${CX}" cy="${CY}" r="${R}" fill="${TS.PAPER}"/>`;
  // dilim: önce tam, sonra her gün baştan çizilir, en sonda boşalır
  let w=1;CYC.forEach(([a,b])=>{if(t>=a&&t<b)w=eIO(P(t,a,b))});w*=1-eIO(P(t,9.1,9.6));
  c+=wedge(w);
  c+=tsLine(`M${CX+R},${CY} A${R},${R} 0 1 1 ${CX+R-.01},${CY-.5}`,9);
  for(let i=0;i<12;i++){const a=i*30-90,p=pt(a,R-22),q=pt(a,R-(i%3?40:54));c+=tsLine(`M${f2(p[0])},${f2(p[1])} L${f2(q[0])},${f2(q[1])}`,i%3?5:8)}
  const h=pt(-75,105),m=pt(90,150);c+=tsLine(`M${CX},${CY} L${f2(h[0])},${f2(h[1])}`,13)+tsLine(`M${CX},${CY} L${f2(m[0])},${f2(m[1])}`,8)+`<circle cx="${CX}" cy="${CY}" r="13" fill="${TS.INK}"/>`;
  g+=`<g transform="rotate(${f2(rot)} ${CX} ${CY})">${c}</g>`;
  CYC.forEach(([a,b])=>{if(t>=a&&t<b){const r=R-22;pen=pt(-90+15*eIO(P(t,a,b)),r)}});
  // kalem dilimi halkalar
  const lp=PEN.loop(CX+12,CY-98,58,122,1.15,3),lq=eIO(P(t,2.7,3.3));g+=PEN.stroke(lp,0,lq,{lw:9,op:1-P(t,3.4,3.8)});if(lq>0&&lq<1)pen=PEN.at(lp,lq);
  // dilim üç işe bölünür: yapışkan notlar dilimden zıplayarak çıkar, sonra sistem kartına akar
  const card=eOutBack(P(t,9.0,9.35));
  if(card>0)g+=TH.card(540,1222,'sistem',{w:250,h:90,size:46,sc:card});
  for(let i=0;i<3;i++){const u=eIO(P(t,3.5+i*.45,4.1+i*.45));if(u<=0)continue;
   const v=eIO(P(t,9.15+i*.18,9.6+i*.18));if(v>=1)continue;
   const p0=TH.hop(W,DST[i],u,120),p=TH.hop(p0,[540,1222],v,90);
   g+=TH.sticky(p[0],p[1],TK[i],lerp(ROT[i],0,v)+TH.sway(t,i,3)*(u>=1?1:0),{w:262,h:104,size:56,sc:(.35+.65*u)*(1-.75*v)})}
  // gün sayacı ve takvim kareleri
  const dk=P(t,5.6,7.6),dop=P(t,5.4,5.7)*(1-P(t,7.7,8.0));
  if(dop>0){const day=Math.max(1,Math.round(1+364*dk));g+=`<g opacity="${f2(dop)}">${T(540,1290,`gün ${day}`,{f:FF,size:54,w:700,anchor:'middle',fill:TS.INK})}</g>`}
  const k=eIO(P(t,7.9,8.5));
  if(k<1)for(let i=0;i<28;i++){const ti=5.65+i*.07,a=eOutBack(P(t,ti,ti+.18));if(a<=0)continue;
   const x=GX0+(i%7)*72+30,y=GY0+Math.floor(i/7)*72+30,X=lerp(x,PG[0],k),Y=lerp(y,PG[1],k),s=a*(1-.7*k);
   g+=`<g opacity="${f2(1-k)}" transform="translate(${f2(X)} ${f2(Y)}) scale(${f2(s)})"><rect x="-30" y="-30" width="60" height="60" rx="8" fill="${O}" opacity=".88"/><rect x="-30" y="-30" width="60" height="60" rx="8" fill="none" stroke="${TS.INK}" stroke-width="4"/></g>`}
  g+=PEN.note('tysn1','her gün baştan',600,1705,64,P(t,5.7,6.3),P(t,7.6,7.8),{fill:TS.INK});
  {const p=P(t,5.7,6.3);if(p>0&&p<1&&!pen)pen=ntip(600,1705,64,'her gün baştan',p)}
  // ay sayfası
  const pg=eOutBack(P(t,8.2,8.7));
  if(pg>0){const sw=TH.sway(t,4,2);g+=`<g transform="translate(${PG[0]} ${PG[1]}) rotate(${f2(sw)}) scale(${f2(pg)})"><rect x="-170" y="-130" width="340" height="280" rx="14" fill="${TS.SH}" opacity=".1" transform="translate(0 16)"/><rect x="-170" y="-130" width="340" height="280" rx="14" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="6"/><rect x="-170" y="-130" width="340" height="62" rx="14" fill="#E3DACB" stroke="${TS.INK}" stroke-width="6"/>${T(0,46,'≈ 22',{f:FF,size:104,w:700,anchor:'middle'})}${T(0,112,'iş günü',{f:FF,size:46,w:700,anchor:'middle',fill:TS.MUTE})}</g>`}
  g+=PEN.note('tysn2','≈ bir iş ayı',330,1300,62,P(t,8.45,8.9),P(t,9.0,9.15),{fill:TS.INK});
  {const p=P(t,8.45,8.9);if(p>0&&p<1&&!pen)pen=ntip(330,1300,62,'≈ bir iş ayı',p)}
  const pl=PEN.loop(PG[0],PG[1]+8,215,178,1.15,5),pq=eIO(P(t,8.75,9.2));g+=PEN.stroke(pl,0,pq,{lw:9});if(pq>0&&pq<1)pen=PEN.at(pl,pq);
  // sistem kartına tik
  const ck=`M${540+152},${1222-4} l16,18 l30,-40`,cp=eIO(P(t,9.7,9.95));g+=PEN.stroke(ck,0,cp,{lw:9});if(cp>0&&cp<1)pen=PEN.at(ck,cp);
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Günde yarım saat',76,-9,2.4,t,{fill:TS.INK})+CT(540,500,'az görünür, yılda',76,-9,2.45,t,{fill:TS.INK})+CT(540,600,'bir iş ayı eder.',76,-9,2.5,t,{fill:TS.INK});
  // kapanış: kilit kelime 2. satırın ortasında
  const L2='sana geri döner.';
  s+=CT(540,500,'Sisteme geçen saat,',96,10.3,99,t,{fill:TS.INK})+CT(540,620,`sana <tspan fill="${O}">geri</tspan> döner.`,96,10.5,99,t,{fill:TS.INK,raw:1});
  if(t>11){const b=BOXC(L2,96,700,540,620,5,8),d=`M${f2(b.x0-6)},${f2(b.cy+58)} q${f2(b.w/2)},14 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)pp=PEN.at(d,p)}
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['yarim-saat']=TYS;
