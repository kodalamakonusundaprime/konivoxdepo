/* ---- Göz İzi · telefon: "Gönderine bakan göz, kampanyanı hiç görmüyor." ---- */
const GK=(function(){
 const BG='#1C1B1F',D=15,PX=280,PY=470,PW=520,PH=1060,SX=296,SY=486,SW=488,SH=1028,IMY=585,IMH=488;
 const GR='#8a8a8a',L='#F5F0E6';
 function heart(x,y){return `<path d="M${x},${y+12} C${x-26},${y-6} ${x-14},${y-30} ${x},${y-14} C${x+14},${y-30} ${x+26},${y-6} ${x},${y+12} Z" fill="none" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>`}
 // pasta dilimi (yandan)
 function cake(cx,cy,s){return `<g transform="translate(${cx} ${cy}) scale(${s})">
  <path d="M120,-30 L180,-80 L180,50 L120,100 Z" fill="#E8D2BA" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-160,-30 L120,-30 L120,100 L-160,100 Z" fill="#F5E6D6" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-160,-30 L-100,-80 L180,-80 L120,-30 Z" fill="#fff" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-150,18 H110 M-150,60 H110" stroke="#C9A27C" stroke-width="12" stroke-linecap="round"/>
  <circle cx="30" cy="-92" r="24" fill="#7A2E3A" stroke="${K}" stroke-width="5"/></g>`}
 function post(v){let s=`<rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#fff"/>`;
  s+=`<circle cx="336" cy="545" r="22" fill="#F2C9B3"/>`+T(370,554,'dilim.pasta',{size:26,w:600});
  s+=`<rect x="${SX}" y="${IMY}" width="${SW}" height="${IMH}" fill="#F2E3D3"/>`;
  if(v===0){s+=cake(540,850,1.15)}
  else{s+=cake(690,650,.5)+T(330,690,'Bu cuma',{f:FF,size:46,w:600})+T(330,800,'2 dilim al,',{f:FF,size:74,w:800})+T(330,895,'1\'i bizden.',{f:FF,size:74,w:800,fill:O})}
  s+=heart(330,1112)+`<circle cx="392" cy="1110" r="16" fill="none" stroke="${K}" stroke-width="4"/><path d="M432,1098 L462,1110 L432,1122 Z" fill="none" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>`;
  if(v===0){s+=T(318,1178,'<tspan font-weight="700">dilim.pasta</tspan> Yeni haftaya tatlı',{size:25,raw:1});
   s+=T(318,1216,'bir başlangıç! ...',{size:25})+T(540,1216,'devamı',{size:25,fill:GR})}
  else{s+=T(318,1178,'<tspan font-weight="700">dilim.pasta</tspan> Bu cuma 2 dilim',{size:25,raw:1});
   s+=T(318,1216,'alana 1 dilim bizden. ...',{size:25})+T(640,1216,'devamı',{size:25,fill:GR})}
  if(v)s+=T(318,1262,'2 saat önce',{size:20,fill:'#a8a8a8'});
  return s}
 // gizli kalan açıklama satırları (hayalet)
 function ghost(t){const op=P(t,3.9,4.3);if(op<=0)return '';let s=`<g opacity="${f2(op)}"><rect x="312" y="1252" width="456" height="172" rx="18" fill="#F6F4F0" stroke="${K}" stroke-width="3" stroke-dasharray="6 8"/>`;
  s+=`<rect x="336" y="1274" width="330" height="14" rx="7" fill="#E6E2DB"/><rect x="336" y="1304" width="270" height="14" rx="7" fill="#E6E2DB"/>`;
  s+=T(336,1358,'Bu cuma 2 dilim alana',{size:26,w:700,fill:'#4a4a4a'})+T(336,1394,'1 dilim bizden!',{size:26,w:700,fill:'#4a4a4a'})+T(752,1412,'4. satır',{size:20,fill:'#9a948a',anchor:'end'});
  return s+'</g>'}
 const FA=[[540,820,.6,1.2],[380,545,2.0,.25],[330,1110,2.45,.2],[440,1178,2.8,.3]];
 const FB=[[470,790,7.2,1.0],[460,1180,8.4,.25],[330,1110,8.8,.2]];
 function gz(F,t){for(let k=0;k<F.length;k++){const [x,y,t0,d]=F[k];if(t<t0){if(!k)return [x,y];const [px,py,pt,pd]=F[k-1],p=eIO(P(t,pt+pd,t0));return [lerp(px,x,p),lerp(py,y,p)]}if(t<=t0+d)return [x+2*Math.sin(t*31),y+2*Math.cos(t*27)]}const l=F[F.length-1];return [l[0],l[1]]}
 function overlay(F,t,seed){let s='';const pts=[];
  F.forEach(([x,y,t0,d],k)=>{if(t<t0)return;pts.push([x,y]);const el=Math.min(t-t0,d);
   if(d>=.5){for(let j=0;j<5;j++){const g=P(el,j*.15,j*.15+.3);if(g<=0)continue;s+=`<path d="${PEN.ring(x,y,(70+j*44)*(.9+.1*g),.62,seed,1-j*.15)}" fill="none" stroke="${O}" stroke-width="4" opacity="${f2(g*(1-j*.12))}"/>`}}
   else s+=`<circle cx="${x}" cy="${y}" r="${f2(16+56*Math.sqrt(el))}" fill="none" stroke="${O}" stroke-width="3"/>`});
  if(pts.length){const g=gz(F,t);s=`<polyline points="${[...pts,g].map(p=>p.map(f2).join(',')).join(' ')}" fill="none" stroke="${O}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" opacity=".7"/>`+s}
  const [gx,gy]=gz(F,t);const e=F[F.length-1],op=P(t,F[0][2]-.3,F[0][2])*(1-P(t,e[2]+e[3]+.3,e[2]+e[3]+.6));
  if(op>0)s+=`<g opacity="${f2(op)}" transform="translate(${f2(gx)} ${f2(gy)})"><circle r="40" fill="none" stroke="${K}" stroke-width="3"/><path d="M-56,0H-44M44,0H56M0,-56V-44M0,44V56" stroke="${K}" stroke-width="3"/></g>`;
  return s}
 const RD=PEN.loop(572,1207,70,32,1.15,2.3);
 return {id:'gk',dur:D,bg:BG,render(t){
  let s=`<rect width="1080" height="1920" fill="${BG}"/>`;
  const k=eIO(P(t,10.8,11.5)),sc=lerp(1,.62,k),cy=lerp(PY+PH/2,1220,k),sw=eIO(P(t,6.3,6.9));
  let ph=`<rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#0B0B0C" stroke="#3a3840" stroke-width="3"/><clipPath id="gkscr"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="50"/></clipPath><g clip-path="url(#gkscr)">`;
  // 1. gönderi: kampanya açıklamanın gizli kısmında
  const pen=DRAW(RD,4.6,5.2,null,t,{lw:7});
  ph+=`<g transform="translate(${f2(-SW*sw)} 0)">${post(0)}${overlay(FA,t,2.1)}${ghost(t)}${pen.s}`;
  ph+=PEN.note('gkn1','göz buraya hiç inmedi ↑',330,1475,46,P(t,5.4,6.0),0,{fill:'#2a2a2a'});
  // 2. gönderi: teklif görselde ve ilk satırda
  ph+=`</g><g transform="translate(${f2(SW*(1-sw))} 0)">${post(1)}${overlay(FB,t,4.4)}${PEN.note('gkn2','ilk bakış: teklif',336,1050,54,P(t,8.2,8.8),0,{fill:'#2a2a2a'})}</g>`;
  ph+=`</g><rect x="${540-50}" y="${SY+10}" width="100" height="26" rx="13" fill="#0B0B0C"/>`;
  s+=`<g transform="translate(540 ${f2(cy)}) scale(${f2(sc)}) translate(-540 ${-(PY+PH/2)})">${ph}</g>`;
  if(pen.pen)s+=PRING(pen.pen);
  s+=CT(540,310,'Bu gönderide',80,-9,3.2,t,{fill:L})+CT(540,410,'göz nereye gidiyor?',80,-9,3.25,t,{fill:L});
  s+=CT(540,360,'Kampanya nerede?',80,3.4,6.2,t,{fill:L});
  s+=CT(540,360,'Aynı gönderi, düzeltilmiş:',68,6.45,10.7,t,{fill:L});
  s+=CT(540,400,'Teklifi açıklamaya',84,11.0,99,t,{fill:L})+CT(540,500,'gömme.',84,11.1,99,t,{fill:L})+CT(540,650,`<tspan fill="${O}">İlk bakışa</tspan> koy.`,84,11.4,99,t,{raw:1,fill:L});
  s+=WM2(true);
  return s}};
})();
VIDEOS['gorulmeyen-kampanya']=GK;
