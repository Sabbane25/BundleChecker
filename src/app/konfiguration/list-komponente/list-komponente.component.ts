import { Component, ElementRef, Input, Renderer2} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { BetriebsSystem } from 'src/models/betriebssystem.model';
import { Ram } from 'src/models/ram.model';
import { Artikel } from 'src/models/artikel.model';
import { NgFor } from '@angular/common';
import { ArtikelService } from 'src/services/artikel.service';
import { ARTIKEL_LIST } from 'src/models/artikel_mockup';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})

export class ListKomponenteComponent {
  
  @Input() testFilter: any[] = ["malouda", "booba"];

  onButtonhinzufuegen(artikel: Artikel) {
    this.hinzugefuegteArtikel.push(artikel);
    console.log(artikel);
  }

  listRAM: any[] = [];
  listRAM2: any[] = [];
  listSpeicher: any[] = [];

  // Um Artikel im neu Kontiguration aufzulisten
  hinzugefuegteArtikel: any[] = [];

  // die Variable wird benutzt, um alle Artkel aller Art zu speichern(RAM, CPU, Speicher...)
  artikelList: any[] = [];
  artikelList2: any[] = [];

  // speichert die verschiedenen Kategorien(Komponenten)
  artikel_Kategorien: any[] = [];

  constructor(
    private dataService: DataService,
    private artikelService: ArtikelService
  ) {}

  // Die Funktion "loadProdukts()" wird im "ngOnInit()" aufgerufen, um beim Start der App alle Produkte anzuzeigen.
  ngOnInit(): void {
    this.loadProdukts();
    console.log(this.listRAM2);
    this.gibAlleArtikel();
  } 

  //speichert die Data in dem entsprechenden Variable. Die kommen aus der Service (DataService)
  loadProdukts(): void {
    this.artikelService.getAllKategorien().subscribe(data => this.artikel_Kategorien = data);
    this.artikelService.getAllArtikel2("RAM").subscribe((data) => { for(let a of data) this.artikelList2.push(a)});
    this.artikelService.getAllArtikel2("Speicher").subscribe((data) => { for(let a of data) this.artikelList2.push(a)});
    this.artikelService.getAllArtikel2("CPU").subscribe((data) => { 
    console.log(data);
    for(let a of data) this.artikelList2.push(a)});
  }  
  
  gibAlleArtikel(): void {
    for(let artikel_Kategorien of ARTIKEL_LIST){
      if (artikel_Kategorien instanceof Ram){
        console.log(artikel_Kategorien.kapazitaet);
      }else if(artikel_Kategorien instanceof BetriebsSystem){
      }
    }
  }
 
}
