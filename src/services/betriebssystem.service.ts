import { Injectable } from '@angular/core';
//import { BetriebsSystem } from 'src/models/betriebssystem.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BetriebsSystemService {

    constructor(private http: HttpClient) {
    }

}