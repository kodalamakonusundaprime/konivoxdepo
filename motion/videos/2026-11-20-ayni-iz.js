/* ayni-iz (sözün yerine resim): telefonda boş profil ızgarası; kalem her kareye başka bir desen çizer (çizgili, puantiyeli…).
   "?" ve "akılda kalan yok" notu. "tarzımız farklı" kartı gelir, kalem üstünü çizer, kart uçar; yerine tek bir turuncu köşe çizilir,
   köşe kopyaları zıplayarak her karenin sağ üst köşesine iner. */
const TAI=(function(){
 const BS=150,GP=14,GX=301,GY=860,C=1150;
 const box=k=>{const i=k%3,j=Math.floor(k/3);return [GX+i*(BS+GP),GY+j*(BS+GP)]};
 // her kare için desen yolu (kalemle çizilir)
 function pat(k){const [x,y]=box(k),m=22,a=x+m,b=y+m,w=BS-2*m;let d='';
  switch(k){
   case 0: for(let i=0;i<5;i++){const o=i*w/4;d+=`M${f2(a)},${f2(b+o)} L${f2(a+o)},${f2(b)} `}for(let i=1;i<5;i++){const o=i*w/4;d+=`M${f2(a+o)},${f2(b+w)} L${f2(a+w)},${f2(b+o)} `}break;
   case 1: for(let i=0;i<3;i++)for(let j=0;j<3;j++){const cx=a+w*(i+.5)/3,cy=b+w*(j+.5)/3;d+=`M${f2(cx+9)},${f2(cy)} A9,9 0 1 0 ${f2(cx-9)},${f2(cy)} A9,9 0 1 0 ${f2(cx+9)},${f2(cy)} `}break;
   case 2: for(let r=0;r<4;r++){const yy=b+12+r*w/4;d+=`M${a},${f2(yy)} q${w/8},-16 ${w/4},0 t${w/4},0 t${w/4},0 t${w/4},0 `}break;
   case 3: for(let i=0;i<4;i++){const o=i*w/3;d+=`M${f2(a+o)},${b} V${b+w} M${a},${f2(b+o)} H${a+w} `}break;
   case 4: d=`M${x+40},${y+BS-30} L${x+BS/2},${y+28} L${x+BS-40},${y+BS-30} M${x+56},${y+BS-66} H${x+BS-56}`;break;
   case 5: for(let r=1;r<=3;r++){const R=r*16,cx=x+BS/2,cy=y+BS/2;d+=`M${cx+R},${cy} A${R},${R} 0 1 0 ${cx-R},${cy} A${R},${R} 0 1 0 ${cx+R},${cy} `}break;
   case 6: for(let r=0;r<3;r++){const yy=b+18+r*w/3;d+=`M${a},${f2(yy)} l${w/6},-18 l${w/6},18 l${w/6},-18 l${w/6},18 l${w/6},-18 l${w/6},18 `}break;
   case 7: for(let r=0;r<5;r++){const yy=b+r*w/4;d+=`M${a},${f2(yy)} H${f2(a+w*(r%2?.7:1))} `}break;
   case 8: for(let i=0;i<3;i++)for(let j=0;j<3;j++){const cx=a+w*(i+.5)/3,cy=b+w*(j+.5)/3;d+=`M${f2(cx-10)},${f2(cy)} h20 M${f2(cx)},${f2(cy-10)} v20 `}break;
  }return d}
 const PT=k=>2.8+k*.3;
 const TRI=(x,y,s)=>`M${f2(x-s)},${f2(y)} L${f2(x)},${f2(y)} L${f2(x)},${f2(y+s)} Z`;
 const BIG=[600,1040],HT=k=>8.95+k*.1;
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.12*end,oy=200*end;
  let s=TH.bg()+`<g transform="translate(540 ${f2(C+oy)}) scale(${f2(sc)}) translate(-540 ${-C})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,C+oy+(q[1]-C)*sc]}return [s,pen]}
 return {id:'tai',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  // telefon
  g+=`<rect x="270" y="${740+18}" width="540" height="680" rx="56" fill="${TS.SH}" opacity=".1"/><rect x="270" y="740" width="540" height="680" rx="56" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="7"/>`;
  g+=`<circle cx="336" cy="805" r="30" fill="#E3DACB" stroke="${TS.INK}" stroke-width="5"/>`+T(384,818,'atolye.nur',{f:FF,size:34,w:700});
  // ızgara
  for(let k=0;k<9;k++){const [x,y]=box(k),p=eIO(P(t,PT(k),PT(k)+.28)),cx=x+BS/2,cy=y+BS/2;
   const bump=p>=1?Math.sin(Math.PI*P(t,PT(k)+.28,PT(k)+.55))*10:0,rot=p>=1?TH.sway(t,k,2.2)*(1-eIO(P(t,8.6,9.0))*.7):0;
   let b=`<rect x="${x}" y="${y}" width="${BS}" height="${BS}" rx="8" fill="${p>0?TS.PAPER:'#E3DACB'}"${p>0?` stroke="${TS.INK}" stroke-width="4"`:''}/>`;
   const d=pat(k);if(p>0)b+=p<1?PEN.stroke(d,0,p,{lw:5,c:TS.INK}):tsLine(d,5);
   // turuncu köşe (zıplayarak iner)
   const hu=eIO(P(t,HT(k),HT(k)+.4));
   if(hu>=1)b+=`<path d="${TRI(x+BS-6,y+6,46)}" fill="${O}"/>`;
   g+=`<g transform="translate(0 ${f2(-bump)}) rotate(${f2(rot)} ${cx} ${cy})">${b}</g>`;
   if(p>0&&p<1)pen=PEN.at(d,p);
   if(hu>0&&hu<1){const dst=[x+BS-6,y+6],q=TH.hop(BIG,dst,hu,120),s=lerp(110,46,hu);g+=`<path d="${TRI(q[0],q[1],s)}" fill="${O}"/>`}}
  // soru işareti + not
  const qd='M150,960 c0,-54 80,-54 80,0 c0,34 -40,34 -40,70 M190,1094 v2',qp=eIO(P(t,6.0,6.6)),qo=1-P(t,7.4,7.8);
  if(qp>0&&qo>0){g+=PEN.stroke(qd,0,qp,{lw:10,op:qo});if(qp<1)pen=PEN.at(qd,qp)}
  g+=PEN.note('tain1','her gün başka',350,1520,66,P(t,4.6,5.2),P(t,5.8,6.0),{fill:TS.INK});
  g+=PEN.note('tain2','akılda kalan yok',330,1520,66,P(t,6.6,7.1),P(t,7.6,7.8),{fill:TS.INK});
  // "tarzımız farklı" kartı: gelir, üstü çizilir, uçar
  const cin=eOutBack(P(t,7.3,7.65)),cfly=eIO(P(t,8.3,8.75));
  if(cin>0&&cfly<1){const cy=1110-260*cfly;let c=TH.card(540,cy,'tarzımız farklı',{w:420,h:104,size:50,sc:cin,rot:-3+TH.sway(t,7,1.5)});
   const sd=`M352,${f2(cy-2)} L728,${f2(cy-14)}`,sp=eIO(P(t,7.8,8.2));c+=PEN.stroke(sd,0,sp,{lw:11});if(sp>0&&sp<1)pen=PEN.at(sd,sp);
   g+=`<g opacity="${f2(1-cfly)}">${c}</g>`}
  // büyük turuncu köşe: kalem çizer, kopyaları ızgaraya zıplar
  const bp=eIO(P(t,8.55,8.9)),bfade=P(t,HT(8),HT(8)+.3);
  if(bp>0&&bfade<1){const d=TRI(BIG[0],BIG[1],110);if(bp>=1)g+=`<path d="${d}" fill="${O}" opacity="${f2(1-bfade)}"/>`;g+=PEN.stroke(d,0,bp,{lw:10,op:1-bfade});if(bp<1)pen=PEN.at(d,bp)}
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Her gönderinde aynı iz',76,-9,2.4,t,{fill:TS.INK})+CT(540,500,'varsa, seni adından',76,-9,2.45,t,{fill:TS.INK})+CT(540,600,'önce tanırlar.',76,-9,2.5,t,{fill:TS.INK});
  const L2='her gün tutturmak.';
  s+=CT(540,500,'Asıl iş, bunu',100,10.3,99,t,{fill:TS.INK})+CT(540,620,`her gün <tspan fill="${O}">tutturmak</tspan>.`,100,10.5,99,t,{fill:TS.INK,raw:1});
  if(t>11){const b=BOXC(L2,100,700,540,620,8,16),d=`M${f2(b.x0-6)},${f2(b.cy+60)} q${f2(b.w/2)},14 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)pp=PEN.at(d,p)}
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['ayni-iz']=TAI;
