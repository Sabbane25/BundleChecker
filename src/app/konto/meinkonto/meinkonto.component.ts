import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-meinkonto',
  templateUrl: 'meinkonto.component.html',
  styleUrls: ['meinkonto.component.css']
})
export class MeinkontoComponent implements OnInit {

  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
}
