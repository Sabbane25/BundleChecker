import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '../config/api.config';

const SERVER_URL__KONTAKT = `http://${apiConfig.HOST}:3000/send-email`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Service für die Kontakt-Seite
 *
 * Dieser Service sendet eine E-Mail an den Administrator.
 *
 * @autor Mokhtar Yosofzay
 */
@Injectable({
  providedIn: 'root'
})
export class KontaktService {
  constructor(private http: HttpClient) { }

  sendeEmail(email: string, vorname: string, nachname: string, nachricht: string): Observable<any> {
    return this.http.post(SERVER_URL__KONTAKT, {
      email: email,
      vorname: vorname,
      nachname: nachname,
      nachricht: nachricht
    }, httpOptions);
  }
}
