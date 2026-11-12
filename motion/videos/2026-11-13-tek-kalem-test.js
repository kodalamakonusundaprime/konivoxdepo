/* Tek Kalem test videoları (sessiz): bio kartı, kampanya etiketi, gece mesajı.
   Ortak dil: koyu masa, krem kâğıt nesne, turuncu kalem, Caveat not, Fraunces başlık. Nesne her videoda farklı. */
const TKD={DESK:'#EFE8DC',PAPER:'#FFFDF8',CREAM:'#141414',INKN:'#2a2a2a',MUTE:'#8a8070'};
// yerel (nesne içi) koordinatı ekrana çeviren dönüşüm
function TKX(cx,cy,w,h,rot=0,sc=1){const r=rot*Math.PI/180,c=Math.cos(r),s=Math.sin(r);
 return {tr:`translate(${f2(cx)} ${f2(cy)}) rotate(${f2(rot)}) scale(${f2(sc)}) translate(${-w/2} ${-h/2})`,
  map:p=>{const x=(p[0]-w/2)*sc,y=(p[1]-h/2)*sc;return [cx+x*c-y*s,cy+x*s+y*c]}}}
const TKZ=(p,z,cx,cy)=>[cx+(p[0]-cx)*z,cy+(p[1]-cy)*z];
const TKfade=(s,op)=>op<=0?'':op>=1?s:`<g opacity="${f2(op)}">${s}</g>`;

/* ---- 1) Bio kartı: “Kaliteli hizmet” yazmak seni ayırt ettirmiyor ---- */
const TK1=(function(){
 const {DESK,PAPER}=TKD,D=15,CX=540,CY=1090,W=860,H=640;
 const OLD=[['Kaliteli hizmet',230],['Uygun fiyat',320],['Müşteri memnuniyeti',410]];
 const NEW=[['El yapımı seramik kupa',236,6.6],['Sipariş 5 iş gününde kargoda',326,7.0],['Her kupa tek, aynısı yok',416,7.4]];
 return {id:'tk1',dur:D,bg:DESK,render(t){
  let s=`<rect width="1080" height="1920" fill="${DESK}"/>`;
  const z=1+.12*eIO(P(t,2.5,3.1))-.12*eIO(P(t,9.7,10.3)),k=eIO(P(t,10.0,10.7));
  const X=TKX(CX,CY+250*k,W,H,-1.5+1.5*k,1-.32*k);let pens=[];
  let c=`<rect x="0" y="22" width="${W}" height="${H}" rx="18" fill="#5a4a32" opacity=".10"/><rect width="${W}" height="${H}" rx="18" fill="${PAPER}"/>`;
  c+=`<circle cx="104" cy="96" r="46" fill="#E3BFA0"/><path d="M84,104 q20,18 40,0" stroke="${K}" stroke-width="4" fill="none" stroke-linecap="round"/>`+T(172,108,'atolye.nur',{f:FF,size:44,w:700});
  c+=`<rect x="60" y="160" width="740" height="3" fill="#E6DFD2"/>`;
  // eski bio: üstü tek tek çizilir, sonra silinir
  const oOp=1-P(t,6.1,6.5);let o='';
  OLD.forEach(([str,y],i)=>{o+=T(60,y,str,{f:FF,size:62,w:600});
   const b=BOXL(str,62,600,60,y),d=`M${b.x0-10},${b.cy+3} C${lerp(b.x0,b.x1,.35)},${b.cy-9} ${lerp(b.x0,b.x1,.7)},${b.cy+9} ${b.x1+12},${b.cy-3}`,p=eIO(P(t,3.0+i*.7,3.5+i*.7));
   o+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)pens.push(PEN.at(d,p))});
  o+=PEN.note('tk1n1','herkes böyle yazar',60,560,66,P(t,5.1,5.7));
  c+=TKfade(o,oOp);
  // yeni bio: satırlar sırayla yükselir
  NEW.forEach(([str,y,t0],i)=>{c+=FR('tk1r'+i,t,str,60,y,i===1?52:56,{tin:t0,w:600})});
  const b=BOXL(NEW[1][0],52,600,60,NEW[1][1],8,19),lp=PEN.loop(b.cx,b.cy,b.w/2+22,b.h/2+22,1.15,5),lb=eIO(P(t,8.0,8.7));
  c+=PEN.stroke(lp,0,lb,{lw:9});if(lb>0&&lb<1)pens.push(PEN.at(lp,lb));
  c+=PEN.note('tk1n2','şimdi ne sattığın belli',60,560,66,P(t,8.9,9.5));
  let w=`<g transform="${X.tr}">${c}</g>`;
  s+=`<g transform="translate(${CX} ${CY}) scale(${f2(z)}) translate(${-CX} ${-CY})">${w}</g>`;
  s+=CT(540,470,'“Kaliteli hizmet” yazmak',76,-9,2.4,t,{fill:TKD.CREAM})+CT(540,580,'seni ayırt ettirmiyor.',76,-9,2.45,t,{fill:TKD.CREAM});
  s+=CT(540,500,'Sıfat değil,',108,10.3,99,t,{fill:TKD.CREAM})+CT(540,625,`<tspan fill="${O}">bilgi</tspan> yaz.`,108,10.5,99,t,{fill:TKD.CREAM,raw:1});
  s+=WM2(false);
  if(pens.length)s+=PRING(TKZ(X.map(pens[pens.length-1]),z,CX,CY));
  return s}};
})();

