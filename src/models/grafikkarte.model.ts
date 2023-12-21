import { Artikel } from "./artikel.model";
import { Filter } from "./filter.models";

export class Grafikkarte extends Artikel{
    artikelnummer: number;
    kapazitaet: number;
    model: string;
    verbrauch: number;
    streamProzessoren: number;

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string, verfuegbarkeit: string,
        artikelnummer: number, kapazitaet: number, model: string, verbrauch: number, streamProzessoren: number) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl, verfuegbarkeit)
        this.artikelnummer = artikelnummer;
        this.kapazitaet = kapazitaet;
        this.model = model;
        this.verbrauch = verbrauch;
        this.streamProzessoren = streamProzessoren;
        this.verfuegbarkeit = verfuegbarkeit; 
    }

    override gibArtikelBeschreibung(): string {
        return `{ ${this.kapazitaet} • ${this.model} • ${this.verbrauch}`;
    }
    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

    /**
     * Filtert eine Liste von Objekten, die jeweils zwei Artikel (shop1 und shop2) enthalten, 
     * und gibt eine gefilterte Liste von Objekten zurück.
     * @param arr Eine Liste von Objekten, die jeweils zwei Artikel-Instanzen (shop1 und shop2) enthalten.
     * @param kriterium Das Filterobjekt, das die Kriterien enthält.
     * @returns Eine gefilterte Liste von Objekten, die jeweils zwei Instanzen enthalten.
     */
    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, kriterium: Filter): Array<{ shop1: Artikel, shop2: Artikel }> {
        let listeCpu: Array<{ shop1: Grafikkarte, shop2: Grafikkarte }> = [];

        for (const artikel of arr) {
            if (artikel.shop1 instanceof Grafikkarte && artikel.shop2 instanceof Grafikkarte) {
                listeCpu.push({ shop1: artikel.shop1, shop2: artikel.shop2 });
            }
        }
        return listeCpu.filter(item => this.filterKrierien(item, kriterium));
    }

}