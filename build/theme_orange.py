"""Jednorazowa migracja kolorystyki: brąz -> czerń i pomarańcz (patrz docs/DESIGN.md)."""
import re,sys
T=dict(ink="#0B0B0C",paper="#F4F3F0",acc="#D9480F",accH="#B93A0A",amb="#FF7A2F")
def hx(h):
    h=h.lstrip('#')
    if len(h)==3:h=''.join(c*2 for c in h)
    return [int(h[i:i+2],16) for i in (0,2,4)]
def toHex(a):return '#'+''.join('%02x'%max(0,min(255,round(v))) for v in a)
Lc=lambda c:(.299*c[0]+.587*c[1]+.114*c[2])/255
L0,L1=Lc([21,19,17]),Lc([241,236,228])
near=lambda c,d:all(abs(c[i]-d[i])<3 for i in range(3))
def mapRGB(c):
    if c[0]==c[1]==c[2] and c[0] in (0,255):return c
    if near(c,[142,94,54]):return hx(T['acc'])
    if near(c,[122,80,45]):return hx(T['accH'])
    if near(c,[192,138,91]):return hx(T['amb'])
    if near(c,[63,41,21]):return hx(T['ink'])
    if near(c,[123,170,116]):return c
    t=(Lc(c)-L0)/(L1-L0)
    t=0 if t<0 else (t**1.45 if t<1 else t)
    a,b=hx(T['ink']),hx(T['paper'])
    return [a[i]+(b[i]-a[i])*t for i in range(3)]
HEX=re.compile(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])')
RGBA=re.compile(r'rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)')
def conv(s):
    s=RGBA.sub(lambda m:'rgba(%s,%s)'%(','.join(str(round(v)) for v in mapRGB([int(m[1]),int(m[2]),int(m[3])])),m[4]),s)
    return HEX.sub(lambda m:toHex(mapRGB(hx(m[0]))),s)
for f in sys.argv[1:]:
    s=open(f).read()
    if f.endswith('cases.py'):
        s=re.sub(r'(p[ca]=")(#[0-9a-fA-F]{6})(")',lambda m:m[1]+conv(m[2])+m[3],s)
    else:
        s=conv(s)
    open(f,'w').write(s)
