export abstract class Artikel {
  artikelnummer: number;
  kategorie: string;
  preis: number;
  shopID: number;
  produktLink: string;
  anbieter: string;

  constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string) {
    this.artikelnummer = artikelnummer;
    this.kategorie = kategorie;
    this.preis = preis;
    this.shopID = shopID;
    this.produktLink = produktLink;
    this.anbieter = anbieter;
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