import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'bundle-checker';

  //gib true zurück wenn die Seite /admin aufgerufen ist
  istUrlAdmin: boolean = false;

  //gib true zurück wenn ein User angemledet ist. 
  istVerbundet: boolean = true;

  //Anmelden Zustand: Anmelden oder Angemeldet. Die Variable ist auch in HTML benutzt, um die Seite dynamisch zu aktualisieren
  userStatus = 'Anmelden';

  //verwaltet die Aktivierung des Links: 
  linkZumAnmelden = 'konto';

  constructor(private router: Router){}

  ngOnInit() {
    /*this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.istUrlAdmin = url === '/admin';
      }
    }); */
  }

  /**
   * prüfe ob ein User angemeldet ist: 
   * ANMELDEN switch zu ANGEMELDET und ein Dropdownmenu ist sichbar
   * @returns true: verändert sich die Navigationleiste
   */
  /*isBenutzerangemeldet(){

    if(this.istVerbundet){
      this.userStatus = 'Angemeldet';
    }else{
      this.userStatus = 'Anmelden';
    }
    return this.istVerbundet;
  }

  /** aktiviert oder deaktiviert den Link je nachdem, ob der Benutzer angemeldet ist. */
  /*
  istschonangemeldet(){
    if(this.isBenutzerangemeldet()){
      this.linkZumAnmelden = '#'
    }else{
      this.linkZumAnmelden = 'konto';
    }
  }

  meldetDenUserAb(){
    if(this.isBenutzerangemeldet() === true){
      this.istVerbundet = false;
    }
  }
  */
  
}
