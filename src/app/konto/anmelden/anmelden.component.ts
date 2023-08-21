import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['anmelden.component.css']
})
export class AnmeldenComponent {

  constructor(private router: Router) {}

retrunViewRegistrieren() {
  this.router.navigate(['konto/registrieren']);
}

}
