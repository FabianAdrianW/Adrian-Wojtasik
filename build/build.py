import base64,re,os,sys
# straż: niedomknięta klamra w CSS po cichu wyłącza wszystkie reguły pod nią
_c=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src','styles.css'),encoding='utf-8').read()
_d=0
for _n,_l in enumerate(_c.split('\n'),1):
    _d+=_l.count('{')-_l.count('}')
    if _d<0: sys.exit(f'styles.css: nadmiarowa klamra w linii {_n}')
if _d: sys.exit(f'styles.css: {_d} niedomkniętych klamer')
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,HERE);from cases import case
os.chdir(os.path.join(HERE,".."))
B=lambda p,m:f"data:{m};base64,"+base64.b64encode(open(p,'rb').read()).decode()
css=open("src/styles.css").read()
for f in sorted(set(re.findall(r"url\(fonts/([\w\-]+)\.woff2\)",css))):
    css=css.replace(f"url(fonts/{f}.woff2)",f"url({B('fonts/'+f+'.woff2','font/woff2')})")
open("styles.css","w").write(css)
nav=open(os.path.join(HERE,"nav.html")).read();foot=open(os.path.join(HERE,"foot.html")).read()
PAGES=[p for p in ["index","realizacje","strony","aplikacje","automatyzacje"] if os.path.exists(f"src/{p}.html")]
for src,out in [(f"src/{p}.html",f"{p}.html") for p in PAGES]:
    h=open(src).read().replace("{{NAV}}",nav).replace("{{FOOT}}",foot)
    h=re.sub(r'(<span class="eyebrow"[^>]*>)',r'\1<svg class="ico" viewBox="0 0 544 410" aria-hidden="true"><use href="#torii"/></svg>',h)
    h=re.sub(r"\{\{CASE:(\w+):(\w+)\}\}",lambda m:case(m.group(1),m.group(2)),h)
    if out=="index.html": h=h.replace('href="index.html#','href="#')
    open(out,"w").write(h)
    # standalone
    s=h.replace('<link rel="stylesheet" href="styles.css">',"<style>"+css+"</style>").replace('<script src="app.js" defer></script>',"<script>"+open("app.js").read()+"</script>")
    mime={"webp":"image/webp","svg":"image/svg+xml","jpg":"image/jpeg"}
    for p in sorted(set(re.findall(r'img/[\w\-./]+\.(?:webp|svg|jpg)',s))):
        if os.path.exists(p): s=s.replace(p,B(p,mime[p.rsplit('.',1)[1]]))
    os.makedirs("dist",exist_ok=True);open("dist/"+out,"w").write(s)
print("built",len(css)//1024,"KB css")
