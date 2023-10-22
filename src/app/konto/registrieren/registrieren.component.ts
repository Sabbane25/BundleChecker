import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NutzerService} from 'src/services/nutzer.service';
import { passwordRepeatValidator } from "../../validators/passwordRepeatValidator";


@Component({
    selector: 'app-registrieren',
    templateUrl: './registrieren.component.html',
    styleUrls: ['./registrieren.component.css']
})

export class RegistrierenComponent {
    passwordMinLength: number = 5;

    email = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
    password = new FormControl('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength)
    ]);
    passwordRepeat = new FormControl('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        passwordRepeatValidator(this.password)
    ]);

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
    createUser(emailInputNote: HTMLSpanElement): void {
        const email = <string>this.email.getRawValue();
        const passwort = <string>this.password.getRawValue();

        // Sende formular nur ab, wenn alle Felder valide sind
        if (this.email.valid && this.password.valid && this.passwordRepeat.valid) {
            //Fügt den Nutzer der Datenbank hinzu
            this.nutzerService.addUser(email, passwort, emailInputNote);
        }
    }
}
