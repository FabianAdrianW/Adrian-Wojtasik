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
const io=new IntersectionObserver(es=>{es.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top||a.boundingClientRect.left-b.boundingClientRect.left).forEach((e,i)=>{e.target.style.transitionDelay=Math.min(i*.15,.9)+'s';e.target.classList.add('in');io.unobserve(e.target);setTimeout(()=>e.target.style.transitionDelay='',2800)})},{threshold:0,rootMargin:'0px 0px -4% 0px'});
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
  const body=`Imię: ${n}\nKontakt: ${f.kontakt.value}\n\n${f.wiadomosc.value}`;
  location.href=`mailto:eyeamadrian@gmail.com?subject=${encodeURIComponent('Zapytanie ze strony: '+n)}&body=${encodeURIComponent(body)}`;
  st.textContent='Otwieram program pocztowy. Jeśli się nie otworzył, napisz na eyeamadrian@gmail.com.'});
})();

/* Nić światła: ścieżka wije się od lewej do prawej krawędzi; dojście do granicy sekcji ją odsłania */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const page=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'index';
  const MAP={index:{systemy:'enso','o-mnie':'okno',kontakt:'wiatr'},strony:{kontakt:'wiatr'},aplikacje:{kontakt:'wiatr'},automatyzacje:{kontakt:'wiatr'},realizacje:{kontakt:'wiatr'}};
  const m=MAP[page]||{},secs=[...document.querySelectorAll('main>section')].slice(1);if(!secs.length)return;
  secs.forEach(s=>{s.dataset.reveal=m[s.id]||'brak'});document.documentElement.classList.add('thread-on');
  const NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg'),path=document.createElementNS(NS,'path'),dot=document.createElementNS(NS,'circle'),glow=document.createElementNS(NS,'path'),halo=document.createElementNS(NS,'circle');
  svg.setAttribute('class','thread');svg.setAttribute('aria-hidden','true');dot.setAttribute('r','2.6');glow.setAttribute('class','tg');halo.setAttribute('class','th');halo.setAttribute('r','9');svg.append(glow,path,halo,dot);document.body.append(svg);
  const SEAM=110;let seg=[],total=0,x0=0,x1=0;
  const bgOf=el=>{let p=el.previousElementSibling;while(p){const c=getComputedStyle(p).backgroundColor;if(c&&c!=='rgba(0, 0, 0, 0)')return c;p=p.previousElementSibling}return getComputedStyle(document.body).backgroundColor};
  const prep=s=>{if(s.dataset.reveal!=='mozaika'||s.querySelector(':scope>.mosaic'))return;const mo=document.createElement('div');mo.className='mosaic';mo.setAttribute('aria-hidden','true');
    const w=s.offsetWidth,cols=innerWidth<700?5:9,size=w/cols,rows=Math.min(Math.ceil(Math.min(s.offsetHeight,innerHeight*1.6)/size),14);
    mo.style.cssText=`--mc:${bgOf(s)};grid-template-columns:repeat(${cols},1fr);grid-auto-rows:${size}px;bottom:auto;height:${Math.min(s.offsetHeight,rows*size)}px`;
    const fromR=s.dataset.dir==='l';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const i=document.createElement('i'),dx=fromR?cols-1-c:c;i.style.transitionDelay=(Math.hypot(dx,r*1.2)*.07).toFixed(2)+'s';mo.append(i)}
    s.append(mo);s.dataset.mosaicH='1'};
  const reveal=(s,hx)=>{s.classList.add('in');[...s.querySelectorAll('.rv:not(.in)')].filter(r=>r.getBoundingClientRect().top<innerHeight*1.05).sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top).forEach((r,i)=>{r.style.transitionDelay=Math.min(i*.15,.9)+'s';r.classList.add('in');setTimeout(()=>r.style.transitionDelay='',2800)});
    setTimeout(()=>{s.classList.add('open');const mo=s.querySelector(':scope>.mosaic');if(mo)mo.remove()},3000)};

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
    seg.forEach(s=>d+=s.k==='v'?` L${s.x} ${s.y1}`:` L${s.x1} ${s.y}`);path.setAttribute('d',d);glow.setAttribute('d',d);
    total=path.getTotalLength();path.style.strokeDasharray=total;glow.style.strokeDasharray=total;secs.forEach(prep);draw()};
  const draw=()=>{const head=scrollY+innerHeight*.86;let len=0,hx=x0,hy=seg[0]?seg[0].y0||seg[0].y:0;
    for(const s of seg){if(s.k==='v'){const a=Math.min(s.y0+(s.off||0),s.y1-1),f=Math.max(0,Math.min(1,(head-a)/(s.y1-a)));len+=(s.y1-s.y0)*f;hx=s.x;hy=s.y0+(s.y1-s.y0)*f;if(f<1)break}
      else{const f=Math.max(0,Math.min(1,(head-s.y)/SEAM));len+=Math.abs(s.x1-s.x0)*f;hx=s.x0+(s.x1-s.x0)*f;hy=s.y;
        const sc=s.sec;if(sc.dataset.reveal==='kafel'&&!sc.classList.contains('in'))sc.style.setProperty('--f',Math.min(1,f/.6));
        if(f>=(sc.dataset.reveal==='kafel'?.6:.05)&&!sc.classList.contains('in'))reveal(sc,hx);
        if(f<1)break}}
    const off=Math.max(0,total-len);path.style.strokeDashoffset=off;glow.style.strokeDashoffset=off;dot.setAttribute('cx',hx);dot.setAttribute('cy',hy);halo.setAttribute('cx',hx);halo.setAttribute('cy',hy)};
  let t=false;addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(()=>{draw();t=false})}},{passive:true});
  let rt;const rb=()=>{clearTimeout(rt);rt=setTimeout(build,120)};addEventListener('resize',rb);addEventListener('load',build);
  if(window.ResizeObserver)new ResizeObserver(rb).observe(document.querySelector('main'));if(document.fonts)document.fonts.ready.then(build);build()})();

