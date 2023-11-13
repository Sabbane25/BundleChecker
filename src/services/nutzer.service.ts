import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Nutzer } from 'src/models/nutzer.model';

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

  getUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}/getUsers`, { withCredentials: true });
  }
  
   
   loeschen(user_id: number): Observable<void> {
    const options = {
      body: { user_id: user_id }};
    console.log("In Nutzerservice");
    console.log("Hallo", user_id);
    // return this.http.delete<void>(`${this.apiURL}/userLoeschen:${user_id}`);
    
    return this.http.delete<void>(`${this.apiURL}/userLoeschen`, options);
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

}

interface ApiMessage {
  state: boolean;
  success: boolean;
  message: string;
  code: number;
}
