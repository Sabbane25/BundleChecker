import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NutzerService } from 'src/services/nutzer.service';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent {

  constructor(private router: Router, private nutzerService: NutzerService) {}

  alleNutzer: any[] = [];

  returnViewAnmelden(){
    this.router.navigate(['konto/anmelden']);
  }

  ngOnInit(): void{
    this.nutzerService.getAllEmails().subscribe(data => this.alleNutzer = data);
  }

   createUser(name: string, vorname: string, email: string, passwort: string, passwortRepeat: string){

    //Prüfung, ob Email bereits registriert ist
    if(this.alleNutzer.includes(email)){
      console.error("E-Mail bereits registriert!");
    }
    //Falls Email verfügbar
    else{
      //Passwörter auf Übereinstimmung prüfen
      if(passwort === passwortRepeat){
        console.error("Passwörter stimmen nicht überein!");
      }
      //Falls Passwörter übereinstimmen
      else{
        //Passwort auf Erfüllung der Bedingungen prüfen
        if (passwort.length <= 8) { 
          console.error("Eingegebenes Passwort erfüllt nicht die Mindestanforderungen!");
        }
        //Wenn alle Eingaben korrekt sind (Nutzer kann angelegt werden)
        else{
          this.nutzerService.addUser(name, vorname, email, passwort)
          .subscribe(
            (response) => {
              console.log("Benutzer erfolgreich hinzugefügt", response);
              this.router.navigate(['konto/anmelden']);
            },
            (error) => {
              console.error("Fehler beim Hinzufügen des Nutzers:", error);
            }
          );
        }
      }
    }
  } 
/** 
  createUser(name: string, vorname: string, email: string, password: string, passwordRepeat: string) {

    // Validierung schon abgeschlossen

    this.checkPassword;

    this.doesUserExist;

    if (!this.checkPassword) {
      // Meldung, dass das Passwort nicht übereinstimmt.
    }

    if (!this.doesUserExist) {
      // Meldung, dass es den User bereits gibt.
    }

    // Logik für das Erstellen des Users.

    // createUser im service

    // Feedback von der DB abfangen

  }
  */
/*
  checkPassword(passwort: string, passwortRepeat: string){
    return (passwort.length <= 8 || !/[A-Z]/.test(passwort) || !/[a-z]/.test(passwort) || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=]/.test(passwort))
      ? passwort !== passwortRepeat
      : false;
  }

  /*
  doesUserExist(email: ){
    return 
  } 
  */

}

