/* Adrian Wojtasik v5 · nawigacja, odsłony, kroki procesu, formularz */
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
document.documentElement.classList.add('js');
/* intro z bramą torii */
const intro=$('#intro');
if(intro&&!intro.hidden){const end=()=>{if(intro.classList.contains('done'))return;intro.classList.add('done');document.documentElement.classList.remove('intro-on');try{sessionStorage.setItem('aw-intro','1')}catch(e){}setTimeout(()=>intro.remove(),400)};
  intro.addEventListener('click',end);addEventListener('keydown',end,{once:true});setTimeout(end,3250)}else if(intro)intro.remove();
const nav=$('#nav'),bar=$('#callbar'),btn=$('.menu-btn'),mnav=$('#mnav');
const darkPage=!$('.hero')&&!$('.sub-hero');if(darkPage)nav.classList.add('scrolled');
let tick=false;
function onScroll(){
  const y=scrollY;nav.classList.toggle('scrolled',darkPage||y>40);
  /* nad ciemną sekcją nawigacja zostaje ciemna */
  const mid=document.elementsFromPoint(innerWidth/2,(parseFloat(getComputedStyle(nav).height)||68)+2).find(e=>e.closest&&e.closest('section'));
  const sec=mid&&mid.closest('section');nav.classList.toggle('on-dark-page',!!sec&&sec.dataset.tone==='night');
  if(bar)bar.classList.toggle('show',y>innerHeight*.6);
  tick=false}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
if(btn){btn.addEventListener('click',()=>{const o=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!o));mnav.classList.toggle('open',!o);document.body.style.overflow=o?'':'hidden'});
  mnav.addEventListener('click',e=>{if(e.target.tagName==='A'){btn.setAttribute('aria-expanded','false');mnav.classList.remove('open');document.body.style.overflow=''}});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&mnav.classList.contains('open')){btn.click();btn.focus()}})}
/* światło pod wskazaną pozycją menu */
const glow=$('.nav-glow');
if(glow){$$('.links>li>a').forEach(a=>{a.addEventListener('mouseenter',()=>{const li=a.parentElement;glow.style.left=(li.offsetLeft+16)+'px';glow.style.width=(li.offsetWidth-32)+'px';glow.style.opacity=1})});
  $('.links').addEventListener('mouseleave',()=>glow.style.opacity=0)}
/* odsłony */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.rv,.focus').forEach(el=>io.observe(el));
/* Jak pracuję: aktywny krok to ten na środku ekranu; zdjęcie, podpis i znaczniki idą za nim */
const steps=$('#steps');
if(steps){const li=[...steps.children],imgs=$$('.way-media .frame img'),ticks=$$('.way-media .ticks li'),wn=$('#way-n'),wt=$('#way-t');let cur=-1;
  const set=i=>{if(i===cur)return;cur=i;li.forEach((l,k)=>l.classList.toggle('on',k===i));imgs.forEach((m,k)=>m.classList.toggle('on',k===i));
    ticks.forEach((t,k)=>{t.classList.toggle('on',k===i);t.classList.toggle('done',k<i)});
    if(wn)wn.textContent='0'+(i+1);if(wt)wt.textContent=li[i].querySelector('h3').firstChild.textContent};
  const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(+e.target.dataset.i)}),{rootMargin:'-46% 0px -46% 0px'});
  li.forEach(l=>io2.observe(l));set(0)}
/* kopiowanie e-maila */
$$('.copybtn').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);const t=b.textContent;b.textContent='Skopiowano';setTimeout(()=>b.textContent=t,1800)}catch(e){}}));
/* formularz: mailto */
const f=$('#form');
if(f)f.addEventListener('submit',e=>{e.preventDefault();const st=$('#form-status'),n=f.imie.value.trim();
  if(!n){st.textContent='Wpisz imię, żebym wiedział, jak się zwracać.';f.imie.focus();return}
  const body=`Imię: ${n}\nKontakt: ${f.kontakt.value}\nFirma: ${f.firma.value}\n\n${f.wiadomosc.value}`;
  location.href=`mailto:eyeamadrian@gmail.com?subject=${encodeURIComponent('Zapytanie ze strony: '+n)}&body=${encodeURIComponent(body)}`;
  st.textContent='Otwieram program pocztowy. Jeśli się nie otworzył, napisz na eyeamadrian@gmail.com.'});
})();

