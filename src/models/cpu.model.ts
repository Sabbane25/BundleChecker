import { Artikel } from "./artikel.model";

export class Cpu extends Artikel{
    marke: string;
    modell: string;
    stromverbrauch: string;
    taktfrequenz: string;
    sockel: string;
    AnzahlKerne: string;
    interneGrafik: string;
}