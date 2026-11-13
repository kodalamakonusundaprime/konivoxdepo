/* kova: delik kova. Reklam damlaları girer, dipteki delikten lira akar; kalem deliği yamalar, kova dolar. */
const TKA=(function(){
 const CX=540,TOP=960,BOT=1420,TW=230,BW=165,HX=600,HY=1370;
 const body=`M${CX-TW},${TOP} L${CX-BW},${BOT} Q${CX-BW+4},${BOT+30} ${CX-BW+40},${BOT+30} L${CX+BW-40},${BOT+30} Q${CX+BW-4},${BOT+30} ${CX+BW},${BOT} L${CX+TW},${TOP}`;
 const xAt=(y,side)=>CX+side*lerp(TW,BW,(y-TOP)/(BOT-TOP));
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.22*end,oy=300*end,CY=1150;
  let s=TH.bg()+`<g transform="translate(540 ${f2(CY+oy)}) scale(${f2(sc)}) translate(-540 ${-CY})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,CY+oy+(q[1]-CY)*sc]}return [s,pen]}
 const drop=(x,y,sz=1,op=1)=>`<path d="M${f2(x)},${f2(y-22*sz)} C${f2(x+14*sz)},${f2(y-4*sz)} ${f2(x+16*sz)},${f2(y+14*sz)} ${f2(x)},${f2(y+16*sz)} C${f2(x-16*sz)},${f2(y+14*sz)} ${f2(x-14*sz)},${f2(y-4*sz)} ${f2(x)},${f2(y-22*sz)} Z" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="5" opacity="${f2(op)}"/>`;
 return {id:'tka',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  const fix=eIO(P(t,7.9,8.4));
  // reklam kartı ve düşen damlalar (sürekli)
  g+=TH.card(CX,800,'reklam',{rot:TH.sway(t,1,2),w:250});
  for(let i=0;i<6;i++){const ph=((t*0.9+i/6)%1),y=860+ph*(TOP+120-860),x=CX+[-60,40,-10,70,-80,20][i];if(ph<.92)g+=drop(x,y,.9,Math.min(1,ph*6))}
  // kova (hafif salınım)
  let b='';
  const lvl=fix>0?lerp(BOT-40,TOP+70,eIO(P(t,8.6,9.8))):BOT-40+Math.sin(t*3)*6;
  b+=`<path d="${body} Z" fill="${TS.SH}" opacity=".1" transform="translate(0 16)"/><path d="${body} Z" fill="${TS.PAPER}"/>`;
  b+=`<clipPath id="tkaw"><path d="${body} Z"/></clipPath>`;
  b+=`<rect x="${CX-TW}" y="${f2(lvl)}" width="${2*TW}" height="${f2(BOT+40-lvl)}" fill="#E3DACB" clip-path="url(#tkaw)"/>`;
  if(fix>0){const fl=eIO(P(t,8.6,9.8));b+=`<rect x="${CX-TW}" y="${f2(lvl)}" width="${2*TW}" height="${f2(BOT+40-lvl)}" fill="${O}" opacity="${f2(fl)}" clip-path="url(#tkaw)"/>`}
  b+=tsLine(body,9)+`<ellipse cx="${CX}" cy="${TOP}" rx="${TW}" ry="34" fill="none" stroke="${TS.INK}" stroke-width="9"/>`;
  b+=tsLine(`M${CX-TW+6},${TOP+4} C${CX-TW+20},${TOP-200} ${CX+TW-20},${TOP-200} ${CX+TW-6},${TOP+4}`,6,TS.MUTE,.6);
  // delik: kalem açar
  const hole=PEN.loop(HX,HY,24,20,1.1,2),hp=eIO(P(t,3.0,3.7));
  if(hp>0)b+=`<ellipse cx="${HX}" cy="${HY}" rx="${f2(22*hp)}" ry="${f2(18*hp)}" fill="${TS.INK}" opacity="${f2(1-fix)}"/>`;
  b+=PEN.stroke(hole,0,hp,{lw:9,op:1-fix});let bpen=hp>0&&hp<1?PEN.at(hole,hp):null;
  // yama: kalem çarpı çizer
  const pt=`M${HX-46},${HY-34} L${HX+46},${HY-40} L${HX+50},${HY+34} L${HX-42},${HY+40} Z`,pp=eIO(P(t,7.9,8.4));
  if(pp>0){b+=`<path d="M${HX-46},${HY-34} L${HX+46},${HY-40} L${HX+50},${HY+34} L${HX-42},${HY+40} Z" fill="${TS.PAPER}" opacity="${f2(pp)}"/>`;b+=PEN.stroke(pt,0,pp,{lw:8,c:TS.INK})}
  if(pp>0&&pp<1)bpen=PEN.at(pt,pp);
  const rot=TH.sway(t,0,2.2);
  g+=`<g transform="rotate(${f2(rot)} ${CX} ${BOT+30})">${b}</g>`;
  if(bpen){const a=rot*Math.PI/180,dx=bpen[0]-CX,dy=bpen[1]-(BOT+30);pen=[CX+dx*Math.cos(a)-dy*Math.sin(a),BOT+30+dx*Math.sin(a)+dy*Math.cos(a)]}
  // delikten akan damlalar → ₺
  const leak=P(t,3.7,3.9)*(1-fix);
  if(leak>0)for(let i=0;i<4;i++){const ph=((t*0.8+i/4)%1),y=HY+30+ph*360,x=HX+20+ph*60;const tl=P(t,5.0,5.5);
   g+=`<g opacity="${f2(leak*(1-ph))}">${tl<1?drop(x,y,.8,1-tl):''}${tl>0?T(x,y+20,'₺',{f:FF,size:76,w:800,anchor:'middle',fill:TS.INK,op:tl}):''}</g>`}
  // kayıp oku
  const ar=`M${HX+40},${HY+40} C${HX+90},${HY+120} ${HX+120},${HY+200} ${HX+130},${HY+300} M${HX+100},${HY+262} L${HX+130},${HY+300} L${HX+165},${HY+266}`,ap=eIO(P(t,5.0,5.9));
  g+=PEN.stroke(ar,0,ap,{lw:9,op:1-fix});if(ap>0&&ap<1)pen=PEN.at(ar,ap);
  g+=PEN.note('tkan1','ikinci kez geliyor mu?',150,1600,60,P(t,3.9,4.6),P(t,5.6,5.9),{fill:TS.INK});
  g+=PEN.note('tkan2','her lira akıyor',150,1600,64,P(t,6.1,6.7),P(t,7.6,7.9),{fill:TS.INK});
  // üç yama notu: soldan zıplar
  const TX=['takip','hatırlatma','teşekkür'];
  for(let i=0;i<3;i++){const u=eIO(P(t,8.4+i*.4,8.95+i*.4));if(u<=0)continue;const p=TH.hop([-200,1500],[250,1080+i*150],u,160);
   g+=TH.sticky(p[0],p[1],TX[i],[-4,3,-2][i]+TH.sway(t,i+2,2),{w:250,size:52,sc:.9})}
  let [s,pp2]=wrap(t,g,pen);
  s+=CT(540,400,'Kovan delikse,',78,-9,2.4,t,{fill:TS.INK})+CT(540,500,'daha çok reklam',78,-9,2.45,t,{fill:TS.INK})+CT(540,600,'daha çok kayıptır.',78,-9,2.5,t,{fill:TS.INK});
  s+=TH.close(t,'Doldurmadan önce','deliği',' kapat.');
  s+=WM2(false);if(pp2)s+=PRING(pp2);
  return s}};
})();
VIDEOS['kova']=TKA;
