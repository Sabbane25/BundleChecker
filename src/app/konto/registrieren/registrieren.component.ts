import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent {

  constructor(private dataService :DataService, private router: Router) {}

  returnViewAnmelden(){
    this.router.navigate(['konto/anmelden']);
  }

  gitbBenutzer(): void {
    this.dataService.istMailVerfuegbar().subscribe(data => this)
  }

}
