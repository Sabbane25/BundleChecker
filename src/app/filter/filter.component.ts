import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent {
  isFilterSichtbar: boolean = false; 

  zeigeFilter(){
    this.isFilterSichtbar = !this.isFilterSichtbar;
  }
}
