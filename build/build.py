import base64,re,os,sys
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,HERE);from cases import case
os.chdir(os.path.join(HERE,".."))
B=lambda p,m:f"data:{m};base64,"+base64.b64encode(open(p,'rb').read()).decode()
css=open("src/styles.css").read()
for f in ["geist-400","geist-500","instrument-serif-italic"]:
    css=css.replace(f"url(fonts/{f}.woff2)",f"url({B('fonts/'+f+'.woff2','font/woff2')})")
open("styles.css","w").write(css)
nav=open(os.path.join(HERE,"nav.html")).read();foot=open(os.path.join(HERE,"foot.html")).read()
for src,out in [("src/index.html","index.html"),("src/realizacje.html","realizacje.html"),("src/strony.html","strony.html"),("src/aplikacje.html","aplikacje.html"),("src/automatyzacje.html","automatyzacje.html")]:
    h=open(src).read().replace("{{NAV}}",nav).replace("{{FOOT}}",foot)
    h=re.sub(r"\{\{CASE:(\w+):(\w+)\}\}",lambda m:case(m.group(1),m.group(2)),h)
    if out=="index.html": h=h.replace('href="index.html#','href="#')
    open(out,"w").write(h)
    # standalone
    s=h.replace('<link rel="stylesheet" href="styles.css">',"<style>"+css+"</style>").replace('<script src="app.js" defer></script>',"<script>"+open("app.js").read()+"</script>")
    mime={"webp":"image/webp","svg":"image/svg+xml","jpg":"image/jpeg"}
    for p in sorted(set(re.findall(r'img/[\w\-.]+\.(?:webp|svg|jpg)',s))):
        if os.path.exists(p): s=s.replace(p,B(p,mime[p.rsplit('.',1)[1]]))
    os.makedirs("dist",exist_ok=True);open("dist/"+out,"w").write(s)
print("built",len(css)//1024,"KB css")
