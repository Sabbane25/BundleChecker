import { Component, ElementRef, Renderer2} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { BetriebsSystem } from 'src/models/betriebssystem.model';
import { Ram } from 'src/models/ram.model';
import { Artikel } from 'src/models/artikel.model';
import { NgFor } from '@angular/common';
import { ArtikelService } from 'src/services/artikel.service';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})

export class ListKomponenteComponent {

  // die Variable wird benutzt, um alle Artkel aller Art zu speichern(RAM, CPU, Speicher...)
  artikelList: any[] = [];

  // speichert die verschiedenen Kategorien(Komponenten)
  artikel_Kategorien: any[] = [];

  constructor(
    private dataService: DataService,
    private artikelService: ArtikelService
  ) {}

  // Die Funktion "loadProdukts()" wird im "ngOnInit()" aufgerufen, um beim Start der App alle Produkte anzuzeigen.
  ngOnInit(): void {
    this.loadProdukts();
  } 

  //speichert die Data in dem entsprechenden Variable. Die kommen aus der Service (DataService)
  loadProdukts(): void {
    this.artikelService.getAllKategorien().subscribe(data => this.artikel_Kategorien = data);
    this.artikelService.getAllProducts("Artikel").subscribe(data => this.artikelList = data);
  }  

  gibAttributte(artikel: Artikel): string{
    if( artikel.kategorie == "Ram"){
      return `${artikel.preis}`;
    }else if(artikel instanceof BetriebsSystem){
      return `${artikel.hersteller}`;
    }
    return "";
  }
 
}
