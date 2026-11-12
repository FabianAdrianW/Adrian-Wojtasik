# Adrian Wojtasik

Strona osobista i wizytówka, przez którą firmy zamawiają u mnie strony internetowe, aplikacje, programy i automatyzacje. Pracuję osobiście, od pierwszej rozmowy do publikacji.

Strona nie ma frameworka ani etapu budowania po stronie przeglądarki: to czysty HTML, CSS i JavaScript, który działa po otwarciu pliku z dysku i na każdym hostingu statycznym.

## Co jest na stronie

- **Hero** z zapalaniem okna i rzutem szyb, który wędruje po stronie razem z porą dnia.
- **Moje ostatnie realizacje**: dwie wyróżnione na głównej, pełna lista na podstronie `realizacje.html`.
- **Jak pracuję**: oś pionowa z sześcioma krokami, każdy rozwija się po najechaniu kursorem, obok przykładowa rozmowa z klientem.
- **Pracuję z AI, odpowiadam ja**: co robi AI, co robię ja i co z tego ma klient.
- **Wiesz, ile zapłacisz**: trzy pozycje cennika w układzie księgi.
- **O mnie** i **Kontakt** z numerem telefonu, e-mailem, WhatsAppem i formularzem.

## Wygląd

Motyw przewodni to okno i pora dnia: sekcje przechodzą od zmierzchu w hero, przez popołudnie i południe, do pełnego dnia w kontakcie.

| Token | Nazwa | Wartość |
|---|---|---|
| Tło ciemne | Sadza | `#151311` |
| Tło jasne | Kość | `#F1ECE4` |
| Akcent ciemny | Koniak | `#8E5E36` |
| Akcent jasny | Bursztyn | `#C08A5B` |

Kroje: **Geist** (tekst) i **Instrument Serif** w kursywie (akcenty w nagłówkach), oba na licencji OFL, wbudowane w `styles.css`. Szczegóły decyzji projektowych są w [`docs/DESIGN.md`](docs/DESIGN.md).

## Technologia i jakość

- HTML5, CSS ze zmiennymi, JavaScript bez bibliotek (`app.js`, około 7 KB).
- Skala: na komputerze `--z: .8`, na telefonie `--z: 1`, dzięki czemu 100% zoomu wygląda tak, jak projektowałem przy 80%.
- Ruch tylko przez `transform` i `opacity`. Efekty najechania kursorem tylko w `@media (hover: hover)`, a całość wyłączana przy `prefers-reduced-motion`.
- Układ sprawdzony od 320 do 1920 px, bez poziomego przewijania.
- Semantyczny HTML, widoczny fokus, polskie metadane, Open Graph i favicon.
- Obrazy w WebP, razem około 1,6 MB.

## Struktura repozytorium

```
.
├── index.html          strona główna (wynik budowania)
├── realizacje.html     podstrona z realizacjami (wynik budowania)
├── styles.css          style z wbudowanymi fontami (wynik budowania)
├── app.js              animacje, menu, rozmowa, formularz
├── img/                zdjęcia, znaki, favicon, og.jpg
├── fonts/              pliki .woff2
├── src/                źródła: index.html, realizacje.html, styles.css
├── build/              skrypt budujący i wspólne fragmenty (nav, stopka, realizacje)
└── docs/DESIGN.md      decyzje projektowe
```

## Uruchomienie

Wystarczy otworzyć `index.html` w przeglądarce albo uruchomić lokalny serwer:

```bash
python3 -m http.server 8000
```

## Edycja i budowanie

Pliki w katalogu głównym powstają ze źródeł w `src/` i `build/`. Po zmianach uruchom:

```bash
python3 build/build.py
```

Skrypt składa `index.html` i `realizacje.html`, wkleja fonty do `styles.css` i tworzy w `dist/` wersje jednoplikowe (CSS, JS i obrazy w środku), wygodne do wysłania komuś w mailu. Wymagany jest tylko Python 3, bez dodatkowych pakietów.

## Publikacja

Strona jest statyczna, więc nadaje się do GitHub Pages, Netlify albo zwykłego hostingu. Przed publikacją uzupełnij w `src/index.html` adres `canonical` (jest tam `TODO-domena.pl`), NIP i dane firmy w stopce (`build/foot.html`) oraz politykę prywatności.

## Kontakt

Adrian Wojtasik
tel. [791 632 675](tel:+48791632675) · [eyeamadrian@gmail.com](mailto:eyeamadrian@gmail.com)

## Prawa

© Adrian Wojtasik. Wszelkie prawa zastrzeżone. Kroje Geist i Instrument Serif są udostępnione na licencji SIL Open Font License.
