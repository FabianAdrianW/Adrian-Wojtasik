"""Strażnik v5: każda strona bez poziomego przewijania (320, 390, 1440 px) i bez błędów w konsoli.
Uruchom po każdej zmianie: python3 build/check_site.py"""
import os,sys,threading,http.server,functools
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Q,directory=ROOT))
threading.Thread(target=srv.serve_forever,daemon=True).start();port=srv.server_address[1]
bad=0
with sync_playwright() as p:
    b=p.chromium.launch()
    for page in ['index','realizacje','strony','aplikacje','automatyzacje','pracownia']:
        for w in (320,390,1440):
            pg=b.new_page(viewport={'width':w,'height':800});err=[]
            pg.on('pageerror',lambda e:err.append(str(e)))
            pg.goto(f'http://127.0.0.1:{port}/{page}.html');pg.wait_for_timeout(500)
            H=pg.evaluate('document.documentElement.scrollHeight');sw=[]
            for y in range(0,H,1200):
                pg.evaluate(f'scrollTo(0,{y})');pg.wait_for_timeout(60);sw.append(pg.evaluate('document.documentElement.scrollWidth'))
            ok=max(sw)<=w and not err;bad+=not ok
            print(f'{page:14}{w:5}', 'ok' if ok else f'FAIL scrollWidth={max(sw)} err={err[:2]}');pg.close()
    b.close()
srv.shutdown();sys.exit(1 if bad else 0)
