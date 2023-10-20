import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ARTIKEL_LIST } from 'src/models/artikel_mockup';
import { Artikel } from 'src/models/artikel.model';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit {

  ausgewaehlteProdukte: any[] = [];
  bundles: { anbieter: string; artikelList: Artikel[] }[] = []; // Hier wird bundles deklariert

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.gibGuenstigstesBundle(this.ausgewaehlteArtikel);
    this.groupByAnbieter();
  }
  

  //Die Variable enthält alle Artikel die in Listkomponenten ausgewälte wurde
  ausgewaehlteArtikel:  Artikel[] = ARTIKEL_LIST; 

/**
 * @param listArtikel Liste von allen verfügbaren Artikeln
 * @returns Eine Liste mit jeweils dem günstigsten Produkt aus jeder Kategorie.
 */
gibGuenstigstesBundle(listArtikel: Artikel[]): Artikel[] {
  const guenstigsteProdukte: Artikel[] = [];

  // Erstelle eine Map, um die günstigsten Produkte pro Kategorie zu verfolgen
  const guenstigsteProKategorie = new Map<string, Artikel>();

  // Iteriere durch alle verfügbaren Artikel
  for (const artikel of listArtikel) {
    const kategorie = artikel.kategorie;

    // Prüfe, ob es bereits ein günstigstes Produkt in dieser Kategorie gibt
    if (!guenstigsteProKategorie.has(kategorie)) {
      guenstigsteProKategorie.set(kategorie, artikel);
    } else {
      // Vergleiche den Preis mit dem bisher günstigsten Produkt in dieser Kategorie
      const bisherGuenstigstes = guenstigsteProKategorie.get(kategorie);
      if (bisherGuenstigstes && artikel.preis < bisherGuenstigstes.preis) {
        guenstigsteProKategorie.set(kategorie, artikel);
      }
    }
  }

  // Füge die günstigsten Produkte zur Ergebnisliste hinzu
  guenstigsteProKategorie.forEach((artikel) => {
    guenstigsteProdukte.push(artikel);
  });

  return guenstigsteProdukte;


}


groupByAnbieter() {
  // Gruppieren der Artikel nach Anbieter
  const groupedByAnbieter: { [key: string]: Artikel[] } = {};

  // Verfolgen der bereits verwendeten Kategorien
  const usedKategorien: Set<string> = new Set();

  this.ausgewaehlteArtikel.forEach((artikel) => {
    const anbieter = artikel.anbieter;
    const kategorie = artikel.kategorie;

    // Prüfe, ob die Kategorie bereits in den Bundles verwendet wurde
    if (!usedKategorien.has(kategorie)) {
      if (!groupedByAnbieter[anbieter]) {
        groupedByAnbieter[anbieter] = [];
      }
      groupedByAnbieter[anbieter].push(artikel);

      // Markiere die Kategorie als verwendet
      usedKategorien.add(kategorie);
    }
  });

  // Umwandeln in ein Array für die Verwendung in der Vorlage
  this.bundles = Object.keys(groupedByAnbieter).map((anbieter) => ({
    anbieter,
    artikelList: groupedByAnbieter[anbieter],
  }));
}


}
