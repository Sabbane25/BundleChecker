import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiConfig } from '../config/api.config';
import { ApiMessage } from 'src/models/apiMessage.model';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


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

  updatePassword(id: number, newPassword: string): Observable<any> {
    const updatePasswordUrl = `${apiURL}/changePassword`;
    
    const requestBody = {
      id: id,
      password: newPassword
    };
  
    console.log('Request Body:', requestBody); 
  
    return this.http.put(updatePasswordUrl, requestBody).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
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
      
      return this.http.get<any[]>(`${apiURL}/getUsers`, { withCredentials: true });
   }

   loeschen(user_id: number): Observable<void> {
    const options = {
      body: { user_id: user_id }
    };
  
    console.log("In Nutzerservice");
    console.log("UserID:", user_id);
  
    return this.http.delete<void>(`${apiURL}/userLoeschen/${user_id}`, options);
  }
   
   updateUser(password: string): Observable<any> {
    const options = {
      body: { password: password }
    };
    
    return this.http.put<void>(`${apiURL}/updateUser`, options);
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
