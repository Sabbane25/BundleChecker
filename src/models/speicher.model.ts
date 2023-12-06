
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

    static filtrerParIntervallePrix(objets: Speicher[], vonPreis: number, bisPreis: number): Speicher[] {
        return objets.filter(objet => objet.preis >= vonPreis && objet.preis <= bisPreis);
    }

    static filtrerParIntervallePrix2(objets: Array<{ shop1: Artikel, shop2: Artikel}>, vonPreis: number, bisPreis: number): Array<{ shop1: Artikel, shop2: Artikel}>{
        
        return objets.filter(objet => objet.shop1.preis >= vonPreis && objet.shop1.preis <= bisPreis && objet.shop2.preis >= vonPreis && objet.shop2.preis <= bisPreis);
    }

    static filtrerParIntervallePrix3(objets: Array<{ shop1: Artikel, shop2: Artikel}>, vonPreis: number, bisPreis: number): Array<{ shop1: Artikel, shop2: Artikel}> {
        console.log('methode filter3', objets);
        for(let objet of objets){
            console.log("Objet", objet.shop1.bezeichnung);
        }
        return objets.filter(objet => objet.shop1.preis >= vonPreis && objet.shop1.preis <= bisPreis);
    }

    override gibArtikelTitel(): string {
        return `${this.typ}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.typ} • ${this.kapazitaet} • ${this.schreiben} • ${this.lesen}`;
    }

}
