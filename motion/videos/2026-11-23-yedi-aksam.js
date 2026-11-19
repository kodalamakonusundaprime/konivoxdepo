/* yedi-aksam (karşılaştırma): iki aynı hafta şeridi. Üstte kalem yedi kutuyu yedi ayrı akşamda tek tek doldurur (her kutuda ay);
   altta pazartesi sabahı (güneş + fincan) turuncu bir kıvılcım şeritte koşar, yedi kutu aynı anda taslakla dolar,
   kalem her birini tikler, kutular sırayla zıplayıp kendi gününe yerleşir. */
const TYA=(function(){
 const BW=100,GP=12,X0=154,Y1=900,Y2=1300,C=1150,DAY=['Pt','Sa','Ça','Pe','Cu','Ct','Pz'];
 const bx=i=>X0+i*(BW+GP);
 const lines=(x,y)=>`M${x+16},${y+48} h62 M${x+16},${y+66} h50 M${x+16},${y+84} h36`;
 const moon=(x,y,r=14)=>`M${f2(x)},${f2(y-r)} A${r},${r} 0 1 0 ${f2(x)},${f2(y+r)} A${f2(r*.55)},${r} 0 0 1 ${f2(x)},${f2(y-r)} Z`;
 const TOP=i=>2.7+i*.38;
 const DR=i=>6.55+i*.06,TK=i=>8.35+i*.17,HP=i=>9.6+i*.06;
 function strip(y){let s='';for(let i=0;i<7;i++){const x=bx(i);s+=`<rect x="${x}" y="${y+12}" width="${BW}" height="${BW}" rx="10" fill="${TS.SH}" opacity=".08"/>`;s+=T(x+BW/2,y+BW+46,DAY[i],{f:FF,size:30,w:700,anchor:'middle',fill:TS.MUTE})}return s}
 const cell=(x,y,fill)=>`<rect x="${x}" y="${y}" width="${BW}" height="${BW}" rx="10" fill="${fill}" stroke="${TS.INK}" stroke-width="5"/>`;
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.12*end,oy=170*end;
  let s=TH.bg()+`<g transform="translate(540 ${f2(C+oy)}) scale(${f2(sc)}) translate(-540 ${-C})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,C+oy+(q[1]-C)*sc]}return [s,pen]}
 return {id:'tya',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  g+=strip(Y1)+strip(Y2);
  // etiketler
  const l1=eOutBack(P(t,2.6,2.95)),l2=eOutBack(P(t,5.4,5.75));
  if(l1>0)g+=TH.sticky(250,820,'7 akşam',-4+TH.sway(t,1,2),{sc:l1,w:220,h:96,size:56});
  if(l2>0)g+=TH.sticky(250,1220,'1 sabah',3+TH.sway(t,2,2),{sc:l2,w:220,h:96,size:56});
  // üst şerit: her akşam bir kutu, ay belirir
  for(let i=0;i<7;i++){const x=bx(i),p=eIO(P(t,TOP(i),TOP(i)+.33)),y=Y1;
   g+=cell(x,y,p>0?TS.PAPER:'#E3DACB');
   if(p>0){const d=lines(x,y);g+=p<1?PEN.stroke(d,0,p,{lw:6,c:TS.INK}):tsLine(d,6);if(p<1)pen=PEN.at(d,p);
    const mo=eOutBack(P(t,TOP(i)+.2,TOP(i)+.45));if(mo>0){const my=y+26+Math.sin(t*2.4+i)*2;g+=`<g transform="translate(${x+78} ${f2(my)}) scale(${f2(mo)}) rotate(${f2(-20+TH.sway(t,i,6))})"><path d="${moon(0,0)}" fill="${TS.INK}"/></g>`}}}
  // alt şerit: güneş + fincan, kıvılcım, yedi taslak, tikler, zıplama
  const sun=`M520,1222 m22,0 a22,22 0 1 0 -44,0 a22,22 0 1 0 44,0 M498,1180 v-14 M532,1188 l10,-10 M464,1188 l-10,-10 M542,1222 h14 M454,1222 h-14`,sp=eIO(P(t,5.6,6.05));
  g+=PEN.stroke(sun,0,sp,{lw:6,c:TS.INK});if(sp>0&&sp<1)pen=PEN.at(sun,sp);
  const cup=`M590,1200 h56 l-6,46 q-1,8 -9,8 h-26 q-8,0 -9,-8 Z M646,1212 q18,0 16,14 q-2,12 -18,12`,cp=eIO(P(t,6.0,6.3));
  g+=PEN.stroke(cup,0,cp,{lw:6,c:TS.INK});if(cp>0&&cp<1)pen=PEN.at(cup,cp);
  let zz=`M${bx(0)-10},${Y2-30}`;for(let i=0;i<14;i++)zz+=` l${(7*(BW+GP))/14},${i%2?16:-16}`;
  const zp=eIO(P(t,6.3,6.95)),zo=1-P(t,7.3,7.7);if(zp>0&&zo>0){g+=PEN.stroke(zz,0,zp,{lw:8,op:zo});if(zp<1)pen=PEN.at(zz,zp)}
  for(let i=0;i<7;i++){const x=bx(i),hp=P(t,HP(i),HP(i)+.4),y=Y2-Math.sin(Math.PI*hp)*36,p=eIO(P(t,DR(i),DR(i)+.3)),ok=P(t,TK(i)+.1,TK(i)+.25);
   let c=cell(x,y,p>0?TS.PAPER:'#E3DACB');
   if(p>0){const d=lines(x,y);c+=PEN.stroke(d,0,p,{lw:6,c:mixC(TS.MUTE,TS.INK,ok),op:lerp(.55,1,ok)})}
   const ck=`M${x+64},${y+22} l10,11 l20,-24`,kp=eIO(P(t,TK(i),TK(i)+.15));c+=PEN.stroke(ck,0,kp,{lw:7});if(kp>0&&kp<1)pen=PEN.at(ck,kp);
   g+=`<g transform="rotate(${f2(t>10?TH.sway(t,i+3,2):0)} ${x+BW/2} ${y+BW/2})">${c}</g>`}
  g+=PEN.note('tyan1','yedi taslak',600,1530,66,P(t,7.1,7.6),P(t,8.1,8.3),{fill:TS.INK});
  g+=PEN.note('tyan2','okur, düzeltir, onaylarım',250,1530,60,P(t,8.4,9.0),0,{fill:TS.INK});
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Yedi akşamlık iş,',78,-9,2.4,t,{fill:TS.INK})+CT(540,500,'bir pazartesi sabahına',78,-9,2.45,t,{fill:TS.INK})+CT(540,600,'sığıyor.',78,-9,2.5,t,{fill:TS.INK});
  const L1='Akşamlarım';
  s+=CT(540,500,`<tspan fill="${O}">${L1}</tspan>`,108,10.3,99,t,{fill:TS.INK,raw:1})+CT(540,625,'bana kalır.',108,10.5,99,t,{fill:TS.INK});
  if(t>11){const b=BOXC(L1,108,700,540,500,0,L1.length-1),d=`M${f2(b.x0-6)},${f2(b.cy+64)} q${f2(b.w/2)},16 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)pp=PEN.at(d,p)}
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['yedi-aksam']=TYA;
