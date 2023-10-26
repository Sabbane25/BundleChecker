import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Den Wert auf `true` setzen, damit das lokale Backend verwendet wird und nicht der vom Server 
 */
const lokal_backend = false;

const ip_addresse = lokal_backend ? '127.0.0.1' : '192.168.198.48';
const AUTH_API = `http://${ip_addresse}:3000/api/auth/`;
const API_URL = `http://${ip_addresse}:3000/api/test/`;

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