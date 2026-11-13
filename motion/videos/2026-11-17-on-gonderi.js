/* on-gonderi: tek fotoğraf; kalem kırpar, yazı ekler, ikiye böler; kare 10 gönderiye çoğalır, sayaç 1 → 10. */
const TKD=(function(){
 const CX=540,CY=1150;
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.22*end,oy=300*end;
  let s=TH.bg()+`<g transform="translate(540 ${f2(CY+oy)}) scale(${f2(sc)}) translate(-540 ${-CY})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,CY+oy+(q[1]-CY)*sc]}return [s,pen]}
 // fotoğraf: güneş + iki tepe (her varyasyon farklı)
 function photo(x,y,S,v,rot=0,op=1){const h=S/2;let s=`<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(rot)})" opacity="${f2(op)}"><rect x="${-h}" y="${-h+S*.05}" width="${S}" height="${S}" rx="${S*.06}" fill="${TS.SH}" opacity=".1"/>`;
  s+=`<clipPath id="tkdc${v}_${Math.round(x)}"><rect x="${-h}" y="${-h}" width="${S}" height="${S}" rx="${S*.06}"/></clipPath><rect x="${-h}" y="${-h}" width="${S}" height="${S}" rx="${S*.06}" fill="${TS.PAPER}"/>`;
  const z=v===1?1.7:1,ox=v===1?-S*.1:0,oy=v===1?S*.12:0;
  s+=`<g clip-path="url(#tkdc${v}_${Math.round(x)})"><g transform="translate(${f2(ox)} ${f2(oy)}) scale(${z})"><circle cx="${S*.18}" cy="${-S*.18}" r="${S*.11}" fill="#E3DACB" stroke="${TS.INK}" stroke-width="${f2(S*.02)}"/>${tsLine(`M${-h},${S*.3} L${-S*.12},${-S*.05} L${S*.08},${S*.18} L${S*.22},${S*.04} L${h},${S*.3}`,S*.022)}</g>`;
  if(v===2)s+=`<rect x="${-h}" y="${S*.24}" width="${S}" height="${S*.26}" fill="${TS.INK}"/>${tsLine(`M${-S*.34},${S*.37} H${S*.2}`,S*.03,TS.PAPER)}`;
  if(v===3)s+=`<rect x="0" y="${-h}" width="${h}" height="${S}" fill="#E3DACB" opacity=".75"/>${tsLine(`M0,${-h} V${h}`,S*.025)}`;
  if(v===4)s+=`<rect x="${-h}" y="${-h}" width="${S}" height="${S*.22}" fill="${TS.INK}"/>${tsLine(`M${-S*.36},${-S*.39} H${S*.1}`,S*.03,TS.PAPER)}`;
  if(v===5)s+=`<circle cx="${-S*.2}" cy="${S*.05}" r="${S*.16}" fill="none" stroke="${TS.INK}" stroke-width="${f2(S*.025)}"/>`;
  if(v===6)s+=tsLine(`M${-h},${-S*.17} H${h} M${-h},${S*.17} H${h} M${-S*.17},${-h} V${h} M${S*.17},${-h} V${h}`,S*.012,TS.MUTE);
  s+=`</g><rect x="${-h}" y="${-h}" width="${S}" height="${S}" rx="${S*.06}" fill="none" stroke="${TS.INK}" stroke-width="${f2(Math.max(5,S*.025))}"/></g>`;return s}
 // 10 karelik ızgara (5 x 2)
 const G=[];for(let r=0;r<2;r++)for(let c=0;c<5;c++)G.push([CX-2*165+c*165,1060+r*175]);
 return {id:'tkd',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  // 0–5: büyük tek fotoğraf; kalem kırpma köşeleri çizer
  const shrink=eIO(P(t,5.0,5.6)),P0=[lerp(CX,G[0][0],shrink),lerp(1150,G[0][1],shrink)],S0=lerp(440,150,shrink);
  // kırpma köşeleri
  const cr=`M${CX-130},${1060} V${1010} H${CX-80} M${CX+80},${1010} H${CX+130} V${1060} M${CX+130},${1240} V${1290} H${CX+80} M${CX-80},${1290} H${CX-130} V${1240}`,cp=eIO(P(t,3.0,3.9));
  const vv=t<4.1?0:1;
  g+=photo(P0[0],P0[1],S0,shrink>0?0:vv,TH.sway(t,0,1.5)*(1-shrink));
  if(shrink<1)g+=PEN.stroke(cr,0,cp,{lw:9,op:1-P(t,4.0,4.3)});if(cp>0&&cp<1)pen=PEN.at(cr,cp);
  g+=PEN.note('tkdn0','yakın çekim',CX-120,1460,62,P(t,4.1,4.6),P(t,4.9,5.1),{fill:TS.INK});
  // 5.6–8: kareler zıplayarak çoğalır; kalem her birine küçük bir iz bırakır
  for(let i=1;i<10;i++){const t0=5.6+(i-1)*.26,u=eIO(P(t,t0,t0+.4));if(u<=0)continue;
   const p=TH.hop(G[0],G[i],u,140);g+=photo(p[0],p[1],150,[1,2,3,4,5,6,1,3,2][i-1],TH.sway(t,i,2.5)*u)}
  // sayaç kartı
  const cnt=t<5.6?1:Math.min(10,1+Math.floor((t-5.6)/.26+.0001)+(t>=5.6?0:0));
  const bm=Math.sin(Math.PI*clamp(((t-5.6)%.26)/.2))*10*(t>5.6&&t<8.1?1:0);
  const kx=820,ky=830;
  g+=`<g transform="translate(0 ${f2(-bm)})"><rect x="${kx-110}" y="${ky-80+14}" width="220" height="160" rx="18" fill="${TS.SH}" opacity=".1"/><rect x="${kx-110}" y="${ky-80}" width="220" height="160" rx="18" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="7"/>${T(kx,ky+36,String(cnt),{f:FF,size:104,w:800,anchor:'middle'})}${T(kx,ky+142,'gönderi',{f:FC,size:50,w:700,anchor:'middle',fill:TS.MUTE})}</g>`;
  // kalem sayacı halkalar
  const lp=PEN.loop(kx,ky,150,110,1.15,7),lq=eIO(P(t,8.3,9.0));g+=PEN.stroke(lp,0,lq,{lw:9});if(lq>0&&lq<1)pen=PEN.at(lp,lq);
  // ızgaraya kalem: alttan alt çizgi
  const ul=`M${G[5][0]-80},1370 C${CX-100},1390 ${CX+100},1350 ${G[9][0]+80},1372`,up=eIO(P(t,5.6,8.0));
  g+=PEN.stroke(ul,0,up,{lw:6,c:TS.MUTE,op:.6});if(up>0&&up<1&&!pen)pen=PEN.at(ul,up);
  g+=PEN.note('tkdn1','aynı kare',150,840,64,P(t,7.0,7.5),0,{fill:TS.INK});
  g+=PEN.note('tkdn2','dakikalar içinde',300,1500,64,P(t,9.0,9.5),0,{fill:TS.INK});
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Bir fotoğraftan',76,-9,2.4,t,{fill:TS.INK})+CT(540,500,'on gönderi çıkar, çoğu',76,-9,2.45,t,{fill:TS.INK})+CT(540,600,'işletme birini çıkarır.',76,-9,2.5,t,{fill:TS.INK});
  s+=TH.close(t,'Bir fotoğraf,','on',' gönderi.');
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['on-gonderi']=TKD;
