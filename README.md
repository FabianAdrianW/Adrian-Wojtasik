# Adrian Wojtasik

Strona osobista i wizytówka, przez którą firmy zamawiają u mnie strony internetowe, programy i automatyzacje.

**Hasło:** Twój partner technologiczny: od prostej wizytówki po zaawansowane systemy.

Czysty HTML, CSS i JavaScript, bez frameworka. Działa na każdym hostingu statycznym.

## Wersja 5: „Ogród i neon” (25.11.2026)

Źródłem prawdy jest brand book w folderze [`brand/`](brand/): strategia, archetyp, dusza marki, paleta, kroje, zdjęcia i kontrakt dla strony (`brand/brandbook.config.json`).

Strona prowadzi od dnia do nocy, tak jak oferta prowadzi od wizytówki do systemu:

1. **Hero:** japoński ogród o zmierzchu z bursztynową linią światła, hasło, dwa przyciski.
2. **Realizacje:** Eskander, Polfinans, Brama Oleśnicka, Kwiaciarnia Małgorzata na urządzeniach w scenerii marki, plus karty innych projektów (Phở Việt, qmala.pl, mogetopomoge.pl, Eyelingo).
3. **Usługi:** trzy ścieżki dzień → zmierzch → noc (strony, programy, automatyzacje).
4. **Jak pracuję:** 7 kroków, które zapalają się po kolei.
5. **Po godzinach (noc):** przykłady automatyzacji.
6. **O mnie:** prawdziwe zdjęcie i cztery zasady (shokunin, ma, kanso, kaizen).
7. **Ceny** i **Kontakt** (telefon, e-mail, formularz mailto).

Podstrony: `realizacje.html`, `strony.html`, `aplikacje.html`, `automatyzacje.html` (generowane przez `build/gen_pages.py`).

| Token | Nazwa | Hex |
|---|---|---|
| `--ink` | Sumi | `#121311` |
| `--paper` | Washi | `#F2EFE7` |
| `--sand` | Piasek | `#DCD3C1` |
| `--moss` | Mech | `#33503F` |
| `--hinoki` | Hinoki | `#C9A46A` |
| `--lantern` | Lampion (tylko na ciemnym) | `#FFB547` |
| `--action` | Bursztyn akcji | `#8A5A12` |

Kroje (OFL): Sawarabi Mincho (nagłówki), IBM Plex Sans (tekst), BIZ UDPGothic (etykiety).

Zdjęcia scen: Google Flow (Nano Banana Pro), prompty w `brand/image_prompts.md`. Realizacje w scenach składa `tools/mockup.py`.

Poprzednie wersje: gałęzie `v4-czern-miod` i `v1-braz`.

## Praca nad stroną

- Teksty i układ: `src/index.html`, `src/styles.css`, `app.js`, nawigacja i stopka w `build/nav.html`, `build/foot.html`.
- Podstrony: edytuj `build/gen_pages.py`, potem `python3 build/gen_pages.py`.
- Budowanie: `python3 build/build.py` (pliki w katalogu głównym + samodzielne `dist/*.html` do podglądu).
- Kontrola: `python3 build/check_site.py` (brak poziomego przewijania przy 320, 390 i 1440 px, brak błędów JS).
- Nowa realizacja w scenie: zrzut `tools/shoot_sites.py`, potem `python3 tools/make_mocks.py nazwa` (scena powiększana 3×, ostry ekran).

## Do uzupełnienia

Zdjęcia scen w 2K, domena (canonical `TODO-domena.pl`), ceny poza wizytówką, NIP i polityka prywatności, zgody klientów na pokazanie realizacji, opinie.
