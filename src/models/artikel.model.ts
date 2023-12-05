export abstract class Artikel {
  kategorie: string;
  preis: number;
  shopID: number;
  produktLink: string;
  bezeichnung: string;
  lieferDatum: number;
  marke: string;
  bildUrl: string;

  constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string) {
    this.kategorie = kategorie;
    this.preis = preis;
    this.shopID = shopID;
    this.produktLink = produktLink;
    this.bezeichnung = bezeichnung;
    this.lieferDatum = lieferDatum;
    this.marke = marke;
    this.bildUrl = bildUrl;
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
