/* hedef: herkese atılan oklar tahtanın her yerine saplanır, merkez boş kalır; kalem tek ok çizer, ok merkeze iner. */
const TKE=(function(){
 const CX=540,CY=1180,RS=[290,210,130,50];
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.22*end,oy=300*end,C=1150;
  let s=TH.bg()+`<g transform="translate(540 ${f2(C+oy)}) scale(${f2(sc)}) translate(-540 ${-C})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,C+oy+(q[1]-C)*sc]}return [s,pen]}
 // ok: uç (x,y), açı a (derece, okun geldiği yön), boy L
 function arrow(x,y,a,L=230,op=1,c=TS.INK){const r=a*Math.PI/180,dx=Math.cos(r),dy=Math.sin(r),tx=x-dx*L,ty=y-dy*L,nx=-dy,ny=dx;
  let s=`<g opacity="${f2(op)}">`+tsLine(`M${f2(x)},${f2(y)} L${f2(tx)},${f2(ty)}`,8,c);
  for(const k of [0,26])s+=tsLine(`M${f2(tx+dx*k)},${f2(ty+dy*k)} l${f2(-dx*30+nx*24)},${f2(-dy*30+ny*24)} M${f2(tx+dx*k)},${f2(ty+dy*k)} l${f2(-dx*30-nx*24)},${f2(-dy*30-ny*24)}`,6,c);
  return s+'</g>'}
 // dağınık oklar: [x,y,açı,giriş]
 const SC=[[-140,250,-9],[-30,235,4.6],[150,205,5.05],[40,250,5.5],[-80,170,5.95],[195,240,6.4]].map(([th,r,ti])=>{const q=th*Math.PI/180;return [CX+r*Math.cos(q),CY+r*Math.sin(q),th+180,ti]});
 return {id:'tke',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  const fade=P(t,7.6,8.0),rot=TH.sway(t,0,1.5);
  // tahta
  let b=`<circle cx="${CX}" cy="${CY+18}" r="${RS[0]+18}" fill="${TS.SH}" opacity=".1"/>`;
  RS.forEach((r,i)=>{b+=`<circle cx="${CX}" cy="${CY}" r="${r}" fill="${i%2?'#E3DACB':TS.PAPER}" stroke="${TS.INK}" stroke-width="${i?6:9}"/>`});
  const fill=eIO(P(t,9.0,9.5));if(fill>0)b+=`<circle cx="${CX}" cy="${CY}" r="${f2(RS[3]*fill)}" fill="${O}"/>`;
  b+=tsLine(`M${CX-140},${CY+RS[0]-20} L${CX-200},${CY+RS[0]+150} M${CX+140},${CY+RS[0]-20} L${CX+200},${CY+RS[0]+150}`,9);
  g+=`<g transform="rotate(${f2(rot)} ${CX} ${CY})">${b}</g>`;
  // dağınık oklar uçarak saplanır
  SC.forEach(([x,y,a,ti],i)=>{const u=ti<0?1:eOut(P(t,ti,ti+.35));if(u<=0)return;const r=a*Math.PI/180,off=(1-u)*700;
   const wob=ti<0?0:Math.sin(Math.PI*4*P(t,ti+.35,ti+.8))*(1-P(t,ti+.35,ti+.8))*6;
   g+=`<g transform="rotate(${f2(wob)} ${x} ${y})">${arrow(x-Math.cos(r)*off,y-Math.sin(r)*off,a,170,1-fade)}</g>`});
  // soru notu
  g+=PEN.note('tken1','kime satıyorsun?',130,820,64,P(t,3.0,3.8),P(t,4.4,4.6),{fill:TS.INK});
  {const p=P(t,3.0,3.8);if(p>0&&p<1)pen=[130+p*(64*16*.42+60)-12,800]}
  // boş merkezi kalem halkalar
  const lp=PEN.loop(CX,CY,80,80,1.15,8),lq=eIO(P(t,6.8,7.4));g+=PEN.stroke(lp,0,lq,{lw:9,op:1-fade});if(lq>0&&lq<1)pen=PEN.at(lp,lq);
  g+=PEN.note('tken2','ortası boş',620,1700,68,P(t,7.0,7.5),P(t,7.9,8.1),{fill:TS.INK});
  // tek ok: kalem çizer, sonra ok merkeze uçar
  const sd=`M170,1655 L330,1450`,sp=eIO(P(t,8.0,8.5));
  const fly=eIO(P(t,8.6,9.0));
  if(sp>0&&fly<1){g+=PEN.stroke(sd,0,sp,{lw:9,c:TS.INK,op:1-fly});if(sp<1)pen=PEN.at(sd,sp)}
  if(fly>0){const a=Math.atan2(CY-1450,CX-330)*180/Math.PI,x=lerp(330,CX,fly),y=lerp(1450,CY,fly);
   const wob=Math.sin(Math.PI*4*P(t,9.0,9.5))*(1-P(t,9.0,9.5))*5;g+=`<g transform="rotate(${f2(wob)} ${CX} ${CY})">${arrow(x,y,a,260)}</g>`}
  g+=PEN.note('tken3','tek müşteri',620,1700,68,P(t,9.2,9.7),0,{fill:TS.INK});
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Herkese satmaya çalışan,',76,-9,2.4,t,{fill:TS.INK})+CT(540,500,'kimsenin aklında',76,-9,2.45,t,{fill:TS.INK})+CT(540,600,'kalmaz.',76,-9,2.5,t,{fill:TS.INK});
  s+=TH.close(t,'Herkese değil,','tek kişiye',' sat.');
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['hedef']=TKE;
