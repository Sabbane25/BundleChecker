export class Artikel {
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

  public gibArtikelKategorie(): string {
    return this.kategorie;
  }

  gibArikelPreis(): number {
    return this.preis;
  }

  public gibShopID(): number {
    return this.shopID;
  }

  public gibProduktLink(): string {
    return this.produktLink;
  }

  public gibAnbieter(): string {
    return this.anbieter;
  }
}