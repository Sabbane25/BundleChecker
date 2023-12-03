import { Injectable } from '@angular/core';
import { apiConfig } from '../config/api.config';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Artikel} from "../models/artikel.model";


const apiURL = `http://${apiConfig.HOST}:3000`;
const API_MERKZETTEL_ERSTELLE = `${apiURL}/api/merkzettel/create`;
const API_MERKZETTEL_PRODUKT_HINZUFUEGEN = `${apiURL}/api/merkzettel/add`;
const API_MERKZETTEL_LISTE = `${apiURL}/api/merkzettel/list`;
const API_MERKZETTEL_PRICE = `${apiURL}/api/merkzettel/price`;
const API_MERKZETTEL_REMOVE = `${apiURL}/api/merkzettel/remove`;

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
  })
};

interface MerkzettelResponse {
    id: number;
    message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MerkzettelService {

  constructor(private http: HttpClient) { }

  erstelleMerkzettel(artikel: string[], label: string = ''): void {
    this.http.post(API_MERKZETTEL_ERSTELLE, { label }, httpOptions).subscribe(
        // @ts-ignore
        (data: MerkzettelResponse) => {
            console.log(data.id);

            if (data.id) {
                for (let artikelId in artikel) {
                    const produktLink = artikel[artikelId];
                    const merkzettelId = data.id

                    this.http.post(API_MERKZETTEL_PRODUKT_HINZUFUEGEN, { merkzettelId, produktLink }, httpOptions).subscribe(
                        (data) => {
                            console.log(data);
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                }
            }
        },
        (error) => {
            console.error(error);
        }
    );
  }

    holeMerkzettel() {
        return this.http.get(API_MERKZETTEL_LISTE, httpOptions).toPromise();
    }

    berechnePreis(merkzettelId: number) {
        return this.http.get(`${API_MERKZETTEL_PRICE}/${merkzettelId}`, httpOptions).toPromise();
    }

    holeProdukte(merkzettelId: number) {
        return this.http.get(`${API_MERKZETTEL_LISTE}/${merkzettelId}`, httpOptions).toPromise();
    }

    removeItemFromMerkzettel(merkzettelId: number, artikel: Artikel) {
      const produktLink = artikel.produktLink;

        this.http.post(API_MERKZETTEL_REMOVE, { merkzettelId, produktLink }, httpOptions).subscribe(
            (data) => {
                // console.log(data);
            },
            (error) => {
                // console.error(error);
            }
        );
    }

    entferneMerkzettel(merkzettelId: number) {
        return this.http.delete(`${API_MERKZETTEL_LISTE}/${merkzettelId}`, httpOptions).toPromise();
    }
}
