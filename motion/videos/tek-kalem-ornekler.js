/* Tek Kalem onaylı örnekleri (açık zemin, şekilli): ts-vitrin (karşılaştırma), ts-kampanya (sözün yerine resim), ts-saat (zamanın geçişi). Yeni videolar bunlardan ilham alır, kopyalamaz.
   Kalem yalnızca yazının üstünü çizmez; şekil de çizer. Üç videoda üç farklı görsel fikir. */
const TS={BG:'#EFE8DC',PAPER:'#FFFDF8',INK:'#141414',MUTE:'#7D7466',SH:'#5a4a32'};
const tsLine=(d,lw=6,c=TS.INK,op)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${lw}" stroke-linecap="round" stroke-linejoin="round"${op!=null?` opacity="${f2(op)}"`:''}/>`;

/* ---- 1) Vitrin: üç aynı dükkân, biri ayrışır ---- */
const TSA=(function(){
 const D=15,BASE=1400,WD=260,HB=280;
 function shop(cx,o={}){const x0=cx-WD/2,x1=cx+WD/2,top=BASE-HB;let s='';
  s+=`<rect x="${x0}" y="${top}" width="${WD}" height="${HB}" fill="${TS.PAPER}"/>`+tsLine(`M${x0},${BASE} V${top} H${x1} V${BASE}`,6);
  let aw=`M${x0-12},${top} L${x0-12},${top-40} H${x1+12} V${top}`;const n=5,w=(WD+24)/n;for(let i=0;i<n;i++){const a=x0-12+w*i;aw+=` M${f2(a)},${top} q${f2(w/2)},34 ${f2(w)},0`}
  s+=`<rect x="${x0-12}" y="${top-40}" width="${WD+24}" height="40" fill="${o.aw||'#E3DACB'}"/>`+tsLine(aw,5);
  s+=`<rect x="${x0+24}" y="${top+60}" width="100" height="120" fill="#F4EEE3"/>`+tsLine(`M${x0+24},${top+60} h100 v120 h-100 Z`,5);
  s+=tsLine(`M${x1-80},${BASE} V${top+90} h56 V${BASE}`,5)+`<circle cx="${x1-36}" cy="${top+180}" r="5" fill="${TS.INK}"/>`;
  const sw=o.sw||236;s+=`<rect x="${cx-sw/2}" y="${top-118}" width="${sw}" height="60" rx="10" fill="${TS.PAPER}"/>`+tsLine(`M${cx-sw/2+10},${top-118} h${sw-20} q10,0 10,10 v40 q0,10 -10,10 h-${sw-20} q-10,0 -10,-10 v-40 q0,-10 10,-10`,5);
  s+=tsLine(`M${cx-40},${top-58} V${top-40} M${cx+40},${top-58} V${top-40}`,4);
  return s}
 const sign=(cx,str,size=30,fill=TS.INK)=>T(cx,BASE-HB-78,str,{f:FF,size,w:700,anchor:'middle',fill});
 return {id:'tsa',dur:D,bg:TS.BG,render(t){
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/>`,pen=null;
  const zk=eIO(P(t,6.0,6.7)),fade=1-.75*zk,end=eIO(P(t,10.0,10.7));
  // yan dükkânlar
  let side=shop(210)+sign(210,'kaliteli hizmet',30)+shop(870)+sign(870,'kaliteli hizmet',30);
  // eşittir işaretleri
  const e1=`M352,1270 h44 M352,1292 h44`,e2=`M684,1270 h44 M684,1292 h44`,ea=eIO(P(t,3.0,3.5)),eb=eIO(P(t,3.6,4.1));
  side+=PEN.stroke(e1,0,ea,{lw:9})+PEN.stroke(e2,0,eb,{lw:9});if(ea>0&&ea<1)pen=PEN.at(e1,ea);if(eb>0&&eb<1)pen=PEN.at(e2,eb);
  side+=PEN.note('tsan1','hangisi sen?',380,1520,70,P(t,4.4,5.0));
  s+=`<g opacity="${f2(fade*(1-end))}">${side}</g>`;
  // ortadaki dükkân: büyür, tabelası değişir, vitrinine ürün çizilir
  const sc=1+.5*zk-.25*end,cy=1250+60*zk+140*end;
  let m=shop(540,{sw:lerp(236,340,eIO(P(t,6.9,7.4))),aw:zk>0?mixC('#E3DACB','#F3C9B5',zk):null});
  const oldOp=1-P(t,6.8,7.1);
  if(oldOp>0)m+=`<g opacity="${f2(oldOp)}">${sign(540,'kaliteli hizmet',30)}</g>`;
  m+=CT(540,BASE-HB-78,'5 iş gününde kargo',30,7.3,99,t,{fill:TS.INK});
  // vitrine kupa çizimi
  const cup=`M452,1214 L508,1214 L502,1290 Q500,1298 492,1298 L468,1298 Q460,1298 458,1290 Z M508,1232 q18,0 16,18 q-2,18 -20,16`,cb=eIO(P(t,7.8,8.6));
  m+=PEN.stroke(cup,0,cb,{lw:6,c:TS.INK});
  const rg=PEN.loop(540,BASE-HB-88,190,48,1.15,3),rb=eIO(P(t,8.8,9.5));m+=PEN.stroke(rg,0,rb,{lw:8});
  const tr=`translate(540 ${f2(cy)}) scale(${f2(sc)}) translate(-540 -1250)`;
  s+=`<g transform="${tr}">${m}</g>`;
  const mp=p=>[540+(p[0]-540)*sc,cy+(p[1]-1250)*sc];
  if(cb>0&&cb<1)pen=mp(PEN.at(cup,cb));if(rb>0&&rb<1)pen=mp(PEN.at(rg,rb));
  s+=CT(540,470,'“Kaliteli hizmet” yazmak',76,-9,2.4,t,{fill:TS.INK})+CT(540,580,'seni ayırt ettirmiyor.',76,-9,2.45,t,{fill:TS.INK});
  s+=CT(540,520,'Sıfat değil,',108,10.3,99,t,{fill:TS.INK})+CT(540,645,`<tspan fill="${O}">bilgi</tspan> yaz.`,108,10.5,99,t,{fill:TS.INK,raw:1});
  s+=WM2(false);if(pen)s+=PRING(pen);
  return s}};
})();

/* ---- 2) Kampanya: belirsiz etiket yerine teklifin kendisi çizilir ---- */
const TSB=(function(){
 const D=15;
 const cupD=(x,b,h)=>{const w=h*.7;return `M${x-w/2},${b-h} L${x+w/2},${b-h} L${x+w*.38},${b-10} Q${x+w*.36},${b} ${x+w*.26},${b} L${x-w*.26},${b} Q${x-w*.36},${b} ${x-w*.38},${b-10} Z`};
 return {id:'tsb',dur:D,bg:TS.BG,render(t){
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/>`,pen=null;
  // A: belirsiz etiket, soru işaretleri çizilir, sonra yukarı uçar
  const up=eIO(P(t,5.7,6.4));
  if(up<1){const y=1150-1100*up;let g=`<rect x="290" y="${y-330+18}" width="500" height="560" rx="26" fill="${TS.SH}" opacity=".1"/><rect x="290" y="${y-330}" width="500" height="560" rx="26" fill="${TS.PAPER}"/><circle cx="540" cy="${y-290}" r="15" fill="${TS.BG}"/>`;
   g+=tsLine(`M540,${y-290} C520,${y-380} 560,${y-430} 545,${y-520}`,4,'#9E9484');
   g+=T(540,y-140,'BÜYÜK',{f:FF,size:112,w:800,anchor:'middle'})+T(540,y-15,'İNDİRİM',{f:FF,size:104,w:800,anchor:'middle'})+T(540,y+100,'BAŞLADI!',{f:FF,size:88,w:800,anchor:'middle'});
   const q1=`M195,${y-190} c0,-40 60,-40 60,0 c0,26 -30,26 -30,56 M225,${y-90} v2`,q2=`M830,${y-60} c0,-40 60,-40 60,0 c0,26 -30,26 -30,56 M860,${y+40} v2`;
   const a=eIO(P(t,3.0,3.6)),b=eIO(P(t,3.8,4.4));g+=PEN.stroke(q1,0,a,{lw:10})+PEN.stroke(q2,0,b,{lw:10});
   if(a>0&&a<1)pen=PEN.at(q1,a);if(b>0&&b<1)pen=PEN.at(q2,b);
   g+=PEN.note('tsbn1','ne? ne zamana kadar?',300,y+330,64,P(t,4.6,5.2),0,{fill:TS.INK});
   s+=g}
  // B: teklifin kendisi: takvim + iki bardak
  if(t>=6.0){
   const cal=`M130,790 h300 v340 h-300 Z M130,870 h300 M200,768 v44 M360,768 v44`,ca=eIO(P(t,6.3,7.0));
   s+=`<g opacity="${f2(P(t,6.3,6.6))}"><rect x="130" y="790" width="300" height="340" fill="${TS.PAPER}"/><rect x="130" y="790" width="300" height="80" fill="#E3DACB"/></g>`+PEN.stroke(cal,0,ca,{lw:6,c:TS.INK});
   if(ca>0&&ca<1)pen=PEN.at(cal,ca);
   s+=CT(280,1035,'CUMA',84,7.0,99,t,{fill:TS.INK,w:800});
   s+=T(280,1210,'son gün',{f:FC,size:52,w:600,anchor:'middle',fill:TS.MUTE,op:P(t,7.2,7.5)});
   const c1=cupD(620,1130,240),c2=cupD(870,1130,240),k1=eIO(P(t,7.4,8.0)),k2=eIO(P(t,8.1,8.7));
   s+=`<path d="${c1}" fill="${TS.PAPER}" opacity="${f2(k1)}"/>`+PEN.stroke(c1,0,k1,{lw:7,c:TS.INK});
   const f=eIO(P(t,8.8,9.6));
   if(f>0)s+=`<clipPath id="tsbf"><rect x="700" y="${f2(1130-240*f)}" width="340" height="${f2(240*f)}"/></clipPath><path d="${c2}" fill="${O}" clip-path="url(#tsbf)"/>`;
   s+=PEN.stroke(c2,0,k2,{lw:7,c:TS.INK});
   if(k1>0&&k1<1)pen=PEN.at(c1,k1);if(k2>0&&k2<1)pen=PEN.at(c2,k2);
   s+=T(745,1050,'+',{f:FF,size:90,w:700,anchor:'middle',op:P(t,8.0,8.2)});
   s+=CT(745,1240,'ikinci kahve bizden',56,8.8,99,t,{fill:TS.INK});
  }
  s+=CT(540,420,'“Büyük indirim” demek',78,-9,2.4,t,{fill:TS.INK})+CT(540,520,'kimseye bir şey',78,-9,2.45,t,{fill:TS.INK})+CT(540,620,'söylemiyor.',78,-9,2.5,t,{fill:TS.INK});
  s+=CT(540,480,'Kampanyayı büyük değil,',84,10.3,99,t,{fill:TS.INK})+CT(540,590,`<tspan fill="${O}">net</tspan> yaz.`,84,10.5,99,t,{fill:TS.INK,raw:1});
  s+=WM2(false);if(pen)s+=PRING(pen);
  return s}};
})();

