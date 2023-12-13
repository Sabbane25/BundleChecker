/*Autor: Tim Hinder*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NutzerService } from 'src/services/nutzer.service';

@Component({
  selector: 'app-admin-bearbeiten',
  templateUrl: 'admin-bearbeiten.component.html',
  styleUrls: ['./admin-bearbeiten.component.css'],
})
export class AdminBearbeitenComponent implements OnInit {

  email: string; //E-Mail des Users
  id: number; //id des Users
  newPassword: string; //neues Passwort des Users
  confirmPassword: string; //neues Passwort wiederholen
  passwordMinLength: number = 5;
  isUpdateSuccessful = false; //ist Aktulisierung des Passworts erfolgreich?
  errorMessage: string;  // Hier wird die Variable nur einmal deklariert

  constructor(private nutzerService: NutzerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.email = params['email'] || '';
        this.id = +params['id'] || 0;
    });
}

//Methode zur Passwortaktualisierung  
updatePassword(newPasswordInput: HTMLInputElement, confirmPasswordInput: HTMLInputElement): void {
    const newPassword: string = newPasswordInput.value;
    const confirmPassword: string = confirmPasswordInput.value;
    //Prüfung, ob bestimmte Bedingungen erfüllt sind
    if (!newPassword.trim() || !confirmPassword.trim()) {
        this.errorMessage = 'Bitte geben Sie ein Passwort in beide Felder ein!';
    } else if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwörter stimmen nicht überein!';
    } else if (newPassword.length < 5) {
        this.errorMessage = 'Passwort zu kurz! Mindestens 5 Zeichen!';
    } else {
        // Alle Bedingungen sind erfüllt, rufe den nutzerService.updateUser auf
        console.log(this.id);
        this.nutzerService.updatePassword(this.id, newPassword).subscribe(
            () => {
                console.log('Passwort erfolgreich aktualisiert!');
                this.isUpdateSuccessful = true;
                // Optional: Setze die Werte der Eingabefelder zurück
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';
            },
            //Falls etwas schief gelaufen ist, gibt es eine Fehlermeldung
            error => {
                console.error('Fehler beim Aktualisieren des Passworts:', error);
                this.errorMessage = error;
            }
        );
    }
}
}