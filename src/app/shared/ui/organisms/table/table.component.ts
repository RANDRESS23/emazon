import { Component, Input, OnInit } from '@angular/core';
import { BRAND_NAME, CATEGORIES_NAME, PRICE_PRODUCT_INPUT_NAME } from '@utils/constants/admin';
import { CategoryResponse } from '@utils/interfaces/category';

@Component({
  selector: 'organism-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() list: any[] = [];
  @Input() headers: Record<string, string | boolean>[] = [];
  @Input() keys: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  parseItem(item: any, key: string): string {
    if (key === CATEGORIES_NAME) {
      return item[key].map((category: CategoryResponse) => category.name).join(', ');
    }

    if (key === BRAND_NAME) {
      return item[key].name;
    }

    if (key === PRICE_PRODUCT_INPUT_NAME) {
      return `$ ${item[key]}`;
    }

    return item[key];
  }
}
