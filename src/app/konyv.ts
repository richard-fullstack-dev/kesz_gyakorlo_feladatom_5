export class Konyv {
  #cim: string;
  #isbn: string;

  constructor(cim: string, isbn: string) {
    if (cim.trim() === '') {
      throw new Error('A cím nem lehet üres!');
    }
    if (isbn.length !== 10 && isbn.length !== 13) {
      throw new Error('Az ISBN 10 vagy 13 karakter legyen!');
    }
    if (isNaN(Number(isbn))) {
      throw new Error('Az ISBN csak számjegy lehet!');
    }
    this.#cim = cim;
    this.#isbn = isbn;
  }

  toString(): string {
    return `${this.#cim} (${this.#isbn})`;
  }
}