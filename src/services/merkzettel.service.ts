import { Injectable } from '@angular/core';
import { apiConfig } from '../config/api.config';
import {HttpClient, HttpHeaders} from "@angular/common/http";


const apiURL = `http://${apiConfig.HOST}:3000`;
const API_MERKZETTEL_ERSTELLE = `${apiURL}/api/merkzettel/create`;
const API_MERKZETTEL_PRODUKT_HINZUFUEGEN = `${apiURL}/api/merkzettel/add`;
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
                for (let produktLink in artikel) {
                    // ToDo: In der Übersicht werden die Links noch nicht korrekt gesetzt
                    //  danach kann diese Zeile raus
                    produktLink = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=43&pkid=100002189&pcs=relevance'
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
}
