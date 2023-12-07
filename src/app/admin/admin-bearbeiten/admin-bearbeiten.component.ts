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

  email: string;
  id: number;
  newPassword: string;
  confirmPassword: string;
  passwordMinLength: number = 5;
  isUpdateSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';

  constructor(private nutzerService: NutzerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.email = params['email'] || '';
        this.id = +params['id'] || 0;

        console.log('Empfangene ID:', this.id);
    });
}

  
  updatePassword(newPasswordInput: HTMLInputElement, confirmPasswordInput: HTMLInputElement): void {
    
    const newPassword: string = newPasswordInput.value;
    const confirmPassword: string = confirmPasswordInput.value;
  
    if (newPassword !== confirmPassword) {
        console.error("Passwörter stimmen nicht überein!");
    } else if (newPassword.length < 5) {
        console.error("Passwort zu kurz! Mindestens 5 Zeichen!");
    } else {
        // Alle Bedingungen sind erfüllt, rufe den nutzerService.updateUser auf
        console.log(this.id);
        this.nutzerService.updatePassword(this.id, newPassword).subscribe(
            () => {
                console.log('Passwort erfolgreich aktualisiert!');
                // Optional: Setze die Werte der Eingabefelder zurück
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';
            },
            error => {
                console.error('Fehler beim Aktualisieren des Passworts:', error);
            }
        );
    }
}
}