import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const forras = import.meta.webpackContext('./', { recursive: false, regExp: /\/konyv\.ts$/ });

function Konyv(): any {
  const kulcs = forras.keys()[0];
  expect(kulcs).withContext('Nem található a src/app/konyv.ts fájl.').toBeTruthy();
  const osztaly = kulcs ? forras(kulcs).Konyv : undefined;
  expect(osztaly).withContext('Nem található a Konyv osztály.').toBeTruthy();
  return osztaly;
}

function szoveg(elem: Element | null | undefined): string {
  return elem ? (elem.textContent || '').replace(/\s+/g, ' ').trim() : '';
}

describe('5. feladat - Új könyvek felvétele', () => {
  describe('a) Konyv osztály', () => {
    it('létrehozható érvényes adatokkal (10 számjegyű ISBN)', () => {
      const K = Konyv();
      expect(() => new K('Dűne', '9634791234')).not.toThrow();
    });

    it('létrehozható érvényes adatokkal (13 számjegyű ISBN)', () => {
      const K = Konyv();
      expect(() => new K('Dűne', '9789634791234')).not.toThrow();
    });

    it('a tagváltozók privátak', () => {
      const K = Konyv();
      const konyv = new K('Dűne', '9789634791234');
      expect(Object.keys(konyv).length).toBe(0);
      expect(konyv.cim).toBeUndefined();
      expect(konyv.isbn).toBeUndefined();
    });

    it('üres cím esetén kivételt dob', () => {
      const K = Konyv();
      expect(() => new K('', '9789634791234')).toThrow();
    });

    it('nem 10 vagy 13 hosszú ISBN esetén kivételt dob', () => {
      const K = Konyv();
      ['', '123456789', '12345678901', '123456789012', '12345678901234'].forEach(isbn => {
        expect(() => new K('Dűne', isbn)).withContext(isbn).toThrow();
      });
    });

    it('nem csak számjegyekből álló ISBN esetén kivételt dob', () => {
      const K = Konyv();
      ['ABCDEFGHIJ', '12345abcde', '978963479123X'].forEach(isbn => {
        expect(() => new K('Dűne', isbn)).withContext(isbn).toThrow();
      });
    });

    it('toString: Cím (ISBN)', () => {
      const K = Konyv();
      expect(new K('Dűne', '9789634791234').toString()).toBe('Dűne (9789634791234)');
    });
  });

  describe('b) Fő komponens: űrlap és lista', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
      localStorage.clear();
      TestBed.configureTestingModule({
        imports: [AppModule],
        providers: [provideLocationMocks()]
      });
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await fixture.whenStable();
    });

    function mezo(id: string): HTMLInputElement {
      return fixture.nativeElement.querySelector('#' + id);
    }

    async function hozzaad(cim: string, isbn: string): Promise<void> {
      mezo('cim').value = cim;
      mezo('cim').dispatchEvent(new Event('input'));
      mezo('isbn').value = isbn;
      mezo('isbn').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      (fixture.nativeElement.querySelector('#hozzaad') as HTMLButtonElement).click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    }

    function lista(): string[] {
      return Array.from(fixture.nativeElement.querySelectorAll('#lista li')).map(li => szoveg(li as Element));
    }

    it('új könyv a lista végére kerül', async () => {
      await hozzaad('Dűne', '9789634791234');
      await hozzaad('Alapítvány', '9634791234');
      expect(lista()).toEqual(['Dűne (9789634791234)', 'Alapítvány (9634791234)']);
    });

    it('sikeres hozzáadás után az űrlap kiürül', async () => {
      await hozzaad('Dűne', '9789634791234');
      expect(mezo('cim').value).toBe('');
      expect(mezo('isbn').value).toBe('');
    });

    it('érvénytelen adatok esetén a lista nem változik', async () => {
      await hozzaad('Dűne', '9789634791234');
      await hozzaad('', '9789634791234');
      await hozzaad('Alapítvány', '123');
      expect(lista()).toEqual(['Dűne (9789634791234)']);
    });
  });
});
