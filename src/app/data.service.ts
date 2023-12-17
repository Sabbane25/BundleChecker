import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = `http://${apiConfig.URL}`; //API-URL vom Server

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/`);
  } 
}
