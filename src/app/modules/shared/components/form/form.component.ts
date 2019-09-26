import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, NumberValueAccessor} from '@angular/forms';
import { Sort } from '../../../../model/sort.model';
import { SortService } from '../../../../services/sort.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class FormComponent {
  sort: Sort = {
    array: [],
    range: [],
    type: 0
  };

  options = [
    {id: 1, name: 'Bubble'},
    {id: 2, name: 'Insertion'},
    {id: 3, name: 'Selection'},
  ]; selected;

  sortForm: FormGroup; sortString = ''; interval;
  isRunning = false; progressValue = 0;

  constructor(fb: FormBuilder, private sortService: SortService) {
    this.sortForm = fb.group({
      array: new FormControl('', [Validators.required, Validators.pattern('^\\s*[+]?\\d+(?:\\.\\d+)?(\\s*,\\s*[+]?\\d+(?:\\.\\d+)?)*$')]),
      sort: new FormControl('', [Validators.required])
    });
  }

  bubbleSort(sortArray: Array<number>): Array<Array<number>> {
    let i = 0; let j = 0; let temp = sortArray[0];
    const n = sortArray.length; const swapArray = [];
    swapArray.push([...sortArray]);
    for (i = 0; i < (n - 1); i++) {
      for (j = 0; j < (n - i - 1); j++) {
        if (sortArray[j] > sortArray[j + 1]) {
          temp = sortArray[j];
          sortArray[j] = sortArray[j + 1];
          sortArray[j + 1] = temp;
          swapArray.push([...sortArray]);
        }
      }
    }
    return swapArray;
  }

  insertionSort(sortArray: Array<number>): Array<Array<number>> {
    let i = 0; let j = 0; let key = sortArray[0];
    const n = sortArray.length; const swapArray = [];
    swapArray.push([...sortArray]);
    for (i = 0; i < n; i++) {
      key = sortArray[i]; j = i - 1;
      while ((j >= 0) && (sortArray[j] > key)) {
        sortArray[j + 1] = sortArray[j];
        j = j - 1;
        swapArray.push([...sortArray]);
      }
      sortArray[j + 1] = key;
    }
    swapArray.push([...sortArray]);
    return  swapArray;
  }

  selectionSort(sortArray: Array<number>): Array<Array<number>> {
    let i = 0; let j = 0; let temp = sortArray[0]; let min = 0;
    const n = sortArray.length; const swapArray = [];
    swapArray.push([...sortArray]);
    for (i = 0; i < (n - 1); i++) {
      min = i;
      for (j = (i + 1); j < n; j++) {
        if (sortArray[j] < sortArray[min]) {
          min = j;
        }
      }
      temp = sortArray[min];
      sortArray[min] = sortArray[i];
      sortArray[i] = temp;
      swapArray.push([...sortArray]);
    }
    return swapArray;
  }

  onSubmit() {
    this.isRunning = true; this.progressValue = 0.001;
    this.sortString = this.sortString.replace(/\s/g, ''); // Remove Whitespaces In Input String
    this.sort.array = this.sortString.split(',').map(Number);

    const tempArray = []; let max = this.sort.array[0]; let min = this.sort.array[0];
    for (const sortNum of this.sort.array) {
      if (sortNum > max) {
        max = sortNum;
      }
      if (sortNum < min) {
        min = sortNum;
      }
      if (tempArray.indexOf(sortNum) === -1) { // If Value Not A Duplicate
        tempArray.push(sortNum);
      }
    }

    this.sort.array = tempArray;
    this.sort.type = parseFloat(String(this.selected));
    this.sort.range = [min, max];

    let swapArray = [];
    switch (this.sort.type) {
      case 1: {
        swapArray = this.bubbleSort([...this.sort.array]);
        break;
      }
      case 2: {
        swapArray = this.insertionSort([...this.sort.array]);
        break;
      }
      case 3: {
        swapArray = this.selectionSort([...this.sort.array]);
        break;
      }
    }

    this.sort.array = swapArray[0];
    this.sortService.updateSort(this.sort);

    let n = swapArray.length;
    this.interval = setInterval(() => {
      if (n > 1) {
        this.isRunning = true;
        this.sort.array = swapArray[swapArray.length - n + 1];
        this.progressValue = (((swapArray.length - n + 2) / swapArray.length) * 100);
        this.sortService.updateSort(this.sort);
        n--;
      } else { clearInterval(this.interval); this.isRunning = false; }
    }, 1000);
  }
}
