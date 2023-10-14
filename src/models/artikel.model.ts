export class Artikel {
    Artikelnummer: number;
    Kategorie: string;
    Preis: number;
    ShopID: number;
    ProduktLink: string;

    constructor(Artikelnummer: number, Kategorie: string, Preis: number, ShopID: number, ProduktLink: string) {
        this.Artikelnummer = Artikelnummer;
        this.Kategorie = Kategorie;
        this.Preis = Preis;
        this.ShopID = ShopID;
        this.ProduktLink = ProduktLink;
      }
}