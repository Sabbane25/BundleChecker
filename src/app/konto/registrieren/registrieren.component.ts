import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NutzerService} from 'src/services/nutzer.service';
import { passwordRepeatValidator } from 'src/app/validators/passwordRepeatValidator';

@Component({
    selector: 'app-registrieren',
    templateUrl: './registrieren.component.html',
    styleUrls: ['./registrieren.component.css']
})

/**
 * Komponente für die Anzeige der Registrieren-Seite
 *
 * @autor Mokhtar Yosofzay
 */
export class RegistrierenComponent {
    passwordMinLength: number = 5;

    form: any = {
        email: null,
        password: null
    };
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(private router: Router, private nutzerService: NutzerService) {
    }

    returnViewAnmelden() {
        this.router.navigate(['konto/anmelden']);
    }

    /**
     * Create a new user
     *
     * @param emailInputNote
     */
    onSubmit(): void {
        const { email, password } = this.form;

        //Fügt den Nutzer der Datenbank hinzu
        this.nutzerService.register(email, password).subscribe(
            data => {
                // Nutzer wurde hinzugefügt
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            err => { // Wenn Fehler aufrifft
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        );
    }
}
