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
/* tobi-ishi: ścieżka między kamieniami rysuje się przy przewijaniu, kamienie zapalają się po kolei */
const steps=$('#steps'),trail=$('.trail');
if(steps&&trail){const li=[...steps.children],base=trail.querySelector('.base'),lit=trail.querySelector('.lit'),still=matchMedia('(prefers-reduced-motion: reduce)').matches;let len=0,cy=[];
  const build=()=>{const w=steps.getBoundingClientRect(),pts=li.map(l=>{const r=l.querySelector('.stone').getBoundingClientRect();return[r.left-w.left+r.width/2,r.top-w.top+r.height/2]});
    let d=`M${pts[0][0]} ${pts[0][1]}`;for(let i=1;i<pts.length;i++){const[a,b]=pts[i-1],[c,e]=pts[i],m=(e-b)/2;d+=` C${a} ${b+m} ${c} ${e-m} ${c} ${e}`}
    base.setAttribute('d',d);lit.setAttribute('d',d);len=lit.getTotalLength();lit.style.strokeDasharray=len;cy=pts.map(p=>p[1]/w.height);draw()};
  const draw=()=>{const r=steps.getBoundingClientRect();let p=still?1:Math.min(1,Math.max(0,(innerHeight*.62-r.top)/r.height));
    lit.style.strokeDashoffset=len*(1-p);li.forEach((l,i)=>l.classList.toggle('on',cy[i]<=p+.015))};
  let t=false;addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(()=>{draw();t=false})}},{passive:true});
  addEventListener('resize',build);if(document.fonts)document.fonts.ready.then(build);build()}
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
