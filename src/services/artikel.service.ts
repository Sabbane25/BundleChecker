import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Artikel } from 'src/models/artikel.model';
import { Ram } from 'src/models/ram.model';
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

  /**
   * 
   * @returns die verschiedenen Kategorie von Artikel 
   */
  getAllKategorien(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Kategorie`);
  }

  /**
   * 
   * @param products es handelt sich um das Produkt, für das man eine Artikelliste haben möchte
   * z.B: RAM, CPU, Speicher, Grafikkarte....
   * @returns 
   */
  getAllProducts(products: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Produkte/${products}`);
  }

  getAllArtikel2(kategorie: string): Observable<any> {
    return this.http.get<Ram[]>(`${this.apiURL}/Artikel/${kategorie}`);
  }

  /**
   * 
   * @param kategorie es handelt sich um die Kategorie, für die man eine Artikelliste haben möchte
   * z.B: RAM, CPU, Speicher, Grafikkarte....
   * @returns eine Liste von Alle Artikel dieser Kategorie
   */
  getAllArtikel(kategorie: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel/${kategorie}`).pipe(
      map((data) => {
        // Transformez les données en objets Ram
        return data.map((ramData: any) => {
          return new Ram( 
            ramData.artikelnummer,
            ramData.kategorie,
            ramData.Preis,
            ramData.ShopID,
            ramData.ProduktLink,
            ramData.anbieter,
            ramData.Marke,
            ramData.Modell,
            ramData.Typ,
            ramData.kapazitaet,
            ramData.Timings,
          );
        });
      })
    );
  }
}
