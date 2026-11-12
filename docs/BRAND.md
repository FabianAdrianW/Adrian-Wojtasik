# Marka: Adrian Wojtasik

Ten plik mówi, skąd bierze się spójność strony. Każda zmiana w tekstach, zdjęciach, kolorach i animacjach ma potwierdzać zasady poniżej. Element, który ich nie potwierdza, wypada.

## 1. Zdanie marki

**Hasło: „Konkurencję zostawiamy w cieniu.”** Stopka, podpis maila, opisy w social, wizytówka.
**Pod hasłem: „Strony, programy i automatyzacje, które przyspieszają Twoją firmę.”** Oferta, opisy usług, bio.

- Idiom „zostawić w cieniu” znaczy „przyćmić”. Mówi o przewadze klienta i trzyma się motywu światła z okna.
- „Zostawiamy” to ja razem z klientem: partnerstwo (archetyp Towarzysza).
- Konkurencji nie atakujemy wprost; nie dopisujemy nazw ani porównań.
- Hasło nie mówi, co robię, więc zawsze stoi przy nim zdanie o usługach.
- Słowa bazowe do tekstów: przewaga, światło, widać, szybciej, prościej, razem.
- Odrzucone: „Przejrzyście, od kodu po cenę” (słowo „przejrzysty” jest ograne u konkurencji), „Twoje okno na technologię” (nie mówi o efekcie), „XXI wiek / nowoczesność” (ogólniki, jak u agencji).

## 2. Archetyp

- **Główny: Twórca.** Buduje rzeczy, które działają i dobrze wyglądają. Motywacja: zrobić coś trwałego i dopracowanego. Na stronie: detale, rzemiosło, pokazywanie procesu i efektu.
- **Wspierający: Towarzysz (Zwykły człowiek).** Przyjazny partner, rozmowa jak z kimś znajomym, bez żargonu. Na stronie: forma „Ty”, kontakt bezpośrednio ze mną, prosty język.
- **Cień, którego unikamy:** Twórca bez Towarzysza to perfekcjonizm i dystans („artysta wie lepiej”). Towarzysz bez Twórcy to bylejakość („jakoś to będzie”).
- **Konsekwencje:** ton spokojny i konkretny; zdjęcia przy pracy, nie pozowane w garniturze; ruch płynny, bez fajerwerków; detal zawsze dopracowany.

## 3. Świat zdjęć

- Jedna ściana we wszystkich ujęciach: ciepły kamień (greige), na niej miodowe światło z okna (2×2 szybki, pochylone, miękkie).
- Postać, krzesło, biurko i sprzęt zostają nietknięte. Zmieniamy tylko tło (`tools/rebg.py`: maska postaci + wykrycie linii biurka + nowa ściana + światło).
- Stały strój: czarna koszula lub jasne polo. Przy nowej sesji: jeden rekwizyt w kolorze miodu w każdym kadrze (np. notes).
- Plik źródłowy zawsze z oryginału 2576 px, eksport WebP q92 w dwóch rozmiarach.

## 4. Motyw: szczelina światła

Pionowa szczelina ze znaku wraca w etykietach sekcji, w krokach procesu, w menu rozwijanym (pasek przy hoverze), w przejściu z ciemnej części strony do jasnej i w podkreśleniu linków w stopce. Szerokość 2 px, kolor `--amber` na ciemnym, `--accent` na jasnym. Nowe elementy dekoracyjne budujemy z tej szczeliny, nie z nowych kształtów.

## 5. Schemat sekcji

Każda sekcja: etykieta ze szczeliną → nagłówek w dwóch liniach (druga kursywą w kolorze akcentu) → krótki tekst → jedno wezwanie do działania (jeśli sekcja prowadzi dalej). Zwracamy się zawsze na „Ty”, piszę w pierwszej osobie liczby pojedynczej.

## 6. Paleta

Czerń `#0B0B0C`, biel `#F4F3F0`, miód `#D99A1E` (hover `#B87E10`, jasny `#F5C45A`, tekst na jasnym `#8A5D0A`).
