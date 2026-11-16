/* iki-dukkan (karşılaştırma): iki aynı dükkân aynı gün satış yapar (fiş). Soldaki susar, müşterisi kesik izle uzaklaşır;
   sağdaki her ay küçük bir haber (mesaj balonu) gönderir, müşteri her balonla geri gelir, ikinci fiş çıkar. */
const TID=(function(){
 const BASE=1330,WD=280,HB=240,SX=[290,790],DY=1400;
 const ntip=(x,y,size,s,p)=>[x-12+(size*s.length*.42+60)*p,y-size*.3];
 function shop(cx){const x0=cx-WD/2,x1=cx+WD/2,top=BASE-HB;let s='';
  s+=`<rect x="${x0}" y="${top+14}" width="${WD}" height="${HB}" fill="${TS.SH}" opacity=".08"/>`;
  s+=`<path d="M${x0-22},${top} L${cx},${top-105} L${x1+22},${top} Z" fill="#E3DACB"/>`+tsLine(`M${x0-22},${top} L${cx},${top-105} L${x1+22},${top} Z`,6);
  s+=`<rect x="${x0}" y="${top}" width="${WD}" height="${HB}" fill="${TS.PAPER}"/>`+tsLine(`M${x0},${BASE} V${top} H${x1} V${BASE}`,6);
  s+=`<rect x="${x0+28}" y="${top+42}" width="86" height="86" fill="#F4EEE3"/>`+tsLine(`M${x0+28},${top+42} h86 v86 h-86 Z M${x0+71},${top+42} v86 M${x0+28},${top+85} h86`,5);
  s+=tsLine(`M${x1-118},${BASE} V${top+70} h80 V${BASE}`,5)+`<circle cx="${x1-52}" cy="${top+160}" r="5" fill="${TS.INK}"/>`;
  return s}
 // fiş: kâğıt, tırtıklı alt kenar, ₺
 const FW=120,FH=150;
 function fisD(x,y){let d=`M${x-FW/2},${y-FH/2} H${x+FW/2} V${y+FH/2}`;for(let i=0;i<6;i++)d+=` l${-FW/12},-12 l${-FW/12},12`;return d+' Z'}
 function fis(x,y,p,rot=0){const d=fisD(x,y);let s=`<g transform="rotate(${f2(rot)} ${x} ${y})">`;
  if(p>=1)s+=`<path d="${d}" fill="${TS.SH}" opacity=".1" transform="translate(0 12)"/><path d="${d}" fill="${TS.PAPER}"/>`+tsLine(d,6)+T(x,y+10,'₺',{f:FF,size:64,w:700,anchor:'middle'})+tsLine(`M${x-34},${y+44} h68`,4,TS.MUTE);
  else s+=PEN.stroke(d,0,p,{lw:7,c:TS.INK});
  return s+'</g>'}
 function balloon(x,y,sc){return `<g transform="translate(${f2(x)} ${f2(y)}) scale(${f2(sc)})"><path d="M-46,-30 h92 q12,0 12,12 v38 q0,12 -12,12 h-56 l-20,18 l2,-18 h-18 q-12,0 -12,-12 v-38 q0,-12 12,-12 Z" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="-20" cy="1" r="5" fill="${TS.INK}"/><circle cx="0" cy="1" r="5" fill="${TS.INK}"/><circle cx="20" cy="1" r="5" fill="${TS.INK}"/></g>`}
 const dot=(x,y,op=1)=>`<g opacity="${f2(op)}"><circle cx="${f2(x)}" cy="${f2(y+16)}" r="24" fill="${TS.SH}" opacity=".12"/><circle cx="${f2(x)}" cy="${f2(y)}" r="24" fill="${TS.INK}"/></g>`;
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.22*end,oy=170*end,C=1150;
  let s=TH.bg()+`<g transform="translate(540 ${f2(C+oy)}) scale(${f2(sc)}) translate(-540 ${-C})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,C+oy+(q[1]-C)*sc]}return [s,pen]}
 const BT=[7.7,8.3,8.9];
 return {id:'tid',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  const lf=eIO(P(t,5.3,6.0));
  g+=tsLine(`M100,${BASE} H980`,5,TS.INK);
  // sol dükkân solar
  g+=`<g opacity="${f2(1-.6*lf)}" transform="rotate(${f2(TH.sway(t,0,.8))} 290 ${BASE})">${shop(SX[0])}</g>`;
  g+=`<g transform="rotate(${f2(TH.sway(t,1,.8))} 790 ${BASE})">${shop(SX[1])}</g>`;
  // aynı gün aynı satış: kalem iki fiş çizer, fişler zıplar
  for(let i=0;i<2;i++){const a=2.8+i*.7,p=eIO(P(t,a,a+.6));if(p<=0)continue;const x=SX[i],y=860;
   const bump=Math.sin(Math.PI*P(t,a+.6,a+.95))*22,op=i?1:1-.75*eIO(P(t,6.2,6.8));
   g+=`<g opacity="${f2(op)}" transform="translate(0 ${f2(-bump)})">${fis(x,y,p,TH.sway(t,i+2,3)*(p>=1?1:0))}</g>`;
   if(p<1)pen=PEN.at(fisD(x,y),p)}
  g+=PEN.note('tidn1','aynı gün, aynı satış',300,700,62,P(t,4.3,4.9),P(t,5.6,5.8),{fill:TS.INK});
  {const p=P(t,4.3,4.9);if(p>0&&p<1&&!pen)pen=ntip(300,700,62,'aynı gün, aynı satış',p)}
  // müşteriler: ikisi de uzaklaşır; sol iz bırakarak kaybolur, sağ her balonla geri gelir
  const wl=eIO(P(t,5.4,7.2)),lx=lerp(SX[0],120,wl);
  if(wl>0){let tr='';for(let x=SX[0]-30;x>lx+30;x-=40)tr+=`M${x},${DY+40} h-18 `;if(tr)g+=tsLine(tr,5,TS.MUTE,.8*(1-P(t,7.2,7.6)))}
  g+=dot(lx,DY-Math.abs(Math.sin(wl*Math.PI*5))*14*(wl<1?1:0),1-P(t,7.0,7.5));
  g+=PEN.note('tidn2','ses yok',150,1560,66,P(t,6.0,6.5),P(t,7.6,7.8),{fill:TS.INK});
  {const p=P(t,6.0,6.5);if(p>0&&p<1&&!pen)pen=ntip(150,1560,66,'ses yok',p)}
  const wr=eIO(P(t,5.4,7.2));let rx=lerp(SX[1],950,wr),ry=DY;
  BT.forEach((b,i)=>{const back=eIO(P(t,b+.45,b+.8));if(back>0){const from=950-(950-SX[1])*i/3,to=950-(950-SX[1])*(i+1)/3,hp=TH.hop([from,DY],[to,DY],back,50);if(back<1||t<BT[i+1]||i===2){if(t>=b+.45){rx=hp[0];ry=hp[1]}}}});
  g+=dot(rx,ry);
  // balonlar: kalem çizer, müşteriye uçar
  BT.forEach((b,i)=>{const dp=eIO(P(t,b,b+.25)),fl=eIO(P(t,b+.25,b+.5));if(dp<=0||fl>=1)return;const sx=905,sy=945,tx=rx,ty=DY-70;
   if(fl<=0){const d=`M${sx-46},${sy-30} h92 q12,0 12,12 v38 q0,12 -12,12 h-56 l-20,18 l2,-18 h-18 q-12,0 -12,-12 v-38 q0,-12 12,-12 Z`;g+=PEN.stroke(d,0,dp,{lw:7,c:TS.INK});if(dp<1)pen=PEN.at(d,dp);if(dp>=1)g+=balloon(sx,sy,1)}
   else{const p=TH.hop([sx,sy],[tx,ty],fl,60);g+=balloon(p[0],p[1],1-.4*fl)}});
  // ay sayacı
  const mo=BT.filter(b=>t>=b).length,cop=eOutBack(P(t,7.5,7.8));
  if(cop>0){const bump=mo?Math.sin(Math.PI*P(t,BT[mo-1],BT[mo-1]+.3))*12:0;g+=TH.card(790,1540-bump,`${Math.max(1,mo)}. ay`,{w:200,h:86,size:46,sc:cop,rot:TH.sway(t,5,2)})}
  // ikinci fiş: sağ dükkânda üst üste
  const p2=eIO(P(t,9.4,9.85));if(p2>0){g+=fis(SX[1]+30,830,p2,4);if(p2<1)pen=PEN.at(fisD(SX[1]+30,830),p2)}
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Müşteri sadece kızınca',74,-9,2.4,t,{fill:TS.INK})+CT(540,500,'gitmez, unutunca da',74,-9,2.45,t,{fill:TS.INK})+CT(540,600,'gider.',74,-9,2.5,t,{fill:TS.INK});
  const L1='Müşteri, sesini';
  s+=CT(540,500,`Müşteri, <tspan fill="${O}">sesini</tspan>`,96,10.3,99,t,{fill:TS.INK,raw:1})+CT(540,620,'duyduğu kapıya döner.',96,10.5,99,t,{fill:TS.INK});
  if(t>11){const b=BOXC(L1,96,700,540,500,9,14),d=`M${f2(b.x0-6)},${f2(b.cy+58)} q${f2(b.w/2)},14 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)pp=PEN.at(d,p)}
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['iki-dukkan']=TID;
