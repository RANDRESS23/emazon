import { Component, OnInit } from '@angular/core';
import { BRAND_KEYS, INITIAL_PAGE_TABLE, INITIAL_SIZE_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE, TABLE_HEADERS_BRAND } from '../../domain/constants/admin';
import { BrandResponse } from '../../domain/interfaces/brand';
import { BrandService } from '@src/app/core/services/brand/brand.service';

@Component({
  selector: 'app-list-of-brands',
  templateUrl: './list-of-brands.component.html',
  styleUrls: ['./list-of-brands.component.scss']
})
export class ListOfBrandsComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_ELEMENTS_TABLE;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  listOfBrands: BrandResponse[] = [];
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  headers: string[] = TABLE_HEADERS_BRAND;
  keys: (keyof BrandResponse)[] = BRAND_KEYS;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    // this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    // this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }

  // getCategories(pageNumber: number, size: number, sortOrder: string): void {
  //   this.categoryService.getAllCategories(pageNumber, size, sortOrder).subscribe({
  //     next: (pageCategories: PageCategories) => {
  //       this.listOfCategories = pageCategories.content;
  //       this.totalPages = pageCategories.totalPages;
  //       this.totalElements = pageCategories.totalElements;
  //     },
  //     error: (error) => {
  //       console.log({ error })
  //     }
  //   })
  // }

  addNewBrandCount(): void {
    this.totalElements = this.totalElements++;
    // this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }

  showAndSortBy(event: any): void {
    this.size = event[0];
    this.sortOrder = event[1];
    this.pageNumber = INITIAL_PAGE_TABLE;

    // this.getCategories(this.pageNumber, this.size, this.sortOrder);
  }
}
