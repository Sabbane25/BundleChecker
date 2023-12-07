export abstract class Artikel {
  kategorie: string;
  preis: number;
  shopID: number;
  produktUrl: string;
  bezeichnung: string;
  lieferDatum: number;
  marke: string;
  image: string;
  menge: number;
  bildUrl: string;

  constructor(kategorie: string, preis: number, shopID: number, produktUrl: string, bezeichnung: string, lieferDatum: number, marke: string, image: string) {
    this.kategorie = kategorie;
    this.preis = preis;
    this.shopID = shopID;
    this.produktUrl = produktUrl;
    this.bezeichnung = bezeichnung;
    this.lieferDatum = lieferDatum;
    this.marke = marke;
    this.image = image;
  }

  abstract gibArtikelBeschreibung(): string;

  abstract gibArtikelTitel(): string;

}
