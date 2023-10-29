import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '../config/api.config';
import { Nutzer } from 'src/models/nutzer.model';

const AUTH_API = `http://${apiConfig.HOST}:3000/api/auth/`;
const API_URL = `http://${apiConfig.HOST}:3000/api/test/`;
const apiURL = `http://${apiConfig.HOST}:3000`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NutzerService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email,
      password
    }, httpOptions);
  }

  suche(email:string){}
  
  // getUser()
  addUser(email: string, passwort: string, emailInputNote: HTMLSpanElement): Observable<ApiMessage>{
    const newUser = {
      email: email,
      password: passwort
    }
    
    const request = this.http.post<ApiMessage>(`${this.apiURL}/addUser`, newUser);
    request.subscribe(response => {
      if (response.code === 1697580307) {
        emailInputNote.textContent = response.message;
      } else {
        alert(response.message);
      }
    });

    return request;
  }

   getUsers(): Observable<any[]> {
     // Verwende das User-Interface als Datentyp für die Antwort
     console.log("getUsers");
     console.log(this.http.get<any[]>(this.apiURL));
     console.log("test")
    return this.http.get<any>(`${this.apiURL}/getUsers`);

   }

  /**getUsers(): Nutzer[] {
    // Verwende das User-Interface als Datentyp für die Antwort
    console.log("getUsers");
    console.log(this.http.get<Nutzer[]>(this.apiURL));
    console.log("test")

    let result: Nutzer[] = [];
    this.http.get<Nutzer[]>(this.apiURL).subscribe(data => {
      result = data as Nutzer[];
    });
    return result;
  }*/

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
