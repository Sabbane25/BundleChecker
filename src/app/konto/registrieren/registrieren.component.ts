import { Component, booleanAttribute } from '@angular/core';
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

  addUser(email: string, passwort: string, passwortRepeat: string) {

    let enthaeltAt: boolean = email.includes('@');
    let endePasst: boolean = email.endsWith('.de') || email.endsWith('.com');
    let passwoerterGleich: boolean = passwort === passwortRepeat;
    let passwortLaenge: boolean = passwort.length >= 5;
    let validEmail: boolean = /^[^@]+@[^@]+\.(de|com)$/.test(email);
    let eingabePasst: boolean = false;
  
    if (!enthaeltAt) {

      console.error('Sie haben das "@"-Zeichen vergessen!');
      }

      else if (!validEmail) {
      console.error('Die E-Mail-Adresse entspricht nicht dem richtigen Format.');
      } 
      
      else if (!endePasst) {
      console.error('Die Endung fehlt oder ist an der falschen Stelle (z.B. .de oder .com).');
      } 
      
      else if (!passwoerterGleich) {
      console.error('Die Passwörter stimmen nicht überein!');
      } 
      
      else if (!passwortLaenge) {
      console.error('Das Passwort ist zu kurz! Es muss mindestens 5 Zeichen lang sein.');
      }

      else {
        eingabePasst = true;
        console.log('Alles ist in Ordnung!');
      }

      if(eingabePasst == true) {

        this.nutzerService.addUser(email, passwort).subscribe({
          next: (response: any) => {
            console.log("Benutzer erfolgreich hinzugefügt", response);
            this.router.navigate(['konto/anmelden']);
          },

          error: (error: any) => { // Hier den Typ 'any' explizit angeben
            console.error("Fehler beim Hinzufügen des Nutzers:", error);
          }
        });
      }

    }

  }


  /** 
    test(email: string, passwort: string, passwortRepeat: string){

      let enthaeltAt: boolean = false;
      let endePasst: boolean = false;
      let passwoerterGleich: boolean = false;
      let passwortLaenge: boolean = false;

      if(!email.includes('@')) {
      console.error('@ Zeichen vergessen!')
      }


      else if(email.includes('.de') || email.includes('.com')){
        console.error('Länderkürzel');
      }

      else if(passwort !== passwortRepeat) {
        //Prüft, ob Passwörter identisch sind
        console.error('Passwörter stimmen nicht überein!');
      }
 
      else if(passwort.length < 5) {
        //Prüft, ob Passwort die Mindestanforderung erfüllt
        console.error('Passwort zu kurz! Mindestens 5 Zeichen!')
      }

      else if(enthaeltAt && endePasst && passwoerterGleich && passwortLaenge){
        console.log('Alles passt!');
      }
    }*/

  
