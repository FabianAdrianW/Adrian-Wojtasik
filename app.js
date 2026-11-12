(()=>{
  const d=document,root=d.documentElement;root.classList.add('js');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,hover=matchMedia('(hover:hover)').matches;
  const $=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
  const nav=$('#nav'),win=$('.window'),bar=$('#callbar'),sun=$('.sun circle');
  const secs=$$('main section');
  const lerp=(a,b,t)=>a+(b-a)*t,clamp=v=>Math.max(0,Math.min(1,v));
  addEventListener('load',()=>root.classList.add('loaded'));setTimeout(()=>root.classList.add('loaded'),400);
  if(win)requestAnimationFrame(()=>win.classList.add('on'));

  /* nav pill: płynnie przechodzi do aktywnej / najechanej pozycji */
  const links=$('.links'),pill=$('.pill');
  function movePill(a){if(!pill)return;if(!a){pill.style.opacity=0;return}
    const r=a.getBoundingClientRect(),lr=links.getBoundingClientRect();
    pill.style.opacity='';pill.style.width=r.width+'px';pill.style.transform=`translateX(${r.left-lr.left}px)`}
  let active=null;
  if(links){$$('.links > li > a').forEach(a=>{a.addEventListener('mouseenter',()=>movePill(a));a.addEventListener('focus',()=>movePill(a))});
    links.addEventListener('mouseleave',()=>movePill(active))}

  /* menu mobilne */
  const mb=$('.menu-btn'),mn=$('#mnav');
  if(mb&&mn){const close=()=>{mb.setAttribute('aria-expanded','false');mn.classList.remove('open')};
    mb.addEventListener('click',()=>{const o=mb.getAttribute('aria-expanded')!=='true';mb.setAttribute('aria-expanded',o);mn.classList.toggle('open',o);if(o)mn.querySelector('a').focus()});
    mn.addEventListener('click',e=>{if(e.target.closest('a'))close()});
    addEventListener('keydown',e=>{if(e.key==='Escape'&&mn.classList.contains('open')){close();mb.focus()}
      if(e.key==='Tab'&&mn.classList.contains('open')){const f=[...mn.querySelectorAll('a')];if(e.shiftKey&&d.activeElement===f[0]){e.preventDefault();mb.focus()}else if(!e.shiftKey&&d.activeElement===f[f.length-1]){e.preventDefault();mb.focus()}}})}

  let raf=0;
  function frame(){raf=0;
    const y=scrollY,H=innerHeight,max=root.scrollHeight-H||1,p=clamp(y/max);
    nav.style.setProperty('--prog',p.toFixed(4));
    const mid=nav.offsetHeight+2;let cur=secs[0];
    for(const s of secs){const r=s.getBoundingClientRect();if(r.top<=mid&&r.bottom>mid){cur=s;break}}
    if(cur)nav.classList.toggle('light',cur.dataset.tone==='light');
    if(bar)bar.classList.toggle('show',y>H*.8);
    /* aktywny link */
    if(links){let a=null;for(const s of secs){const r=s.getBoundingClientRect();if(r.top<H*.45&&r.bottom>H*.45){a=links.querySelector(`a[href$="#${s.id}"]`)||a}}
      if(a!==active){$$('.links > li > a').forEach(x=>x.classList.toggle('on',x===a));active=a;if(!links.matches(':hover'))movePill(a)}}
    /* słońce w navbarze wschodzi z porą dnia */
    if(sun){const t=Math.PI*(1-p*.9);sun.setAttribute('cx',(20+16*Math.cos(t)).toFixed(2));sun.setAttribute('cy',(20-16*Math.sin(t)).toFixed(2))}
    if(reduce||!win){root.style.setProperty('--sx','0px');root.style.setProperty('--sa','.35');return}
    root.style.setProperty('--sx',lerp(-34,34,p).toFixed(1)+'px');
    root.style.setProperty('--sa',lerp(.55,.18,p).toFixed(3));
    /* światło: liczone z układu strony, nie z ręcznych wartości.
       Kolejne ciemne sekcje tworzą „przebieg”; światło wchodzi na jego początku,
       wędruje po całej jego długości i gaśnie na końcu. */
    let wx=74,wo=0;
    const wm=H*.5;
    for(let i=0;i<secs.length;i++){
      if(secs[i].dataset.tone!=='dark')continue;
      let j=i;while(secs[j+1]&&secs[j+1].dataset.tone==='dark')j++;
      const top=secs[i].getBoundingClientRect().top,bot=secs[j].getBoundingClientRect().bottom;
      if(top<=wm+H*.5&&bot>=wm-H*.5){
        const len=Math.max(bot-top,1),pos=wm-top;           /* px od początku przebiegu */
        const t=clamp(pos/len);
        const edge=Math.min(H*.9,len*.35);                    /* strefa wejścia/wyjścia */
        wo=Math.min(clamp((pos+H*.25)/edge),clamp((len-pos+H*.25)/edge));
        wo=wo*wo*(3-2*wo);                                    /* smoothstep */
        const drift=Math.sin(t*Math.PI*Math.max(1,len/(H*1.6)));/* dłuższy przebieg = więcej ruchu */
        wx=lerp(76,22,t)+drift*6;
      }
      i=j;
      if(wo>0)break;
    }
    win.style.setProperty('--wx',wx.toFixed(2)+'%');win.style.setProperty('--wo',wo.toFixed(3));
  }
  addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(frame)},{passive:true});
  addEventListener('resize',()=>{frame();movePill(active)});frame();

  /* odsłanianie nagłówków i bloków */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.classList.contains('chat'))playChat(e.target)}}),{rootMargin:'0px 0px -12% 0px'});
  $$('.rv-wrap,.fade,.chat').forEach(el=>io.observe(el));


  /* kroki: oś przypięta, punkt rozwija się podczas przewijania */
  const lis=$$('.steps li');
  if(lis.length){let cur=-1;const set=i=>{if(i===cur)return;cur=i;lis.forEach((l,j)=>{l.classList.toggle('on',j===i);l.classList.toggle('dn',j<i)})};
    lis.forEach((l,i)=>{l.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')set(i)});l.addEventListener('click',()=>set(i));l.addEventListener('focus',()=>set(i))});set(0)}

  /* rozmowa pojawia się wiadomość po wiadomości */
  function playChat(c){const ms=[...c.querySelectorAll('.msg')];if(reduce){ms.forEach(m=>m.classList.add('show'));return}
    const typ=c.querySelector('.typing');let t=300;
    ms.filter(m=>m!==typ).forEach((m,i)=>{if(m.classList.contains('me')&&typ){const tt=t;setTimeout(()=>{typ.style.top=m.offsetTop+'px';typ.classList.add('show')},tt);t+=900;
        setTimeout(()=>typ.classList.remove('show'),t-80)}
      setTimeout(()=>m.classList.add('show'),t);t+=950});
    setTimeout(()=>typ&&typ.remove(),t)}

  /* realizacje: delikatne pochylenie w stronę kursora */
  if(hover&&!reduce)$$('.case').forEach(c=>{const f=c.querySelector('.frame');
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.setProperty('--ry',(x*5).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*4).toFixed(2)+'deg')});
    c.addEventListener('pointerleave',()=>{c.style.setProperty('--ry','0deg');c.style.setProperty('--rx','0deg')})});

  /* przyciski główne lekko przyciągają się do kursora */
  if(hover&&!reduce)$$('.btn-accent').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*6}px,${((e.clientY-r.top)/r.height-.5)*5}px)`});
    b.addEventListener('pointerleave',()=>b.style.transform='')});

  /* brak zrzutu realizacji = zostaje plakat */
  $$('.screen img').forEach(i=>{const k=()=>i.remove();if(i.complete&&!i.naturalWidth)k();else i.addEventListener('error',k)});

  /* formularz bez serwera: otwiera pocztę z gotową wiadomością */
  const f=$('#form'),st=$('#form-status');
  if(f)f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const v=new FormData(f);
    const body=`Imię: ${v.get('imie')}\nFirma: ${v.get('firma')||'-'}\nKontakt: ${v.get('kontakt')||'-'}\n\n${v.get('wiadomosc')||''}`;
    location.href='mailto:eyeamadrian@gmail.com?subject='+encodeURIComponent('Nowy projekt: '+v.get('imie'))+'&body='+encodeURIComponent(body);
    st.textContent='Otwieram program pocztowy z gotową wiadomością. Jeśli się nie otworzył, napisz na eyeamadrian@gmail.com albo zadzwoń: 791 632 675.'});
  $$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);b.textContent='Skopiowano'}catch(e){b.textContent='Zaznacz adres i skopiuj'}setTimeout(()=>b.textContent='Kopiuj e-mail',2200)}));
})();
