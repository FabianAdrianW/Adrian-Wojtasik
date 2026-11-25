"""Składa realizacje w scenach w wysokiej jakości.
Scena jest powiększana S razy (Lanczos), zrzut wklejany w tej rozdzielczości, więc tekst na ekranie zostaje ostry.
Narożniki ekranu są doprecyzowane automatycznie (szary, jednolity obszar w pobliżu podanego czworokąta).
Użycie: python3 tools/make_mocks.py [nazwa ...]   (zrzuty z tools/shoot_sites.py w /home/claude/proj/shots2)"""
import sys,cv2,numpy as np
from PIL import Image
SRC='brand/images/src/';SHOTS='/home/claude/proj/shots2/';OUT='img/v5/';S=3
# nazwa: (scena, przybliżony czworokąt tl,tr,br,bl w pikselach sceny, zoom kadru, środek kadru x,y w ułamkach, szerokość wyjścia)
LAP=(482,191,896,191,896,461,482,461)
JOBS={
 'eskander-monitor':('mock-monitor-tatami',(551,91,1224,66,1224,467,551,467),1.22,(.64,.5),2064),
 'polfinans-laptop':('mock-laptop-weranda',LAP,1.3,(.5,.47),2064),
 'brama-laptop':('mock-laptop-weranda',LAP,1.3,(.5,.47),2064),
 'eskander-telefon':('mock-telefon-dlon',None,1.0,(.5,.5),1152),
 'polfinans-telefon':('mock-telefon-dlon',None,1.0,(.5,.5),1152),
 'brama-tablet':('mock-tablet',(302,490,598,490,598,880,302,880),1.0,(.5,.5),1344),
 'malgorzata-tablet':('mock-tablet',(302,490,598,490,598,880,302,880),1.0,(.5,.5),1344),
 'malgorzata-telefon':('mock-telefon-kamien',None,1.0,(.5,.5),1344),
}
def screen_mask(img):
    hsv=cv2.cvtColor(img,cv2.COLOR_BGR2HSV);g=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    return ((hsv[...,1]<45)&(g>120)).astype(np.uint8)*255
def auto_quad(img):
    m=cv2.morphologyEx(screen_mask(img),cv2.MORPH_CLOSE,np.ones((15,15),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(m);i=1+np.argmax(st[1:,cv2.CC_STAT_AREA])
    cs,_=cv2.findContours((lab==i).astype(np.uint8),cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE);c=max(cs,key=cv2.contourArea)
    hull=cv2.convexHull(c).reshape(-1,2).astype(np.float32);s=hull.sum(1);d=np.diff(hull,axis=1).ravel()
    return np.array([hull[np.argmin(s)],hull[np.argmin(d)],hull[np.argmax(s)],hull[np.argmax(d)]],np.float32)
def refine(img,q):
    """Przesuń każdą krawędź czworokąta do granicy szarego ekranu (mediana z wierszy/kolumn)."""
    m=screen_mask(img)>0;q=q.copy()
    x0,x1=int(min(q[:,0])),int(max(q[:,0]));y0,y1=int(min(q[:,1])),int(max(q[:,1]))
    rows=range(y0+(y1-y0)//5,y1-(y1-y0)//5);cols=range(x0+(x1-x0)//5,x1-(x1-x0)//5);pad=12*S
    L=[];R=[];T=[];B=[];xc=(x0+x1)//2;yc=(y0+y1)//2
    def run(v,c):  # ciągły odcinek ekranu wokół środka
        if not v[c]: return None
        a=c
        while a>0 and v[a-1]: a-=1
        b=c
        while b<len(v)-1 and v[b+1]: b+=1
        return a,b+1
    for y in rows:
        r=run(m[y],xc)
        if r: L.append(r[0]);R.append(r[1])
    for x in cols:
        r=run(m[:,x],yc)
        if r: T.append(r[0]);B.append(r[1])
    lim=4*S;cl=lambda v:float(np.clip(v,-lim,lim))
    dl,dr,dt,db=[cl(v) for v in (np.median(L)-x0,np.median(R)-x1,np.median(T)-y0,np.median(B)-y1)]
    q[[0,3],0]+=dl;q[[1,2],0]+=dr;q[[0,1],1]+=dt;q[[2,3],1]+=db
    return q
def build(name):
    scene,quad,zoom,(cx,cy),ow=JOBS[name]
    base=cv2.imread(SRC+scene+'.jpg');img=cv2.resize(base,None,fx=S,fy=S,interpolation=cv2.INTER_LANCZOS4)
    q=auto_quad(img) if quad is None else (np.float32(quad).reshape(4,2)*S if 'tablet' in scene else refine(img,np.float32(quad).reshape(4,2)*S))
    sh=cv2.imread(SHOTS+name+'.png')
    mask=np.zeros(img.shape[:2],np.uint8);cv2.fillConvexPoly(mask,np.round(q).astype(np.int32),255)
    gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY);mask[gray<85]=0  # notch i ramka zostają
    mask=cv2.morphologyEx(mask,cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
    w=np.linalg.norm(q[1]-q[0]);h=np.linalg.norm(q[3]-q[0]);ar=w/h;H,W=sh.shape[:2]
    if W/H>ar: nw=int(round(H*ar));sh=sh[:,(W-nw)//2:(W-nw)//2+nw]
    else: sh=sh[:int(round(W/ar))]
    # pomniejsz zrzut najpierw do docelowego rozmiaru (INTER_AREA), potem perspektywa — bez aliasingu
    sh=cv2.resize(sh,(int(w),int(h)),interpolation=cv2.INTER_AREA)
    src=np.float32([[0,0],[sh.shape[1],0],[sh.shape[1],sh.shape[0]],[0,sh.shape[0]]])
    M=cv2.getPerspectiveTransform(src,q)
    warp=cv2.warpPerspective(sh,M,(img.shape[1],img.shape[0]),flags=cv2.INTER_CUBIC)
    sm=cv2.warpPerspective(np.full(sh.shape[:2],255,np.uint8),M,(img.shape[1],img.shape[0]),flags=cv2.INTER_LINEAR)
    sm=cv2.bitwise_and(sm,cv2.dilate(mask,np.ones((7,7),np.uint8)))
    sm=cv2.GaussianBlur(sm,(5,5),0).astype(np.float32)[...,None]/255
    g=cv2.GaussianBlur(gray.astype(np.float32),(0,0),25*S);ref=np.median(g[mask>0]);shade=np.clip(g/ref,.82,1.12)[...,None]
    warm=np.array([185,218,255],np.float32)/255;t=.08
    wf=warp.astype(np.float32)*shade;wf=wf*(1-t)+wf*warm*t
    out=np.clip(img.astype(np.float32)*(1-sm)+wf*sm,0,255).astype(np.uint8)
    # kadr przybliżony na urządzenie
    Hh,Ww=out.shape[:2];cw,ch=int(Ww/zoom),int(Hh/zoom)
    x=int(np.clip(cx*Ww-cw/2,0,Ww-cw));y=int(np.clip(cy*Hh-ch/2,0,Hh-ch));out=out[y:y+ch,x:x+cw]
    im=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGR2RGB))
    big=im.resize((ow,round(ow*ch/cw)),Image.LANCZOS);big.save(OUT+name+'.webp',quality=88,method=6)
    sw=ow//2;im.resize((sw,round(sw*ch/cw)),Image.LANCZOS).save(OUT+name+'-s.webp',quality=86,method=6)
    print(name,big.size,np.round(q/S,1).tolist())
if __name__=='__main__':
    for n in (sys.argv[1:] or JOBS): build(n)
