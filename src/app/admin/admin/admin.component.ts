import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NutzerService } from 'src/services/nutzer.service';
import { Nutzer } from 'src/models/nutzer.model';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {

  users: any[] = [];
  hintergrund ="";

  constructor(private nutzerService: NutzerService) {}

   ngOnInit(): void {
     console.log("Hallo hier");
     this.nutzerService.getUsers().subscribe((data) => {
       this.users = data;
     })
   }

   bearbeiten(user: string) {

      console.log(user);
  }

  changeBackgroundColor(user: string): string {

    for(let i = 0; i < this.users.length; i++){
      if(this.users[i] == user && i % 2 == 0){
        this.hintergrund = "white";
      }else{
        this.hintergrund = "#00528d49";
      }
    }
    return this.hintergrund;
  }

  /**ngOnInit(): void {
    console.log("Hallo hier");
    this.getUsers();

  }

  async getUsers() {
    this.users = await this.nutzerService.getUsers();
    console.log(this.users);
  }*/

}

