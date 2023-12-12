import { Artikel } from "./artikel.model";

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
    [cle: string]: any; //neu

    constructor(kategorie: string, preis: number, shopID: number, produktUrl: string, bezeichnung: string, lieferDatum: number, marke: string, image: string,
        artikelnummer: number, sockel: string, anzahlKerne: number, stromverbrauch: number, taktfrequenz: string, interneGrafik: string, threads: number, typ: string, turbo: number) {

        super(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image)
        this.artikelnummer = artikelnummer;
        this.sockel = sockel;
        this.anzahlKerne = anzahlKerne;
        this.stromverbrauch = stromverbrauch;
        this.taktfrequenz = taktfrequenz;
        this.interneGrafik = interneGrafik;
        this.threads = threads;
        this.typ = typ;
        this.turbo = turbo;
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

    // cette methode permet de filtrer les elements de larticle cpu
    static filterByMapCriteria1(arr: Array<{ shop1: Artikel, shop2: Artikel }>, criteriaMap: Map<string, string>): Array<{ shop1: Cpu, shop2: Cpu }> {
        let listeCpu: Array<{ shop1: Cpu, shop2: Cpu }> = [];
        for(const cpu of arr){
            if(cpu.shop1 instanceof Cpu && cpu.shop2 instanceof Cpu){
                listeCpu.push({ shop1: cpu.shop1, shop2: cpu.shop2 });
            }
        }

        return listeCpu.filter(item => {
            let matchesShop1 = true;
            let matchesShop2 = true;
    
            for (const [key, value] of criteriaMap) {
                if(key &&  value){
                    matchesShop1 = matchesShop1 && (!item.shop1[key] || item.shop1[key] === value);
                    matchesShop2 = matchesShop2 && (!item.shop2[key] || item.shop2[key] === value);
                }
            }

            return matchesShop1 || matchesShop2;
        });
    }

    static filterCpuByCriteria(item: { shop1: Cpu, shop2: Cpu }, criteriaMap: Map<string, string>): boolean {
        
        let matchesShop1 = true;
        let matchesShop2 = true;
    
        for (const [key, value] of criteriaMap) {
            if (key && value) {
                matchesShop1 = matchesShop1 && (!item.shop1[key] || item.shop1[key] === value);
                matchesShop2 = matchesShop2 && (!item.shop2[key] || item.shop2[key] === value);
            }
        }
        return matchesShop1 || matchesShop2;
    }

    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, criteriaMap: Map<string, string>): Array<{ shop1: Cpu, shop2: Cpu }> {
        
        let listeCpu: Array<{ shop1: Cpu, shop2: Cpu }> = [];

        for (const cpu of arr) {
            if (cpu.shop1 instanceof Cpu && cpu.shop2 instanceof Cpu) {
                listeCpu.push({ shop1: cpu.shop1, shop2: cpu.shop2 });
            }
        }
        return listeCpu.filter(item => this.filterCpuByCriteria(item, criteriaMap));
    }
        
}
