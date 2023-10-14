import { Artikel } from "./artikel.model";

export class BetriebsSystem extends Artikel{
    Name: string;
    Hersteller: string;

    constructor(Artikelnummer: number, Kategorie: string, Preis: number, ShopID: number, ProduktLink: string,
         Name: string, Hersteller: string) {

        super(Artikelnummer, Kategorie, Preis,  ShopID, ProduktLink)
        this.Name = Name;
        this.Hersteller = Hersteller;
    }
}