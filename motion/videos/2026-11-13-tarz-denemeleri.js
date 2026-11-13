/* 13 Kasım tarz denemeleri: aynı kanca, beş görsel dil.
   Kanca: "Her gün aynı işi baştan yapıyorsan büyümüyorsun, dönüyorsun."
   v1 Kalem Plus, v2 Defter, v3 Kesik Kâğıt (geliştirilmiş Tek Kalem) · v4 İzometrik, v5 Yumuşak 3D */
const SG={SAGE:'#B7C4AC',SAGED:'#8FA085',SAGEL:'#D3DCCB',CH:'#2B2B2B'};
const TASKS=['gönderi','fotoğraf','cevap'],DAYS=['Pzt','Sal','Çar','Per','Cum'];
// ortak hikâye zamanı
function STORY(t){
 const spin=.04*Math.min(t,2.6)+1.75*eIO(P(t,2.6,6.0));
 const day=t<2.6?0:Math.min(4,Math.floor((spin-.1)/.42)+1);
 return {spin,day,u:eIO(P(t,6.2,7.6)),end:eIO(P(t,10.0,10.7))}
}
function HOOK(t,c=TS.INK){return CT(540,400,'Her gün aynı işi baştan',72,-9,2.5,t,{fill:c})+CT(540,495,'yapıyorsan büyümüyorsun,',72,-9,2.55,t,{fill:c})+CT(540,600,`<tspan fill="${O}">dönüyorsun.</tspan>`,84,-9,2.6,t,{fill:c,raw:1})}
function CLOSE(t,c=TS.INK){let s=CT(540,470,'Döngüyü değil,',100,10.3,99,t,{fill:c})+CT(540,590,`<tspan fill="${O}">sistemi</tspan> kur.`,100,10.5,99,t,{fill:c,raw:1});
 if(t>11){const b=BOXC('sistemi kur.',100,700,540,590,0,6),d=`M${f2(b.x0-6)},${f2(b.cy+60)} q${f2(b.w/2)},16 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)s+=PRING(PEN.at(d,p))}
 return s}
const ENDTR=(e,cy=1200)=>`translate(540 ${f2(cy+40*e)}) scale(${f2(1+.04*e)}) translate(-540 ${-cy})`;
const ENDMP=(p,e,cy=1200)=>[540+(p[0]-540)*(1+.04*e),cy+40*e+(p[1]-cy)*(1+.04*e)];
// kanca sönünce sahne yakınlaşıp yukarı gelir (boş üst alanı doldurur)
const ZZ=t=>eIO(P(t,2.5,3.3))*(1-eIO(P(t,10.0,10.7)));
const ZTR=(t,cy=1200)=>{const z=ZZ(t);return `translate(540 ${f2(cy+40-210*z)}) scale(${f2(1.05+.07*z)}) translate(-540 ${-cy})`};
const ZMP=(p,t,cy=1200)=>{const z=ZZ(t),k=1.05+.07*z;return [540+(p[0]-540)*k,cy+40-210*z+(p[1]-cy)*k]};
// kalem ucu: küçük kurşun kalem (el yok)
function PENCIL(p){if(!p)return '';return `<g transform="translate(${f2(p[0])} ${f2(p[1])}) rotate(32)"><path d="M0,0 L-13,-38 L13,-38 Z" fill="#E9CFA6"/><path d="M0,0 L-4.5,-13 L4.5,-13 Z" fill="${TS.INK}"/><rect x="-13" y="-200" width="26" height="162" fill="${TS.INK}"/><rect x="-13" y="-200" width="26" height="22" fill="${O}"/>${tsLine('M-13,-38 L0,0 L13,-38',3)}</g>`}

/* ---------- v1 KALEM PLUS: daha dolu kadraj, kurşun kalem ucu, çetele, yaylanan kartlar ---------- */
const V1=(function(){
 const CX=540,CY=1200,R=290,SX=[290,540,790],SY=[1420,1220,1020];
 const card=(x,y,s,sc=1,rot=0)=>`<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(rot)}) scale(${f2(sc)})"><rect x="-118" y="-36" width="236" height="96" rx="18" fill="${TS.SH}" opacity=".1"/><rect x="-118" y="-48" width="236" height="96" rx="18" fill="${TS.PAPER}"/>${tsLine('M-100,-48 h200 q18,0 18,18 v60 q0,18 -18,18 h-200 q-18,0 -18,-18 v-60 q0,-18 18,-18',5)}${T(0,15,s,{f:FF,size:46,w:700,anchor:'middle'})}</g>`;
 return {id:'v1',dur:15,bg:TS.BG,render(t){
  const S=STORY(t);let g='',pen=null;
  // döngü çemberi (sönerek merdivene dönüşür)
  const ring=`M${CX+R},${CY} A${R},${R} 0 1 1 ${CX+R-.01},${CY-.5}`,rOp=1-P(t,6.2,7.0);
  if(rOp>0){g+=`<circle cx="${CX}" cy="${CY+16}" r="${R+70}" fill="${TS.SH}" opacity="${f2(.06*rOp)}"/><circle cx="${CX}" cy="${CY}" r="${R+70}" fill="#F6F1E8" opacity="${f2(rOp)}"/>`+tsLine(ring,6,TS.INK,rOp);
   // yön okları
   for(let k=0;k<3;k++){const a=-Math.PI/2+k*2*Math.PI/3+.55+2*Math.PI*S.spin*.999,p=[CX+R*Math.cos(a),CY+R*Math.sin(a)],dx=-Math.sin(a),dy=Math.cos(a),nx=Math.cos(a),ny=Math.sin(a);
    g+=tsLine(`M${f2(p[0]-dx*10+nx*18)},${f2(p[1]-dy*10+ny*18)} L${f2(p[0]+dx*14)},${f2(p[1]+dy*14)} L${f2(p[0]-dx*10-nx*18)},${f2(p[1]-dy*10-ny*18)}`,6,TS.INK,rOp)}
   // ortada gün
   g+=`<g opacity="${f2(rOp)}">${T(CX,CY+34,DAYS[S.day],{f:FF,size:110,w:700,anchor:'middle'})}</g>`;
   // çetele: her gün bir çizgi, ama hep aynı yerde
   for(let i=0;i<5;i++){const tt=2.6+i*.68;if(t<tt)continue;const d=i<4?`M${300+i*34},1640 l6,-80`:`M286,1590 L440,1630`,p=eIO(P(t,tt,tt+.3));g+=PEN.stroke(d,0,p,{lw:9,op:rOp});if(p>0&&p<1)pen=PEN.at(d,p)}
   g+=PEN.note('v1n1','yine baştan',560,1625,66,P(t,4.6,5.2),P(t,6.0,6.3),{fill:TS.INK});
  }
  // merdiven
  const st=`M150,1476 H415 V1276 H665 V1076 H930`,sp=eIO(P(t,6.6,7.8));g+=PEN.stroke(st,0,sp,{lw:8,c:TS.INK});if(sp>0&&sp<1)pen=PEN.at(st,sp);
  const ar=`M780,960 L900,860 M840,856 L902,858 L902,918`,ap=eIO(P(t,8.0,8.6));g+=PEN.stroke(ar,0,ap,{lw:11});if(ap>0&&ap<1)pen=PEN.at(ar,ap);
  g+=PEN.note('v1n2','bir kere kur',165,1090,72,P(t,8.7,9.3),0,{fill:TS.INK});
  // kartlar
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*2*Math.PI/3+2*Math.PI*S.spin,c=[CX+R*Math.cos(a),CY+R*Math.sin(a)],u=eIO(P(t,6.3+i*.25,7.5+i*.25)),x=lerp(c[0],SX[i],u),y=lerp(c[1],SY[i],u)-Math.sin(Math.PI*u)*90;
   const pop=t<.01?1:1;g+=card(x,y,TASKS[i],pop,Math.sin(a*2)*3*(1-u))}
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/><g transform="${ENDTR(S.end)}"><g transform="${ZTR(t)}">${g}</g></g>`;
  s+=HOOK(t)+CLOSE(t)+WM2(false);if(pen)s+=PENCIL(ENDMP(ZMP(pen,t),S.end));
  return s}};
})();

/* ---------- v2 DEFTER: noktalı defter, eskiz çift çizgi, fosforlu kalem, yapışkan notlar ---------- */
const V2=(function(){
 const CX=540,CY=1210,R=280,SX=[300,540,780],SY=[1420,1220,1020];
 const sk=(d,lw=6,c=TS.INK,op=1)=>`<g opacity="${f2(op)}">${tsLine(d,lw,c)}<g transform="translate(3 -2)">${tsLine(d,lw*.45,c,.45)}</g></g>`;
 const sticky=(x,y,s,rot)=>`<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(rot)})"><rect x="-112" y="-52" width="224" height="112" fill="${TS.SH}" opacity=".12" transform="translate(6 10)"/><rect x="-112" y="-56" width="224" height="112" fill="${SG.SAGE}"/><rect x="-40" y="-68" width="80" height="26" fill="#FFFDF8" opacity=".75" transform="rotate(-4)"/>${T(0,18,s,{f:FC,size:64,w:700,anchor:'middle'})}</g>`;
 return {id:'v2',dur:15,bg:TS.BG,render(t){
  const S=STORY(t);let g='',pen=null;
  const rOp=1-P(t,6.2,7.0);
  if(rOp>0){
   // eskiz çember + ↻ okları
   const ring=PEN.ring(CX,CY,R,1,2.1,.25);g+=sk(ring,6,TS.INK,rOp);
   const a0=2*Math.PI*S.spin;for(let k=0;k<2;k++){const a=a0+k*Math.PI+.4,p=[CX+(R+60)*Math.cos(a),CY+(R+60)*Math.sin(a)],arc=`M${f2(CX+(R+60)*Math.cos(a-.5))},${f2(CY+(R+60)*Math.sin(a-.5))} A${R+60},${R+60} 0 0 1 ${f2(p[0])},${f2(p[1])}`,dx=-Math.sin(a),dy=Math.cos(a),nx=Math.cos(a),ny=Math.sin(a);
    g+=PEN.stroke(arc,0,1,{lw:8,c:TS.INK,op:rOp})+PEN.stroke(`M${f2(p[0]-dx*26+nx*16)},${f2(p[1]-dy*26+ny*16)} L${f2(p[0])},${f2(p[1])} L${f2(p[0]-dx*26-nx*16)},${f2(p[1]-dy*26-ny*16)}`,0,1,{lw:8,c:TS.INK,op:rOp})}
   // ortada takvim yaprağı
   g+=`<g opacity="${f2(rOp)}"><rect x="${CX-120}" y="${CY-110}" width="240" height="210" fill="${TS.PAPER}"/>${sk(`M${CX-120},${CY-110} h240 v210 h-240 Z M${CX-120},${CY-50} h240`,5)}${T(CX,CY+66,DAYS[S.day],{f:FC,size:112,w:700,anchor:'middle'})}</g>`;
   g+=PEN.note('v2n1','yine baştan...',600,1640,70,P(t,4.6,5.2),P(t,6.0,6.3),{fill:TS.INK});
   const ul=`M600,1660 q120,14 250,-4`,up=eIO(P(t,5.2,5.6));g+=PEN.stroke(ul,0,up,{lw:8,op:rOp});if(up>0&&up<1)pen=PEN.at(ul,up);
  }
  // merdiven eskizi + ok
  const st=`M150,1478 H418 V1278 H662 V1078 H920`,sp=eIO(P(t,6.6,7.8));if(sp>0)g+=`<g opacity="${f2(Math.min(1,sp*3))}">${PEN.stroke(st,0,sp,{lw:7,c:TS.INK})}<g transform="translate(3 -2)">${PEN.stroke(st,0,sp,{lw:3,c:TS.INK,op:.45})}</g></g>`;if(sp>0&&sp<1)pen=PEN.at(st,sp);
  const ar=`M770,960 L895,850 M830,846 L898,848 L898,914`,ap=eIO(P(t,8.0,8.6));g+=PEN.stroke(ar,0,ap,{lw:11});if(ap>0&&ap<1)pen=PEN.at(ar,ap);
  // fosforlu vurgu + not
  const hp=eIO(P(t,8.7,9.2));if(hp>0)g+=`<rect x="145" y="1048" width="${f2(330*hp)}" height="54" fill="${SG.SAGE}" opacity=".85" transform="rotate(-2 100 1075)"/>`;
  g+=PEN.note('v2n2','bir kere kur',165,1090,74,P(t,8.7,9.3),0,{fill:TS.INK});
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*2*Math.PI/3+2*Math.PI*S.spin,c=[CX+R*Math.cos(a),CY+R*Math.sin(a)],u=eIO(P(t,6.3+i*.25,7.5+i*.25));
   g+=sticky(lerp(c[0],SX[i],u),lerp(c[1],SY[i],u)-Math.sin(Math.PI*u)*90,TASKS[i],lerp([-6,4,-3][i]+Math.sin(a)*4,[-3,2,-2][i],u))}
  let s=`<defs><pattern id="v2dot" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2.6" fill="#CFC5B4"/></pattern></defs><rect width="1080" height="1920" fill="${TS.BG}"/><rect width="1080" height="1920" fill="url(#v2dot)"/>`;
  s+=`<g transform="${ENDTR(S.end)}"><g transform="${ZTR(t)}">${g}</g></g>`;
  // kancada "dönüyorsun" altına fosforlu
  s+=HOOK(t)+CLOSE(t)+WM2(false);if(pen)s+=PRING(ENDMP(ZMP(pen,t),S.end));
  return s}};
})();

