ARROW='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>'
CASES={
 "mogetopomoge":dict(url="https://mogetopomoge.pl",dom="mogetopomoge.pl",scr="#0a0c11",pc="#f4f3f0",pa="#ff7a2f",
   title='Zrobię Twojej firmie stronę. <em>Za darmo.</em>',small="Program pro bono: raz w miesiącu jedna firma dostaje stronę albo aplikację.",
   who="mogetopomoge.pl, mój program pro bono",what="strona, regulamin naboru, portfolio"),
 "gppolfinans":dict(url="https://gppolfinans.pl",dom="gppolfinans.pl",scr="#F7F4EF",pc="#0b0b0c",pa="#d9480f",
   title='Z myślą o tym, <em>co ważne.</em>',small="Multiagencja ubezpieczeniowa z Wrocławia. Strona firmowa.",
   who="Polfinans Grupa Partnerska",what="strona firmowa"),
 "qmala":dict(url="https://qmala.pl",dom="qmala.pl",scr="#1C1F22",pc="#f4f3f0",pa="#ff7a2f",
   title='Elektrycy <em>od 1978.</em>',small="Firmowa strona elektryków z Wrocławia.",who="Firma Qmala, Wrocław",what="strona firmowa"),
 "eyelingo":dict(url="https://www.eyelingo.app",dom="eyelingo.app",scr="#17161B",pc="#f4f3f0",pa="#ff7a2f",
   title='14 języków <em>w tle pracy.</em>',small="Fiszki pojawiają się podczas pracy przy komputerze, od A1 do C2.",who="Eyelingo, mój własny produkt",what="aplikacja i strona"),
 "tereszko":dict(url="https://fabianadrianw.github.io/KT_website/",dom="malarstwo",scr="#E9E3D9",pc="#0b0b0c",pa="#d9480f",
   title='Kamil Tereszko, <em>malarstwo.</em>',small="Strona artysty z galerią obrazów.",who="Kamil Tereszko, malarz",what="galeria"),
 "alan":dict(url=None,dom="fotografia",scr="#0E0E0E",pc="#f4f3f0",pa="#ff7a2f",
   title='Pierwsze skrzypce <em>gra zdjęcie.</em>',small="Ciemna, cicha strona portfolio fotografa portretowego.",who="Alan, fotograf portretowy",what="portfolio"),
}
def case(slug,cls="",lazy=True):
    c=CASES[slug];tag="a" if c["url"] else "div"
    href=f' href="{c["url"]}" rel="noopener"' if c["url"] else ""
    arrow=ARROW if c["url"] else ""
    return f'''<{tag} class="case {cls}"{href}>
  <div class="frame"><div class="bar"><i></i><i></i><i></i><span>{c["dom"]}</span></div>
    <div class="screen" style="--scr:{c["scr"]};--pc:{c["pc"]};--pa:{c["pa"]}">
      <div class="poster"><b>{c["title"]}</b><small>{c["small"]}</small></div>
      <img src="img/work-{slug}.webp" alt="Zrzut strony {c["dom"]}" width="1440" height="654"{' loading="lazy"' if lazy else ''}>
      <span class="sheen" aria-hidden="true"></span>
    </div></div>
  <div class="meta"><span class="who">{c["who"]} {arrow}</span><span class="what">{c["what"]}</span></div>
</{tag}>'''
