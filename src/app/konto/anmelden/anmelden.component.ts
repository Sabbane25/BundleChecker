import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NutzerService } from 'src/services/nutzer.service';
import { TokenStorageService } from 'src/services/token-storage.service';


@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['anmelden.component.css']
})

export class AnmeldenComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private nutzerService: NutzerService, private tokenStorage: TokenStorageService, private router: Router) { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    const { email, password } = this.form;

    this.nutzerService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message,
        this.isLoginFailed = true;
      }
    );
    console.log("formulaire marche");
  }

  reloadPage(): void {
    window.location.reload();
  }

  returnViewRegistrieren() {
    this.router.navigate(['konto/registrieren']);
  }
}
