export class Artikel {
    artikelnummer: number;
    kategorie: string;
    marke: string;
    preis: number;
    produktlink: string;
    bezeichnung: string;
    shopId: number;

    constructor(artikelnummer: number, kategorie: string, marke: string, preis: number,
    produktlink: string, bezeichnung: string, shopId: number){

        this.artikelnummer = artikelnummer;
        this.kategorie = kategorie;
        this.marke = marke;
        this.preis = preis;
        this.produktlink = produktlink;
        this.bezeichnung = bezeichnung;
        this.shopId = shopId;
    }
}