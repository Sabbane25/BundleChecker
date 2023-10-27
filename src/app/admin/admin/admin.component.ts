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

  users: Nutzer[] = [];

  constructor(private nutzerService: NutzerService) {}

  ngOnInit(): void {
    this.nutzerService.getUsers().subscribe((data) => {
      this.users = data;
    })

  }

}