/* ---------- v3 KESİK KÂĞIT: katmanlı kâğıt, düz ofset gölgeler, ada çayı tabak ---------- */
const V3=(function(){
 const CX=540,CY=1200,R=270,SX=[300,540,780],SY=[1430,1230,1030];
 const sh=(inner,dx=10,dy=14)=>`<g transform="translate(${dx} ${dy})" opacity=".16">${inner.replace(/fill="[^"]*"/g,`fill="${TS.SH}"`)}</g>${inner}`;
 const chip=(x,y,s,rot,sc)=>`<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(rot)}) scale(${f2(sc)})">${sh(`<rect x="-120" y="-50" width="240" height="100" rx="50" fill="${TS.PAPER}"/>`)}${T(0,14,s,{f:FF,size:40,w:700,anchor:'middle'})}</g>`;
 return {id:'v3',dur:15,bg:TS.BG,render(t){
  const S=STORY(t);let g='',pen=null;
  const rOp=1-P(t,6.75,6.9),rs=1-eInBack(P(t,6.2,6.9))*.999;
  if(rOp>0){let r='';
   r+=sh(`<circle cx="${CX}" cy="${CY}" r="${R+110}" fill="#E3DACB"/>`,14,18);
   r+=`<circle cx="${CX}" cy="${CY}" r="${R+40}" fill="${SG.SAGED}"/><circle cx="${CX}" cy="${CY}" r="${R-40}" fill="#E3DACB"/>`;
   r+=sh(`<circle cx="${CX}" cy="${CY}" r="120" fill="${TS.PAPER}"/>`,8,10);
   const pk=spr(P(t,2.6+S.day*.68,3.3+S.day*.68)*1.2);r+=`<g transform="translate(${CX} ${CY}) scale(${f2(t<2.6?1:.85+.15*pk)})">${T(0,32,DAYS[S.day],{f:FF,size:92,w:800,anchor:'middle'})}</g>`;
   g+=`<g opacity="${f2(rOp)}" transform="translate(${CX} ${CY}) scale(${f2(rs)}) translate(${-CX} ${-CY})">${r}</g>`;
   const lb=`<g transform="rotate(-4 760 1650)">${sh(`<rect x="560" y="1600" width="400" height="96" rx="10" fill="${TS.PAPER}"/>`,8,10)}${T(760,1664,'yine baştan',{f:FC,size:64,w:700,anchor:'middle',fill:TS.INK})}</g>`;
   const lp=spr(P(t,4.6,5.4)),lo=1-P(t,6.0,6.3);if(lp>0&&lo>0)g+=`<g opacity="${f2(lo)}" transform="translate(760 1650) scale(${f2(lp)}) translate(-760 -1650)">${lb}</g>`;
  }
  // kâğıt merdiven blokları
  for(let i=0;i<3;i++){const p=spr(P(t,6.5+i*.3,7.5+i*.3)*1.1);if(p<=0)continue;const x0=SX[i]-125,top=SY[i]+50,h=(1560-top)*p;
   g+=sh(`<rect x="${x0}" y="${f2(1560-h)}" width="250" height="${f2(h)}" fill="${[SG.SAGEL,SG.SAGE,SG.SAGED][i]}"/>`,12,0)}
  // turuncu ok (kalem çizer)
  const ar=`M790,940 L900,840 M838,836 L902,838 L902,902`,ap=eIO(P(t,8.0,8.6));g+=PEN.stroke(ar,0,ap,{lw:14});if(ap>0&&ap<1)pen=PEN.at(ar,ap);
  const lb2=spr(P(t,8.7,9.5));if(lb2>0)g+=`<g transform="translate(290 1040) rotate(-5) scale(${f2(lb2)})">${sh(`<rect x="-150" y="-50" width="300" height="96" rx="10" fill="${TS.PAPER}"/>`,8,10)}${T(0,16,'bir kere kur',{f:FC,size:64,w:700,anchor:'middle',fill:TS.INK})}</g>`;
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*2*Math.PI/3+2*Math.PI*S.spin,c=[CX+R*Math.cos(a),CY+R*Math.sin(a)],u=eIO(P(t,6.3+i*.25,7.5+i*.25));
   g+=chip(lerp(c[0],SX[i],u),lerp(c[1],SY[i],u)-Math.sin(Math.PI*u)*110,TASKS[i],(1-u)*Math.sin(a)*6,1)}
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/><g transform="${ENDTR(S.end)}"><g transform="${ZTR(t)}">${g}</g></g>`;
  s+=HOOK(t)+CLOSE(t)+WM2(false);if(pen)s+=PRING(ENDMP(ZMP(pen,t),S.end));
  return s}};
})();

/* ---------- v4 İZOMETRİK: platform üstünde pist, küpler döner; sonra kolonlara çıkar ---------- */
const V4=(function(){
 const c30=.866,CX=540,CY=1240,RX=330,RY=190;
 const col=(top,l,r)=>({top,l,r});
 const CUBE=[col('#FFFDF8','#E3DACB','#C9BDA8'),col(SG.SAGEL,SG.SAGE,SG.SAGED),col('#FFFDF8','#E3DACB','#C9BDA8')];
 function box(x,y,a,h,c,lw=5){const T0=[x,y-h-a*.5],T1=[x+a*c30,y-h],T2=[x,y-h+a*.5],T3=[x-a*c30,y-h],G1=[x+a*c30,y],G2=[x,y+a*.5],G3=[x-a*c30,y];const pp=a=>a.map(p=>f2(p[0])+','+f2(p[1])).join(' ');
  return `<polygon points="${pp([T3,T2,G2,G3])}" fill="${c.l}" stroke="${TS.INK}" stroke-width="${lw}" stroke-linejoin="round"/><polygon points="${pp([T2,T1,G1,G2])}" fill="${c.r}" stroke="${TS.INK}" stroke-width="${lw}" stroke-linejoin="round"/><polygon points="${pp([T0,T1,T2,T3])}" fill="${c.top}" stroke="${TS.INK}" stroke-width="${lw}" stroke-linejoin="round"/>`}
 const tag=(x,y,s)=>`<g transform="translate(${f2(x)} ${f2(y)}) scale(.82)"><rect x="-92" y="-38" width="184" height="62" rx="31" fill="${TS.INK}"/>${T(0,6,s,{f:FF,size:32,w:700,anchor:'middle',fill:TS.PAPER})}<path d="M-10,24 L0,38 L10,24 Z" fill="${TS.INK}"/></g>`;
 const COLS=[[330,1430],[540,1310],[750,1190]],CH=[90,200,310];
 return {id:'v4',dur:15,bg:TS.BG,render(t){
  const S=STORY(t);let g='',pen=null;
  const pOp=1-P(t,6.2,7.0);
  // platform (izometrik kare) ve pist
  if(pOp>0){let p='';p+=box(CX,CY+40,520,46,col('#F6F1E8','#E3DACB','#CDBFA9'),5);
   const ey=CY+40-46;p+=`<ellipse cx="${CX}" cy="${ey}" rx="${RX+40}" ry="${RY+23}" fill="${SG.SAGE}" stroke="${TS.INK}" stroke-width="5"/><ellipse cx="${CX}" cy="${ey}" rx="${RX-40}" ry="${RY-23}" fill="#F6F1E8" stroke="${TS.INK}" stroke-width="5"/>`;
   // pist üstünde kesik çizgi
   p+=`<ellipse cx="${CX}" cy="${ey}" rx="${RX}" ry="${RY}" fill="none" stroke="${TS.PAPER}" stroke-width="5" stroke-dasharray="22 22" stroke-dashoffset="${f2(-S.spin*400)}"/>`;
   // ortada gün kulesi
   p+=T(CX,CY+470,DAYS[S.day],{f:FF,size:110,w:800,anchor:'middle'});
   g+=`<g opacity="${f2(pOp)}">${p}</g>`;
   g+=PEN.note('v4n1','yine baştan',640,1600,70,P(t,4.6,5.2),P(t,6.0,6.3),{fill:TS.INK});
  }
  // kolonlar yükselir
  for(let i=0;i<3;i++){const p=eOut(P(t,6.5+i*.3,7.4+i*.3));if(p<=0)continue;g+=box(COLS[i][0],COLS[i][1],170,CH[i]*p,i===2?col('#FFFDF8',SG.SAGE,SG.SAGED):col('#FFFDF8','#E3DACB','#C9BDA8'))}
  // küpler: elips üstünde döner (derinlik sırası), sonra kolonların tepesine
  const ey=CY-6,items=[];
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*2*Math.PI/3+2*Math.PI*S.spin,c=[CX+RX*Math.cos(a),ey+RY*Math.sin(a)],u=eIO(P(t,6.9+i*.3,7.9+i*.3)),tx=COLS[i][0],ty=COLS[i][1]-CH[i];
   const x=lerp(c[0],tx,u),y=lerp(c[1],ty,u)-Math.sin(Math.PI*u)*120;items.push({y:c[1]*(1-u)+9999*u,s:box(x,y,92,84,CUBE[i])+tag(x,y-200,TASKS[i])})}
  items.sort((a,b)=>a.y-b.y).forEach(o=>g+=o.s);
  // turuncu bayrak/ok
  const ar=`M780,800 L890,700 M828,696 L892,698 L892,762`,ap=eIO(P(t,8.2,8.8));g+=PEN.stroke(ar,0,ap,{lw:13});if(ap>0&&ap<1)pen=PEN.at(ar,ap);
  g+=PEN.note('v4n2','bir kere kur',110,1000,72,P(t,8.9,9.5),0,{fill:TS.INK});
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/><g transform="${ENDTR(S.end)}"><g transform="${ZTR(t)}">${g}</g></g>`;
  s+=HOOK(t)+CLOSE(t)+WM2(false);if(pen)s+=PRING(ENDMP(ZMP(pen,t),S.end));
  return s}};
})();

