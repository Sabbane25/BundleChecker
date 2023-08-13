import { Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})
export class ListKomponenteComponent {

  constructor(private renderer: Renderer2, private el: ElementRef){

  }

  komponantenList = ["CPU", "GPU", "MAINBOARD", "RAM", "RM"];

  showArtikel: boolean = false;
  
  toggleMenu(){
    this.showArtikel = !this.showArtikel;
  }

 
}
