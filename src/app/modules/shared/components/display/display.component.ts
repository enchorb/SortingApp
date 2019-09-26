import { Component, OnInit, OnDestroy } from '@angular/core';
import { SortService } from '../../../../services/sort.service';
import { Sort } from '../../../../model/sort.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})

export class DisplayComponent implements OnInit, OnDestroy {
  sortSub;
  sortList: Array<number>; sortMax; sortMin;

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortSub = this.sortService.sortSource$
      .subscribe(
        sort => {
          this.sortList = sort.array;
          this.sortMin = sort.range[0];
          this.sortMax = sort.range[1];
        }
      );
  }

  ngOnDestroy() {
    this.sortSub.unsubscribe();
  }
}
