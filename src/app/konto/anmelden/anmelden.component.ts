import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NutzerService } from 'src/services/nutzer.service';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['anmelden.component.css']
})
export class AnmeldenComponent {

  constructor(private router: Router, private nutzerService: NutzerService) {}

returnViewRegistrieren() {
  this.router.navigate(['konto/registrieren']);
}

anmelden(email: string, passwort: string) {

  //Mailadresse prüfen
  let enthaeltAt: boolean = email.includes('@');
  let endePasst: boolean = email.endsWith('.de') || email.endsWith('.com');
  let validEmail: boolean = /^[^@]+@[^@]+\.(de|com)$/.test(email);

  if (!enthaeltAt) {
    console.error('Sie haben das "@"-Zeichen vergessen!');
  }
  else if (!validEmail) {
    console.error('Die E-Mail-Adresse entspricht nicht dem richtigen Format.');
  }  
  else if (!endePasst) {
    console.error('Die Endung fehlt oder ist an der falschen Stelle (z.B. .de oder .com).');
  }


  else if (enthaeltAt && endePasst && validEmail) {
    let password: string;
  
    this.nutzerService.getUserPassword(email)
      .subscribe((passwordValue: string) => {
        // Die Methode `subscribe` wird aufgerufen, wenn der Wert verfügbar ist
        password = passwordValue;
  
        // Hier kannst du mit dem `password` Wert arbeiten
        console.log("Passwort abgerufen:", password);
      });
  } else {
    console.error("Bedingungen wurden nicht erfüllt.");
  }

    
  }
}




