import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meinkonto',
  templateUrl: 'meinkonto.component.html',
  styleUrls: ['meinkonto.component.css']
})

/**
 * Komponente für die Anzeige der Meinkonto-Seite
 *
 * @autor Mokhtar Yosofzay
 */
export class MeinkontoComponent implements OnInit {

  currentUser: any;

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    if (!this.token.isLoggedIn()) {
      this.token.signOut();
      this.router.navigate(['/404'], { skipLocationChange: true });
    }
  }
}
