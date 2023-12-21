import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Ram } from 'src/models/ram.model';
import { apiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RamService {
  private listeRamSubject: BehaviorSubject<Ram[]> = new BehaviorSubject<Ram[]>([]);
  public listeRam$: Observable<Ram[]> = this.listeRamSubject.asObservable();
  private apiURL = `http://${apiConfig.HOST}:3000`; //API-URL vom Server

  constructor(private http: HttpClient) {
    // Récupérer la liste depuis le localStorage lors de l'initialisation du service
    const storedListeRam = localStorage.getItem('listeRam');
    if (storedListeRam) {
      this.listeRamSubject.next(JSON.parse(storedListeRam));
    }
  }

  //public gibListeRam(shopId: number, kategorie: string): Observable<Ram[]> {
  public gibListeRam(): Observable<Ram[]> {
    return this.http.get<any[]>(`${this.apiURL}/Artikel2/CPU?shopId=2`).pipe(
    //return this.http.get<any[]>(`${this.apiURL}/Artikel2/${kategorie}?shopId=${shopId}`).pipe(
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
          ramData.verfuegbarkeit,
          ramData.artikelnummer,
          ramData.typ,
          ramData.kapazitaet,
          ramData.latency,
          ramData.spannung
        ));
        this.listeRamSubject.next(listeRam);

        // Sauvegarder la liste dans le localStorage
        localStorage.setItem('listeRam', JSON.stringify(listeRam));

        return listeRam;
      })
    );
  }

  public getListeRam(): Ram[] {
    return this.listeRamSubject.value;
  }
}
