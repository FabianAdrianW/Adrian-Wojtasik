import numpy as np,cv2,sys
from PIL import Image
U='/mnt/user-data/uploads/'
def run(f,win):  # win=(cx,cy,w,h) frac of image for window light
    a=np.asarray(Image.open(U+f+'-image.jpg').convert('RGB')).astype(np.float32)
    H,W,_=a.shape
    fg=np.asarray(Image.open(f'/tmp/bg/{f}-mask.png').convert('L')).astype(np.float32)/255
    r,g,b=a[...,0],a[...,1],a[...,2]
    Y=.299*r+.587*g+.114*b
    tint=cv2.GaussianBlur(b-g,(0,0),3)
    lum=cv2.GaussianBlur(Y,(0,0),3)
    # desk: neutral/warm bright pixels in lower 55% → fit straight top edge
    desk=(tint<1.2)&(lum>195)&(fg<.5)
    desk[:int(H*.45)]=False
    xs,ys=[],[]
    for x in range(0,W,8):
        col=np.where(desk[:,x])[0]
        if len(col)>40:
            # first row where a long run of desk starts
            y=col[0]
            if desk[y:y+40,x].mean()>.9: xs.append(x);ys.append(y)
    above=np.ones((H,W),np.float32)
    if len(xs)>60:
        xs,ys=np.array(xs),np.array(ys)
        k,c=np.polyfit(xs,ys,1)
        for _ in range(3):  # robust refit
            res=np.abs(ys-(k*xs+c));keep=res<np.percentile(res,70)+3
            k,c=np.polyfit(xs[keep],ys[keep],1)
        yy=np.arange(H)[:,None];line=k*np.arange(W)[None,:]+c-2
        above=np.clip((line-yy)/3+.5,0,1).astype(np.float32)
    lilac=np.clip((tint-1.5)/4,0,1)
    w=np.maximum((1-fg)*above, fg*lilac*(np.abs(r-b)<14)*np.clip((lum-110)/40,0,1))
    w=cv2.GaussianBlur(w,(0,0),1.2)[...,None]
    # new wall: warm stone, a bit deeper, light from the right
    tone=np.array([1.05,.985,.90],np.float32)
    grad=(.80+.20*np.linspace(0,1,W)[None,:])[...,None]
    wall=(Y[...,None]*tone)*.86*grad
    # window light: 2x2 skewed panes, honey-white, soft
    L=np.zeros((H,W),np.float32)
    cx,cy,pw,ph=win[0]*W,win[1]*H,win[2]*W,win[3]*H
    gap=pw*.06
    for i in range(2):
        for j in range(2):
            x0=cx-pw/2+i*(pw/2+gap/2);y0=cy-ph/2+j*(ph/2+gap/2)
            pts=np.array([[x0,y0],[x0+pw/2-gap/2,y0],[x0+pw/2-gap/2,y0+ph/2-gap/2],[x0,y0+ph/2-gap/2]],np.float32)
            pts[:,0]+= (cy-pts[:,1])*np.tan(np.radians(18))
            cv2.fillPoly(L,[pts.astype(np.int32)],1.0)
    L=cv2.GaussianBlur(L,(0,0),W*.011)
    light=np.array([255,214,150],np.float32)/255
    wall=255-(255-wall)*(1-(L[...,None]*.36)*light)  # screen
    out=a*(1-w)+wall*w
    Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(f'/tmp/bg/{f}-new.jpg',quality=96)
    if '--dbg' in sys.argv: Image.fromarray((w[...,0]*255).astype(np.uint8)).save(f'/tmp/bg/{f}-w.png')
run('07cb9af5',(.70,.24,.24,.38))
run('82b45794',(.20,.30,.30,.46))
run('8ffb3927',(.80,.28,.30,.42))
