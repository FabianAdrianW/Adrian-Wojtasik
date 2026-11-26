# design.md · Adrian Wojtasik (brand book 1.0, 25.11.2026)

Źródło prawdy: `AdrianWojtasik_Brand_Book_v1.html` i `brandbook.config.json`. Strona czyta tokeny z configu.

## Reguły wyglądu
- Dzień → noc: sekcje `data-tone="day"` (Washi/Piasek) na górze, `data-tone="night"` (Sumi) dla programów i automatyzacji, kontakt na końcu.
- Nagłówki Sawarabi Mincho 400; tekst IBM Plex Sans; etykiety BIZ UDPGothic wersalikami. Shippori Mincho odrzucony: brak polskich znaków.
- Lampion `#FFB547` wyłącznie na ciemnym tle; na jasnym akcja w `#8A5A12`; na Piasku linki w Mchu.
- Motywy: kratka kumiko (tła, hover), linie piasku (przerywniki), linia światła (hero, przejścia, stopka).
- Zdjęcia: tylko z gramatyki `image_prompts.md`; adnotacja „Sceny ilustracyjne wygenerowane przez AI”. Realizacje przez `tools/mockup.py`.
- Ruch: 200–600 ms ease-out; zdjęcia wyostrzają się przy wejściu; linia światła zapala się raz. `prefers-reduced-motion` wyłącza ruch.

## Dostępność
Kontrast AA (tabela w rozdziale 13), fokus widoczny, cele dotykowe ≥ 44 px, brak poziomego przewijania od 320 px.

## Do uzupełnienia
- Zdjęcia z Flow w 2K (obecne 1376 px).
- E-mail kontaktowy, potwierdzenie ceny „od 2 500 zł”, zgody klientów na pokazanie realizacji, opinie do cytowania.
