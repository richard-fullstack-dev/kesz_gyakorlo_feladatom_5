import { Component } from '@angular/core';
import { Konyv } from './konyv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cim: string = '';
  isbn: string = '';
  konyvek: Konyv[] = [];

  hozzaad(): void {
    try {
      this.konyvek.push(new Konyv(this.cim, this.isbn));
      this.cim = '';
      this.isbn = '';
    } catch (error) {
    }
  }
}