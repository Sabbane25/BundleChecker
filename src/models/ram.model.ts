import { Artikel } from "./artikel.model";

export class Ram extends Artikel{
    marke: string;
    modell: string;
    typ: string;
    kapazitaet: string;
    timings: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string,
        marke: string, modell: string, typ: string, kapazitaet: string, timings: string){
        super(artikelnummer, kategorie, preis,  shopID, produktLink, anbieter)
        this.marke = marke;
        this.modell = modell;
        this.typ = typ;
        this.kapazitaet = kapazitaet;
        this.timings = timings;
    }

    override getSpezifischeAttribute(): string {
        return `Marke: ${this.marke}, Modell: ${this.modell}, Typ: ${this.typ}, Kapazität: ${this.kapazitaet}, Timings: ${this.timings}`;
      }
}