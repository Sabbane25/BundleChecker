export abstract class Artikel {
  kategorie: string;
  preis: number;
  shopID: number;
  produktURL: string;
  bezeichnung: string;
  lieferdatum: number;


  constructor(kategorie: string, preis: number, shopID: number, produktURL: string, bezeichnung: string, lieferdatum: number) {
    this.kategorie = kategorie;
    this.preis = preis;
    this.shopID = shopID;
    this.produktURL = produktURL;
    this.bezeichnung = bezeichnung;
    this.lieferdatum = lieferdatum;
  }

  abstract gibArtikelBeschreibung(): string;

  abstract gibArtikelTitel(): string;

  /*Yahya: Diese Template-Methode wird von den Unterklassen überschrieben werden,
  /um das Anzeigen von verschiedenen Attributen zu ermöglichen.
  */
  getSpezifischeAttribute(): string {
    return '';
  }
}