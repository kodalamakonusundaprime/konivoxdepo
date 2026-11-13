/* Tek Kalem · hareketli (13 Kasım 2026'da onaylanan birleşim: v2 Defter'in hareketliliği + Tek Kalem'in kalem odağı).
   Yardımcılar (her yeni videoda kullan):
   TH.bg()                      krem zemin + çok soluk nokta ızgarası
   TH.sticky(x,y,s,rot,o)       ada çayı yapışkan not (bantlı), Caveat yazı; o.fill / o.size / o.sc
   TH.card(x,y,s,o)             kâğıt kart, Fraunces yazı
   TH.hop(a,b,u,h)              a→b noktası arasında yay çizerek zıplama (u: 0→1)
   TH.zoom(t,cy) / TH.zmp(p,t,cy)   kanca sönünce sahne yaklaşır ve yukarı gelir; kapanışta geri döner
   TH.sway(t,i,amp)             nesnelerin hafif salınımı (derece)
   TH.close(t,l1,key,rest)      kapanış iki satır + kalemin kilit kelimenin altını çizmesi
*/
const TH=(function(){
 const SAGE='#B7C4AC',DOT='#D6CCBA';
 const bg=()=>`<defs><pattern id="thdot" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2.4" fill="${DOT}"/></pattern></defs><rect width="1080" height="1920" fill="${TS.BG}"/><rect width="1080" height="1920" fill="url(#thdot)"/>`;
 const sticky=(x,y,s,rot=0,o={})=>{const w=o.w||224,h=o.h||112;return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(rot)}) scale(${f2(o.sc||1)})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" fill="${TS.SH}" opacity=".12" transform="translate(6 12)"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" fill="${o.fill||SAGE}"/><rect x="-40" y="${-h/2-12}" width="80" height="26" fill="${TS.PAPER}" opacity=".8" transform="rotate(-4)"/>${T(0,18,s,{f:FC,size:o.size||64,w:700,anchor:'middle',fill:TS.INK})}</g>`};
 const card=(x,y,s,o={})=>{const w=o.w||230,h=o.h||92;return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(o.rot||0)}) scale(${f2(o.sc||1)})"><rect x="${-w/2}" y="${-h/2+14}" width="${w}" height="${h}" rx="16" fill="${TS.SH}" opacity=".09"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="16" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="5"/>${T(0,14,s,{f:FF,size:o.size||40,w:700,anchor:'middle'})}</g>`};
 const hop=(a,b,u,h=100)=>[lerp(a[0],b[0],u),lerp(a[1],b[1],u)-Math.sin(Math.PI*u)*h];
 const ZZ=t=>eIO(P(t,2.5,3.3))*(1-eIO(P(t,10.0,10.7)));
 const zoom=(t,cy=1150)=>{const z=ZZ(t);return `translate(540 ${f2(cy-170*z)}) scale(${f2(1+.12*z)}) translate(-540 ${-cy})`};
 const zmp=(p,t,cy=1150)=>{const z=ZZ(t),k=1+.12*z;return [540+(p[0]-540)*k,cy-170*z+(p[1]-cy)*k]};
 const sway=(t,i,amp=3)=>Math.sin(t*2.2+i*1.9)*amp;
 function close(t,l1,key,rest){let s=CT(540,500,l1,104,10.3,99,t,{fill:TS.INK})+CT(540,625,`<tspan fill="${O}">${key}</tspan>${rest}`,104,10.5,99,t,{fill:TS.INK,raw:1});
  if(t>11){const b=BOXC(key+rest,104,700,540,625,0,key.length-1),d=`M${f2(b.x0-6)},${f2(b.cy+62)} q${f2(b.w/2)},16 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)s+=PRING(PEN.at(d,p))}
  return s}
 return {SAGE,bg,sticky,card,hop,zoom,zmp,sway,close};
})();

/* ---- Örnek: "dönüyorsun" (döngü → yol) ----
   Kalem çemberde tur atarken yapışkan notlar da onunla döner (hareket), her tur gün değişir;
   sonra kalem yolu çizer, notlar zıplayarak yolun üstüne geçer ve tiklenir. */
const THD=(function(){
 const CX=540,CY=1150,R=250,TK=['gönderi','fotoğraf','cevap'],DY=['Pzt','Sal','Çar','Per','Cum'];
 const ROAD='M150,1360 C330,1350 420,1240 520,1120 S720,870 930,790',ON=[.2,.52,.84];
 const LAPS=[[2.6,3.4],[3.4,4.1],[4.1,4.75],[4.75,5.35]];
 return {id:'thd',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  // dönüş miktarı: kalem turlarıyla aynı anda
  const spin=LAPS.reduce((a,[x,y])=>a+eIO(P(t,x,y)),0);
  const out=eIO(P(t,6.0,6.6));
  if(out<1){let c='';const o=1-out;
   c+=`<circle cx="${CX}" cy="${CY+18}" r="${R+60}" fill="${TS.SH}" opacity=".08"/><circle cx="${CX}" cy="${CY}" r="${R+60}" fill="${TS.PAPER}"/>`;
   c+=tsLine(`M${CX+R},${CY} A${R},${R} 0 1 1 ${CX+R-.01},${CY-.5}`,7);
   LAPS.forEach(([a,b],i)=>{const d=PEN.loop(CX,CY,R+8+i*7,R+8+i*7,1.0,2+i*1.3),p=eIO(P(t,a,b));if(p>0){c+=PEN.stroke(d,0,p,{lw:9,op:t>b?.3:1});if(p<1)pen=PEN.at(d,p)}});
   const di=t<2.6?0:Math.min(4,LAPS.filter(([a])=>t>=a).length);
   // ortada takvim yaprağı, gün değişince hafif zıplar
   const bump=di?Math.sin(Math.PI*P(t,LAPS[di-1][0],LAPS[di-1][0]+.35))*14:0;
   c+=`<g transform="translate(0 ${f2(-bump)})"><rect x="${CX-115}" y="${CY-105}" width="230" height="200" rx="10" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="6"/><rect x="${CX-115}" y="${CY-105}" width="230" height="52" rx="10" fill="#E3DACB" stroke="${TS.INK}" stroke-width="6"/>${T(CX,CY+62,DY[di],{f:FF,size:96,w:700,anchor:'middle'})}</g>`;
   g+=`<g opacity="${f2(o)}" transform="translate(${CX} ${CY}) scale(${f2(1-.12*out)}) translate(${-CX} ${-CY})">${c}</g>`;
   g+=PEN.note('thdn1','yine baştan',600,1600,70,P(t,5.4,5.9),P(t,6.0,6.3),{fill:TS.INK})}
  // yol
  const rp=eIO(P(t,6.4,7.6));if(rp>0){g+=PEN.stroke(ROAD,0,rp,{lw:10});if(rp<1)pen=PEN.at(ROAD,rp);
   const tip=PEN.at(ROAD,1),hp=eIO(P(t,7.6,8.0)),hd=`M${tip[0]-62},${tip[1]-16} L${tip[0]},${tip[1]} L${tip[0]-40},${tip[1]+50}`;g+=PEN.stroke(hd,0,hp,{lw:10});if(hp>0&&hp<1)pen=PEN.at(hd,hp)}
  // yapışkan notlar: çemberde döner, sonra zıplayarak yola geçer
  for(let i=0;i<3;i++){const a=(-90+i*120)*Math.PI/180+spin*Math.PI*2,c=[CX+(R+70)*Math.cos(a),CY+(R+70)*Math.sin(a)];
   const rp2=PEN.at(ROAD,ON[i]),dst=[rp2[0],rp2[1]-86],u=eIO(P(t,6.5+i*.45,7.3+i*.45)),p=TH.hop(c,dst,u,140);
   g+=TH.sticky(p[0],p[1],TK[i],lerp(TH.sway(t,i,4),[-3,2,-2][i],u),{sc:1-.12*out*(1-u)});
   const ck=`M${dst[0]+128},${dst[1]-4} l14,16 l26,-34`,cp=eIO(P(t,8.2+i*.3,8.45+i*.3));g+=PEN.stroke(ck,0,cp,{lw:8,c:TS.INK});if(cp>0&&cp<1)pen=PEN.at(ck,cp)}
  g+=PEN.note('thdn2','bir kere kur',110,900,72,P(t,9.0,9.5),0,{fill:TS.INK});
  // kapanış: sahne büyük kalır, hafif aşağı iner
  const end=eIO(P(t,10.0,10.7)),sc=1-.22*end,oy=300*end,CY2=1150;
  let s=TH.bg()+`<g transform="translate(540 ${f2(CY2+oy)}) scale(${f2(sc)}) translate(-540 ${-CY2})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,CY2+oy+(q[1]-CY2)*sc]}
  s+=CT(540,400,'Her gün aynı işi baştan',74,-9,2.4,t,{fill:TS.INK})+CT(540,500,'yapıyorsan büyümüyorsun,',74,-9,2.45,t,{fill:TS.INK})+CT(540,600,'dönüyorsun.',74,-9,2.5,t,{fill:TS.INK});
  s+=TH.close(t,'Döngüyü değil,','sistemi',' kur.');
  s+=WM2(false);if(pen)s+=PRING(pen);
  return s}};
})();
VIDEOS['th-dongu']=THD;
