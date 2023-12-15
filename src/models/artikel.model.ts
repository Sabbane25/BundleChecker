import { Ram } from "./ram.model";

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

  /*
  static filterArtikelByCriteria(item: { shop1: Artikel, shop2: Artikel }, criteriaMap: Map<string, string>): boolean {
        
    let matchesShop1 = true;
    let matchesShop2 = true;

    if((item.shop1 instanceof Ram && item.shop2 instanceof Ram)){
        for (const [key, value] of criteriaMap) {
            if (key && value) {
                matchesShop1 = matchesShop1 && (!item.shop1[key] || item.shop1[key] === value);
                matchesShop2 = matchesShop2 && (!item.shop2[key] || item.shop2[key] === value);
            }
        }
    }
    return matchesShop1 || matchesShop2;
  }
  */

}
