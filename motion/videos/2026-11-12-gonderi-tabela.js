/* ---- Göz İzi · telefon akışı: "Akıştaki her gönderin, dükkânının bir tabelası." (yerel işletme · tarz) ---- */
const GT=(function(){
 const BG='#1C1B1F',D=15,PX=280,PY=470,PW=520,PH=1060,SX=296,SY=486,SW=488,SH=1028,L='#F5F0E6';
 const FY=560,PP=330,SB=64; // akış başlangıcı, gönderi aralığı, tabela bandı yüksekliği
 const MIS=[
  {bg:'#2E5E8C',f:FF,size:34,w:600,x:540,a:'middle',c:'#fff'},
  {bg:'#E8C547',f:FC,size:46,w:700,x:322,a:null,c:'#3a2a10'},
  {bg:'#7A2E3A',f:FF,size:30,w:500,x:760,a:'end',c:'#F5E6D6',it:1},
  {bg:'#3E7D5A',f:FF,size:38,w:800,x:322,a:null,c:'#fff'},
  {bg:'#D9CBB8',f:FC,size:44,w:700,x:540,a:'middle',c:'#7A2E3A'},
  {bg:'#5B4B8A',f:FF,size:28,w:500,x:760,a:'end',c:'#fff'},
  {bg:'#2A2A2A',f:FC,size:44,w:600,x:540,a:'middle',c:'#F2C9B3'}];
 const FIX={bg:'#24384F',f:FF,size:32,w:600,x:322,a:null,c:L};
 const GX=[540,380,690,410,540,690,540]; // karışık akışta tabela yazısının ortası
 function item(k,cx,cy){const m=k%3;
  if(m===0)return `<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="#C98B4F" stroke-width="30"/><circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="${K}" stroke-width="4" stroke-dasharray="3 14" opacity=".35"/>`;
  if(m===1)return `<rect x="${cx-110}" y="${cy-55}" width="220" height="110" rx="55" fill="#D9A066" stroke="${K}" stroke-width="5"/><path d="M${cx-50},${cy-35} l-24,70 M${cx},${cy-38} l-24,76 M${cx+50},${cy-35} l-24,70" stroke="#A86B35" stroke-width="8" stroke-linecap="round"/>`;
  return `<path d="M${cx-90},${cy+50} L${cx+90},${cy+50} L${cx+70},${cy-40} L${cx-70},${cy-40} Z" fill="#F5E6D6" stroke="${K}" stroke-width="5" stroke-linejoin="round"/><path d="M${cx-80},${cy+5} H${cx+80}" stroke="#C9A27C" stroke-width="10"/><circle cx="${cx}" cy="${cy-58}" r="16" fill="#7A2E3A" stroke="${K}" stroke-width="4"/>`}
 function post(k,y0,st,fixed){let s=`<rect x="${SX}" y="${y0}" width="${SW}" height="${SB}" fill="${st.bg}"/>`;
  s+=T(st.x,y0+SB/2+st.size*.34,'Köşe Fırın',{f:st.f,size:st.size,w:st.w,fill:st.c,anchor:st.a,style:st.it?'italic':null});
  s+=`<rect x="${SX}" y="${y0+SB}" width="${SW}" height="236" fill="${fixed||k%2?'#F2E3D3':'#EDE6DA'}"/>`+item(k,540,y0+SB+118);
  return s}
 function feed(off,fixed){let s=`<rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#fff"/>`;
  for(let k=0;k<7;k++){const y0=FY+k*PP-off;if(y0>SY+SH||y0+300<SY)continue;s+=post(k,y0,fixed?FIX:MIS[k],fixed)}
  s+=`<rect x="${SX}" y="${SY}" width="${SW}" height="64" fill="#fff"/><circle cx="330" cy="526" r="18" fill="#F2C9B3"/>`+T(360,535,'kose.firin',{size:24,w:600});
  return s}
 // bakış: [x, y(ekran), t0]
 const GA=[[GX[3],FY+44,6.0],[GX[4],FY+PP+44,6.5],[GX[5],FY+2*PP+44,7.0]];
 const GB=[[400,FY+44,9.8],[400,FY+PP+44,10.2],[400,FY+2*PP+44,10.6]];
 function gaze(G,t,fade){let s='';const v=G.filter(g=>t>=g[2]);if(!v.length)return '';
  const op=1-P(t,fade,fade+.4);if(op<=0)return '';
  s+=`<polyline points="${v.map(g=>f2(g[0])+','+f2(g[1])).join(' ')}" fill="none" stroke="${O}" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>`;
  v.forEach(g=>{const el=t-g[2];s+=`<circle cx="${g[0]}" cy="${g[1]}" r="${f2(14+40*Math.sqrt(Math.min(el,.6)))}" fill="none" stroke="${O}" stroke-width="4"/><circle cx="${g[0]}" cy="${g[1]}" r="6" fill="${O}"/>`});
  const c=v[v.length-1];s+=`<g transform="translate(${c[0]} ${c[1]})"><circle r="44" fill="none" stroke="${K}" stroke-width="3"/><path d="M-60,0H-48M48,0H60M0,-60V-48M0,48V60" stroke="${K}" stroke-width="3"/></g>`;
  return `<g opacity="${f2(op)}">${s}</g>`}
 function pill(id,s,x,y,p){if(p<=0)return '';return `<rect x="${x-16}" y="${y-48}" width="${f2(24*s.length+30)}" height="66" rx="33" fill="#fff" opacity="${f2(Math.min(1,p*3)*.95)}"/>`+PEN.note(id,s,x,y,44,p,0,{fill:'#2a2a2a'})}
 const LP=PEN.loop(540,FY+SB/2,250,52,1.12,1.7);
 return {id:'gt',dur:D,bg:BG,render(t){
  let s=`<rect width="1080" height="1920" fill="${BG}"/>`;
  const k=eIO(P(t,12.0,12.7)),sc=lerp(1,.62,k),cy=lerp(PY+PH/2,1220,k),sw=eIO(P(t,8.8,9.4));
  const off=PP*3*eIO(P(t,3.4,5.6));
  let ph=`<rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#0B0B0C" stroke="#3a3840" stroke-width="3"/><clipPath id="gtscr"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="50"/></clipPath><g clip-path="url(#gtscr)">`;
  const lp=DRAW(LP,.6,1.4,[3.0,3.4],t,{lw:8,fade:1});
  ph+=`<g transform="translate(${f2(-SW*sw)} 0)">${feed(off,false)}${off<1?lp.s:''}${gaze(GA,t,8.6)}${pill('gtn1','hangisi aynı dükkân?',330,1470,P(t,7.6,8.2))}</g>`;
  ph+=`<g transform="translate(${f2(SW*(1-sw))} 0)">${feed(PP*3,true)}${gaze(GB,t,99)}${pill('gtn2','hep aynı yer',330,1470,P(t,11.0,11.5))}</g>`;
  ph+=`</g><rect x="${540-50}" y="${SY+10}" width="100" height="26" rx="13" fill="#0B0B0C"/>`;
  s+=`<g transform="translate(540 ${f2(cy)}) scale(${f2(sc)}) translate(-540 ${-(PY+PH/2)})">${ph}</g>`;
  if(lp.pen)s+=PRING(lp.pen);
  s+=CT(540,320,'Akıştaki her gönderin,',72,-9,3.0,t,{fill:L})+CT(540,410,'dükkânının bir tabelası.',72,-9,3.05,t,{fill:L});
  s+=CT(540,370,'Akışta her gün yenisi.',72,3.45,5.8,t,{fill:L});
  s+=CT(540,370,'Her gün başka dükkân.',72,6.2,8.8,t,{fill:L});
  s+=CT(540,370,'Rengi, yazısı sabit.',72,9.2,11.9,t,{fill:L});
  s+=CT(540,430,'Her gün yeni tabela;',88,12.2,99,t,{fill:L})+CT(540,545,`hepsi <tspan fill="${O}">aynı dükkân.</tspan>`,88,12.45,99,t,{fill:L,raw:1});
  s+=WM2(true);
  return s}};
})();
VIDEOS['gonderi-tabela']=GT;
