import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NutzerService {
  private apiURL = 'http://192.168.198.48:3000'; //API-URL vom Server: 192.168.198.48

  constructor(private http: HttpClient) { }

  getAllEmails(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Emails`);
  }

  addUser(email: string, passwort: string, registerButton: HTMLButtonElement, emailNote: HTMLSpanElement): Observable<ApiMessage>{
    const newUser = {
      email: email,
      password: passwort
    }
    
    const request = this.http.post<ApiMessage>(`${this.apiURL}/addUser`, newUser);
    request.subscribe(response => {
      if (response.code !== 1697580318) {
        // Aktiviere button
        registerButton.disabled = false;
      }

      if (response.code === 1697580307) {
        emailNote.textContent = response.message;
      } else {
        alert(response.message);
      }
    });

    return request;
  }

}

interface ApiMessage {
  state: boolean;
  success: boolean;
  message: string;
  code: number;
}