import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs';
import { Filter } from 'src/models/filter.models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private dataFilterSource = new Subject<Filter>();
  dataFilter$ = this.dataFilterSource.asObservable();

  sendeListeKomponenten(data: Filter){
    this.dataFilterSource.next(data);
  }

  constructor() {}
}
