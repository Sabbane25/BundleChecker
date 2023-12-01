import { Component, Input } from '@angular/core';
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
  produkt: Artikel[] = [];
  listeRam: Ram[] = [];
  listeCpu: Cpu[] = [];
  listeFestplatte: Speicher[] = [];
  listeProdukt: Artikel[] = [];
  hinzugefuegteArtikel: Artikel[] = []; // Um Artikel im neu Kontiguration aufzulisten / zur Übersicht - Funktion

  onButtonhinzufuegen(artikel: Artikel) {
    this.hinzugefuegteArtikel.push(artikel);
  }
  zurUebersicht() {
    this.artikelService.updateAusgewaehlteArtikel(this.hinzugefuegteArtikel);
  }
  constructor(private artikelService: ArtikelService) {}

  ngOnInit(): void {
   this.ladeRamData();
   this.ladeCpuData();
   this.ladeFestplatteData();
   console.log('liste: ',this.listeProdukt);
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
    this.artikelService.gibListeCPU('CPU').subscribe((cpuListe: Cpu[]) => {
      this.artikelListe.push({kategorie: "CPU", liste: cpuListe});
      for(let artikel of cpuListe){
        this.listeProdukt.push(artikel);
      }
    });
  }

  ladeFestplatteData() {
    this.artikelService.gibListeFestplatte().subscribe((festplatteListe: Speicher[]) => {
      this.artikelListe.push({kategorie: "Festplatte", liste: festplatteListe});
      for(let artikel of festplatteListe){
        this.listeProdukt.push(artikel);
      }
    });
  }
}