/* ---------- v5 YUMUŞAK 3D: hamur gibi halka, yuvarlak jetonlar; sonra büyüyen sütunlar ---------- */
const V5=(function(){
 const CX=540,CY=1200,RX=320,RY=165;
 // yumuşak 3D jeton (alt yüz + üst yüz + parlama), düz renkler
 function token(x,y,s,c,sc=1){return `<g transform="translate(${f2(x)} ${f2(y)}) scale(${f2(sc)})"><ellipse cx="0" cy="40" rx="130" ry="22" fill="${TS.SH}" opacity=".14"/><rect x="-120" y="-36" width="240" height="88" rx="44" fill="${c[1]}"/><rect x="-120" y="-56" width="240" height="88" rx="44" fill="${c[0]}"/>${T(0,2,s,{f:FF,size:38,w:700,anchor:'middle',fill:c[2]})}</g>`}
 const TC=[['#FFFDF8','#D9CDB8',TS.INK],[SG.SAGEL,SG.SAGED,TS.INK],[SG.CH,'#121212','#FFFDF8']];
 function pillar(x,base,h,c){const w=210;return `<ellipse cx="${x}" cy="${base+6}" rx="${w/2+18}" ry="26" fill="${TS.SH}" opacity=".14"/><path d="M${x-w/2},${base-h} V${base} A${w/2},34 0 0 0 ${x+w/2},${base} V${base-h} Z" fill="${c[1]}"/><ellipse cx="${x}" cy="${base-h}" rx="${w/2}" ry="34" fill="${c[0]}"/>`}
 const PX=[300,540,780],PH=[180,330,480],PB=1560;
 return {id:'v5',dur:15,bg:TS.BG,render(t){
  const S=STORY(t);let g='',pen=null;
  const rOp=1-P(t,6.2,7.0);
  const items=[];
  if(rOp>0){let r='';
   // halka (torus): alt gövde + üst yüz + iç delik
   r+=`<ellipse cx="${CX}" cy="${CY+70}" rx="${RX+120}" ry="${RY+60}" fill="${TS.SH}" opacity=".1"/>`;
   r+=`<ellipse cx="${CX}" cy="${CY+34}" rx="${RX+80}" ry="${RY+46}" fill="${SG.SAGED}"/><ellipse cx="${CX}" cy="${CY}" rx="${RX+80}" ry="${RY+46}" fill="${SG.SAGE}"/>`;
   r+=`<ellipse cx="${CX}" cy="${CY}" rx="${RX-80}" ry="${RY-46}" fill="${SG.SAGED}"/><ellipse cx="${CX}" cy="${CY+26}" rx="${RX-80}" ry="${RY-52}" fill="${TS.BG}"/>`;
   g+=`<g opacity="${f2(rOp)}">${r}</g>`;
   // ortada yüzen gün balonu
   g+=`<g opacity="${f2(rOp)}">${T(CX,CY+RY+190,DAYS[S.day],{f:FF,size:110,w:800,anchor:'middle'})}</g>`;
   g+=PEN.note('v5n1','yine baştan',640,1700,70,P(t,4.6,5.2),P(t,6.0,6.3),{fill:TS.INK});
  }
  for(let i=0;i<3;i++){const p=spr(P(t,6.5+i*.3,7.6+i*.3)*1.1,1.2,5);if(p<=0)continue;g+=pillar(PX[i],PB,PH[i]*p,i===2?[SG.SAGEL,SG.SAGE]:['#FFFDF8','#E3DACB'])}
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*2*Math.PI/3+2*Math.PI*S.spin,c=[CX+RX*Math.cos(a),CY+RY*Math.sin(a)-30],u=eIO(P(t,6.9+i*.3,7.9+i*.3)),dep=.82+.18*(Math.sin(a)+1)/2;
   const x=lerp(c[0],PX[i],u),y=lerp(c[1],PB-PH[i]-30,u)-Math.sin(Math.PI*u)*130;items.push({z:Math.sin(a)*(1-u)+u*2,s:token(x,y,TASKS[i],TC[i],lerp(dep,1,u))})}
  // halkanın arkasındakiler önce
  items.sort((a,b)=>a.z-b.z).forEach(o=>g+=o.s);
  const ar=`M820,1000 L915,905 M853,901 L917,903 L917,967`,ap=eIO(P(t,8.2,8.8));g+=PEN.stroke(ar,0,ap,{lw:14});if(ap>0&&ap<1)pen=PEN.at(ar,ap);
  g+=PEN.note('v5n2','bir kere kur',165,990,72,P(t,8.9,9.5),0,{fill:TS.INK});
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/><g transform="${ENDTR(S.end)}"><g transform="${ZTR(t)}">${g}</g></g>`;
  s+=HOOK(t)+CLOSE(t)+WM2(false);if(pen)s+=PRING(ENDMP(ZMP(pen,t),S.end));
  return s}};
})();
VIDEOS['v1-kalem-plus']=V1;VIDEOS['v2-defter']=V2;VIDEOS['v3-kagit']=V3;VIDEOS['v4-izometrik']=V4;VIDEOS['v5-yumusak3d']=V5;
