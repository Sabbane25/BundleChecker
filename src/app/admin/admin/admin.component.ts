import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NutzerService } from 'src/services/nutzer.service';
import { Nutzer } from 'src/models/nutzer.model';
import { keyframes } from '@angular/animations';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {

    users: any[] = [];
    loading: boolean = true;
    error: string = '';
    constructor(private nutzerService: NutzerService) {}

    ngOnInit(): void {
        this.nutzerService.getUsers().subscribe(
            (data) => {
                console.log('Daten vom Backend erhalten:', data);
                this.users = data;
                this.loading = false;
            },
            (error) => {
                this.error = 'Fehler beim Laden der Nutzerdaten.';
                this.loading = false;
            }
        );
    }

    userLoeschen(user_id: number): void {
        console.log("User wird gelöscht");
        this.nutzerService.loeschen(user_id);
    }



}
