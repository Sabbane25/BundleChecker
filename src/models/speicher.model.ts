import { Artikel } from "./artikel.model";

export class Speicher extends Artikel{
    Marke: string;
    Modell: string;
    Speichertyp: string;
    Kapazitaet: string;
    Schreibgeschwindigkeit: string;
    Lesegeschwindigkeit: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string,
                                Marke: string, Modell: string, Speichertyp: string, Kapazitaet: string, Schreibgeschwindigkeit: string, Lesegeschwindigkeit: string)
                                   {
        super(artikelnummer, kategorie, preis,  shopID, produktLink, anbieter)
        this.Marke = Marke;
        this.Modell = Modell;
        this.Speichertyp = Speichertyp;
        this.Kapazitaet = Kapazitaet;
        this.Schreibgeschwindigkeit = Schreibgeschwindigkeit;
        this.Lesegeschwindigkeit = Lesegeschwindigkeit;
    }
}