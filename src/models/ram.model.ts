import { Artikel } from "./artikel.model";

export class Ram extends Artikel{
    Marke: string;
    Modell: string;
    Typ: string;
    Kapazitaet: string;
    Timings: string;

    constructor(Artikelnummer: number, Kategorie: string, Preis: number, ShopID: number, ProduktLink: string, 
        Marke: string, Modell: string, Typ: string, Kapazitaet: string, Timings: string){
        super(Artikelnummer, Kategorie, Preis, ShopID, ProduktLink)
        this.Marke = Marke;
        this.Modell = Modell;
        this.Typ = Typ;
        this.Kapazitaet = Kapazitaet;
        this.Timings = Timings;
    }
}