/* ---- 2) Kampanya etiketi: “Büyük indirim” demek kimseye bir şey söylemiyor ---- */
const TK2=(function(){
 const {DESK,PAPER}=TKD,D=15,CX=540,CY=1150,W=640,H=740;
 const tag=`M70,0 H570 L640,70 V700 Q640,740 600,740 H40 Q0,740 0,700 V70 Z`;
 return {id:'tk2',dur:D,bg:DESK,render(t){
  let s=`<rect width="1080" height="1920" fill="${DESK}"/>`;
  const k=eIO(P(t,10.0,10.7)),sw=2.2*Math.sin(t*1.6)*Math.exp(-t*.25);
  const cy=CY+170*k,sc=1-.36*k,fl=P(t,6.2,7.0),fx=Math.cos(Math.PI*eIO(fl)),back=fl>=.5;
  // ip
  const top=cy-H/2*sc;
  s+=`<path d="M${CX},${f2(top+48*sc)} C${CX-20},${f2(top-30)} ${CX+30},${f2(top-80)} ${CX+10},${f2(top-120)}" stroke="#7D7466" stroke-width="5" fill="none" stroke-linecap="round" opacity="${f2(1-P(t,9.9,10.3))}"/>`;
  const X=TKX(CX,cy,W,H,sw,sc);let pens=[];
  const FS=`translate(320 0) scale(${f2(Math.max(.001,Math.abs(fx)))} 1) translate(-320 0)`;
  let c=`<g transform="${FS}"><path d="${tag}" transform="translate(0 22)" fill="#5a4a32" opacity=".10"/><path d="${tag}" fill="${PAPER}"/><circle cx="320" cy="48" r="18" fill="${DESK}"/></g>`;
  let face='';
  if(!back){
   face+=T(320,250,'BÜYÜK',{f:FF,size:128,w:800,anchor:'middle'})+T(320,385,'İNDİRİM',{f:FF,size:116,w:800,anchor:'middle'})+T(320,510,'BAŞLADI!',{f:FF,size:100,w:800,anchor:'middle'});
   const b=BOXC('BÜYÜK',128,800,320,250),lp=PEN.loop(b.cx,b.cy,b.w/2+30,b.h/2+26,1.15,3),lb=eIO(P(t,3.0,3.7));
   face+=PEN.stroke(lp,0,lb,{lw:10});if(lb>0&&lb<1)pens.push(PEN.at(lp,lb));
   const u=BOXC('BAŞLADI!',100,800,320,510),ud=`M${u.x0-6},${u.cy+52} C${lerp(u.x0,u.x1,.4)},${u.cy+60} ${lerp(u.x0,u.x1,.7)},${u.cy+46} ${u.x1+10},${u.cy+54}`,ub=eIO(P(t,4.1,4.6));
   face+=PEN.stroke(ud,0,ub,{lw:9});if(ub>0&&ub<1)pens.push(PEN.at(ud,ub));
   face+=PEN.note('tk2n1','ne kadar?',50,650,54,P(t,3.8,4.2))+PEN.note('tk2n2','ne zamana kadar?',240,650,54,P(t,4.8,5.4));
  }else{
   face+=T(320,250,'Cuma’ya kadar',{f:FF,size:70,w:700,anchor:'middle'})+T(320,400,'ikinci kahve',{f:FF,size:92,w:800,anchor:'middle'})+T(320,505,'bizden.',{f:FF,size:92,w:800,anchor:'middle'});
   const b=BOXC('Cuma’ya kadar',70,700,320,250),lp=PEN.loop(b.cx,b.cy,b.w/2+28,b.h/2+26,1.15,6),lb=eIO(P(t,7.6,8.3));
   face+=PEN.stroke(lp,0,lb,{lw:10});if(lb>0&&lb<1)pens.push(PEN.at(lp,lb));
   face+=PEN.note('tk2n3','ne + ne zamana kadar',90,650,62,P(t,8.6,9.2));
  }
  c+=`<g transform="${FS}">${face}</g>`;
  s+=`<g transform="${X.tr}">${c}</g>`;
  s+=CT(540,420,'“Büyük indirim” demek',78,-9,2.4,t,{fill:TKD.CREAM})+CT(540,520,'kimseye bir şey',78,-9,2.45,t,{fill:TKD.CREAM})+CT(540,620,'söylemiyor.',78,-9,2.5,t,{fill:TKD.CREAM});
  s+=CT(540,470,'Kampanyayı büyük değil,',84,10.3,99,t,{fill:TKD.CREAM})+CT(540,580,`<tspan fill="${O}">net</tspan> yaz.`,84,10.5,99,t,{fill:TKD.CREAM,raw:1});
  s+=WM2(false);
  if(pens.length){const p=pens[pens.length-1];s+=PRING(X.map([320+(p[0]-320)*fx,p[1]]))}
  return s}};
})();

