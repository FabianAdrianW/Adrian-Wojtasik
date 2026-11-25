"""Robi zrzuty stron klientów w proporcjach ekranów ze scen (żeby nic nie było ucięte).
Wymaga serwera z repozytoriami klientów: python3 -m http.server 8765 w katalogu z klonami."""
import sys,json
from playwright.sync_api import sync_playwright
BASE='http://localhost:8765/'
TW=open('/tmp/tw/out.css').read()
# nazwa: (repo, szerokość viewportu, wysokość viewportu)
JOBS={
 'eskander-monitor':('eskander_vet',1600,953),
 'eskander-telefon':('eskander_vet',390,965),
 'polfinans-laptop':('gppolfinans',1440,939),
 'polfinans-telefon':('gppolfinans',390,965),
 'pho-laptop':('pho_viet',1440,939),
 'pho-telefon':('pho_viet',390,965),
 'brama-laptop':('Brama-ole-nicka',1440,939),
 'brama-tablet':('Brama-ole-nicka',768,1012),
 'malgorzata-tablet':('Malgorzata_tests',768,1012),
 'malgorzata-telefon':('Malgorzata_tests',390,891),
}
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,(repo,w,h) in JOBS.items():
        if len(sys.argv)>2 and name not in sys.argv[2:]: continue
        ctx=b.new_context(viewport={'width':w,'height':h},device_scale_factor=3 if w<500 else (2 if w<800 else 1.5),is_mobile=w<800,has_touch=w<800)
        pg=ctx.new_page()
        pg.add_init_script("try{sessionStorage.setItem('bo-intro','1');sessionStorage.setItem('esk-tip','1');sessionStorage.setItem('esk-mode','day')}catch(e){}")
        if repo=='pho_viet':
            pg.route('https://cdn.tailwindcss.com/**',lambda r:r.fulfill(body='',content_type='text/javascript'))
            pg.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(body='',content_type='text/css'))
            pg.add_init_script("document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=%s;document.head.appendChild(s)})"%json.dumps(TW))
        pg.goto(BASE+repo+'/index.html',wait_until='networkidle');pg.wait_for_timeout(3500)
        pg.screenshot(path=f'/home/claude/proj/shots2/{name}.png');print(name,w,h);ctx.close()
    b.close()
