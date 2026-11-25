"""Wkleja zrzut strony w pusty ekran urządzenia ze zdjęcia z Flow.
Użycie: python3 tools/mockup.py scena.jpg zrzut.png wynik.jpg [--tint 0.12]
Ekran wykrywany jako największy jednolity, szary, jasny obszar; dopasowanie perspektywy po 4 narożnikach."""
import sys,cv2,numpy as np
def find_quad(img):
    hsv=cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
    g=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    var=cv2.blur((g.astype(np.float32)-cv2.blur(g.astype(np.float32),(9,9)))**2,(9,9))
    m=((hsv[...,1]<40)&(g>140)&(var<25)).astype(np.uint8)*255
    m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((15,15),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(m)
    i=1+np.argmax(st[1:,cv2.CC_STAT_AREA]);mask=(lab==i).astype(np.uint8)*255
    cs,_=cv2.findContours(mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE);c=max(cs,key=cv2.contourArea)
    hull=cv2.convexHull(c).reshape(-1,2).astype(np.float32)
    s=hull.sum(1);d=np.diff(hull,axis=1).ravel()
    q=np.array([hull[np.argmin(s)],hull[np.argmin(d)],hull[np.argmax(s)],hull[np.argmax(d)]],np.float32)  # tl,tr,br,bl
    return q,mask
def run(scene,shot,out,tint=.12,quad=None):
    img=cv2.imread(scene);sh=cv2.imread(shot)
    if quad is None: q,mask=find_quad(img)
    else:
        q=np.float32(quad).reshape(4,2);mask=np.zeros(img.shape[:2],np.uint8);cv2.fillConvexPoly(mask,q.astype(np.int32),255)
        gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY);mask[gray<90]=0  # wycięcie i ramka zostają (np. notch)
        mask=cv2.morphologyEx(mask,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
    w=int(np.linalg.norm(q[1]-q[0]));h=int(np.linalg.norm(q[3]-q[0]))
    # dopasuj zrzut do proporcji ekranu (przytnij od góry)
    ar=w/h;H,W=sh.shape[:2]
    if W/H>ar: nw=int(H*ar);sh=sh[:,(W-nw)//2:(W-nw)//2+nw]
    else: sh=sh[:int(W/ar)]
    src=np.float32([[0,0],[sh.shape[1],0],[sh.shape[1],sh.shape[0]],[0,sh.shape[0]]])
    M=cv2.getPerspectiveTransform(src,q)
    warp=cv2.warpPerspective(sh,M,(img.shape[1],img.shape[0]),flags=cv2.INTER_AREA)
    sm=cv2.warpPerspective(np.full(sh.shape[:2],255,np.uint8),M,(img.shape[1],img.shape[0]))
    sm=cv2.bitwise_and(sm,cv2.dilate(mask,np.ones((5,5),np.uint8)))
    sm=cv2.GaussianBlur(sm,(3,3),0).astype(np.float32)[...,None]/255
    # światło sceny: przenieś jasność oryginalnego ekranu (gradient, odblask) i ciepły ton
    g=cv2.GaussianBlur(cv2.cvtColor(img,cv2.COLOR_BGR2GRAY).astype(np.float32),(0,0),25)
    ref=np.median(g[mask>0]);shade=np.clip(g/ref,.75,1.2)[...,None]
    warm=np.array([180,215,255],np.float32)/255  # BGR ciepły
    wf=warp.astype(np.float32)*shade
    wf=wf*(1-tint)+wf*warm*tint
    outimg=img.astype(np.float32)*(1-sm)+wf*sm
    cv2.imwrite(out,np.clip(outimg,0,255).astype(np.uint8),[cv2.IMWRITE_JPEG_QUALITY,93])
    return q
if __name__=='__main__':
    a=sys.argv[1:];t=float(a[a.index('--tint')+1]) if '--tint' in a else .12
    qd=[float(x) for x in a[a.index('--quad')+1].split(',')] if '--quad' in a else None  # x1,y1,...x4,y4: tl,tr,br,bl
    print(run(a[0],a[1],a[2],t,qd))
