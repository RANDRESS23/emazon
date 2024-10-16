import { Component, OnInit } from '@angular/core';
import { INITIAL_PAGE_TABLE, INITIAL_SIZE_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE } from '../../domain/constants/admin';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.scss']
})
export class ListOfProductsComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_ELEMENTS_TABLE;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  // listOfBrands: BrandResponse[] = [];
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  // headers: string[] = TABLE_HEADERS_BRAND;
  // keys: (keyof (CategoryResponse | BrandResponse))[] = BRAND_KEYS as (keyof (CategoryResponse | BrandResponse))[];

  // constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    // this.getBrands(this.pageNumber, this.size, this.sortOrder);
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    // this.getBrands(this.pageNumber, this.size, this.sortOrder);
  }

  // getBrands(pageNumber: number, size: number, sortOrder: string): void {
  //   this.brandService.getAllBrands(pageNumber, size, sortOrder).subscribe({
  //     next: (pageBrands: PageBrands) => {
  //       this.listOfBrands = pageBrands.content;
  //       this.totalPages = pageBrands.totalPages;
  //       this.totalElements = pageBrands.totalElements;
  //     },
  //     error: (error) => {
  //       console.log({ error })
  //     }
  //   })
  // }

  addNewProductCount(): void {
    this.totalElements = this.totalElements++;
    // this.getBrands(this.pageNumber, this.size, this.sortOrder);
  }

  showAndSortBy(event: any): void {
    this.size = event[0];
    this.sortOrder = event[1];
    this.pageNumber = INITIAL_PAGE_TABLE;

    // this.getBrands(this.pageNumber, this.size, this.sortOrder);
  }
}
