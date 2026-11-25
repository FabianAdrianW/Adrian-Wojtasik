# DESIGN.md — strona Adriana Wojtasika (v4)

Źródło prawdy: brand book 1.0 (`AFW_Brand_Book_v1`, `brandbook.config.json`). Ten plik opisuje tylko decyzje wykonawcze strony.

## Podmiot i cel
Marka osobista: strony, aplikacje, programy i automatyzacje dla firm z całej Polski. Cel strony: telefon albo wiadomość od właściciela małej firmy.

## Skille
brand-book (cały proces), generator-wizytowek (zasady łamania szablonu, CTA, testy), web-build-standards (dostępność, SEO, mobile). Pominięte: ui-ux-pro-max, frontend-design i macierz kombinacji z generatora. Zastępuje je zatwierdzony brand book. Zestawu `tools/` w tej sesji nie było, więc lint i package wykonano ręcznie.

## Oś i sygnatura
Ziarno: okno i pora dnia (decyzja właściciela D-07). Sygnatura: rzut szyb okna (fixed, `mix-blend-mode:screen`) wędruje po stronie od zmierzchu w hero do zgaśnięcia przy ofercie, a cienie kart obracają się razem ze „słońcem” (`--sx`, `--sa`).
Złamana konwencja branży: zamiast portfolio w równej siatce realizacje to odbitki z imieniem klienta, ułożone krzywo jak na biurku.

## Sekcje i pora dnia
| Sekcja | Pora | Tło | Grafika tła | Krawędź |
|---|---|---|---|---|
| Hero | zmierzch | #151311 | okno (fixed) + portret | — |
| Realizacje | popołudnie | #1A1714→#4A3B2F | study-popoludnie (prawa) | — |
| Jak pracuję | późne popołudnie | #4A3B2F | study-popoludnie (lewa) | parapet (schodki) |
| Oferta | południe | #D6CDC0→#E4DDD2 | study-poludnie | żaluzje (maska SVG) |
| O mnie | dzień | #F1ECE4 | — | — |
| Kontakt | pełny dzień | #F6F2EB | study-rano, żaluzje (desktop) | rama okna z cieniem |

Nakładanie: portret z hero wchodzi w realizacje; zdjęcie przy kodzie wchodzi w „Jak pracuję”; ciemna karta oferty wchodzi w „O mnie”; zdjęcie z „O mnie” podjeżdża pod ofertę.

