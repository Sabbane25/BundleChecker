import { Component, ElementRef, Input, Renderer2} from '@angular/core';
import { Artikel } from 'src/models/artikel.model';
import { Cpu } from 'src/models/cpu.model';
import { Ram } from 'src/models/ram.model';
import { Speicher } from 'src/models/speicher.model';
import { ArtikelService } from 'src/services/artikel.service';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})

export class ListKomponenteComponent {

  @Input() testFilter: any[] = ["test", "test"];

  artikelListe: Array<{ kategorie: string, liste: Artikel[] }> = [];
  sortierteArtikelListe: Array<{ kategorie: string, liste1: Artikel[], liste2: Artikel[] }> = [];
  produkt: Artikel[] = [];
  listeRam: Ram[] = [];
  listeCpu: Cpu[] = [];
  listeFestplatte: Speicher[] = [];
  listeProdukt: Artikel[] = [];
  hinzugefuegteArtikel: Artikel[] = []; // Um Artikel im neu Kontiguration aufzulisten / zur Übersicht - Funktion

  cpuId1: Cpu[] = [];
  cpuId2: Cpu[] = [];

  festplatteId1: Speicher[] = [];
  festplatteId2: Speicher[] = [];

  onButtonhinzufuegen(artikel: Artikel) {
    this.hinzugefuegteArtikel.push(artikel);
  }

  constructor(
      private artikelService: ArtikelService) {}

  ngOnInit(): void {
   this.ladeRamData();
   this.ladeCpuData();
   this.ladeFestplatteData();
   //this.ladeProdukte();
   //console.log('liste: ',this.listeProdukt);
   //console.log('cpu liste liste encule', this.cpuId1);
  }

  ladeRamData() {
    this.artikelService.gibArtikelliste('RAM').subscribe((ramListe: Ram[]) => {
      this.artikelListe.push({kategorie: "RAM", liste: ramListe});
      this.listeRam = ramListe;
      for(let artikel of ramListe){
        this.listeProdukt.push(artikel);
      }
    });
  }

  ladeCpuData() {
    this.artikelService.gibListeCPU(2, 'CPU').subscribe((cpuListe1: Cpu[]) => {
      //console.log(cpuListe1);
      for(let cpu of cpuListe1){
        this.cpuId1.push(cpu);
      }
      //this.cupId1 = cpuListe1;
      this.artikelListe.push({kategorie: "CPU", liste: cpuListe1});
      for(let artikel of cpuListe1){
        this.listeProdukt.push(artikel);
      }
    });

    this.artikelService.gibListeCPU(1, 'CPU').subscribe((cpuListe2: Cpu[]) => {
      for(let cpu of cpuListe2){
        this.cpuId2.push(cpu);
      }
      //console.log(cpuListe2);
      this.cpuId2 = cpuListe2;
      this.artikelListe.push({kategorie: "CPU", liste: cpuListe2});
      for(let artikel of cpuListe2){
        this.listeProdukt.push(artikel);
      }
    });
  }

  //Lade Festplatte Daten aus der Datenbank mit Hilfe der API
  ladeFestplatteData() {
    this.artikelService.gibListeFestplatte(1, 'Festplatte').subscribe((festplatteListe: Speicher[]) => {
      for(const artikel of festplatteListe){
        this.festplatteId1.push(artikel);
      }
      this.artikelListe.push({kategorie: "Festplatte", liste: festplatteListe});
    });

    this.artikelService.gibListeFestplatte(2, 'Festplatte').subscribe((festplatteListe: Speicher[]) => {
      for(const artikel of festplatteListe){
        this.festplatteId2.push(artikel);
      }
      this.artikelListe.push({kategorie: "Festplatte", liste: festplatteListe});
    });
  }

  //nur für test
  ladeProdukte() {
    const shopId = 2; // Remplacez par la valeur de shopId que vous souhaitez utiliser
    const products = 'RAM'; // Remplacez par le produit que vous souhaitez récupérer
    this.artikelService.getAllProducts2(2, 'RAM').subscribe((data) => {
      // Traitement des données...
      console.log('neue Methode');
      //console.log(data);
      for(let shopID of data){
        console.log('-----', shopID.shopID);
      }
    });

    this.artikelService.getAllProducts2(1, 'RAM').subscribe((data) => {
      // Traitement des données...
      console.log('neue Methode');
      //console.log(data);
      for(let shopID of data){
        console.log('-----', shopID.shopID);
      }
    });
  }

  //vergleiche 2 Array von Artikel und gib eine Array zurück. Jede element der Array besteht aus 2 Objet die gleich sind.
  vergeicheArtikel(liste1: Artikel[], liste2: Artikel[]){
    if(liste1[0] instanceof Cpu && liste2[0] instanceof Cpu){
      console.log('hier sind cpu')
      for(let artikel1 of liste1){
        let convertierteCPU1: Cpu = artikel1 as Cpu;
        for(let i = 0; i < liste2.length; i++){
          let convertierteCPU2: Cpu = liste2[i] as Cpu;
          if(convertierteCPU1.stromverbrauch === convertierteCPU2.stromverbrauch && 
            convertierteCPU1.anzahlKerne === convertierteCPU2.anzahlKerne &&
            convertierteCPU1.threads === convertierteCPU2.threads){
            //console.log("marke", convertierteCPU1.interneGrafik);
            //console.log("marke", convertierteCPU2.interneGrafik);
            //console.log('--');
          }
        }
      }
    }else if(liste1[0] instanceof Speicher && liste2[0] instanceof Speicher){
      console.log('hier sind Festplatten');
      let gleicherArtikel = [];
      for(let artikel1 of liste1){
        let convertierteArtikel1: Speicher = artikel1 as Speicher;
        let isGleichArtikel = false;
        for(let i = 0; i < liste2.length && isGleichArtikel === false; i++){
          let convertierteArtikel2: Speicher = liste2[i] as Speicher;
          if(convertierteArtikel1.kapazitaet === convertierteArtikel2.kapazitaet && 
            convertierteArtikel1.lesen === convertierteArtikel2.lesen &&
            convertierteArtikel1.schreiben === convertierteArtikel2.schreiben){
              gleicherArtikel.push({convertierteArtikel1, convertierteArtikel2});
              //console.log(gleicherArtikel);
            //console.log("marke1", convertierteArtikel1.bezeichnung, convertierteArtikel1.marke, "-", convertierteArtikel1.preis);
            //console.log("marke2", convertierteArtikel1.bezeichnung, convertierteArtikel2.marke, "-", convertierteArtikel2.preis);
            isGleichArtikel = true;
            console.log('gefunden');
          }else{
            console.log('nicht gefunden');
          }
        }
      }
      console.log('hors boucle', gleicherArtikel);
    }
  }

}
