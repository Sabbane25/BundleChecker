import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NutzerService {
  private apiURL = 'http://192.168.198.48:3000'; //API-URL vom Server

  constructor(private http: HttpClient) { }

  getAllEmails(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Emails`);
  }

  addUser(email: string, passwort: string): Observable<any> {
    const data = { email, passwort };
    return this.http.post<any>(`${this.apiURL}/addUser`, data);
  }

  getUserData(email: string) : Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getUserData`);
  }
}
