"""Generuje podstrony v5 (src/strony.html, aplikacje.html, automatyzacje.html, realizacje.html) z jednego szablonu.
Realizacje i ścieżki usług bierze z src/index.html, żeby nie było dwóch źródeł."""
import re, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
idx = open("src/index.html", encoding="utf-8").read()
works = re.search(r'<div class="works">.*?</div>\s*<div class="more-works rv">.*?</div>\s*</div>', idx, re.S).group(0)
paths = {m.group(1): m.group(0) for m in re.finditer(r'<a class="path rv" href="(\w+)\.html">.*?</a>', idx, re.S)}
ARW = '<svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'

def head(title, desc, img):
    return f'''<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">
<meta property="og:image" content="img/v5/{img}.webp"><meta property="og:locale" content="pl_PL"><meta property="og:type" content="website">
<meta name="theme-color" content="#121311">
<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="preload" as="image" href="img/v5/{img}.webp">
<link rel="stylesheet" href="styles.css">
</head>
<body>
{{{{NAV}}}}
<main id="main">'''

def subhero(crumb, eyebrow, h1, lead, img, pos="50% 50%"):
    return f'''
<section class="sub-hero" id="top" data-tone="night">
  <div class="bg"><img src="img/v5/{img}.webp" alt="" style="object-position:{pos}" fetchpriority="high"></div>
  <div class="in"><span class="crumbs"><a href="index.html">Start</a> / {crumb}</span><br><br><span class="eyebrow" style="color:var(--lantern)">{eyebrow}</span><h1>{h1}</h1><p class="lead">{lead}</p>
  <div class="cta" style="display:flex;flex-wrap:wrap;gap:.8rem;margin-top:2rem"><a class="btn btn-act" href="#kontakt">Porozmawiajmy {ARW}</a><a class="btn btn-ghost" href="tel:+48791632675">791 632 675</a></div></div>
  <span class="light-line" aria-hidden="true" style="bottom:0"></span>
</section>'''

def lst(items):
    return '<ul class="list">' + ''.join(f'<li><span class="n">{i:02d}</span><b>{b}</b><span>{s}</span></li>' for i, (b, s) in enumerate(items, 1)) + '</ul>'

def others(cur):
    return f'''
<section class="sand" id="inne-uslugi" data-tone="day"><div class="blk">
  <div class="head rv"><div><span class="eyebrow">Inne usługi</span><h2>To dopiero jedna część. <em>Zrobię też resztę.</em></h2></div><p class="lead">Te same zasady współpracy i ta sama osoba po drugiej stronie.</p></div>
  <div class="paths" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,20rem),1fr))">{''.join(v for k, v in paths.items() if k != cur)}</div>
</div></section>'''

CONTACT = f'''
<section class="night contact kumiko-bg" id="kontakt" data-tone="night">
 <div class="bg"><img src="img/v5/noren.webp" alt="" loading="lazy"></div>
 <div class="blk"><span class="eyebrow">Kontakt</span><h2>Opisz, czego potrzebujesz. <em>Przygotuję wycenę.</em></h2>
  <p class="lead">Zadzwoń albo napisz. Odpowiadam sam, zwykle tego samego dnia.</p>
  <a class="bignum" href="tel:+48791632675">791 632 675</a>
  <div class="channels"><a href="mailto:eyeamadrian@gmail.com">eyeamadrian@gmail.com</a><a href="https://wa.me/48791632675" rel="noopener">WhatsApp</a><a href="index.html#kontakt">Formularz</a></div>
 </div>
</section>
</main>
{{{{FOOT}}}}
<script src="app.js" defer></script>
</body>
</html>'''

