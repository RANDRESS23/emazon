import { Component, Input, OnInit } from '@angular/core';
import { BrandResponse } from '@utils/interfaces/brand';
import { CategoryResponse } from '@utils/interfaces/category';
import { ProductResponse } from '@utils/interfaces/product';

@Component({
  selector: 'organism-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() list: (CategoryResponse | BrandResponse | ProductResponse)[] = [];
  @Input() headers: Record<string, string | boolean>[] = [];
  @Input() keys: (keyof (CategoryResponse | BrandResponse | ProductResponse))[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  parseItem(item: any, key: string): string {
    if (key === 'categories') {
      return item[key].map((category: CategoryResponse) => category.name).join(', ');
    }

    if (key === 'brand') {
      return item[key].name;
    }

    if (key === 'price') {
      return `$ ${item[key]}`;
    }

    return item[key];
  }
}
