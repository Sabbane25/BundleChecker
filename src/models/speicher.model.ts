import { Artikel } from "./artikel.model";

export class Speicher extends Artikel{
    Marke: string;
    Modell: string;
    Speichertyp: string;
    Kapazitaet: string;
    Schreibgeschwindigkeit: string;
    Lesegeschwindigkeit: string;

    constructor(Artikelnummer: number, Kategorie: string, Preis: number, ShopID: number, ProduktLink: string, Marke: string, Modell: string, Speichertyp: string, Kapazitaet: string, 
                                Schreibgeschwindigkeit: string, Lesegeschwindigkeit: string)
                                   {
        super(Artikelnummer, Kategorie, Preis, ShopID, ProduktLink)
        this.Marke = Marke;
        this.Modell = Modell;
        this.Speichertyp = Speichertyp;
        this.Kapazitaet = Kapazitaet;
        this.Schreibgeschwindigkeit = Schreibgeschwindigkeit;
        this.Lesegeschwindigkeit = Lesegeschwindigkeit;
    }
}