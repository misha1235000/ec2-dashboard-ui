// search.component

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortType } from '../dashboard.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() selectionChange = new EventEmitter();
  @Output() filterTrigger = new EventEmitter();
  @Output() sortTrigger = new EventEmitter();
  @Input() sortTypes: { name: string, value: SortType }[] | undefined;
  @Input() highToLow: boolean | undefined;

  searchFormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emits to parent that a selection has been changed.
   * @param event - The selection that was chosen in the select.
   */
  changeSelection(event: any): void {
    this.selectionChange.emit(event);
  }

  /**
   * Emits to parent that filter has been triggered.
   */
  filter(): void {
    this.filterTrigger.emit(this.searchFormControl.value);
  }

  /**
   * Emits to parent that sort has been triggered.
   */
  toggleSort(): void {
    this.sortTrigger.emit();
  }

}
