import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ARTIKEL_LIST } from 'src/models/artikel_mockup';
import { Artikel } from 'src/models/artikel.model';
import { MerkzettelComponent } from 'src/app/merkzettel/merkzettel/merkzettel.component';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit {

  bundles: { bundleName: string; anbieter: string; artikelList: Artikel[]; totalPrice: number }[] = []; // Hier wird bundles deklariert

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
  // Annahme: Der Preis wird aus Ihrem Artikelobjekt extrahiert (ersetzen Sie dies durch Ihren tatsächlichen Code)
  const preis = artikel.preis; // Hier wird angenommen, dass der Preis im Artikelobjekt gespeichert ist.

  // Berechnen Sie den neuen Preis (angenommen, die Menge bleibt unverändert)
  artikel.preis = artikel.menge * preis;

  // Runden Sie den Preis auf zwei Dezimalstellen
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
  
  // Runde den Gesamtpreis auf zwei Dezimalstellen
  return parseFloat(total.toFixed(2));
}

calculateAnbieterTotalPrice(artikelList: Artikel[], anbieter: string): number {
  const artikelByAnbieter = artikelList.filter((artikel) => artikel.anbieter === anbieter);
  
  // Runde den Gesamtpreis auf zwei Dezimalstellen
  return parseFloat(this.calculateTotalPrice(artikelByAnbieter).toFixed(2));
}

calculateBundleTotalPrice(bundles: { bundleName: string; anbieter: string; artikelList: Artikel[] }[]): number {
  let total = 0;
  for (const bundle of bundles) {
    total += this.calculateTotalPrice(bundle.artikelList);
  }
  
  // Runde den Gesamtpreis auf zwei Dezimalstellen
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

  // Erstellen Sie ein Bundle mit den günstigsten Artikeln
// In der Methode groupByAnbieter:
const guenstigstesBundle: { bundleName: string; anbieter: string; artikelList: Artikel[]; totalPrice: number } = {
  bundleName: '',
  anbieter: '', // Hier können Sie einen generischen Anbieter festlegen.
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
getUniqueAnbieter(artikelList: Artikel[]): string[] {
  return [...new Set(artikelList.map((artikel) => artikel.anbieter))];
}

/**
 * Zum des Produktlinks auf einem neuen Fenster.
 * @param produktLink 
 */
openProductLink(productLink: string) {
  // Überprüfen, ob ein gültiger Produktlink vorhanden ist
  if (productLink) {
    // Die Methode window.open() öffnet den Link in einem neuen Tab oder Fenster
    window.open(productLink, '_blank');
  } else {
    // Hier können Sie eine Meldung oder Aktion hinzufügen, wenn kein Produktlink vorhanden ist
    alert("Kein gültiger Produktlink vorhanden.");
  }
}



  /**
   * Methode zum Löschen eines Bundles oder Artikel.
   * @param bundle 
   */
  delete(bundle: { bundleName: string; anbieter: string; artikelList: Artikel[] }, artikel: Artikel) {
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
  deleteArticle(bundle: { bundleName: string; anbieter: string; artikelList: Artikel[] }, artikel: Artikel) {
    this.delete(bundle, artikel);
  }
  
}
