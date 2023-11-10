import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { data } from 'cheerio/lib/api/attributes';
import { Nutzer } from 'src/models/nutzer.model';
import { NutzerService } from 'src/services/nutzer.service';


@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})


export class AdminComponent implements OnInit {

  @ViewChild('emailInput', { static: false }) emailInput: ElementRef;

  users: Nutzer[] = [{id: 2, email: "test", password: "password"}];

  constructor(private nutzerService: NutzerService) {}
  

  ngOnInit(): void {
      this.nutzerService.getUsers().subscribe((data) => {
      this.users =  data;
  })
}
  

  onClick(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.searchUser();
    }
  }

  searchUser() {
    const suchanfrage = this.emailInput.nativeElement.value;
    this.nutzerService.suchen(suchanfrage);
}
   
  userLoeschen(user_id: number): void {
      console.log("component.ts");
      this.nutzerService.loeschen(user_id);
  }


}

