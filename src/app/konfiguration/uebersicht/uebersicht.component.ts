import { Component, OnInit } from '@angular/core';
import { Artikel } from 'src/models/artikel.model';
import { ArtikelService } from 'src/services/artikel.service';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit {

// Definition von Bundles für die günstigsten und schnellsten Artikel
guenstigstesBundle: { bundleName: string; artikelList: Artikel[]; totalPrice: number }[] = [];
schnellstesBundle: { bundleName: string; artikelList: Artikel[]; totalPrice: number }[] = [];


// Arrays für ausgewählte Artikel: ausgewaehlteArtikel1 für günstigstes Bundle und ausgewaehlteArtikel2 für schnellstes Bundle
ausgewaehlteArtikel1: Artikel[] = [];
ausgewaehlteArtikel2: Artikel[] = [];


/**
 * Erzeugt eine Tiefenkopie eines Objekts mithilfe von JSON-Parsing.
 * @param obj - Das zu kopierende Objekt.
 * @returns Die Tiefenkopie des Objekts.
 */
deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

  constructor(private artikelService: ArtikelService) {}

/**
 * Initialisiert das Komponente und abonniert Änderungen der guenstigstesArtikel-
 * und schnellstesArtikel-Datenströme vom ArtikelService.
 */
ngOnInit() {
  // Abonniert Änderungen im guenstigstesArtikel-Datenstrom
  this.artikelService.guenstigstesArtikel$.subscribe(artikel => {
    this.ausgewaehlteArtikel1 = artikel;
    this.groupByAnbieterForGuenstigstesBundle();
  });

  // Abonniert Änderungen im schnellstesArtikel-Datenstrom
  this.artikelService.schnellstesArtikel$.subscribe(artikel => {
    this.ausgewaehlteArtikel2 = artikel;
    this.groupByAnbieterForSchnellstesBundle();
  });
/**
 * Setzt die Menge aller Artikel im guenstigstesBundle auf 1.
 */
this.guenstigstesBundle.forEach(bundle => {
  bundle.artikelList.forEach(artikel => {
    artikel.menge = 1;
  });
});

/**
 * Setzt die Menge aller Artikel im schnellstesBundle auf 1.
 */
this.schnellstesBundle.forEach(bundle => {
  bundle.artikelList.forEach(artikel => {
    artikel.menge = 1;
  });
});

console.log('guenstigstesBundle:', this.guenstigstesBundle);
console.log('schnellstesBundle:', this.schnellstesBundle);
}


/**
 * Gibt den Namen des Anbieters basierend auf der Shop-ID zurück.
 * @param shopID Die Shop-ID des Anbieters.
 * @returns Der Name des Anbieters (Alternate oder Future-X).
 */
anbieterName(shopID: number): string {
  return (shopID === 1) ? 'Alternate' : 'Future-X';
}

/**
 * 
 * @param bundleIndex 
 * @param artikelIndex 
 * @param event 
 */
/**
 * Behandelt das Ereignis, wenn sich die Menge für das günstigste Bundle ändert.
 * @param bundleIndex Der Index des Bundles.
 * @param artikelIndex Der Index des Artikels im Bundle.
 * @param event Das Event-Objekt für die Menge-Änderung.
 */
onMengeChangeForGuenstigstesBundle(bundleIndex: number, artikelIndex: number, event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  const parsedValue = parseInt(inputValue, 10);

  if (!isNaN(parsedValue) && parsedValue >= 1) {
    // Kopiere den Artikel tief
    const bundle = this.guenstigstesBundle[bundleIndex];
    const updatedArtikel = this.deepCopy(bundle.artikelList[artikelIndex]);
    
    // Ändere die Menge im kopierten Artikel
    updatedArtikel.menge = parsedValue;

    // Ersetze den Artikel im Bundle
    bundle.artikelList[artikelIndex] = updatedArtikel;

    // Aktualisiere den Gesamtpreis
    this.updateTotalPriceForGuenstigstesBundle(bundleIndex);

    // Aktualisiere die Daten im Artikel-Service
    const kopierteArtikel = this.deepCopy(bundle.artikelList[artikelIndex]);
    this.artikelService.updateGuenstigstesArtikel(kopierteArtikel);
  } else {
    alert('Ungültige Eingabe. Bitte geben Sie eine Zahl größer oder gleich 1 ein.');
  }
}

/**
 * Aktualisiert den Gesamtpreis für das günstigste Bundle.
 * @param bundleIndex Der Index des Bundles.
 */
updateTotalPriceForGuenstigstesBundle(bundleIndex: number) {
  const bundle = this.guenstigstesBundle[bundleIndex];
  // Berechnet den Gesamtpreis basierend auf den Artikeln im Bundle
  bundle.totalPrice = this.calculateTotalPrice(bundle.artikelList);
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

/**
 * Berechnet den Gesamtpreis für eine Liste von Artikeln.
 * @param artikelList Die Liste der Artikel.
 * @returns Der Gesamtpreis auf zwei Dezimalstellen.
 */
calculateTotalPrice(artikelList: Artikel[]): number {
  let total = 0;
  // Iteriere durch die Artikel und berechne den Preis für jeden Artikel
  for (const artikel of artikelList) {
    total += this.calculateArticlePrice(artikel);
  }
  // Runde den Gesamtpreis auf zwei Dezimalstellen
  return parseFloat(total.toFixed(2));
}

/**
 * Berechnet den Gesamtpreis für eine Liste von Artikeln eines bestimmten Anbieters.
 * @param artikelList Die Liste der Artikel.
 * @param shopID Die ID des Anbieters.
 * @returns Der Gesamtpreis der Artikel des Anbieters auf zwei Dezimalstellen.
 */
calculateAnbieterTotalPrice(artikelList: Artikel[], shopID: number): number {
  // Filtere die Artikel nach der angegebenen shopID
  const artikelByAnbieter = artikelList.filter((artikel) => artikel.shopID === shopID);
  
  // Berechne den Gesamtpreis für die gefilterten Artikel und runde auf zwei Dezimalstellen
  return parseFloat(this.calculateTotalPrice(artikelByAnbieter).toFixed(2));
}


/**
 * Berechnet den Gesamtpreis für eine Liste von Bundles.
 * @param bundles Die Liste der Bundles mit Artikeln.
 * @returns Der Gesamtpreis der Artikel in den Bundles auf zwei Dezimalstellen.
 */
calculateBundleTotalPrice(bundles: { bundleName: string; artikelList: Artikel[] }[]): number {
  let total = 0;

  // Iteriere durch jedes Bundle und summiere die Gesamtpreise der enthaltenen Artikel
  for (const bundle of bundles) {
    total += this.calculateTotalPrice(bundle.artikelList);
  }
  
  // Gesamtpreis auf zwei Dezimalstellen runden
  return parseFloat(total.toFixed(2));
}



/**
 * Entfernt einen Artikel aus dem angegebenen Bundle.
 * @param bundle Das Bundle, aus dem der Artikel entfernt werden soll.
 * @param artikel Der Artikel, der aus dem Bundle entfernt werden soll.
 */
delete(bundle: { bundleName: string; artikelList: Artikel[] }, artikel: Artikel) {
  // Finde das ausgewählte Bundle
  const targetBundle = this.guenstigstesBundle.find(b => b.bundleName === bundle.bundleName);

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
 * Entfernt einen Artikel aus einem Bundle.
 * @param bundle Das Bundle, aus dem der Artikel entfernt werden soll.
 * @param artikel Der Artikel, der aus dem Bundle entfernt werden soll.
 */
deleteArticle(bundle: { bundleName: string; artikelList: Artikel[] }, artikel: Artikel) {
  this.delete(bundle, artikel);
}



/**
 * Die Methode prüft, ob ein Artikel aus einer Kategorie bereits im Bundle ist, falls ja, wird einen Artikel pro Kategorie genommen.
 */
groupByAnbieterForGuenstigstesBundle() {
  // Sortiere die ausgewählten Artikel für das guenstigstesBundle nach dem Preis aufsteigend
  this.ausgewaehlteArtikel1.sort((a, b) => a.preis - b.preis);
  
  // Wähle die günstigsten Artikel aus jeder Kategorie für guenstigstesBundle
  const guenstigsteProKategorie = new Map<string, Artikel>();
  
  for (const artikel of this.ausgewaehlteArtikel1) {
    const kategorie = artikel.kategorie;

    // Günstigster Artikel
    if (!guenstigsteProKategorie.has(kategorie) || artikel.preis < guenstigsteProKategorie.get(kategorie)!.preis) {
      guenstigsteProKategorie.set(kategorie, artikel);
    }
  }
  // Bundle mit den günstigsten Artikeln für guenstigstesBundle
  const newBundle: { bundleName: string; artikelList: Artikel[]; totalPrice: number } = {
    bundleName: 'Guenstigstes Bundle',
    artikelList: Array.from(guenstigsteProKategorie.values()),
    totalPrice: this.calculateTotalPrice(Array.from(guenstigsteProKategorie.values())),
  };

  // Setze das guenstigstesBundle
  this.guenstigstesBundle = [newBundle];
}

/**
 * Gibt eine Liste von eindeutigen Anbieter-IDs aus der übergebenen Liste von Artikeln zurück.
 * @param artikelList - Die Liste von Artikeln, aus der die Anbieter-IDs extrahiert werden.
 * @returns Eine Liste von eindeutigen Anbieter-IDs.
 */
getUniqueAnbieter(artikelList: Artikel[]): number[] {
  return [...new Set(artikelList.map((artikel) => artikel.shopID))];
}


/**
 * Öffnet den übergebenen Produktlink in einem neuen Tab oder Fenster.
 * Überprüft, ob ein gültiger Produktlink vorhanden ist, bevor das Öffnen erfolgt.
 * @param produktUrl - Der Produktlink, der geöffnet werden soll.
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
 * Behandelt die Änderung der Menge für das schnellste Bundle.
 * Kopiert den betroffenen Artikel tief, aktualisiert die Menge und ersetzt den Artikel im Bundle.
 * Aktualisiert den Gesamtpreis für das schnellste Bundle und informiert den Artikel-Service über die Änderung.
 * Fügt bei ungültiger Eingabe eine Meldung oder Logik hinzu.
 * @param bundleIndex - Der Index des Bundles, in dem sich der Artikel befindet.
 * @param artikelIndex - Der Index des Artikels, dessen Menge geändert wird.
 * @param event - Das Ereignis, das die Mengeänderung ausgelöst hat.
 */
onMengeChangeForSchnellstesBundle(bundleIndex: number, artikelIndex: number, event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  const parsedValue = parseInt(inputValue, 10);

  if (!isNaN(parsedValue) && parsedValue >= 1) {
    // Kopiere den Artikel tief
    const bundle = this.schnellstesBundle[bundleIndex];
    const updatedArtikel = this.deepCopy(bundle.artikelList[artikelIndex]);
    
    // Ändere die Menge im kopierten Artikel
    updatedArtikel.menge = parsedValue;

    // Ersetze den Artikel im Bundle
    bundle.artikelList[artikelIndex] = updatedArtikel;

    // Aktualisiere den Gesamtpreis
    this.updateTotalPriceForSchnellstesBundle(bundleIndex);

    // Informiere den Artikel-Service über die Änderung
    const kopierteArtikel = this.deepCopy(bundle.artikelList[artikelIndex]);
    this.artikelService.updateSchnellstesArtikel(kopierteArtikel);
  } else {
     alert('Ungültige Eingabe. Bitte geben Sie eine Zahl größer oder gleich 1 ein.');
  }    
}

  
/**
 * Aktualisiert den Gesamtpreis für das schnellste Bundle.
 * Berechnet den Gesamtpreis basierend auf den Artikeln im Bundle und aktualisiert das Bundle-Objekt.
 * @param bundleIndex - Der Index des Bundles, dessen Gesamtpreis aktualisiert wird.
 */
updateTotalPriceForSchnellstesBundle(bundleIndex: number) {
  const bundle = this.schnellstesBundle[bundleIndex];
  bundle.totalPrice = this.calculateTotalPrice(bundle.artikelList);
}


/**
 * Berechnet den Gesamtpreis für eine Liste von Artikeln.
 * Summiert die Einzelpreise der Artikel unter Berücksichtigung der Mengen und rundet das Ergebnis auf zwei Dezimalstellen.
 * @param artikelList - Die Liste der Artikel, für die der Gesamtpreis berechnet wird.
 * @returns Der berechnete Gesamtpreis auf zwei Dezimalstellen.
 */
calculateTotalPrice2(artikelList: Artikel[]): number {
  let total = 0;
  for (const artikel of artikelList) {
    total += this.calculateArticlePrice(artikel);
  }
  // Gesamtpreis auf zwei Dezimalstellen runden
  return parseFloat(total.toFixed(2));
}

/**
 * Berechnet den Gesamtpreis für eine Liste von Artikeln eines bestimmten Anbieters.
 * Filtert die Artikel nach der angegebenen ShopID und ruft dann die Methode `calculateTotalPrice2` auf,
 * um den Gesamtpreis zu berechnen. Das Ergebnis wird auf zwei Dezimalstellen gerundet.
 * @param artikelList - Die Liste der Artikel, für die der Gesamtpreis berechnet wird.
 * @param shopID - Die ShopID des Anbieters, für den der Gesamtpreis berechnet wird.
 * @returns Der berechnete Gesamtpreis für den Anbieter auf zwei Dezimalstellen.
 */
calculateAnbieterTotalPrice2(artikelList: Artikel[], shopID: number): number {
  const artikelByAnbieter = artikelList.filter((artikel) => artikel.shopID === shopID);
  // Gesamtpreis für den Anbieter auf zwei Dezimalstellen runden
  return parseFloat(this.calculateTotalPrice2(artikelByAnbieter).toFixed(2));
}

/**
 * Aktualisiert den Gesamtpreis für das Bundle mit dem angegebenen Index.
 * Berechnet den Gesamtpreis für die Artikel im Bundle mithilfe der Methode `calculateTotalPrice2`.
 * Das Ergebnis wird dann als Gesamtpreis für das Bundle festgelegt.
 * @param bundleIndex - Der Index des Bundles, dessen Gesamtpreis aktualisiert werden soll.
 */
updateTotalPrice2(bundleIndex: number) {
  // Gesamtpreis für das Bundle mit dem angegebenen Index berechnen
  const bundle = this.schnellstesBundle[bundleIndex];
  const totalBundlePrice = this.calculateTotalPrice2(bundle.artikelList);
  // Gesamtpreis des Bundles aktualisieren
  bundle.totalPrice = totalBundlePrice;
}

/**
 * Berechnet den Gesamtpreis für eine Liste von Bundles mithilfe der Methode `calculateTotalPrice2`.
 * Summiert die Gesamtpreise aller Bundles und rundet das Ergebnis auf zwei Dezimalstellen.
 * @param bundles - Die Liste der Bundles, für die der Gesamtpreis berechnet werden soll.
 * @returns Der Gesamtpreis für die angegebenen Bundles.
 */
calculateBundleTotalPrice2(bundles: { bundleName: string; artikelList: Artikel[] }[]): number {
  let total = 0;
  for (const bundle of bundles) {
    total += this.calculateTotalPrice2(bundle.artikelList);
  }  
  // Gesamtpreis auf zwei Dezimalstellen runden
  return parseFloat(total.toFixed(2));
}


/**
 * Methode zum Löschen eines Bundles oder Artikel.
 * @param bundle 
 */
delete2(bundle: { bundleName: string; artikelList: Artikel[] }, artikel: Artikel) {
  // Finde das ausgewählte Bundle
  const targetBundle = this.schnellstesBundle.find(b => b.bundleName === bundle.bundleName);

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
 * Löscht einen Artikel aus einem Bundle unter Verwendung der Methode `delete2`.
 * @param bundle - Das Bundle, aus dem der Artikel gelöscht werden soll.
 * @param artikel - Der zu löschende Artikel.
 */
deleteArticle2(bundle: { bundleName: string; artikelList: Artikel[] }, artikel: Artikel) {
  this.delete2(bundle, artikel);
}


/**
 * Gruppiert die ausgewählten Artikel für das schnellstesBundle nach dem Preis aufsteigend und wählt die Artikel mit der schnellsten Lieferzeit aus jeder Kategorie aus.
 */
groupByAnbieterForSchnellstesBundle() {
  // Sortiere die ausgewählten Artikel für das schnellstesBundle nach dem Preis aufsteigend
  this.ausgewaehlteArtikel2.sort((a, b) => a.preis - b.preis);
  
  // Wähle die günstigsten Artikel aus jeder Kategorie für schnellstesBundle
  const schnellsteProKategorie = new Map<string, Artikel>();

  for (const artikel of this.ausgewaehlteArtikel2) {
    const kategorie = artikel.kategorie;

    // Schnellster Artikel basierend auf Lieferzeit
    if (!schnellsteProKategorie.has(kategorie) || artikel.lieferDatum < schnellsteProKategorie.get(kategorie)!.lieferDatum) {
      schnellsteProKategorie.set(kategorie, artikel);
    }
  }

  // Bundle mit den Artikeln mit der schnellsten Lieferzeit für schnellstesBundle
  const newBundle: { bundleName: string; artikelList: Artikel[]; totalPrice: number } = {
    bundleName: 'Schnellstes Bundle',
    artikelList: Array.from(schnellsteProKategorie.values()),
    totalPrice: this.calculateTotalPrice(Array.from(schnellsteProKategorie.values())),
  };

  // Setze das schnellstesBundle
  this.schnellstesBundle = [newBundle];
}

}