import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = 'http://192.168.198.48:3000'; //API-URL vom Server

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/`);
  } 

  /* 
    Die Methode dient dazu Produkte aus der DB abzurufen
    Mit dem Parameter {Produkt} kann man angeben, um welches Produkt es sich handelt. 
    z.B.: RAM, CPU, Speicher, Grafikkarte....
   */
  getAllProducts(products: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/products/${products}`);
  }
}
