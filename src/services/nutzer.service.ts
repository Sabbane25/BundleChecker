import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NutzerService {
  private apiURL = 'http://192.168.198.48:3000'; //API-URL vom Server: 192.168.198.48

  constructor(private http: HttpClient) { }

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

  suche(email:string){}
/**
  getUser(email: string): Observable<any> {
    const request = this.http.get<any>(`${this.apiURL}/getUser`)
  }*/

}

interface ApiMessage {
  state: boolean;
  success: boolean;
  message: string;
  code: number;
}