## Tokeny
Jak w `brandbook.config.json`. Dodatkowe: `--dusk-text:#D9CCBC` (tekst na #4A3B2F, 7,6:1), `--noon-muted:#544C45` (tekst drugorzędny na #D6CDC0, 5,6:1).

## CTA
| Miejsce | Akcja |
|---|---|
| Navbar | numer telefonu + „Porozmawiajmy” |
| Hero | „Zadzwoń: 791 632 675” (akcent) + „Napisz, czym się zajmujesz” |
| Oferta | każda kartka kończy się przyciskiem, akcent tylko na środkowej |
| Kontakt | duży numer, e-mail z kopiowaniem, WhatsApp, formularz mailto (1 pole wymagane) |
| Mobile | dolny pasek „Zadzwoń” po przewinięciu |

## Ruch
Scena startowa: wejście H1, manifestu i CTA (900 ms) oraz zapalenie okna (1,4 s). Scroll: pozycja okna i cienie kart. Hover tylko w `@media (hover:hover)`. `prefers-reduced-motion` wyłącza ruch okna i cieni.

## Zdjęcia
Sesja własna z korektą „okno” (skrypt `light_img.py`: rzut szyb tylko na tło, bez osoby). Studia światła są proceduralne i służą wyłącznie jako tło. Brak stocku i AI.

## Zmiany v2 (2026-11-11)
- Skala: na desktopie 100% zoomu = dawne 80% (`--z:.8`, rem i `--vw` skalowane), na telefonie 1:1.
- Fonty wbudowane w `styles.css` (base64), więc działają też przy otwarciu z dysku. Usunięty Geist Mono: etykiety w Geist.
- Realizacje na podstronie `realizacje.html` (mogetopomoge, Polfinans, qmala, Eyelingo, Tereszko, Alan). Na głównej dwie wyróżnione. Usunięte: Nanorój, Nacomi.
- Nowe sekcje: „Piszesz do mnie jak do znajomego” (animowany przykład rozmowy) i „Pracuję z AI. Odpowiadam ja.”
- Efekty: płynna pigułka w navbarze, słońce wschodzące w navbarze ze scrollem, linia postępu, animowane menu mobilne, odsłanianie nagłówków, przechylenie kart realizacji z refleksem światła, kartki oferty prostują się i unoszą, przyciski z połyskiem i lekkim przyciąganiem, rysowanie ikon. Wszystko wyłączone przy `prefers-reduced-motion`.
- Wizytówka od 2 000 zł netto. Pole formularza: „Co chcesz stworzyć albo osiągnąć?”

## Zmiany v3 (2026-11-12)
- Paleta: czerń `#0B0B0C`, papier `#F4F3F0`, akcent `#D9480F` (na jasnym) i `#FF7A2F` (na ciemnym) zamiast brązu. Zdjęcia w czerni i bieli. Poprzednia wersja: gałąź `v1-braz`. Migracja kolorów: `build/theme_orange.py`.
- Hero: „Strony i automatyzacje dla Twojej firmy.” zamiast „Twoja firma w dobrym świetle.” (opinia: hasło ze światłem kojarzy się z producentem lamp).
- Proces: nagłówek „Dobry projekt zaczyna się od dobrej rozmowy.”
- Usunięta sekcja „Pracuję z AI. Odpowiadam ja.”. Wątek AI w kroku „Budowa”.
- CTA: „Zapytaj o wycenę” zamiast „Porozmawiajmy”. Kontakt: „Opisz, czego potrzebujesz. Przygotuję wycenę.”
- Do decyzji później: proporcje kolorów 60/30/10, dopracowanie wersji mobilnej, wariant z granatową czernią.

## Zmiany v4 (2026-11-12)
- Podstrony usług: Strony internetowe, Aplikacje i programy, Automatyzacje. Menu „Oferta” rozwija się z linkami, w ofercie są przyciski do podstron i „Szczegóły” przy każdej pozycji.
- Proces na głównej opisuje wszystkie usługi, nie tylko strony („Kierunek” zamiast „Brand book”).
- Zasada zmian: „Zmiany są normalne” w kroku Projekt. Cena: nie zmienia się, dopóki nie zmienia się zakres, a poszerzenie zakresu uzgadniamy przed dalszą pracą.
- Automatyzacje nie mają jeszcze realizacji, więc podstrona pokazuje przykłady zadań, bez klientów.

## Światło w oknie (v5)
- Położenie i jasność światła liczy `app.js` z układu strony: kolejne sekcje `data-tone="dark"` tworzą przebieg; światło wchodzi na jego początku, przesuwa się po całej długości (od ok. 76% do 22% szerokości) i gaśnie na końcu. Nie ma ręcznych `data-wx`/`data-wo` – dodawanie lub wydłużanie sekcji niczego nie rozjeżdża. Wystarczy poprawny `data-tone` na każdej `<section>`.
- Strażnik: `python3 build/check_light.py` (Playwright, 5 stron × desktop/mobile). Uruchamiaj po każdej zmianie układu lub treści.

## Zdjęcia (v5)
Portrety pochodzą wprost z oryginałów 2576 px (kolor, bez wypalonego tonowania), WebP q92: `hero-900/1800`, `omnie-700/1400`, `cta-1000/2000` z `srcset`. Filtr szarości na portretach usunięty. Nowe zdjęcia dodawaj z oryginałów, nie z już skompresowanych plików.

## Paleta v5: czerń · biel · miód
`--accent:#d99a1e` (hover `#b87e10`, jasny `--amber:#f5c45a`), tekst akcentu na jasnym tle `--accent-t:#8a5d0a`; tekst na przyciskach akcentu: czerń. Menu: „Oferta" i „Realizacje" mają rozwijane panele (numeracja, opis, strzałka przy hoverze).

Podstrony usług kończą się sekcją `#inne-uslugi` (dwie pozostałe usługi w tym samym stylu co lista na stronie głównej), przed kontaktem.

## v5 „Ogród i neon” (25.11.2026)
Pełny redesign na podstawie brand booka 1.0 (`brand/`). Stara wersja: gałąź `v4-czern-miod`.
- Paleta C „Mech i lampion” + piasek; Lampion `#FFB547` tylko na ciemnym, na jasnym `#8A5A12`.
- Kroje: Sawarabi Mincho, IBM Plex Sans, IBM Plex Mono (Shippori Mincho odrzucony: brak polskich znaków).
- Układ dzień → noc; motywy: kumiko (logo, tło sekcji, hover realizacji), linie piasku (pas regionu), linia światła (hero, stopka, ścieżki usług).
- Zdjęcia: 22 kadry z Google Flow (1376 px, do podmiany na 2K), realizacje wklejone w ekrany przez `tools/mockup.py`.
- Ruch: zdjęcia wyostrzają się przy wejściu, kroki procesu zapalają się po kolei, okno w logo zapala się przy starcie; `prefers-reduced-motion` wyłącza ruch.
- Kontrola: `build/check_site.py` zastępuje `check_light.py` (motyw okna z v4 usunięty).

## v5.1 (25.11.2026)
- Logo: brama torii podwójną linią (wektor z projektu z Flow, `brand/logo-torii.svg`), symbol `#torii` w `build/nav.html`; używany w menu, stopce, menu mobilnym, etykietach sekcji (zamiast kwadratu), faviconie i intro.
- Navbar: etykiety mono, pionowe listwy jak w shoji, łuk „kasagi” nad wskazaną pozycją, bursztynowe światło przesuwające się pod pozycjami, przycisk z narożnikami jak łączenia kumiko, menu rozwijane z bursztynową belką.
- Realizacje: zrzuty robione w proporcjach ekranu każdej sceny (`tools/shoot_sites.py`), więc nic nie jest ucięte; laptop z dokładnym prostokątem i wycięciem kamery.
- Podwójne kreski w łańcuchach automatyzacji zamienione na strzałki; punkty list jako małe romby.
- Teksty przejrzane humanizerem.
