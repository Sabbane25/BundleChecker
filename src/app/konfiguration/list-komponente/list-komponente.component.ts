import { Component, ElementRef, Renderer2} from '@angular/core';
import { Komponent } from 'src/komponent';
import { KOMPOENTEN } from 'src/mock-komponenten-list';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})
export class ListKomponenteComponent {

  constructor(private renderer: Renderer2, private el: ElementRef){

  }

  listKomponenten: Komponent[] = KOMPOENTEN;

  komponantenList = ["CPU", "GPU", "MAINBOARD", "RAM", "RM"];

  showArtikel: boolean = false;
  
  toggleMenu(){
    this.showArtikel = !this.showArtikel;
  }
 
}