/* Nić światła: ścieżka wije się od lewej do prawej krawędzi; dojście do granicy sekcji ją odsłania */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const page=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'index';
  const MAP={index:{realizacje:'rozdanie',uslugi:'kafel','jak-pracuje':'brak',systemy:'enso','o-mnie':'okno',ceny:'mozaika',kontakt:'kirigami'},
    strony:{co:'kafel',jak:'mozaika','inne-uslugi':'rozdanie',kontakt:'enso'},
    aplikacje:{co:'okno',jak:'fala','inne-uslugi':'rozdanie',kontakt:'mozaika'},
    automatyzacje:{co:'mozaika',jak:'enso','inne-uslugi':'rozdanie',kontakt:'kafel'},
    realizacje:{realizacje:'rozdanie','inne-uslugi':'fala',kontakt:'okno'}};
  const m=MAP[page]||{},secs=[...document.querySelectorAll('main>section')].slice(1);if(!secs.length)return;
  secs.forEach(s=>{s.dataset.reveal=m[s.id]||'enso'});document.documentElement.classList.add('thread-on');
  const NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg'),path=document.createElementNS(NS,'path'),dot=document.createElementNS(NS,'circle');
  svg.setAttribute('class','thread');svg.setAttribute('aria-hidden','true');dot.setAttribute('r','2.6');svg.append(path,dot);document.body.append(svg);
  const SEAM=150;let seg=[],total=0,x0=0,x1=0;
  const bgOf=el=>{let p=el.previousElementSibling;while(p){const c=getComputedStyle(p).backgroundColor;if(c&&c!=='rgba(0, 0, 0, 0)')return c;p=p.previousElementSibling}return getComputedStyle(document.body).backgroundColor};
  const prep=s=>{if(s.dataset.reveal!=='mozaika'||s.querySelector(':scope>.mosaic'))return;const mo=document.createElement('div');mo.className='mosaic';mo.setAttribute('aria-hidden','true');
    const w=s.offsetWidth,cols=innerWidth<700?5:9,size=w/cols,rows=Math.min(Math.ceil(Math.min(s.offsetHeight,innerHeight*1.6)/size),14);
    mo.style.cssText=`--mc:${bgOf(s)};grid-template-columns:repeat(${cols},1fr);grid-auto-rows:${size}px;bottom:auto;height:${Math.min(s.offsetHeight,rows*size)}px`;
    const fromR=s.dataset.dir==='l';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const i=document.createElement('i'),dx=fromR?cols-1-c:c;i.style.transitionDelay=(Math.hypot(dx,r*1.2)*.07).toFixed(2)+'s';mo.append(i)}
    s.append(mo);s.dataset.mosaicH='1'};
  const deal=(s,hx)=>{const sr=s.getBoundingClientRect(),cards=[...s.querySelectorAll('.ph,.path,.price,.flow')].filter(c=>c.getBoundingClientRect().top<sr.top+innerHeight*1.6);
    const ox=Math.min(Math.max(hx-scrollX,innerWidth*.2),innerWidth*.8),oy=sr.top+Math.min(innerHeight*.3,sr.height*.2);
    cards.forEach((c,i)=>{const r=c.getBoundingClientRect(),dx=ox-(r.left+r.width/2),dy=oy-(r.top+r.height/2),rot=(i%2?1:-1)*(4+i%3*3);
      c.animate([{transform:`translate(${dx}px,${dy}px) scale(.22) rotate(${rot}deg)`,opacity:0,offset:0},{opacity:1,offset:.25},{transform:'none',opacity:1}],{duration:1300,delay:i*110,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'})})};
  const reveal=(s,hx)=>{s.classList.add('in');if(s.dataset.reveal==='rozdanie')deal(s,hx);
    setTimeout(()=>{s.classList.add('open');const mo=s.querySelector(':scope>.mosaic');if(mo)mo.remove()},s.dataset.reveal==='mozaika'?2400:1900)};

  const build=()=>{const W=document.documentElement.clientWidth,pad=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pad'))||parseFloat(getComputedStyle(secs[0]).paddingLeft)||20;
    const g=Math.max(8,Math.min(pad*.45,44));x0=g;x1=W-g;const top=y=>y+scrollY;
    const hero=document.querySelector('main>section');let y=top(hero.getBoundingClientRect().bottom),x=x0;
    const H=document.documentElement.scrollHeight;svg.setAttribute('width',W);svg.setAttribute('height',H);svg.style.height=H+'px';
    seg=[];let d=`M${x} ${y}`;
    secs.forEach((s,i)=>{const r=s.getBoundingClientRect(),st=top(r.top),sb=top(r.bottom);
      if(st>y){seg.push({k:'v',x,y0:y,y1:st,off:i?SEAM:0});y=st}
      const nx=x===x0?x1:x0;s.dataset.dir=nx>x?'r':'l';s.style.setProperty('--ox',(nx>x?4:96)+'%');
      seg.push({k:'h',x0:x,x1:nx,y,sec:s});x=nx;
      const end=i===secs.length-1?Math.min(sb,st+innerHeight*.8):sb;seg.push({k:'v',x,y0:y,y1:end,off:SEAM});y=end});
    seg.forEach(s=>d+=s.k==='v'?` L${s.x} ${s.y1}`:` L${s.x1} ${s.y}`);path.setAttribute('d',d);
    total=path.getTotalLength();path.style.strokeDasharray=total;secs.forEach(prep);draw()};
  const draw=()=>{const head=scrollY+innerHeight*.72;let len=0,hx=x0,hy=seg[0]?seg[0].y0||seg[0].y:0;
    for(const s of seg){if(s.k==='v'){const a=Math.min(s.y0+(s.off||0),s.y1-1),f=Math.max(0,Math.min(1,(head-a)/(s.y1-a)));len+=(s.y1-s.y0)*f;hx=s.x;hy=s.y0+(s.y1-s.y0)*f;if(f<1)break}
      else{const f=Math.max(0,Math.min(1,(head-s.y)/SEAM));len+=Math.abs(s.x1-s.x0)*f;hx=s.x0+(s.x1-s.x0)*f;hy=s.y;
        const sc=s.sec;if(sc.dataset.reveal==='kafel'&&!sc.classList.contains('in'))sc.style.setProperty('--f',f);
        if(f>=(sc.dataset.reveal==='kafel'?1:.3)&&!sc.classList.contains('in'))reveal(sc,hx);
        if(f<1)break}}
    path.style.strokeDashoffset=Math.max(0,total-len);dot.setAttribute('cx',hx);dot.setAttribute('cy',hy)};
  let t=false;addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(()=>{draw();t=false})}},{passive:true});
  let rt;const rb=()=>{clearTimeout(rt);rt=setTimeout(build,120)};addEventListener('resize',rb);addEventListener('load',build);
  if(window.ResizeObserver)new ResizeObserver(rb).observe(document.querySelector('main'));if(document.fonts)document.fonts.ready.then(build);build()})();

