import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtikelService {
  private apiURL = 'http://192.168.198.48:3000'; //API-URL vom Server

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
}