/* ---- 3) Saat: gece gelen mesajın beklediği süre ---- */
const TSC=(function(){
 const D=15,CX=540,CY=1180,R=270;
 const ang=m=>((m/60)%12)/12*Math.PI*2-Math.PI/2;
 const pt=(a,r)=>[CX+r*Math.cos(a),CY+r*Math.sin(a)];
 function arc(m0,m1,r){if(m1-m0<.5)return '';const a0=ang(m0),a1=a0+(m1-m0)/720*Math.PI*2,p0=pt(a0,r),p1=pt(a1,r),lg=(a1-a0)>Math.PI?1:0;return `M${f2(p0[0])},${f2(p0[1])} A${r},${r} 0 ${lg} 1 ${f2(p1[0])},${f2(p1[1])}`}
 return {id:'tsc',dur:D,bg:TS.BG,render(t){
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/>`;
  const end=eIO(P(t,10.0,10.7)),sc=1-.38*end,oy=180*end;let g='';
  // saat: 02:14 → 09:40 → tekrar 02:14 → 02:15
  const go=eIO(P(t,3.0,5.0)),back=eIO(P(t,6.0,6.6)),fix=eIO(P(t,7.0,7.5));
  let m=134+(580-134)*go;m=lerp(m,134,back);m+=fix;
  g+=`<circle cx="${CX}" cy="${CY+16}" r="${R}" fill="${TS.SH}" opacity=".08"/><circle cx="${CX}" cy="${CY}" r="${R}" fill="${TS.PAPER}"/>`+tsLine(`M${CX+R},${CY} A${R},${R} 0 1 1 ${CX+R-.01},${CY-.5}`,10);
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2,p=pt(a,R-26),q=pt(a,R-(i%3?46:62));g+=tsLine(`M${f2(p[0])},${f2(p[1])} L${f2(q[0])},${f2(q[1])}`,i%3?5:8)}
  // bekleme yayı
  const wait=arc(134,m,R+40);if(wait)g+=`<path d="${wait}" fill="none" stroke="${O}" stroke-width="16" stroke-linecap="round" opacity="${f2(1-back*0)}"/>`;
  const ha=((m/60)%12)/12*Math.PI*2-Math.PI/2,ma=(m%60)/60*Math.PI*2-Math.PI/2,h=pt(ha,150),mm=pt(ma,215);
  g+=tsLine(`M${CX},${CY} L${f2(h[0])},${f2(h[1])}`,14)+tsLine(`M${CX},${CY} L${f2(mm[0])},${f2(mm[1])}`,8)+`<circle cx="${CX}" cy="${CY}" r="14" fill="${TS.INK}"/>`;
  const hh=Math.floor(m/60),mn=Math.floor(m%60);
  g+=T(CX,CY+R+130,`${String(hh).padStart(2,'0')}:${String(mn).padStart(2,'0')}`,{f:FF,size:72,w:700,anchor:'middle',fill:TS.INK});
  // mesaj notu
  g+=`<g transform="rotate(-4 260 840)"><rect x="110" y="790" width="380" height="110" rx="22" fill="${TS.SH}" opacity=".1" transform="translate(0 12)"/><rect x="110" y="790" width="380" height="110" rx="22" fill="#E3DACB"/>${T(140,858,'Fiyat listesi var mı?',{f:FF,size:36,w:600})}</g>`;
  g+=PEN.note('tscn1','7 saat bekledi',640,860,66,P(t,5.1,5.6),P(t,6.0,6.3),{fill:TS.INK});
  g+=PEN.note('tscn2','1 dakikada cevap',580,860,66,P(t,7.7,8.3),0,{fill:TS.INK});
  const tm=PEN.loop(CX,CY+R+106,130,52,1.15,4),tb=eIO(P(t,8.6,9.3));g+=PEN.stroke(tm,0,tb,{lw:9});
  s+=`<g transform="translate(${CX} ${f2(CY+oy)}) scale(${f2(sc)}) translate(${-CX} ${-CY})">${g}</g>`;
  let pen=null;if(tb>0&&tb<1){const p=PEN.at(tm,tb);pen=[CX+(p[0]-CX)*sc,CY+oy+(p[1]-CY)*sc]}
  s+=CT(540,360,'Gece gelen mesaj,',78,-9,2.4,t,{fill:TS.INK})+CT(540,460,'sabaha kadar',78,-9,2.45,t,{fill:TS.INK})+CT(540,560,'beklemek zorunda değil.',74,-9,2.5,t,{fill:TS.INK});
  s+=CT(540,480,'Cevap sabahı',108,10.3,99,t,{fill:TS.INK})+CT(540,605,`<tspan fill="${O}">beklemesin.</tspan>`,108,10.5,99,t,{fill:TS.INK,raw:1});
  s+=WM2(false);if(pen)s+=PRING(pen);
  return s}};
})();
VIDEOS['ts-vitrin']=TSA;VIDEOS['ts-kampanya']=TSB;VIDEOS['ts-saat']=TSC;
