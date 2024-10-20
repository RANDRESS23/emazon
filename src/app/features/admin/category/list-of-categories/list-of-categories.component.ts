import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { CategoryResponse, PageCategories } from '@utils/interfaces/category';
import { CATEGORY_KEYS, INITIAL_PAGE_TABLE, INITIAL_SIZE_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE, TABLE_HEADERS_CATEGORY } from '@utils/constants/admin';

@Component({
  selector: 'app-list-of-categories',
  templateUrl: './list-of-categories.component.html',
  styleUrls: ['./list-of-categories.component.scss']
})
export class ListOfCategoriesComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_ELEMENTS_TABLE;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  listOfCategories: CategoryResponse[] = [];
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  headers: Record<string, string | boolean>[] = TABLE_HEADERS_CATEGORY;
  keys: (keyof CategoryResponse)[] = CATEGORY_KEYS as (keyof (CategoryResponse))[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }

  getCategories(pageNumber: number, size: number, sortOrder: string): void {
    this.categoryService.getAllCategories(pageNumber, size, sortOrder).subscribe({
      next: (pageCategories: PageCategories) => {
        this.listOfCategories = pageCategories.content;
        this.totalPages = pageCategories.totalPages;
        this.totalElements = pageCategories.totalElements;
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  addNewCategoryCount(): void {
    this.totalElements = this.totalElements++;
    this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }

  showFilterOrders(event: any): void {
    this.size = event[0];
    this.sortOrder = event[1];
    this.pageNumber = INITIAL_PAGE_TABLE;

    this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }
}