/* Przegrupowanie: zdjęcia odrywają się od jednej sekcji i składają w następną. Sterowane przewijaniem, więc w obie strony */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const layer=document.createElement('div');layer.className='morph-layer';layer.setAttribute('aria-hidden','true');document.body.append(layer);
  const vis=e=>e&&e.offsetParent!==null;const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;const L=(a,b,t)=>a+(b-a)*t;
  const mk=(src,top)=>{const d=document.createElement('div');d.className='mc';d.innerHTML=`<img src="${src}" alt="">`+(top?`<img class="to" src="${top}" alt="">`:'');layer.append(d);return d};
  const place=(d,a,b,t,rot,extra)=>{const x=L(a.left,b.left,t),y=L(a.top,b.top,t),w=L(a.width,b.width,t),h=L(a.height,b.height,t);
    d.style.cssText=`transform:translate(${x}px,${y}px) rotate(${rot}deg);width:${w}px;height:${h}px;${extra||''}`};
  const morphs=[];
  /* 1. Usługi → Jak pracuję: trzy karty zbiegają się w wachlarz i lądują w ramce zdjęcia */
  const cards=[...document.querySelectorAll('#uslugi .path')],frame=document.querySelector('.way-media .frame'),mph=document.querySelector('#steps .m-ph');
  if(cards.length&&(frame||mph)){let cl1=null;const tgt=()=>vis(frame)?frame:mph;
    morphs.push(()=>{const T=tgt();if(!T)return;const r=T.getBoundingClientRect(),stick=vis(frame)?parseFloat(getComputedStyle(frame.parentElement).top)||100:innerHeight*.28;
      let p=cl((innerHeight*1.02-r.top)/(innerHeight*1.02-stick));if(p>.995)p=1;const on=p>0&&p<1;
      cards.forEach(c=>c.classList.toggle('peeled',p>0));T.classList.toggle('morph-wait',p<1);
      if(!on){if(cl1){cl1.forEach(d=>d.remove());cl1=null}return}
      if(!cl1)cl1=cards.map((c,i)=>mk(c.querySelector('img').currentSrc||c.querySelector('img').src,i===0?(()=>{const m=T.matches('img')?T:(T.querySelector('img.on')||T.querySelector('img'));return m.currentSrc||m.src})():null));
      const e=ease(p),n=cards.length;
      cards.forEach((c,i)=>{const a=c.getBoundingClientRect(),off=(i-(n-1)/2),fan=Math.sin(Math.PI*e);
        const b={left:r.left+off*fan*r.width*.42,top:r.top-fan*Math.abs(off)*-18,width:r.width,height:r.height};
        const op=i===0?1:cl(1-(p-.72)/.2);
        place(cl1[i],a,b,e,off*fan*9,`z-index:${n-i};opacity:${op};box-shadow:0 ${30*fan}px ${70*fan}px rgba(18,19,17,${.35*fan})`);
        const to=cl1[i].querySelector('.to');if(to)to.style.opacity=cl((p-.6)/.35)})})}
  if(!morphs.length)return;let t=false;const run=()=>{morphs.forEach(f=>f());t=false};
  addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(run)}},{passive:true});addEventListener('resize',run);run()})();
