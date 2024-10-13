import { Component, Input, OnInit } from '@angular/core';
import { CategoryResponse } from '@src/app/shared/domain/interfaces/category';

@Component({
  selector: 'organism-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() list: CategoryResponse[] = [];
  @Input() headers: string[] = [];
  @Input() keys: (keyof CategoryResponse)[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
