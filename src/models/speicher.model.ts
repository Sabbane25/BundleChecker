import { Artikel } from "./artikel.model";

export class Speicher extends Artikel{
    artikelnummer: number;
    typ: string;
    kapazitaet: string;
    lesen: number;
    schreiben: number;

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string,
        artikelnummer: number, typ: string, kapazitaet: string, lesen: number, schreiben: number) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl)
        this.artikelnummer = artikelnummer;
        this.typ = typ;
        this.kapazitaet = kapazitaet;
        this.lesen = lesen;
        this.schreiben = schreiben;
    }

    override gibArtikelTitel(): string {
        return `${this.typ}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.typ} • ${this.kapazitaet} • ${this.schreiben} • ${this.lesen}`;
    }

   /* override getSpezifischeAttribute(): string {
        return `Marke: ${this.marke}, Speichertyp: ${this.typ}, Kapazität: ${this.kapazitaet}, 
        Schreibgeschwindigkeit: ${this.schreiben}, Lesegeschwindigkeit: ${this.lesen}`;
    }*/
}