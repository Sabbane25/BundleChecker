import { Component, ElementRef, Renderer2} from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})
export class ListKomponenteComponent {

  //die Variable wird benutzt, um alle Artkel der Tabelle RAM zu speichern
  artikel_RAM: any[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef, private dataService: DataService) {}

  // Die Funktion "loadProdukts()" wird im "ngOnInit()" aufgerufen, um beim Start der App alle Produkte anzuzeigen.
  ngOnInit(): void {
    this.loadProdukts();
  } 

  //speichert die Data in dem entsprechenden Variable. Die kommen aus der Service (DataService)
  loadProdukts(): void {
    this.dataService.getAllProducts("RAM").subscribe(data => this.artikel_RAM = data);
  }  

  showArtikel: boolean = false;
  
  toggleMenu(){
    this.showArtikel = !this.showArtikel;
  }
 
}
