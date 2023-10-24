import { Component } from '@angular/core';
import { AnmeldenComponent } from 'src/app/konto/anmelden/anmelden.component';
import { NutzerService} from 'src/services/nutzer.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})

export class AdminComponent {

  constructor(){}

/**
  searchOnEnter(emailInput: string, event: KeyboardEvent) {
    if (event.key === 'Enter') {
      emailInput.suche(emailInput);
  }
}*/
}
