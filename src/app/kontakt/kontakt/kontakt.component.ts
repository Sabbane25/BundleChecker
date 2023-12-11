import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {KontaktService} from "../../../services/kontakt.service";

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css'],
})

/**
 * Komponente für die Anzeige der Kontakt-Seite
 *
 * @autor Mokhtar Yosofzay
 */
export class KontaktComponent {
  form: any = {
    nachricht: null,
    email: null,
    vorname: null,
    nachname: null,
  };
  errorMessage = '';
  sendenFailed = false;
  sendenSuccess = false;

  constructor(private kontaktService: KontaktService, private http: HttpClient) {
  }

  onSubmit() {
    const { nachricht, email, vorname, nachname } = this.form;

    this.kontaktService.sendeEmail(email, vorname, nachname, nachricht).subscribe(
        data => {
          this.sendenSuccess = true;
          this.sendenFailed = false;
        },
        err => {
          this.errorMessage = err.error.message ? err.error.message : "Unbekannter Fehler";
          this.sendenFailed = true;
        }
    );
  }
}
