import { Artikel } from "./artikel.model";

export class BetriebsSystem extends Artikel{
    name: string;
    hersteller: string;

    constructor(artikelnummer: number, shopID: number, produktLink: string, preis: number, kategorie: string, 
                                                                                name: string, hersteller: string) {
        super(artikelnummer, kategorie, preis,  shopID, produktLink)
        this.artikelnummer = artikelnummer;
        this.shopID = shopID;
        this.produktLink = produktLink;
        this.preis = preis;
        this.kategorie = kategorie;
        this.name = name;
        this.hersteller = hersteller;
    }
}