import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BetriebsSystemService {

    constructor(private http: HttpClient) {
    }

}