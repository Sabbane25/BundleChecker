import { Component} from '@angular/core';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styles: [
  ]
})
export class ListKomponenteComponent {

  komponantenList = ["CPU", "GPU", "MAINBOARD", "RAM"];
 
}
