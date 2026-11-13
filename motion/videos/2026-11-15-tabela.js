/* tabela: boş tabela + 3 sn kronometre. Üç soru boş kalınca tabela yukarı kayıp gider; yenisi gelir, kalem doldurur. */
const TKB=(function(){
 const CX=540,SY=1130,SW=620,SH=380;
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.22*end,oy=300*end,CY=1150;
  let s=TH.bg()+`<g transform="translate(540 ${f2(CY+oy)}) scale(${f2(sc)}) translate(-540 ${-CY})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,CY+oy+(q[1]-CY)*sc]}return [s,pen]}
 const LY=[-90,10,110];
 function sign(dy,rot){const x0=CX-SW/2,y0=SY-SH/2+dy;let s=`<g transform="rotate(${f2(rot)} ${CX} ${SY+dy})">`;
  s+=tsLine(`M${CX-180},${y0+SH} V${y0+SH+190} M${CX+180},${y0+SH} V${y0+SH+190}`,10);
  s+=`<rect x="${x0}" y="${y0+18}" width="${SW}" height="${SH}" rx="22" fill="${TS.SH}" opacity=".1"/><rect x="${x0}" y="${y0}" width="${SW}" height="${SH}" rx="22" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="8"/>`;
  LY.forEach(l=>{s+=tsLine(`M${x0+60},${SY+dy+l+20} H${x0+SW-60}`,4,TS.MUTE,.45)});
  return s+'</g>'}
 return {id:'tkb',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  // tabela 1: yukarı kayar; tabela 2: aşağıdan zıplayarak gelir
  const up=eIO(P(t,5.4,6.2)),inn=eIO(P(t,7.0,7.6));
  const r1=TH.sway(t,0,1.6);
  if(up<1){const dy=-1500*up;g+=`<g opacity="${f2(1-up*.6)}">${sign(dy,r1)}`;
   const Q=['ne?','kime?','nerede?'];
   Q.forEach((q,i)=>{g+=PEN.note('tkbq'+i,q,CX-SW/2+70,SY+dy+LY[i]+16,72,P(t,3.0+i*.55,3.45+i*.55),0,{fill:TS.MUTE})});
   for(let i=0;i<3;i++){const a=P(t,3.0+i*.55,3.45+i*.55);if(a>0&&a<1)pen=[CX-SW/2+70+a*(72*Q[i].length*.42+60)-12,SY+LY[i]-6]}
   g+='</g>'}
  // kaydırma oku
  const ar=`M150,1560 V900 M110,950 L150,900 L190,950`,ap=eIO(P(t,4.9,5.5));
  g+=PEN.stroke(ar,0,ap,{lw:10,op:1-P(t,6.8,7.1)});if(ap>0&&ap<1)pen=PEN.at(ar,ap);
  g+=PEN.note('tkbn1','geçti.',420,1180,96,P(t,6.2,6.6),P(t,6.9,7.1),{fill:TS.INK});
  if(inn>0){const dy=900*(1-inn)-Math.sin(Math.PI*inn)*60;g+=sign(dy,TH.sway(t,3,1.6));
   const A=['el yapımı takı','hediye arayana','Konya · kargo var'];
   A.forEach((a,i)=>{const p=P(t,7.7+i*.5,8.15+i*.5);g+=PEN.note('tkba'+i,a,CX-SW/2+70,SY+dy+LY[i]+16,64,p,0,{fill:TS.INK});if(p>0&&p<1)pen=[CX-SW/2+70+p*(64*a.length*.42+60)-12,SY+LY[i]-6]})}
  // kronometre: 3 → 0, sonra yeni tabelada durur
  const n=t<3?3:t<3.7?3:t<4.4?2:t<5.1?1:t<7?0:3;
  const bmp=[3,3.7,4.4,5.1,7.3].reduce((a,x)=>a+Math.sin(Math.PI*P(t,x,x+.3))*12,0);
  const sx=800,sy=790-bmp;
  let w=`<circle cx="${sx}" cy="${sy+12}" r="92" fill="${TS.SH}" opacity=".1"/><circle cx="${sx}" cy="${sy}" r="92" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="8"/>`+tsLine(`M${sx},${sy-92} V${sy-120} M${sx-26},${sy-124} H${sx+26}`,8);
  const fr=t<3?1:t<5.1?1-(t-3)/2.1:t<7?0:1;
  if(fr<1&&fr>0){const a=-Math.PI/2+fr*Math.PI*2,p0=[sx,sy-70],p1=[sx+70*Math.cos(a),sy+70*Math.sin(a)];w+=`<path d="M${p0[0]},${p0[1]} A70,70 0 ${fr>.5?1:0} 1 ${f2(p1[0])},${f2(p1[1])}" fill="none" stroke="${TS.MUTE}" stroke-width="8" stroke-linecap="round" opacity=".5"/>`}
  w+=T(sx,sy+34,String(n),{f:FF,size:96,w:700,anchor:'middle'});
  g+=w;
  const ck=PEN.loop(sx,sy,120,120,1.1,5),cp=eIO(P(t,9.2,9.8));g+=PEN.stroke(ck,0,cp,{lw:9});if(cp>0&&cp<1)pen=PEN.at(ck,cp);
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Üç saniyede ne sattığını',76,-9,2.4,t,{fill:TS.INK})+CT(540,500,'anlatamayan sayfa',76,-9,2.45,t,{fill:TS.INK})+CT(540,600,'kaydırılır.',76,-9,2.5,t,{fill:TS.INK});
  // kapanış (daha küçük punto, uzun satır)
  s+=CT(540,500,'Üç saniyede',96,10.3,99,t,{fill:TS.INK})+CT(540,620,`<tspan fill="${O}">ne sattığını</tspan> söyle.`,96,10.5,99,t,{fill:TS.INK,raw:1});
  if(t>11){const b=BOXC('ne sattığını söyle.',96,700,540,620,0,11),d=`M${f2(b.x0-6)},${f2(b.cy+58)} q${f2(b.w/2)},16 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)pp=PEN.at(d,p)}
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['tabela']=TKB;
