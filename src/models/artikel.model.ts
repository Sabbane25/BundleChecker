import { Filter } from "./filter.models";

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
  [cle: string]: any; //neu

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

  /**
   * Filtert zwei Artikel (shop1 und shop2) basierend auf den angegebenen Kriterien.
   * @param item Ein Objekt mit zwei Artikel-Instanzen (shop1 und shop2).
   * @param kriterium Das Filterobjekt, das die Kriterien enthält.
   * @returns True, wenn beide Artikel den Kriterien entsprechen, sonst False.
   */
  static filterKrierien(item: { shop1: Artikel, shop2: Artikel }, kriterium: Filter): boolean {
    let matchesShop1 = true;
    let matchesShop2 = true;

    if(kriterium){
      if(kriterium.checkbox.size > 0 && (kriterium.preis.von > 0 && kriterium.preis.bis > 0)){
          for (const [key, value] of kriterium.checkbox) {
              matchesShop1 = matchesShop1 && (!item.shop1[key] || item.shop1[key] === value) && ((!item.shop1['preis'] || item.shop1['preis'] >= kriterium.preis.von) && (!item.shop1['preis'] || item.shop1['preis'] <= kriterium.preis.bis));
              matchesShop2 = matchesShop2 && (!item.shop2[key] || item.shop2[key] === value) && ((!item.shop2['preis'] || item.shop2['preis'] >= kriterium.preis.von) && (!item.shop2['preis'] || item.shop2['preis'] <= kriterium.preis.bis));
          }
      } else{
          console.log('preis existe', kriterium.preis.von);

          if(kriterium.preis.von || kriterium.preis.bis > 0){
              matchesShop1 = matchesShop1 && ((!item.shop1['preis'] || item.shop1['preis'] >= kriterium.preis.von) && (!item.shop1['preis'] || item.shop1['preis'] <= kriterium.preis.bis));
              matchesShop2 = matchesShop2 && ((!item.shop2['preis'] || item.shop2['preis'] >= kriterium.preis.von) && (!item.shop2['preis'] || item.shop2['preis'] <= kriterium.preis.bis));
          }else{
              for (const [key, value] of kriterium.checkbox) {
                  matchesShop1 = matchesShop1 && (!item.shop1[key] || item.shop1[key] === value);
                  matchesShop2 = matchesShop2 && (!item.shop2[key] || item.shop2[key] === value);
              }
          }
      }
    }

    return matchesShop1 && matchesShop2;
  }
}