PAGES = {
"strony": dict(
  title="Strony internetowe dla firm: Oława, Oleśnica, Wrocław | Adrian Wojtasik",
  desc="Strony wizytówki, strony firmowe i sklepy dla firm z Oławy, Oleśnicy, Wrocławia i całej Polski. Projekt od zera, od 2 500 zł netto.",
  hero=("Strony internetowe", "Strony internetowe", "Strona, którą klienci <em>zapamiętają.</em>", "Wizytówki, strony firmowe i sklepy. Projektuję od zera, bez szablonu, wokół jednej rzeczy, która wyróżnia Twoją firmę.", "weranda-laptop", "50% 40%"),
  intro=("Co dostajesz", "Wszystko, czego strona potrzebuje, <em>w jednej cenie.</em>", "Strona wizytówka kosztuje od 2 500 zł netto. Dokładną kwotę podaję po rozmowie, zanim zaczniemy."),
  items=[("Projekt od zera", "Wygląd wynika z Twojej firmy, nie z gotowego motywu."), ("Jeden pomysł", "Coś, co klienci zapamiętają: tryb nocny, brama, kurtyna."),
         ("Telefon na pierwszym planie", "Numer jest zawsze pod ręką, także na małym ekranie."), ("Teksty i zdjęcia", "Piszę teksty i przygotowuję grafiki, także z AI, z adnotacją."),
         ("Google i SEO lokalne", "Nazwy miejscowości, wizytówka Google, dane dla wyszukiwarek."), ("Publikacja i opieka", "Domena, hosting, a potem zmiany co miesiąc.")],
  fig="brama-tablet", figcap="Brama Oleśnicka: strona restauracji z Oleśnicy."),
"aplikacje": dict(
  title="Aplikacje i programy dla firm | Adrian Wojtasik",
  desc="Programy szyte pod Twoją firmę: rezerwacje, wyceny, ewidencja i panele. Działają w przeglądarce i na telefonie.",
  hero=("Aplikacje i programy", "Aplikacje i programy", "Program, który pasuje <em>do Twojej pracy.</em>", "Rezerwacje, wyceny, ewidencja, panele dla pracowników. Zamiast arkusza i karteczek jedno narzędzie, które działa w przeglądarce i na telefonie.", "klon-pawilon", "50% 55%"),
  intro=("Co mogę zbudować", "Od prostego formularza <em>po cały panel.</em>", "Najpierw patrzę, jak dziś pracujesz. Program powstaje wokół tego, co zajmuje Ci najwięcej czasu."),
  items=[("Rezerwacje i terminy", "Klient sam wybiera termin, a Ty widzisz kalendarz."), ("Wyceny i kalkulatory", "Klient liczy cenę na stronie, Ty dostajesz gotowe zapytanie."),
         ("Ewidencja i magazyn", "Stan, historia, wydruki. Bez przepisywania z kartki."), ("Panel dla pracowników", "Każdy widzi swoje zadania i grafik."),
         ("Sklep z koszykiem", "Zamówienia, płatności, odbiór lub dostawa."), ("Działa wszędzie", "W przeglądarce, na telefonie i tablecie, bez instalowania.")],
  fig="eskander-telefon", figcap="Eskander: strona, która po godzinach sama przechodzi w tryb dyżuru."),
"automatyzacje": dict(
  title="Automatyzacje dla firm | Adrian Wojtasik",
  desc="Automatyzacje, które robią powtarzalną pracę za Ciebie: zgłoszenia, wiadomości, faktury i zestawienia.",
  hero=("Automatyzacje", "Automatyzacje", "Praca, która <em>dzieje się sama.</em>", "Zgłoszenia, wiadomości, faktury i zestawienia, które same trafiają tam, gdzie trzeba. Ty zamykasz firmę, a one pracują dalej.", "bambus", "50% 40%"),
  intro=("Przykłady", "Każda automatyzacja to <em>mniej ręcznej pracy.</em>", "Każdą automatyzację zaczynam od pytania: co dziś robisz ręcznie więcej niż raz w tygodniu?"),
  items=[("Formularz → kalendarz → SMS", "Zapytanie ze strony od razu jest terminem w kalendarzu i przypomnieniem dla klienta."), ("Zamówienie → faktura → mail", "Nic nie przepisujesz. Klient dostaje fakturę od razu."),
         ("Zestawienie na piątek", "Zamówienia, zapytania i terminy tygodnia w jednej wiadomości."), ("Odpowiedzi na pytania", "Godziny otwarcia, cennik, dojazd: klient dostaje odpowiedź od razu."),
         ("Opinie po wizycie", "Dzień po wizycie klient dostaje prośbę o opinię w Google."), ("Twoje dane u Ciebie", "Dane zostają na Twoich kontach, na serwerach w UE.")],
  fig="latarnia", figcap="Systemy pracują po godzinach. Scena ilustracyjna wygenerowana przez AI."),
}

for slug, p in PAGES.items():
    c, e, h1, lead, img, pos = p["hero"]
    ie, ih2, ilead = p["intro"]
    html = head(p["title"], p["desc"], img) + subhero(c, e, h1, lead, img, pos) + f'''
<section class="day kumiko-bg" id="co" data-tone="day"><div class="blk cols2">
  <div class="rv"><span class="eyebrow">{ie}</span><h2>{ih2}</h2><p class="lead" style="margin-bottom:2rem">{ilead}</p>{lst(p["items"])}</div>
  <figure class="focus rv side-fig"><img src="img/v5/{p["fig"]}.webp" alt="" loading="lazy"><figcaption class="ai-note">{p["figcap"]}</figcaption></figure>
</div></section>
<section class="day" id="jak" data-tone="day"><div class="blk" style="padding-top:0">
  <div class="rule rv"><div><b>Cena przed startem</b><p>Kwota zmienia się tylko wtedy, gdy zmienia się zakres.</p></div><div><b>Odpowiedź w 1 dzień</b><p>Odbieram sam, nikt nie przekazuje Cię dalej.</p></div><div><b>Po publikacji zostaję</b><p>Ta sama osoba poprawia wszystko za rok.</p></div></div>
</div></section>''' + others(slug) + CONTACT
    open(f"src/{slug}.html", "w", encoding="utf-8").write(html)

real = head("Realizacje: strony dla firm z Oławy, Oleśnicy i Wrocławia | Adrian Wojtasik",
            "Realizacje: Eskander, Polfinans, Brama Oleśnicka, Kwiaciarnia Małgorzata i inne. Każda firma dostała jeden własny pomysł.", "brama-laptop") \
    + subhero("Realizacje", "Realizacje", "Strony, które pracują <em>w prawdziwych firmach.</em>", "Każda strona powstała dla konkretnej firmy z regionu. Pokazuję ją na urządzeniach w scenerii mojej marki, a link prowadzi do działającej strony.", "brama-laptop", "50% 40%") \
    + f'''
<section class="day kumiko-bg" id="realizacje" data-tone="day"><div class="blk">
  {works.replace('id="w-eskander"','id="eskander"').replace('id="w-polfinans"','id="polfinans"').replace('id="w-brama"','id="brama"').replace('id="w-malgorzata"','id="malgorzata"')}
  <p class="ai-note" style="margin-top:2rem">Sceny wokół urządzeń są ilustracyjne i wygenerowane przez AI. Ekrany pokazują prawdziwe strony.</p>
</div></section>''' + others("") + CONTACT
open("src/realizacje.html", "w", encoding="utf-8").write(real)
print("ok")
