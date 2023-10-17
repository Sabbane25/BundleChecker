import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NutzerService } from 'src/services/nutzer.service';


@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent implements OnInit {
  registerForm: FormGroup;
  email: string= '';
  password: string = '';
  passwordRepeat: string = '';
  constructor(private router: Router, private nutzerService: NutzerService) {}

  alleNutzer: any[] = [];

  // returnViewAnmelden(){
  //   this.router.navigate(['konto/anmelden']);
  // }

  async ngOnInit(){
    // this.createUser ("karazon@test.de", "12345678", )
    // this.nutzerService.getAllEmails().subscribe(data => this.alleNutzer = data);
  }

  // }

  createUser(emailEl: HTMLInputElement, passwortEl: HTMLInputElement, passwortRepeatEl: HTMLInputElement, registerButton: HTMLButtonElement, emailNote: HTMLSpanElement, passwortNote: HTMLSpanElement, passwordRepeatNote: HTMLSpanElement): void{
    const passwort = passwortEl.value;
    const passwortRepeat = passwortRepeatEl.value;
    const email = emailEl.value;

    // Deaktiviere Button
    registerButton.disabled = true;

    // Setze Info-Felder zurück
    emailNote.textContent = '';
    passwordRepeatNote.textContent = '';
    passwortNote.textContent = '';

    // Prüft, ob Passwörter identisch sind
    if(passwort !== passwortRepeat) {
      console.error('Passwörter stimmen nicht überein!');
      passwordRepeatNote.textContent = 'Passwörter stimmen nicht überein!';

      // Aktiviere Button
      registerButton.disabled = false;
    } else {
      //Prüft, ob Passwort die Mindestanforderung erfüllt
      if(passwort.length < 5) {
        console.error('Passwort zu kurz! Mindestens 5 Zeichen!')
        passwortNote.textContent = 'Passwort zu kurz! Mindestens 5 Zeichen!';

        // Aktiviere Button
        registerButton.disabled = false;
      } else {
        console.log("Nutzer wird hinzugefügt...")

        //Fügt den Nutzer der Datenbank hinzu
        this.nutzerService.addUser(email, passwort, registerButton, emailNote);
      }
    }
  }
}

