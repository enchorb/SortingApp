import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sort } from '../model/sort.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private sortSource = new Subject<Sort>();
  sortSource$ = this.sortSource.asObservable();

  constructor() {}

  updateSort(sort: Sort) {
    this.sortSource.next(sort);
  }
}
