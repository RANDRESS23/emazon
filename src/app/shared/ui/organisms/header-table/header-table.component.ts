import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY_STRING, LABEL_SHOW_BY_DROPDOWN, LABEL_SORT_BY_DROPDOWN, OPTIONS_SHOW_BY_DROPDOWN, OPTIONS_SORT_BY_DROPDOWN } from '@src/app/shared/domain/constants/admin';

@Component({
  selector: 'organism-header-table',
  templateUrl: './header-table.component.html',
  styleUrls: ['./header-table.component.scss']
})
export class HeaderTableComponent implements OnInit {
  labelShowByDropdown: string = LABEL_SHOW_BY_DROPDOWN;
  optionsShowByDropdown: Record<string, string | number>[] = OPTIONS_SHOW_BY_DROPDOWN;
  labelSortByDropdown: string = LABEL_SORT_BY_DROPDOWN;
  optionsSortByDropdown: Record<string, string | number>[] = OPTIONS_SORT_BY_DROPDOWN;
  showBy: string = EMPTY_STRING
  sortBy: string = EMPTY_STRING

  @Output() showAndSortBy = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changeShowBy(event: any): void {
    this.showBy = event;
    this.showAndSortBy.emit([this.showBy, this.sortBy]);
  }

  changeSortBy(event: any): void {
    this.sortBy = event;
    this.showAndSortBy.emit([this.showBy, this.sortBy]);
  }
}
