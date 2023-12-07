import { Component, ElementRef, Input, Renderer2} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Ram } from 'src/models/ram.model';
import { Artikel } from 'src/models/artikel.model';
import { ArtikelService } from 'src/services/artikel.service';
import { ARTIKEL_LIST } from 'src/models/artikel_mockup';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})

export class ListKomponenteComponent {

  @Input() testFilter: any[] = ["malouda", "booba"];

  //enthält die gesamte Artikelliste aus der Datenbanken (Nicht sortiert)
  artikelListe: Artikel[] = ARTIKEL_LIST;

  // Um Artikel im neu Kontiguration aufzulisten
  hinzugefuegteArtikel: Artikel[] = [];

  /**
   *
   * @param artikel Artikel, den der Kunde für die Konfiguration seines PCs ausgewählt hat
   */
  onButtonhinzufuegen(artikel: Artikel) {
    this.hinzugefuegteArtikel.push(artikel);
  }

  // die Variable wird benutzt, um alle Artkel aller Art zu speichern(RAM, CPU, Speicher...)
  artikelList2: any[] = [];

  constructor(
      private dataService: DataService,
      private artikelService: ArtikelService) {}

  // Die Funktion "loadProdukts()" wird im "ngOnInit()" aufgerufen, um beim Start der App alle Produkte anzuzeigen.
  ngOnInit(): void {
    this.loadProdukts();
    this.gibArtikellistnachKategorie();
  }

  //speichert die Data in dem entsprechenden Variable. Die kommen aus der Service (DataService)
  loadProdukts(): void {
    this.artikelService.getAllArtikel2("RAM").subscribe((data) => { for(let a of data) this.artikelList2.push(a)});
    this.artikelService.getAllArtikel2("Speicher").subscribe((data) => { for(let a of data) this.artikelList2.push(a)});
  }

  /**
   *
   * @returns gib eine liste von jeder Artikelkategorie zurück
   */
  gibKategorieArtikel(): string[] {
    const kategorieliste: string[] = this.artikelListe
        .map(artikel => artikel.kategorie)
        .filter((kategorie, index, self) => self.indexOf(kategorie) === index);

    return kategorieliste;
  }

  /**
   * Die Methode gib für jede Kategorie eine sortierte Artikelliste zurück
   * @returns eine liste von Artikelliste nach Kategorie
   */
  gibArtikellistnachKategorie(): Artikel[] {
    const kategorien = this.gibKategorieArtikel();

    /*for(let i = 0; i < this.gibKategorieArtikel().length; i++){
      artikelListenachKategorie.push(this.artikelListe.filter((artikel) => artikel instanceof Ram))
    } */
    const artikelListenachKategorie: Artikel[] = this.artikelListe.filter((artikel) => {
      return kategorien.includes(artikel.constructor.name);
    });
    return artikelListenachKategorie;
  }


}
