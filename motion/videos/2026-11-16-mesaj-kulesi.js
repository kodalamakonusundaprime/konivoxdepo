/* mesaj-kulesi: aynı soru balonları üst üste yığılıp sallanan kule olur; kalem kutu çizer, tekrar eden balonlar kutuya akar, tek gerçek mesaj kalır. */
const TKC=(function(){
 const BX=360,BASE=1540,BH=92,QS=['fiyat?','adres?','saat kaç?','kargo var mı?'];
 function wrap(t,g,pen){const end=eIO(P(t,10.0,10.7)),sc=1-.22*end,oy=300*end,CY=1150;
  let s=TH.bg()+`<g transform="translate(540 ${f2(CY+oy)}) scale(${f2(sc)}) translate(-540 ${-CY})"><g transform="${TH.zoom(t)}">${g}</g></g>`;
  if(pen){const q=TH.zmp(pen,t);pen=[540+(q[0]-540)*sc,CY+oy+(q[1]-CY)*sc]}return [s,pen]}
 function bub(x,y,s,rot=0,o={}){const w=o.w||300,h=BH-10;return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(rot)}) scale(${f2(o.sc??1)})" opacity="${f2(o.op??1)}"><rect x="${-w/2}" y="${-h/2+10}" width="${w}" height="${h}" rx="30" fill="${TS.SH}" opacity=".1"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="30" fill="${o.fill||TS.PAPER}" stroke="${TS.INK}" stroke-width="6"/><path d="M${-w/2+40},${h/2-4} l-18,26 l40,-24" fill="${o.fill||TS.PAPER}" stroke="${TS.INK}" stroke-width="6" stroke-linejoin="round"/>${T(0,13,s,{f:FF,size:o.size||40,w:700,anchor:'middle'})}</g>`}
 const N=9,OFF=[0,22,-18,26,-10,30,-24,14,-6];
 return {id:'tkc',dur:15,bg:TS.BG,render(t){
  let g='',pen=null;
  // kaç balon görünüyor: 5 başta, 3.0–4.8 arası 4 tane daha zıplar
  const amp=2+4*P(t,3,7),sw=Math.sin(t*2.6)*amp*(1-P(t,8.0,8.4));
  const box=[790,1130],bp=eIO(P(t,7.6,8.2));
  let tower='';const pos=[];
  for(let i=0;i<N;i++){const y=BASE-i*BH,x=BX+OFF[i];
   const tin=i<5?-9:3.0+(i-5)*.45,u=tin<0?1:eIO(P(t,tin,tin+.45));if(u<=0)continue;
   const tg=8.3+(N-1-i)*.11,v=eIO(P(t,tg,tg+.4));
   let p=TH.hop([x-420,y-200],[x,y],u,120);if(v>0)p=TH.hop(p,box,v,160);
   pos.push(p);
   const bump=i>=5?Math.sin(Math.PI*P(t,tin+.45,tin+.75))*8:0;
   tower+=bub(p[0],p[1]-bump,QS[i%4],(i%2?-2:2)+sw*(i/N)*(1-v),{sc:1-.8*v,op:1-v*v})}
  g+=`<g transform="rotate(${f2(sw*.3)} ${BX} ${BASE+40})">${tower}</g>`;
  g+=tsLine(`M${BX-220},${BASE+48} H${BX+220}`,8);
  // çentikler: kalem sayar
  for(let k=0;k<2;k++){const x0=650+k*140;const d=`M${x0},1100 v90 M${x0+22},1100 v90 M${x0+44},1100 v90 M${x0+66},1100 v90 M${x0-10},1180 L${x0+80},1108`;const p=eIO(P(t,3.0+k*.8,3.7+k*.8));g+=PEN.stroke(d,0,p,{lw:8,c:TS.INK,op:1-P(t,7.3,7.6)});if(p>0&&p<1)pen=PEN.at(d,p)}
  g+=PEN.note('tkcn1','hep aynı soru',630,1300,56,P(t,4.8,5.4),P(t,7.3,7.6),{fill:TS.INK});
  // saat: hızla döner, turuncu yay büyür
  const cx=830,cy=860,R=96,spin=eIO(P(t,5.6,7.4));
  if(t<8.0){const o=1-P(t,7.6,8.0);let c=`<g opacity="${f2(o)}"><circle cx="${cx}" cy="${cy+12}" r="${R}" fill="${TS.SH}" opacity=".1"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="${TS.PAPER}" stroke="${TS.INK}" stroke-width="8"/>`;
   const a=-Math.PI/2+spin*Math.PI*2*3,ah=-Math.PI/2+spin*Math.PI*2*.5;
   c+=tsLine(`M${cx},${cy} L${f2(cx+70*Math.cos(a))},${f2(cy+70*Math.sin(a))}`,7)+tsLine(`M${cx},${cy} L${f2(cx+46*Math.cos(ah))},${f2(cy+46*Math.sin(ah))}`,11)+`<circle cx="${cx}" cy="${cy}" r="10" fill="${TS.INK}"/>`;
   if(spin>0.01){const e=-Math.PI/2+Math.min(.999,spin*.5)*Math.PI*2,r=R+26,p1=[cx+r*Math.cos(e),cy+r*Math.sin(e)];c+=`<path d="M${cx},${cy-r} A${r},${r} 0 ${spin*.5>.5?1:0} 1 ${f2(p1[0])},${f2(p1[1])}" fill="none" stroke="${O}" stroke-width="14" stroke-linecap="round"/>`}
   c+=PEN.note('tkcn2','saatler gidiyor',620,1420,56,P(t,6.4,6.9),0,{fill:TS.INK})+'</g>';g+=c}
  // kalem kutu çizer → hazır cevap kutusu
  const bd=`M${box[0]-150},${box[1]-110} H${box[0]+150} V${box[1]+110} H${box[0]-150} Z`;
  if(bp>0){g+=`<rect x="${box[0]-150}" y="${box[1]-110+14}" width="300" height="220" rx="8" fill="${TS.SH}" opacity="${f2(.1*bp)}"/><rect x="${box[0]-150}" y="${box[1]-110}" width="300" height="220" fill="${TS.PAPER}" opacity="${f2(bp)}"/>`;
   g+=PEN.stroke(bd,0,bp,{lw:9,c:TS.INK});if(bp<1)pen=PEN.at(bd,bp);
   g+=T(box[0],box[1]+150+44,'hazır cevap',{f:FC,size:58,w:700,anchor:'middle',op:P(t,8.2,8.5)});
   const ck=`M${box[0]-50},${box[1]} l34,38 l70,-90`,cp=eIO(P(t,9.3,9.6));g+=PEN.stroke(ck,0,cp,{lw:11});if(cp>0&&cp<1)pen=PEN.at(ck,cp)}
  // tek gerçek mesaj
  const ru=eIO(P(t,9.0,9.45));if(ru>0){const p=TH.hop([-200,1300],[BX,1480],ru,120);g+=bub(p[0],p[1],'almak istiyorum',TH.sway(t,4,2),{w:400,size:42});
   const lp=PEN.loop(BX,1480,230,70,1.15,6),lq=eIO(P(t,9.5,10.0));g+=PEN.stroke(lp,0,lq,{lw:9});if(lq>0&&lq<1)pen=PEN.at(lp,lq)}
  let [s,pp]=wrap(t,g,pen);
  s+=CT(540,400,'Aynı soruyu yüzüncü kez',76,-9,2.4,t,{fill:TS.INK})+CT(540,500,'cevaplayan, satışa',76,-9,2.45,t,{fill:TS.INK})+CT(540,600,'vakit bulamaz.',76,-9,2.5,t,{fill:TS.INK});
  s+=CT(540,500,'Soruya değil,',96,10.3,99,t,{fill:TS.INK})+CT(540,620,`<tspan fill="${O}">satışa</tspan> vakit ayır.`,96,10.5,99,t,{fill:TS.INK,raw:1});
  if(t>11){const b=BOXC('satışa vakit ayır.',96,700,540,620,0,5),d=`M${f2(b.x0-6)},${f2(b.cy+58)} q${f2(b.w/2)},16 ${f2(b.w+12)},-6`,p=eIO(P(t,11.0,11.6));s+=PEN.stroke(d,0,p,{lw:10});if(p>0&&p<1)pp=PEN.at(d,p)}
  s+=WM2(false);if(pp)s+=PRING(pp);
  return s}};
})();
VIDEOS['mesaj-kulesi']=TKC;
