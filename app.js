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
/* odsłony */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.rv,.focus').forEach(el=>io.observe(el));
/* kroki procesu zapalają się po kolei */
const steps=$('#steps');
if(steps){const li=[...steps.children];new IntersectionObserver((es,o)=>{es.forEach(e=>{if(e.isIntersecting){li.forEach((l,i)=>setTimeout(()=>l.classList.add('on'),i*220));o.disconnect()}})},{threshold:.4}).observe(steps)}
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