/* ---- 3) Gece mesajı: Gece gelen mesaj sabaha kadar beklemek zorunda değil ---- */
const TK3=(function(){
 const {DESK,PAPER}=TKD,D=15;
 function bub(x,y,w,h,fill,left){const tx=left?x+40:x+w-40;return `<rect x="${x}" y="${y+18}" width="${w}" height="${h}" rx="30" fill="#5a4a32" opacity=".10"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="${fill}"/><path d="M${tx},${y+h-2} L${tx},${y+h+30} L${tx+(left?30:-30)},${y+h-2} Z" fill="${fill}"/>`}
 function lines(x,y,arr,size,dy){return arr.map((l,i)=>T(x,y+i*dy,l,{f:FF,size,w:600})).join('')}
 const R1=['Mesajınız alınmıştır,','en kısa sürede dönüş','yapılacaktır.'],R2=['Var, sabitlenmiş','ilk gönderide.','Sipariş için ürün','adını yazman yeter.'];
 return {id:'tk3',dur:D,bg:DESK,render(t){
  let s=`<rect width="1080" height="1920" fill="${DESK}"/>`;
  const z=1+.1*eIO(P(t,2.5,3.1))-.1*eIO(P(t,9.7,10.3)),k=eIO(P(t,10.0,10.7)),CX=540,CY=1150;
  const sc=1-.34*k,oy=200*k;let g='',pens=[];
  // müşteri mesajı
  g+=T(120,880,'02:14',{f:FC,size:56,w:600,fill:'#7D7466'})+bub(120,910,600,130,'#E3DACB',true)+T(160,995,'Fiyat listesi var mı?',{f:FF,size:52,w:600});
  const t1=PEN.loop(165,862,72,38,1.15,2),l1=eIO(P(t,3.0,3.6));g+=PEN.stroke(t1,0,l1,{lw:8});if(l1>0&&l1<1)pens.push(PEN.at(t1,l1));
  // eski cevap (09:40) → sağa kayar
  const out=eIO(P(t,6.3,6.9));
  let r=T(910,1140,'09:40',{f:FC,size:56,w:600,fill:'#7D7466',anchor:'end'})+bub(300,1170,660,270,PAPER,false)+lines(340,1250,R1,48,70);
  const t2=PEN.loop(858,1122,74,38,1.15,4),l2=eIO(P(t,3.8,4.4));r+=PEN.stroke(t2,0,l2,{lw:8});if(l2>0&&l2<1&&out<=0)pens.push(PEN.at(t2,l2));
  R1.forEach((l,i)=>{const b=BOXL(l,48,600,340,1250+i*70),d=`M${b.x0-8},${b.cy+3} C${lerp(b.x0,b.x1,.4)},${b.cy-7} ${lerp(b.x0,b.x1,.7)},${b.cy+7} ${b.x1+10},${b.cy-2}`,p=eIO(P(t,5.3+i*.25,5.55+i*.25));r+=PEN.stroke(d,0,p,{lw:9});if(p>0&&p<1)pens.push(PEN.at(d,p))});
  if(out<1)g+=`<g transform="translate(${f2(900*out)} 0)">${r}</g>`;
  g+=PEN.note('tk3n1','7 saat bekledi',300,1540,66,P(t,4.6,5.2),out,{fill:TKD.CREAM});
  // yeni cevap (02:15)
  const inn=eIO(P(t,6.5,7.1));
  if(inn>0){let n=T(910,1140,'02:15',{f:FC,size:56,w:600,fill:'#7D7466',anchor:'end'})+bub(300,1170,660,340,PAPER,false)+lines(340,1250,R2,48,70);
   const t3=PEN.loop(858,1122,74,38,1.15,6),l3=eIO(P(t,7.6,8.3));n+=PEN.stroke(t3,0,l3,{lw:8});if(l3>0&&l3<1)pens.push(PEN.at(t3,l3));
   n+=PEN.note('tk3n2','müşteri hâlâ orada',300,1600,66,P(t,8.6,9.2),0,{fill:TKD.CREAM});
   g+=`<g transform="translate(${f2(900*(1-inn))} 0)">${n}</g>`}
  const tr=`translate(${CX} ${CY}) scale(${f2(z)}) translate(${-CX} ${-CY}) translate(${CX} ${f2(CY+oy)}) scale(${f2(sc)}) translate(${-CX} ${-CY})`;
  s+=`<g transform="${tr}">${g}</g>`;
  s+=CT(540,360,'Gece gelen mesaj,',78,-9,2.4,t,{fill:TKD.CREAM})+CT(540,460,'sabaha kadar',78,-9,2.45,t,{fill:TKD.CREAM})+CT(540,560,'beklemek zorunda değil.',74,-9,2.5,t,{fill:TKD.CREAM});
  s+=CT(540,480,'Cevap sabahı',108,10.3,99,t,{fill:TKD.CREAM})+CT(540,605,`<tspan fill="${O}">beklemesin.</tspan>`,108,10.5,99,t,{fill:TKD.CREAM,raw:1});
  s+=WM2(false);
  if(pens.length){let p=pens[pens.length-1];p=[CX+(p[0]-CX)*sc,CY+oy+(p[1]-CY)*sc];s+=PRING(TKZ(p,z,CX,CY))}
  return s}};
})();
VIDEOS['tk-bio']=TK1;VIDEOS['tk-kampanya']=TK2;VIDEOS['tk-gece']=TK3;
