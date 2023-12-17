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
  private apiURL = `http://${apiConfig.URL}`; //API-URL vom Server

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/`);
  } 

  getAllKategorien(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Kategorie`);
  }

  getAllProducts(products: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Produkte/${products}`);
  }

  getAllProducts2(shopId: number, products: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Artikel2/${products}?shopId=${shopId}`);
  }

  getAllRam(kategorie: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel/${kategorie}`);
  }

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

  //return this.http.get<any>(`${this.apiURL}/Artikel2/${products}?shopId=${shopId}`);
  gibListeCPU(shopId: number, kategorie: string): Observable<Cpu[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((ramData: any) => new Cpu(
          ramData.kategorie,
          ramData.preis,
          ramData.shopID,
          ramData.produktUrl,
          ramData.bezeichnung,
          ramData.lieferDatum,
          ramData.marke,
          ramData.image,
          ramData.artikelnummer,
          ramData.sockel,
          ramData.anzahlKerne,
          ramData.stromverbrauch,
          ramData.taktfrequenz,
          ramData.interneGrafik,
          ramData.threads,
          ramData.typ,
          ramData.turbo
        ));
      })
    );
  }

  gibListeFestplatte(shopId: number, kategorie: string): Observable<Speicher[]> {
    return this.http.get<Speicher[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((ramData: any) => new Speicher(
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
          ramData.lesen,
          ramData.schreiben
        ));
      })
    );
  }

  gibListeGehaeuse(shopId: number, kategorie: string): Observable<Gehaeuse[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((ramData: any) => new Gehaeuse(
          ramData.kategorie,
          ramData.preis,
          ramData.shopID,
          ramData.produktUrl,
          ramData.bezeichnung,
          ramData.lieferDatum,
          ramData.marke,
          ramData.image,
          ramData.artikelnummer,
          ramData.formfaktor,
          ramData.frontenschluesse,
          ramData.abmessungen,
          ramData.typ,
          ramData.gewicht
        ));
      })
    );
  }

  gibListeGrafikkarte(shopId: number, kategorie: string): Observable<Grafikkarte[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((ramData: any) => new Grafikkarte(
          ramData.kategorie,
          ramData.preis,
          ramData.shopID,
          ramData.produktUrl,
          ramData.bezeichnung,
          ramData.lieferDatum,
          ramData.marke,
          ramData.image,
          ramData.artikelnummer,
          ramData.kapazitaet,
          ramData.model,
          ramData.verbrauch,
          ramData.streamProzessoren
        ));
      })
    );
  }

  gibListeMainboard(shopId: number, kategorie: string): Observable<Mainboard[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((data: any) => new Mainboard(
          data.kategorie,
          data.preis,
          data.shopID,
          data.produktUrl,
          data.bezeichnung,
          data.lieferDatum,
          data.marke,
          data.image,
          data.artikelnummer,
          data.chipsatz,
          data.sockel,
          data.anzahlSpeichersockel,
          data.maxRam,
          data.formfaktor,
          data.speicherTyp
        ));
      })
    );
  }

  gibListeNetzteil(shopId: number, kategorie: string): Observable<Netzteil[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
      map((data) => {
        return data.map((data: any) => new Netzteil(
          data.kategorie,
          data.preis,
          data.shopID,
          data.produktUrl,
          data.bezeichnung,
          data.lieferDatum,
          data.marke,
          data.image,
          data.artikelnummer,
          data.bauform,
          data.zertifizierung,
          data.leistung
        ));
      })
    );
  }


  //Autor: Yahya Sabbane
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
}

function of(arg0: never[]): any {
  throw new Error('Function not implemented.');
}

