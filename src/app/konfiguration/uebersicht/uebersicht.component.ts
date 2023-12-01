import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artikel } from 'src/models/artikel.model';
import { ArtikelService } from 'src/services/artikel.service';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit {

  bundles: { bundleName: string; artikelList: Artikel[]; totalPrice: number }[] = []; // Hier wird bundles deklariert
  ausgewaehlteArtikel: Artikel[] = [];

  constructor(private artikelService: ArtikelService) {}

  ngOnInit() {
    this.artikelService.ausgewaehlteArtikel$.subscribe(artikel => {
      this.ausgewaehlteArtikel = artikel;
    });
    this.gibGuenstigstesBundle(this.ausgewaehlteArtikel);
    this.groupByAnbieter();
  }

  onAusgewaehlteArtikelChanged(ausgewaehlteArtikel: Artikel[]) {
    this.ausgewaehlteArtikel = ausgewaehlteArtikel;
  }

  anbieterName(shopID: number): string {
    return (shopID === 1) ? 'Alternate' : 'Future-X';
  }

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
    if (!guenstigsteProKategorie.has(kategorie) || artikel.preis < guenstigsteProKategorie.get(kategorie)!.preis) {
      guenstigsteProKategorie.set(kategorie, artikel);
    }
  }
  // Füge die günstigsten Produkte zur Ergebnisliste hinzu
  guenstigsteProKategorie.forEach((artikel) => {
    guenstigsteProdukte.push(artikel);
  });

  return guenstigsteProdukte;
}


/**
 * 
 * @param bundleIndex 
 */
updateTotalPrice(bundleIndex: number) {
  // Hier berechnen Sie den Gesamtpreis für das Bundle mit dem angegebenen Index
  const bundle = this.bundles[bundleIndex];
  const totalBundlePrice = this.calculateTotalPrice(bundle.artikelList);

  // Aktualisieren Sie den Gesamtpreis des Bundles
  bundle.totalPrice = totalBundlePrice;
}

/**
 * 
 * @param bundleIndex 
 * @param artikelIndex 
 * @param event 
 */
onMengeChange(bundleIndex: number, artikelIndex: number, event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  const parsedValue = parseInt(inputValue, 10);

  if (!isNaN(parsedValue) && parsedValue >= 1) {
    const bundle = this.bundles[bundleIndex];
    bundle.artikelList[artikelIndex].menge = parsedValue;
    this.updateTotalPrice(bundleIndex);
  } else {
    // Eine Meldung oder Logik hinzufügen, wenn die Eingabe ungültig ist.
  }
}

/**
 * Methode zum Berechnen der Gesamtpreis vom Artikel bei Änderung der Menge.
 * @param artikel 
 * @returns 
 */
calculateArticlePrice(artikel: Artikel): number {
  // Wenn die Menge nicht vorhanden oder ungültig ist, wird der Preis 0 sein.
  if (artikel.menge < 1) {
    return 0;
  } else if (artikel.menge === null || isNaN(artikel.menge)) {
    return artikel.preis;
  } else {
    // Andernfalls berechne den Preis für die gegebene Menge.
    const preis = artikel.menge * artikel.preis;
    
    // Runde den Preis auf zwei Dezimalstellen
    return parseFloat(preis.toFixed(2));
  }
}


// Methode zur Aktualisierung des Preises eines einzelnen Artikels
updateArticlePrice(bundle: any, artikel: Artikel) {
  
  const preis = artikel.preis;

  // Neuen Preis (angenommen, die Menge bleibt unverändert)
  artikel.preis = artikel.menge * preis;

  // Preis auf zwei Dezimalstellen
  artikel.preis = parseFloat(artikel.preis.toFixed(2));

  this.updateTotalPrice(this.bundles.indexOf(bundle));
}


/**
 * 
 * @param artikelList 
 * @returns den gesamtpreis eines Bundles.
 */
calculateTotalPrice(artikelList: Artikel[]): number {
  let total = 0;
  for (const artikel of artikelList) {
    total += this.calculateArticlePrice(artikel);
  }
  
  // Gesamtpreis auf zwei Dezimalstellen
  return parseFloat(total.toFixed(2));
}

calculateAnbieterTotalPrice(artikelList: Artikel[], shopID: number): number {
  const artikelByAnbieter = artikelList.filter((artikel) => artikel.shopID === shopID);
  
  //Gesamtpreis auf zwei Dezimalstellen
  return parseFloat(this.calculateTotalPrice(artikelByAnbieter).toFixed(2));
}

calculateBundleTotalPrice(bundles: { bundleName: string; artikelList: Artikel[] }[]): number {
  let total = 0;
  for (const bundle of bundles) {
    total += this.calculateTotalPrice(bundle.artikelList);
  }
  
  // Gesamtpreis auf zwei Dezimalstellen
  return parseFloat(total.toFixed(2));
}


/**
 * Die Methode prüft, ob ein Artikel aus einer Kategorie bereits im Bundle ist, falls ja, wird einen Artikel pro Kategorie genommen.
 */
groupByAnbieter() {
  // Sortieren Sie die Artikel nach dem Preis aufsteigend
  this.ausgewaehlteArtikel.sort((a, b) => a.preis - b.preis);

  // Wählen Sie die günstigsten Artikel aus jeder Kategorie
  const guenstigsteProKategorie = new Map<string, Artikel>();
  for (const artikel of this.ausgewaehlteArtikel) {
    if (!guenstigsteProKategorie.has(artikel.kategorie)) {
      guenstigsteProKategorie.set(artikel.kategorie, artikel);
    }
  }
// Ein Bundle mit den günstigsten Artikeln
const guenstigstesBundle: { bundleName: string; artikelList: Artikel[]; totalPrice: number } = {
  bundleName: '',
  artikelList: Array.from(guenstigsteProKategorie.values()),
  totalPrice: this.calculateTotalPrice(Array.from(guenstigsteProKategorie.values())), // Gesamtpreis berechnen
};
this.bundles = [guenstigstesBundle];
}

/**
 * 
 * @param artikelList 
 * @returns 
 */
getUniqueAnbieter(artikelList: Artikel[]): number[] {
  return [...new Set(artikelList.map((artikel) => artikel.shopID))];
}

/**
 * Zum des Produktlinks auf einem neuen Fenster.
 * @param produktLink 
 */
openProductLink(produktUrl: string) {
  // Überprüfen, ob ein gültiger Produktlink vorhanden ist
  if (produktUrl) {
    // Die Methode window.open() öffnet den Link in einem neuen Tab oder Fenster
    window.open(produktUrl, '_blank');
  } else {
    // Hier können Sie eine Meldung oder Aktion hinzufügen, wenn kein Produktlink vorhanden ist
    alert("Kein gültiger Produktlink vorhanden.");
  }
}



  /**
   * Methode zum Löschen eines Bundles oder Artikel.
   * @param bundle 
   */
  delete(bundle: { bundleName: string; artikelList: Artikel[] }, artikel: Artikel) {
    // Finde das ausgewählte Bundle
    const targetBundle = this.bundles.find(b => b.bundleName === bundle.bundleName);

    if (targetBundle) {
      // Finde den Index des ausgewählten Artikels im Bundle
      const index = targetBundle.artikelList.indexOf(artikel);

      if (index !== -1) {
        // Entferne den Artikel aus dem Bundle
        targetBundle.artikelList.splice(index, 1);
      }
    }
  }
  
  /**
   * 
   * @param bundle 
   * @param artikel 
   */
  deleteArticle(bundle: { bundleName: string; artikelList: Artikel[] }, artikel: Artikel) {
    this.delete(bundle, artikel);
  }
  
}