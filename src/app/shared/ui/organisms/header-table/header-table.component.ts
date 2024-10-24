import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LABEL_SHOW_BY_DROPDOWN, LABEL_SORT_BY_DROPDOWN, LABEL_SORT_ORDER_DROPDOWN, OPTIONS_SHOW_BY_DROPDOWN, OPTIONS_SORT_ORDER_DROPDOWN } from '@utils/constants/admin';
import { EMPTY_STRING } from '@utils/constants/general';

@Component({
  selector: 'organism-header-table',
  templateUrl: './header-table.component.html',
  styleUrls: ['./header-table.component.scss']
})
export class HeaderTableComponent implements OnInit {
  labelShowByDropdown: string = LABEL_SHOW_BY_DROPDOWN;
  optionsShowByDropdown: Record<string, string | number>[] = OPTIONS_SHOW_BY_DROPDOWN;
  labelSortOrderDropdown: string = LABEL_SORT_ORDER_DROPDOWN;
  optionsSortOrderDropdown: Record<string, string | number>[] = OPTIONS_SORT_ORDER_DROPDOWN;
  labelSortByDropdown: string = LABEL_SORT_BY_DROPDOWN;
  showBy: string = EMPTY_STRING;
  sortOrder: string = EMPTY_STRING;
  sortBy: string = EMPTY_STRING;
  
  @Input() showSortByDropdown: boolean = false;
  @Input() optionsSortByDropdown: Record<string, string | number>[] = [{}];
  @Output() showFilterOrders = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changeShowBy(event: any): void {
    this.showBy = event;
    this.showFilterOrders.emit([this.showBy, this.sortOrder, this.sortBy]);
  }

  changeSortOrder(event: any): void {
    this.sortOrder = event;
    this.showFilterOrders.emit([this.showBy, this.sortOrder, this.sortBy]);
  }
  
  changeSortBy(event: any): void {
    this.sortBy = event;
    this.showFilterOrders.emit([this.showBy, this.sortOrder, this.sortBy]);
  }
}
