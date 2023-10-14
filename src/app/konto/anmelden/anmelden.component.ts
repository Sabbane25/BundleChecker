import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['anmelden.component.css']
})
export class AnmeldenComponent {

  //fehler die auftaucht, falls der nutzer das Formular zuschicken möchte ohne alle Felder aufzufüllen
  fehlerMeldung: string = "FüllenSie alle Felder auf";

  onSubmit() {
    console.log("formulaire marche");
  }

  constructor(private router: Router) {}

  retrunViewRegistrieren() {
    this.router.navigate(['konto/registrieren']);
  }

}
