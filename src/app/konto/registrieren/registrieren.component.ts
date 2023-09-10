import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent {

  constructor(private router: Router) {}

  returnViewAnmelden(){
    this.router.navigate(['konto/anmelden']);
  }

}
