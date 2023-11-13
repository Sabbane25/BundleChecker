import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '../config/api.config';
import { ApiMessage } from 'src/models/apiMessage.model';
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
  
  
  addUser(email: string, passwort: string, emailInputNote: HTMLSpanElement): Observable<ApiMessage>{
    const newUser = {
      email: email,
      password: passwort
    }
    
    const request = this.http.post<ApiMessage>(`${apiURL}/addUser`, newUser);
    request.subscribe(response => {
      if (response.code === 1697580307) {
        emailInputNote.textContent = response.message;
      } else {
        alert(response.message);
      }
    });

    return request;
  }

   getUsers(): Observable<any> {
      // Verwende das User-Interface als Datentyp für die Antwort
      console.log("test")
      // return this.http.get<any>(`${apiURL}/getUsers`);
      return this.http.get<any[]>(`${apiURL}/getUsers`, { withCredentials: true });
   }
   
   loeschen(user_id: number): Observable<void> {
    const options = {
      body: { user_id: user_id }};
    console.log("In Nutzerservice");
    console.log("Hallo", user_id);
    // return this.http.delete<void>(`${apiURL}/userLoeschen:${user_id}`);
    
    return this.http.delete<void>(`${apiURL}/userLoeschen`, options);
   }
   
   suchen(email: string): Observable<any> {
    console.log("In Nutzerservice: " + email);

    // Korrekte HTTP-Anfrage mit einem Query-Parameter "email"
    return this.http.get<any>(`${apiURL}/userSuchen`, {
        params: { email: email }
    });
  }

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
