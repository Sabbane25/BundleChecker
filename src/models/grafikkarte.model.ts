import { Artikel } from "./artikel.model";

export class Grafikkarte extends Artikel{
    artikelnummer: number;
    kapazitaet: number;
    model: string;
    verbrauch: number;
    streamProzessoren: number;

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string,
        artikelnummer: number, kapazitaet: number, model: string, verbrauch: number, streamProzessoren: number) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl)
        this.artikelnummer = artikelnummer;
        this.kapazitaet = kapazitaet;
        this.model = model;
        this.verbrauch = verbrauch;
        this.streamProzessoren = streamProzessoren;
    }

    override gibArtikelBeschreibung(): string {
        return `{ ${this.kapazitaet} • ${this.model} • ${this.verbrauch}`;
    }
    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

}