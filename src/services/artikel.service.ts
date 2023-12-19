import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, BehaviorSubject } from 'rxjs';
import { Artikel } from 'src/models/artikel.model';
import { Ram } from 'src/models/ram.model';
import { Cpu } from 'src/models/cpu.model';
import { Gehaeuse } from 'src/models/gehaeuse.model';
import { Grafikkarte } from 'src/models/grafikkarte.model';
import { Mainboard } from 'src/models/mainboard.model';
import { Netzteil } from 'src/models/netzteil.model';
import { Nutzer } from 'src/models/nutzer.model';
import { Speicher } from 'src/models/speicher.model';
import { apiConfig } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class ArtikelService {

  private apiURL = `http://${apiConfig.HOST}:3000`; //API-URL vom Server

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/`);
  } 

  /*
  getAllKategorien(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Kategorie`);
  }
  */

  // gib eine Liste von Marke einer kategorie
  gibListeMarke(kategorie: string): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/marke/${kategorie}`); 
  }

  // gibt eine Liste einer bestimmten Eigenschaft einer Kategorie an
  gibListeEigenschaft(kategorie: string, parameter: string,): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/eigenschaften/${kategorie}/${parameter}`); 
  }

  /*
  getAllProducts(products: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Produkte/${products}`);
  }*/

  /*
  getAllProducts2(shopId: number, products: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Artikel2/${products}?shopId=${shopId}`);
  }*/

  /*
  getAllRam(kategorie: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel/${kategorie}`);
  }*/

  /**
   * Diese Methode ruft eine Liste von Ram basierend auf der Shop-ID und Kategorie ab.
   * @param shopId Die ID des Shops, für den die Ram abgerufen wird.
   * @param kategorie Die Kategorie, für die die Ram abgerufen wird.
   * @returns Ein Observable, das eine Liste von Ram-Objekten enthält.
   */
  gibListeRam(shopId: number, kategorie: string): Observable<Ram[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((ramData: any) => new Ram(
          ramData.kategorie,
          ramData.preis,
          ramData.shopID,
          ramData.produktUrl,
          ramData.bezeichnung,
          ramData.lieferDatum,
          ramData.marke,
          ramData.image,
          ramData.artikelnummer,
          ramData.typ,
          ramData.kapazitaet,
          ramData.latency,
          ramData.spannung
        ));
      })
    );
  }

  // siehte Zeile 60 - 65
  gibListeCPU(shopId: number, kategorie: string): Observable<Cpu[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((cpuData: any) => new Cpu(
          cpuData.kategorie,
          cpuData.preis,
          cpuData.shopID,
          cpuData.produktUrl,
          cpuData.bezeichnung,
          cpuData.lieferDatum,
          cpuData.marke,
          cpuData.image,
          cpuData.artikelnummer,
          cpuData.sockel,
          cpuData.anzahlKerne,
          cpuData.stromverbrauch,
          cpuData.taktfrequenz,
          cpuData.interneGrafik,
          cpuData.threads,
          cpuData.typ,
          cpuData.turbo
        ));
      })
    );
  }

  gibListeFestplatte(shopId: number, kategorie: string): Observable<Speicher[]> {
    return this.http.get<Speicher[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((speicherData: any) => new Speicher(
          speicherData.kategorie,
          speicherData.preis,
          speicherData.shopID,
          speicherData.produktUrl,
          speicherData.bezeichnung,
          speicherData.lieferDatum,
          speicherData.marke,
          speicherData.image,
          speicherData.artikelnummer,
          speicherData.typ,
          speicherData.kapazitaet,
          speicherData.lesen,
          speicherData.schreiben
        ));
      })
    );
  }

  gibListeGehaeuse(shopId: number, kategorie: string): Observable<Gehaeuse[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((gehaeuseData: any) => new Gehaeuse(
          gehaeuseData.kategorie,
          gehaeuseData.preis,
          gehaeuseData.shopID,
          gehaeuseData.produktUrl,
          gehaeuseData.bezeichnung,
          gehaeuseData.lieferDatum,
          gehaeuseData.marke,
          gehaeuseData.image,
          gehaeuseData.artikelnummer,
          gehaeuseData.formfaktor,
          gehaeuseData.frontenschluesse,
          gehaeuseData.abmessungen,
          gehaeuseData.typ,
          gehaeuseData.gewicht
        ));
      })
    );
  }

  gibListeGrafikkarte(shopId: number, kategorie: string): Observable<Grafikkarte[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((grafikkarteData: any) => new Grafikkarte(
          grafikkarteData.kategorie,
          grafikkarteData.preis,
          grafikkarteData.shopID,
          grafikkarteData.produktUrl,
          grafikkarteData.bezeichnung,
          grafikkarteData.lieferDatum,
          grafikkarteData.marke,
          grafikkarteData.image,
          grafikkarteData.artikelnummer,
          grafikkarteData.kapazitaet,
          grafikkarteData.model,
          grafikkarteData.verbrauch,
          grafikkarteData.streamProzessoren
        ));
      })
    );
  }

  gibListeMainboard(shopId: number, kategorie: string): Observable<Mainboard[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((mainboardData: any) => new Mainboard(
          mainboardData.kategorie,
          mainboardData.preis,
          mainboardData.shopID,
          mainboardData.produktUrl,
          mainboardData.bezeichnung,
          mainboardData.lieferDatum,
          mainboardData.marke,
          mainboardData.image,
          mainboardData.artikelnummer,
          mainboardData.chipsatz,
          mainboardData.sockel,
          mainboardData.anzahlSpeichersockel,
          mainboardData.maxRam,
          mainboardData.formfaktor,
          mainboardData.speicherTyp
        ));
      })
    );
  }

  gibListeNetzteil(shopId: number, kategorie: string): Observable<Netzteil[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((netzteilData: any) => new Netzteil(
          netzteilData.kategorie,
          netzteilData.preis,
          netzteilData.shopID,
          netzteilData.produktUrl,
          netzteilData.bezeichnung,
          netzteilData.lieferDatum,
          netzteilData.marke,
          netzteilData.image,
          netzteilData.artikelnummer,
          netzteilData.bauform,
          netzteilData.zertifizierung,
          netzteilData.leistung
        ));
      })
    );
  }


  //Yahya
  // BehaviorSubjects für guenstigstesArtikel und schnellstesArtikel erstellen
  private guenstigstesArtikelSubject = new BehaviorSubject<Artikel[]>([]);
  private schnellstesArtikelSubject = new BehaviorSubject<Artikel[]>([]);

  // Observables für guenstigstesArtikel und schnellstesArtikel erstellen
  guenstigstesArtikel$ = this.guenstigstesArtikelSubject.asObservable();
  schnellstesArtikel$ = this.schnellstesArtikelSubject.asObservable();

  // Methode zum Aktualisieren von guenstigstesArtikel aufrufen
  updateGuenstigstesArtikel(artikel: Artikel[]) {
    // Tiefenkopie von Artikel erstellen, um unerwünschte Seiteneffekte zu vermeiden
    const deepCopy = this.deepCopy(artikel);
    // guenstigstesArtikel aktualisieren
    this.guenstigstesArtikelSubject.next(deepCopy);
  }

  // Methode zum Aktualisieren von schnellstesArtikel aufrufen
  updateSchnellstesArtikel(artikel: Artikel[]) {
    // Tiefenkopie von Artikel erstellen, um unerwünschte Seiteneffekte zu vermeiden
    const deepCopy = this.deepCopy(artikel);
    // schnellstesArtikel aktualisieren
    this.schnellstesArtikelSubject.next(deepCopy);
  }
  // Hilfsmethode für die Tiefenkopie von Objekten
  private deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  //cette variable retourne un true lorsque il y a au moins un elements lorsque le filtre est applique
  hatArtikel = true;

  //Arnauld
  //Nouvelle maniere d'acceder a des methodes
  artikelliste: Array<{ kategorie: string, artikelListe: Array<{ shop1: Artikel, shop2: Artikel}>}> = [];
  
  private listeRamSubject: BehaviorSubject<Ram[]> = new BehaviorSubject<Ram[]>([]);
  public listeRam$: Observable<Ram[]> = this.listeRamSubject.asObservable();

  public gibListeRam2(shopId: number, kategorie: string): Observable<Ram[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        const listeRam = data.map((ramData: any) => new Ram(
          ramData.kategorie,
          ramData.preis,
          ramData.shopID,
          ramData.produktUrl,
          ramData.bezeichnung,
          ramData.lieferDatum,
          ramData.marke,
          ramData.image,
          ramData.artikelnummer,
          ramData.typ,
          ramData.kapazitaet,
          ramData.latency,
          ramData.spannung
        ));
        this.listeRamSubject.next(listeRam); // Met à jour les abonnés avec la nouvelle valeur
        return listeRam;
      })
    );
  }

  public getListeRam(): Ram[] {
    return this.listeRamSubject.value; // Récupère la valeur actuelle sans s'abonner à l'observable
  }
}