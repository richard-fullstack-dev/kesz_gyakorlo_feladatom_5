# 5. feladat – Új könyvek felvétele (20 pont)

## Tudnivalók

- Telepítés: `npm install`
- Indítás: `ng serve`
- Tesztek futtatása: `ng test`
- A tesztfájlt (`src/app/feladat5.spec.ts`) ne módosítsa!

## Feladat

Az új könyveket létrehozó űrlap már elkészült (a fő komponensben), azonban még nem funkcionális. Tegye interaktívvá, és készítse el a hozzá tartozó adatszerkezetet!

a) Készítse el a **Konyv** osztályt a **src/app/konyv.ts** fájlban az alábbi leírás alapján:
- Két privát tagváltozó:
  - **#cim**: szöveg
  - **#isbn**: szöveg
- Konstruktor, amely ellenőrzi:
  - a cím nem lehet üres
  - az ISBN-nek pontosan 10 vagy 13 számjegy karakterből kell állnia (egyéb ellenőrzést nem kell végezni)
  - hibás paraméterek esetén kivétellel jelezze a hibát.
- **toString** metódus, amely **Cím (ISBN)** formában adja vissza az adatokat.

b) Az oldal fő komponensét egészítse ki, hogy képes legyen a könyvekből álló lista tárolására.
- A form kitöltésével a lista végéhez a felhasználó képes legyen új adatot hozzáadni
- Új könyv hozzáadásakor a formot ürítse; érvénytelen adatok esetén a lista ne változzon
- A lista elemeit a **lista** azonosítójú felsorolásban jelenítse meg a **toString** metódus segítségével
