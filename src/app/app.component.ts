import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'bundle-checker';

  private roles: string[] = [];

  // Wenn der Nutzer angemeldet ist
  isLoggedIn = false;

  // true, wenn Admin-Board angezeigt werden kann
  showAdminBoard = false;

  // Die E-Mail Adresse des Nutzers
  email?: string;

  //gib true zurück wenn die Seite /admin aufgerufen ist
  istUrlAdmin: boolean = false;

  //gib true zurück wenn ein User angemledet ist. 
  istVerbundet: boolean = true;

  //verwaltet die Aktivierung des Links: 
  linkZumAnmelden = 'konto';

  constructor(private router: Router, private tokenStorageService: TokenStorageService){}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.email = user.email;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.istUrlAdmin = url === '/admin';
      }
    });
  }

  /**
   * Melde den Nutzer ab
   */
  logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['/konto/anmelden']);
    window.location.reload();
  }
  
}
