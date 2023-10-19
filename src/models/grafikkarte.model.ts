import { Artikel } from "./artikel.model";

export class Grafikkarte extends Artikel{
    
    marke: string;
    modell: string;
    kapazitaet: number;
    anschluesse: string;
    belegteSlots: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string,
        marke: string, modell: string, kapazitaet: number, anschluesse: string, material: string) {
        super(artikelnummer, kategorie, preis,  shopID, produktLink, anbieter)
        this.marke = marke;
        this.modell = modell;
        this.kapazitaet = kapazitaet;
        this.anschluesse = anschluesse;
        this.belegteSlots = material;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.modell} • ${this.modell} • ${this.kapazitaet} • ${this.anschluesse} • ${this.belegteSlots}`;;
    }
    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

}