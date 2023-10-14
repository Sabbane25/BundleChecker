import { Artikel } from "./artikel.model";

export class Cpu extends Artikel{
    
    marke: string;
    modell: string;
    stromverbrauch: string;
    taktfrequenz: string;
    sockel: string;
    anzahlKerne: string;
    interneGrafik: string;

    constructor(Artikelnummer: number, Kategorie: string, Preis: number, ShopID: number, ProduktLink: string, marke: string, 
        modell: string, stromverbrauch: string, taktfrequenz: string, sockel: string, anzahlKerne: string, interneGrafik: string) {

        super(Artikelnummer, Kategorie, Preis, ShopID, ProduktLink)
        this.marke = marke;
        this.modell = modell;
        this.stromverbrauch = stromverbrauch;
        this.taktfrequenz = taktfrequenz;
        this.sockel = sockel; 
        this.anzahlKerne = anzahlKerne;
        this.interneGrafik = interneGrafik; 
    }

}