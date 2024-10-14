import { Component, Input, OnInit } from '@angular/core';
import { BrandResponse } from '@domain/interfaces/brand';
import { CategoryResponse } from '@domain/interfaces/category';

@Component({
  selector: 'organism-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() list: (CategoryResponse | BrandResponse)[] = [];
  @Input() headers: string[] = [];
  @Input() keys: (keyof (CategoryResponse | BrandResponse))[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
