/* ---- Tek Kalem · masa: "'Merhaba arkadaşlar' deyince çoktan kaydırdılar." (içerik üreticisi) ---- */
const MA=(function(){
 const DESK='#1F1B17',PAPER='#F5F0E6',L='#F5F0E6',D=15,CX=540,CY=1060,W=880,H=640;
 const A=[{s:'Merhaba arkadaşlar,',y:200},{s:'bugün size pilavdan',y:290},{s:'bahsedeceğim.',y:380}],AS=72;
 const N1={s:'Pilavın yapışıyorsa,',size:76,w:700,x:60,y:220},N2={s:'pirinci yıkamıyorsun.',size:76,w:700,x:60,y:320};
 function card(inner,ox,oy,rot,sc=1){return `<g transform="translate(${f2(CX+ox)} ${f2(CY+oy)}) rotate(${f2(rot)}) scale(${f2(sc)}) translate(${-W/2} ${-H/2})"><rect x="0" y="22" width="${W}" height="${H}" rx="18" fill="#000" opacity=".35"/><rect width="${W}" height="${H}" rx="18" fill="${PAPER}"/>${inner}</g>`}
 function strike(line,seed){const b=BOXL(line.s,AS,600,60,line.y);return `M${b.x0-10},${b.cy+4} C${lerp(b.x0,b.x1,.35)},${b.cy-8+seed} ${lerp(b.x0,b.x1,.7)},${b.cy+10-seed} ${b.x1+12},${b.cy-2}`}
 return {id:'ma',dur:D,bg:DESK,render(t){
  let s=`<rect width="1080" height="1920" fill="${DESK}"/>`;
  const z=1+.14*eIO(P(t,2.4,3.0))-.14*eIO(P(t,9.6,10.2));
  let pens=[];
  let w='';
  // kart 1: eski ilk cümle
  if(t<6.8){const p=eIO(P(t,6.0,6.6));
   let c=T(60,100,'videonun ilk cümlesi:',{f:FC,size:52,w:600,fill:'#8a8070'});
   A.forEach(l=>c+=T(60,l.y,l.s,{f:FF,size:AS,w:600}));
   const sds=[[strike(A[0],0),3.0,3.5],[strike(A[1],3),4.6,4.95],[strike(A[2],-2),4.95,5.3]];
   sds.forEach(([d,a,b])=>{const st=eIO(P(t,a,b));c+=PEN.stroke(d,0,st,{lw:11});if(st>0&&st<1){const q=PEN.at(d,st);pens.push([q[0]-W/2+CX,q[1]-H/2+CY])}});
   c+=PEN.note('man1','henüz bir şey söylemedin',60,490,62,P(t,3.7,4.3));
   c+=PEN.note('man2','bu da boş',60,575,66,P(t,5.5,6.0),0,{fill:O});
   w+=card(c,-1200*p,0,-2-8*p)}
  // kart 2: yeni ilk cümle
  if(t>=6.1){const p=eIO(P(t,6.15,6.75)),k=eIO(P(t,10.0,10.7));
   const b=BOXL(N1.s,N1.size,N1.w,N1.x,N1.y,8,18),lp=PEN.loop(b.cx,b.cy,b.w/2+24,b.h/2+24,1.15,4),lb=eIO(P(t,7.2,7.9));
   let c=T(60,100,'yeni ilk cümle:',{f:FC,size:52,w:600,fill:'#8a8070'})+T(N1.x,N1.y,N1.s,{f:FF,size:N1.size,w:700})+T(N2.x,N2.y,N2.s,{f:FF,size:N2.size,w:700});
   c+=PEN.stroke(lp,0,lb,{lw:10})+PEN.note('man3','izleyen: "bu benim derdim"',60,470,64,P(t,8.0,8.6),0,{fill:'#2a2a2a'});
   w+=card(c,1200*(1-p),200*k,2-3.5*p,1-.3*k);
   if(lb>0&&lb<1){const q=PEN.at(lp,lb);pens.push([q[0]-W/2+CX,q[1]-H/2+CY])}}
  s+=`<g transform="translate(${CX} ${CY}) scale(${f2(z)}) translate(${-CX} ${-CY})">${w}</g>`;
  pens=pens.map(p=>[CX+(p[0]-CX)*z,CY+(p[1]-CY)*z]);
  // kanca (0. kare) ve ders
  s+=CT(540,400,'‘Merhaba arkadaşlar’',88,-9,2.4,t,{fill:L})+CT(540,505,'deyince çoktan',88,-9,2.43,t,{fill:L})+CT(540,610,'kaydırdılar.',88,-9,2.46,t,{fill:L});
  s+=CT(540,420,'Selamı sona bırak,',92,10.3,99,t,{fill:L})+CT(540,530,'sözünü',92,10.45,99,t,{fill:L})+CT(540,640,`<tspan fill="${O}">ilk cümlede</tspan> söyle.`,92,10.6,99,t,{fill:L,raw:1});
  s+=WM2(true);
  if(pens.length)s+=PRING(pens[pens.length-1]);
  return s}};
})();
VIDEOS['merhaba-arkadaslar']=MA;
