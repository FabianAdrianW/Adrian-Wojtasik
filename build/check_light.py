import sys,asyncio
from playwright.sync_api import sync_playwright
# Test strażnik: światło ma przechodzić płynnie przez każdy ciemny przebieg.
# Uruchom po każdej zmianie treści/układu: python3 build/check_light.py
import os;ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pages=['index','realizacje','strony','aplikacje','automatyzacje']
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in((1440,900),(390,800)):
        pg=b.new_page(viewport={'width':w,'height':h})
        for n in pages:
            pg.goto(f'file://{ROOT}/{n}.html');pg.wait_for_timeout(300)
            tot=pg.evaluate('document.documentElement.scrollHeight')
            row=[]
            for y in range(0,tot-h+1,max(h//8,1)):
                pg.evaluate(f'scrollTo(0,{y})');pg.wait_for_timeout(60)
                v=pg.evaluate('''()=>{const s=getComputedStyle(document.querySelector('.window'));const mid=innerHeight/2;let t='?';for(const e of document.querySelectorAll('main section')){const r=e.getBoundingClientRect();if(r.top<=mid&&r.bottom>mid)t=e.dataset.tone[0]}return [parseFloat(s.getPropertyValue('--wx')).toFixed(0),parseFloat(s.getPropertyValue('--wo')).toFixed(2),t]}''')
                row.append((v[2],float(v[0]),float(v[1])))
            d=[r for r in row if r[0]=='d']
            bad=[]
            if d[0][2]<.8:bad.append('start słaby')
            if any(abs(a[1]-b[1])>9 for a,b in zip(d,d[1:])):bad.append('skok położenia')
            if any(r[0]=='l' and r[2]>.3 for r in row):bad.append('światło na jasnej sekcji')
            if any(r[1]!=r[1] for r in row):bad.append('NaN')
            print(w,n,'FAIL '+', '.join(bad) if bad else 'ok');FAILED=globals().get('FAILED',0)+bool(bad);continue
    b.close()

raise SystemExit(1 if globals().get('FAILED') else 0)
