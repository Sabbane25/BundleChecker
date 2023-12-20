import { Artikel } from "./artikel.model";
import { Filter } from "./filter.models";

export class Ram extends Artikel{
    artikelnummer: number;
    typ: string;
    kapazitaet: number;
    latency: number;
    spannung: number;
    //[cle: string]: any; //neu

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

    /**
     * Filtert eine Liste von Objekten, die jeweils zwei Artikel (shop1 und shop2) enthalten, 
     * und gibt eine gefilterte Liste von Objekten zurück.
     * @param arr Eine Liste von Objekten, die jeweils zwei Artikel-Instanzen (shop1 und shop2) enthalten.
     * @param kriterium Das Filterobjekt, das die Kriterien enthält.
     * @returns Eine gefilterte Liste von Objekten, die jeweils zwei Instanzen enthalten.
     */
    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, kriterium: Filter): Array<{ shop1: Artikel, shop2: Artikel }> {
        let listeCpu: Array<{ shop1: Ram, shop2: Ram }> = [];

        for (const artikel of arr) {
            if (artikel.shop1 instanceof Ram && artikel.shop2 instanceof Ram) {
                listeCpu.push({ shop1: artikel.shop1, shop2: artikel.shop2 });
            }
        }
        return listeCpu.filter(item => this.filterKrierien(item, kriterium));
    }
}