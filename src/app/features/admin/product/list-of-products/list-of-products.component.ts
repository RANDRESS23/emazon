import { Component, OnInit } from '@angular/core';
import { INITIAL_PAGE_TABLE, INITIAL_SIZE_ELEMENTS_TABLE, INITIAL_SORT_BY_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE, PRODUCT_KEYS, PRODUCT_OPTIONS_SORT_BY_DROPDOWN, TABLE_HEADERS_PRODUCT } from '@utils/constants/admin';
import { PageProducts, ProductResponse } from '@utils/interfaces/product';
import { ProductService } from '@src/app/core/services/product/product.service';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { RolesEnum } from '@utils/enums/roles';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.scss']
})
export class ListOfProductsComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_ELEMENTS_TABLE;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  sortBy: string = INITIAL_SORT_BY_ELEMENTS_TABLE;
  optionsSortByDropdown: Record<string, string | number>[] = PRODUCT_OPTIONS_SORT_BY_DROPDOWN;
  listOfProducts: ProductResponse[] = [];
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  headers: Record<string, string | boolean>[] = TABLE_HEADERS_PRODUCT;
  keys: (keyof ProductResponse)[] = PRODUCT_KEYS as (keyof (ProductResponse))[];
  showButtonAddProduct: boolean = false;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProducts(this.pageNumber, this.size, this.sortOrder, this.sortBy);
    this.showButtonAddProduct = this.authService.getRole() === RolesEnum.ADMIN;
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    this.getProducts(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }

  getProducts(pageNumber: number, size: number, sortOrder: string, sortBy: string): void {
    this.productService.getAllProducts(pageNumber, size, sortOrder, sortBy).subscribe({
      next: (pageProducts: PageProducts) => {
        this.listOfProducts = pageProducts.content;
        this.totalPages = pageProducts.totalPages;
        this.totalElements = pageProducts.totalElements;
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  addNewProductCount(): void {
    this.totalElements = this.totalElements++;
    this.getProducts(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }

  showFilterOrders(event: any): void {
    this.size = event[0];
    this.sortOrder = event[1];
    this.sortBy = event[2];
    this.pageNumber = INITIAL_PAGE_TABLE;

    this.getProducts(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }
}