/* Po godzinach: schematy ruszają, gdy są na ekranie */
(()=>{const f=document.querySelectorAll('.flow');if(!f.length||!('IntersectionObserver' in window))return;
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('run',e.isIntersecting)),{threshold:.4});f.forEach(x=>io.observe(x))})();
/* textarea rośnie razem z tekstem */
(()=>{const t=document.getElementById('f-msg');if(!t)return;const g=()=>{t.style.height='auto';t.style.height=Math.min(t.scrollHeight+2,260)+'px'};t.addEventListener('input',g)})();

/* Pracownia: model AI wybiera kanji, kreski pochodzą z KanjiVG i są rysowane po kolei */
(()=>{const form=document.getElementById('pform');if(!form)return;
const WORKER='https://kaligrafia.eyeamadrian.workers.dev';
const $=s=>document.getElementById(s),g=$('pg'),cv=$('pcanvas'),wa=$('washi'),st=$('pstat'),rp=$('replay'),dl=$('dl'),inp=$('pin'),go=$('pgo');
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const KJ=/[㐀-䶿一-鿿々]/;
const memo=new Map();let cur=null,run=0;
const NS='http://www.w3.org/2000/svg';
const hex=c=>c.codePointAt(0).toString(16).padStart(5,'0');
async function strokes(c){
  if(memo.has(c))return memo.get(c);
  const f=hex(c),urls=[`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${f}.svg`,`https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${f}.svg`];
  for(const u of urls){try{const r=await fetch(u);if(!r.ok)continue;const d=new DOMParser().parseFromString(await r.text(),'image/svg+xml');
    const p=[...d.querySelectorAll('path')].map(x=>x.getAttribute('d')).filter(Boolean);if(p.length){memo.set(c,p);return p}}catch(e){}}
  memo.set(c,null);return null}
function say(t){st.textContent=t||''}
function setMeta(r,m){$('pread').textContent=r||'';$('pmean').textContent=m||''}
async function draw(chars,read,mean){
  const my=++run;cur=null;say('');wa.classList.remove('done');rp.disabled=dl.disabled=true;
  const arr=[...chars].filter(c=>KJ.test(c)).slice(0,4);if(!arr.length)return fail();
  setMeta(read,mean);
  const data=await Promise.all(arr.map(strokes));if(my!==run)return;
  const n=arr.length;cv.setAttribute('viewBox',`0 0 ${109*n} 109`);g.textContent='';
  const all=[],q=[];
  arr.forEach((c,i)=>{const gr=document.createElementNS(NS,'g');gr.setAttribute('transform',`translate(${109*i} 0)`);g.appendChild(gr);
    if(!data[i]){const tx=document.createElementNS(NS,'text');tx.setAttribute('x',54.5);tx.setAttribute('y',90);tx.setAttribute('font-size',100);tx.setAttribute('text-anchor','middle');tx.setAttribute('class','fb');tx.textContent=c;gr.appendChild(tx);all.push(null);return}
    all.push(data[i]);
    data[i].forEach(d=>{const p=document.createElementNS(NS,'path');p.setAttribute('d',d);p.setAttribute('class','st');gr.appendChild(p);q.push(p)});q.push(null)});
  let t=0;
  if(!calm){const L=q.map(p=>p?p.getTotalLength():0),D=L.map(l=>260+l*7),tot=D.reduce((a,d,i)=>a+(q[i]?d*.72:240),0),k=Math.min(1,9000/tot);
    q.forEach((p,i)=>{if(!p){t+=240*k;return}const dur=D[i]*k;p.style.strokeDasharray=L[i];p.style.strokeDashoffset=L[i];
      p.animate([{strokeDashoffset:L[i]},{strokeDashoffset:0}],{duration:dur,delay:t,fill:'forwards',easing:'cubic-bezier(.42,.08,.3,1)'});t+=dur*.72})}
  cur={arr,all,read,mean};
  setTimeout(()=>{if(my!==run)return;wa.classList.add('done');rp.disabled=dl.disabled=false},calm?0:t+500)}
function fail(msg){run++;say(msg||'Nie udało się dobrać znaków. Spróbuj innego słowa.')}
async function ask(text){
  const key='prac1:'+text.toLowerCase();
  try{const c=JSON.parse(localStorage.getItem(key)||'null');if(c&&c.kanji)return c}catch(e){}
  const r=await fetch(WORKER,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
  if(r.status===429)throw new Error('Za dużo prób w ciągu minuty. Poczekaj chwilę i spróbuj jeszcze raz.');
  if(r.status===422)throw new Error('Nie udało się dobrać znaków do tego słowa. Spróbuj pojęcia, np. „odwaga”, „nowy początek”.');
  if(r.status===422)throw new Error('Nie udało się dobrać znaków do tego słowa. Spróbuj pojęcia, np. „odwaga”, „nowy początek”.');
  if(!r.ok)throw new Error('Pracownia chwilowo odpoczywa. Wybierz jedno z gotowych haseł obok.');
  const j=await r.json();if(!j.kanji)throw new Error('Nie udało się dobrać znaków. Spróbuj innego słowa.');
  try{localStorage.setItem(key,JSON.stringify(j))}catch(e){}
  return j}
form.addEventListener('submit',async e=>{e.preventDefault();
  const t=inp.value.trim().replace(/\s+/g,' ');
  if(!t){say('Wpisz słowo albo wybierz jedno z haseł.');inp.focus();return}
  if(t.split(' ').length>5){say('Maksymalnie pięć słów.');return}
  document.querySelectorAll('#chips .on').forEach(b=>b.classList.remove('on'));
  go.disabled=true;say('Dobieram znaki…');const my=run+1;
  try{const j=await ask(t);await draw(j.kanji,j.reading,j.meaning)}catch(er){fail(er.message.length<120?er.message:'Pracownia chwilowo odpoczywa.')}
  go.disabled=false});
$('chips').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  document.querySelectorAll('#chips .on').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  inp.value=b.textContent;draw(b.dataset.k,b.dataset.r,b.dataset.m)});
rp.addEventListener('click',()=>{if(cur)draw(cur.arr.join(''),cur.read,cur.mean)});
dl.addEventListener('click',async()=>{if(!cur)return;const n=cur.arr.length,S=10,P=100,W=109*n*S+2*P,H=109*S+2*P+150;
  const body=cur.all.map((ds,i)=>ds?`<g transform="translate(${109*i} 0)">`+ds.map(d=>`<path d="${d}" fill="none" stroke="#121311" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/>`).join('')+'</g>':`<text x="${109*i+54.5}" y="90" font-size="100" text-anchor="middle" fill="#121311">${cur.arr[i]}</text>`).join('');
  const svg=`<svg xmlns="${NS}" width="${109*n*S}" height="${109*S}" viewBox="0 0 ${109*n} 109"><defs><filter id="r" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6"/></filter></defs><g filter="url(#r)">${body}</g></svg>`;
  const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  try{await img.decode();await document.fonts.load('40px Mincho','AW')}catch(e){}
  const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  x.fillStyle='#F2EFE7';x.fillRect(0,0,W,H);x.drawImage(img,P,P);
  x.fillStyle='#5D5F58';x.textBaseline='alphabetic';x.font='38px Mincho, serif';x.fillText(`${cur.read}  ·  ${cur.mean}`,P,H-70);
  const hx=W-P-118,hy=H-P-118+20;x.save();x.translate(hx+59,hy+59);x.rotate(-.1);x.fillStyle='#B23A2E';x.beginPath();x.roundRect(-59,-59,118,118,8);x.fill();
  x.strokeStyle='#F2EFE7';x.lineWidth=3;x.strokeRect(-47,-47,94,94);x.fillStyle='#F2EFE7';x.textAlign='center';x.font='42px Mincho, serif';x.fillText('A',0,-4);x.fillText('W',0,40);x.restore();
  c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='kaligrafia-'+(cur.read||'kanji').replace(/[^\w-]+/g,'')+'.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)})});
})();
