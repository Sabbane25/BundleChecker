import { Artikel } from "./artikel.model";
import { Filter } from "./filter.models";

export class Cpu extends Artikel{
    artikelnummer: number;
    sockel: string;
    anzahlKerne: number;
    stromverbrauch: number;
    taktfrequenz: string;
    interneGrafik: string;
    threads: number;
    typ: string;
    turbo: number;
    [cle: string]: any; 

    constructor(kategorie: string, preis: number, shopID: number, produktUrl: string, bezeichnung: string, lieferDatum: number, marke: string, image: string, verfuegbarkeit: string, 
        artikelnummer: number, sockel: string, anzahlKerne: number, stromverbrauch: number, taktfrequenz: string, interneGrafik: string, threads: number, typ: string, turbo: number) {

        super(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfuegbarkeit)
        this.artikelnummer = artikelnummer;
        this.sockel = sockel;
        this.anzahlKerne = anzahlKerne;
        this.stromverbrauch = stromverbrauch;
        this.taktfrequenz = taktfrequenz;
        this.interneGrafik = interneGrafik;
        this.threads = threads;
        this.typ = typ;
        this.turbo = turbo;
        this.verfuegbarkeit = verfuegbarkeit; 
    }


    /*override getSpezifischeAttribute(): string {
        return `Bezeichnung: ${this.bezeichnung}, 
        Stromverbrauch: ${this.stromverbrauch}, Taktfrequenz: ${this.taktfrequenz}, 
        Sockel: ${this.sockel}, Anzahl Kerne: ${this.anzahlKerne}, 
        Interne Grafik: ${this.interneGrafik}`;
      }*/


    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.typ} - ${this.stromverbrauch} - ${this.taktfrequenz} - ${this.sockel} - ${this.anzahlKerne} - ${this.interneGrafik}`;
    }

    /**
     * Filtert zwei Cpu-Objekte (shop1 und shop2) basierend auf den angegebenen Kriterien.
     * @param item Ein Objekt mit zwei Cpu-Instanzen (shop1 und shop2).
     * @param kriterium Das Filterobjekt, das die Kriterien enthält.
     * @returns True, wenn beide Cpu-Objekte den Kriterien entsprechen, sonst False.
     */
    static filterCpuByCriteria(item: { shop1: Cpu, shop2: Cpu }, kriterium: Filter): boolean {
        let matchesShop1 = true;
        let matchesShop2 = true;

        if(kriterium){
            if(kriterium.checkbox.size > 0 && (kriterium.preis.von > 0 && kriterium.preis.bis > 0)){
                for (const [key, value] of kriterium.checkbox) {
                    matchesShop1 = matchesShop1 && (!item.shop1[key] || item.shop1[key] === value) && (item.shop1['preis'] >= kriterium.preis.von) && (item.shop1['preis'] <= kriterium.preis.bis);
                    matchesShop2 = matchesShop2 && (!item.shop2[key] || item.shop2[key] === value) && (item.shop2['preis'] >= kriterium.preis.von) && (item.shop2['preis'] <= kriterium.preis.bis);
                }
            } else{
                console.log('preis existe', kriterium.preis.von);

                if(kriterium.preis.von || kriterium.preis.bis > 0){
                    matchesShop1 = (item.shop1['preis'] >= kriterium.preis.von) && (item.shop1['preis'] <= kriterium.preis.bis);
                    matchesShop2 = (item.shop2['preis'] >= kriterium.preis.von) && (item.shop2['preis'] <= kriterium.preis.bis);
                }else{
                    for (const [key, value] of kriterium.checkbox) {
                        matchesShop1 = matchesShop1 && (!item.shop1[key] || item.shop1[key] === value);
                        matchesShop2 = matchesShop2 && (!item.shop2[key] || item.shop2[key] === value);
                    }
                }
            }
        }
    
        return matchesShop1 && matchesShop2;
    }

    /**
     * Filtert eine Liste von Objekten, die jeweils zwei Artikel (shop1 und shop2) enthalten, 
     * und gibt eine gefilterte Liste von Cpu-Objekten zurück.
     * @param arr Eine Liste von Objekten, die jeweils zwei Artikel-Instanzen (shop1 und shop2) enthalten.
     * @param kriterium Das Filterobjekt, das die Kriterien enthält.
     * @returns Eine gefilterte Liste von Objekten, die jeweils zwei Cpu-Instanzen enthalten.
     */
    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, kriterium: Filter): Array<{ shop1: Artikel, shop2: Artikel }> {
        let listeCpu: Array<{ shop1: Cpu, shop2: Cpu }> = [];

        for (const cpu of arr) {
            if (cpu.shop1 instanceof Cpu && cpu.shop2 instanceof Cpu) {
                listeCpu.push({ shop1: cpu.shop1, shop2: cpu.shop2 });
            }
        }
        return listeCpu.filter(item => this.filterCpuByCriteria(item, kriterium));
    }   
}
