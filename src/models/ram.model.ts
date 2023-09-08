import { Artikel } from "./artikel.model";

export class Ram extends Artikel{
    marke: string;
    modell: string;
    typ: string;
    kapazität: string;
    Timings: string;

    constructor(artikelnummer: number, shopID: number, produktLink: string, preis: number, kategorie: string,
                                marke: string, modell: string, typ: string, kapazität: string, Timings: string){
        super(artikelnummer, kategorie, preis,  shopID, produktLink)
        this.artikelnummer = artikelnummer;
        this.shopID = shopID;
        this.produktLink = produktLink;
        this.preis = preis;
        this.kategorie = kategorie;
        
        this.marke = marke;
        this.modell = modell;
        this.typ = typ;
        this.kapazität = kapazität;
        this.Timings = Timings;
    }
}