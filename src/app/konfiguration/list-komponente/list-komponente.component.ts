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
  artikel_Cpu: any[] = [];
  artikel_Grafikkarte: any[] = [];
  artikel_Speicher: any[] = [];
  artikel_Betriebssystem: any[] = [];
  artikel_Gehaeuse: any[] = [];
  artikel_Netzteil: any[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef, private dataService: DataService) {}

  // Die Funktion "loadProdukts()" wird im "ngOnInit()" aufgerufen, um beim Start der App alle Produkte anzuzeigen.
  ngOnInit(): void {
    this.loadProdukts();
  } 

  //speichert die Data in dem entsprechenden Variable. Die kommen aus der Service (DataService)
  loadProdukts(): void {
    this.dataService.getAllProducts("RAM").subscribe(data => this.artikel_RAM = data);
    this.dataService.getAllProducts("CPU").subscribe(data => this.artikel_Cpu = data);
    this.dataService.getAllProducts("Grafikkarte").subscribe(data => this.artikel_Grafikkarte = data);
    this.dataService.getAllProducts("Speicher").subscribe(data => this.artikel_Speicher = data);
    this.dataService.getAllProducts("Betriebssystem").subscribe(data => this.artikel_Betriebssystem = data);
    this.dataService.getAllProducts("Gehaeuse").subscribe(data => this.artikel_Gehaeuse = data);
    this.dataService.getAllProducts("Netzteil").subscribe(data => this.artikel_Netzteil = data);
  }  

  showArtikel: boolean = false;
  
  toggleMenu(){
    this.showArtikel = !this.showArtikel;
  }

  
 
}
