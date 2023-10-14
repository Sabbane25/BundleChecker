import { Component, Input } from '@angular/core';
import { ListKomponenteComponent } from '../konfiguration/list-komponente/list-komponente.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent {

  //liste alle Komponenten
  @Input() listKomponente: any[];

  //liste alle Komponenten-Item
  @Input() listKomponenteItem: any[];

filterErgebniss() {
  console.log(this.listKomponente);
  console.log(this.listKomponenteItem);
}
  isFilterSichtbar: boolean = false; 

  zeigeFilter(){
    this.isFilterSichtbar = !this.isFilterSichtbar;
  }
}
