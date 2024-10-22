import { Component, OnInit } from '@angular/core';
import { WarehouseAssistantService } from '@src/app/core/services/warehouse-assistant/warehouse-assistant.service';
import { INITIAL_PAGE_TABLE, INITIAL_SIZE_ELEMENTS_TABLE, INITIAL_SORT_BY_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE, PRODUCT_OPTIONS_SORT_BY_DROPDOWN, TABLE_HEADERS_WAREHOUSE_ASSISTANT, WAREHOUSE_ASSISTANT_KEYS, WAREHOUSE_ASSISTANT_OPTIONS_SORT_BY_DROPDOWN } from '@utils/constants/admin';
import { PageWarehouseAssistants, WarehouseAssistantResponse } from '@utils/interfaces/warehouse-assistant';

@Component({
  selector: 'app-list-of-warehouse-assistant',
  templateUrl: './list-of-warehouse-assistant.component.html',
  styleUrls: ['./list-of-warehouse-assistant.component.scss']
})
export class ListOfWarehouseAssistantComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_ELEMENTS_TABLE;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  sortBy: string = INITIAL_SORT_BY_ELEMENTS_TABLE;
  optionsSortByDropdown: Record<string, string | number>[] = WAREHOUSE_ASSISTANT_OPTIONS_SORT_BY_DROPDOWN;
  listOfWarehouseAssistants: WarehouseAssistantResponse[] = [];
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  headers: Record<string, string | boolean>[] = TABLE_HEADERS_WAREHOUSE_ASSISTANT;
  keys: (keyof WarehouseAssistantResponse)[] = WAREHOUSE_ASSISTANT_KEYS as (keyof (WarehouseAssistantResponse))[];

  constructor(private warehouseAssistantService: WarehouseAssistantService) { }

  ngOnInit(): void {
    this.getWarehouseAssistants(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    this.getWarehouseAssistants(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }

  getWarehouseAssistants(pageNumber: number, size: number, sortOrder: string, sortBy: string): void {
    this.warehouseAssistantService.getAllWarehouseAssistants(pageNumber, size, sortOrder, sortBy).subscribe({
      next: (pageWarehouseAssistants: PageWarehouseAssistants) => {
        this.listOfWarehouseAssistants = pageWarehouseAssistants.content;
        this.totalPages = pageWarehouseAssistants.totalPages;
        this.totalElements = pageWarehouseAssistants.totalElements;
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  addNewWarehouseAssistantCount(): void {
    this.totalElements = this.totalElements++;
    this.getWarehouseAssistants(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }

  showFilterOrders(event: any): void {
    this.size = event[0];
    this.sortOrder = event[1];
    this.sortBy = event[2];
    this.pageNumber = INITIAL_PAGE_TABLE;

    this.getWarehouseAssistants(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }
}
