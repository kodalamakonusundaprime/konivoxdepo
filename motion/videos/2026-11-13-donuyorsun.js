/* Tek Kalem: "dönüyorsun". Görsel fikir: kalem aynı çemberi defalarca çizer (döngü), sonra çemberi açıp ileri giden yola çevirir. */
const TSD=(function(){
 const CX=540,CY=1150,R=250,TK=['gönderi','fotoğraf','cevap'],DY=['Pzt','Sal','Çar','Per','Cum'];
 const ringD=(r,seed)=>PEN.loop(CX,CY,r,r,1.0,seed);
 const card=(x,y,s,op=1)=>`<g opacity="${f2(op)}" transform="translate(${f2(x)} ${f2(y)})"><rect x="-112" y="-30" width="224" height="88" rx="16" fill="${TS.SH}" opacity=".09"/><rect x="-112" y="-46" width="224" height="88" rx="16" fill="${TS.PAPER}"/>${tsLine('M-96,-46 h192 q16,0 16,16 v56 q0,16 -16,16 h-192 q-16,0 -16,-16 v-56 q0,-16 16,-16',5)}${T(0,12,s,{f:FF,size:40,w:700,anchor:'middle'})}</g>`;
 // ileri giden yol (çember açılınca)
 const ROAD='M150,1360 C330,1350 420,1240 520,1120 S720,870 930,790';
 const ON=[.2,.52,.84];
 return {id:'tsd',dur:15,bg:TS.BG,render(t){
  let s=`<rect width="1080" height="1920" fill="${TS.BG}"/>`,g='',pen=null;
  const end=eIO(P(t,10.0,10.7)),sc=1-.3*end,oy=330*end;
  const out=eIO(P(t,6.0,6.6));
  // ---- döngü: kâğıt disk + mürekkep çember, kalem 4 tur atar, her tur bir iz bırakır
  if(out<1){let c='';const o=1-out;
   c+=`<circle cx="${CX}" cy="${CY+18}" r="${R+60}" fill="${TS.SH}" opacity=".08"/><circle cx="${CX}" cy="${CY}" r="${R+60}" fill="${TS.PAPER}"/>`;
   c+=tsLine(`M${CX+R},${CY} A${R},${R} 0 1 1 ${CX+R-.01},${CY-.5}`,7);
   const laps=[[2.6,3.4],[3.4,4.1],[4.1,4.75],[4.75,5.35]];
   laps.forEach(([a,b],i)=>{const d=ringD(R+8+i*7,2+i*1.3),p=eIO(P(t,a,b));if(p>0){c+=PEN.stroke(d,0,p,{lw:8,op:i<3&&t>b?.35:1});if(p<1)pen=PEN.at(d,p)}});
   const di=t<2.6?0:Math.min(4,laps.filter(([a])=>t>=a).length);
   c+=T(CX,CY+38,DY[di],{f:FF,size:108,w:700,anchor:'middle'});
   [[-90],[30],[150]].forEach(([a],i)=>{const r=a*Math.PI/180;c+=card(CX+(R+62)*Math.cos(r),CY+(R+62)*Math.sin(r)+(i===0?-6:0),TK[i])});
   c+=PEN.note('tsdn1','yine baştan',600,1610,68,P(t,5.4,5.9),0,{fill:TS.INK});
   g+=`<g opacity="${f2(o)}" transform="translate(${CX} ${CY}) scale(${f2(1-.12*out)}) translate(${-CX} ${-CY})">${c}</g>`}
  // ---- yol: kalem çemberi açar, ileri giden çizgiye çevirir; kartlar yolun üstüne dizilir, tikler
  if(t>=6.3){const rp=eIO(P(t,6.4,7.6));g+=PEN.stroke(ROAD,0,rp,{lw:10});if(rp>0&&rp<1)pen=PEN.at(ROAD,rp);
   const tip=PEN.at(ROAD,1),hp=eIO(P(t,7.6,8.0)),hd=`M${tip[0]-62},${tip[1]-16} L${tip[0]},${tip[1]} L${tip[0]-40},${tip[1]+50}`;g+=PEN.stroke(hd,0,hp,{lw:10});if(hp>0&&hp<1)pen=PEN.at(hd,hp);
   ON.forEach((q,i)=>{const a=P(t,7.0+i*.35,7.5+i*.35);if(a<=0)return;const p=PEN.at(ROAD,q);g+=card(p[0],p[1]-80-(1-eOut(a))*40,TK[i],eOut(a));
    const ck=`M${p[0]+128},${p[1]-86} l14,16 l26,-34`,cp=eIO(P(t,8.2+i*.3,8.45+i*.3));g+=PEN.stroke(ck,0,cp,{lw:7,c:TS.INK});if(cp>0&&cp<1)pen=PEN.at(ck,cp)});
   g+=PEN.note('tsdn2','bir kere kur',110,900,70,P(t,9.1,9.6),0,{fill:TS.INK})}
  s+=`<g transform="translate(540 ${f2(CY+oy)}) scale(${f2(sc)}) translate(-540 ${-CY})">${g}</g>`;
  if(pen)pen=[540+(pen[0]-540)*sc,CY+oy+(pen[1]-CY)*sc];
  s+=CT(540,400,'Her gün aynı işi baştan',74,-9,2.4,t,{fill:TS.INK})+CT(540,500,'yapıyorsan büyümüyorsun,',74,-9,2.45,t,{fill:TS.INK})+CT(540,600,'dönüyorsun.',74,-9,2.5,t,{fill:TS.INK});
  s+=CT(540,500,'Döngüyü değil,',104,10.3,99,t,{fill:TS.INK})+CT(540,625,`<tspan fill="${O}">sistemi</tspan> kur.`,104,10.5,99,t,{fill:TS.INK,raw:1});
  s+=WM2(false);if(pen)s+=PRING(pen);
  return s}};
})();
VIDEOS['ts-donuyorsun']=TSD;
