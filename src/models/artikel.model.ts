export class Artikel {
    artikelnummer: number;
    kategorie: string;
    preis: number;
    shopID: number;
    produktLink: string;

    constructor(
        artikelnummer: number,
        kategorie: string,
        preis: number,
        shopID: number,
        produktLink: string
      ) {
        this.artikelnummer = artikelnummer;
        this.kategorie = kategorie;
        this.preis = preis;
        this.shopID = shopID;
        this.produktLink = produktLink;
      }
}