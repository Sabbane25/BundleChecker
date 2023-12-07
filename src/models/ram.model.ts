import { Artikel } from "./artikel.model";

export class Ram extends Artikel{
    artikelnummer: number;
    typ: string;
    kapazitaet: number;
    latency: number;
    spannung: number;

    constructor(kategorie: string, preis: number, shopID: number, produktUrl: string, bezeichnung: string, lieferDatum: number, marke: string, image: string,
        artikelnummer: number, typ: string, kapazitaet: number, latency: number, spannung: number){

        super(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image)
        this.artikelnummer = artikelnummer;
        this.typ = typ;
        this.kapazitaet = kapazitaet;
        this.latency = latency;
        this.spannung = spannung;
    }

    override gibArtikelBeschreibung(): string{
        return "";
    }

    override gibArtikelTitel(): string {
        return "";
    }

    /*override getSpezifischeAttribute(): string {
        return "";
    }*/
}