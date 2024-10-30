import { Component, OnInit } from '@angular/core';
import { ProductService } from '@src/app/core/services/product/product.service';
import { INITIAL_PAGE_TABLE, INITIAL_SIZE_ELEMENTS_TABLE, INITIAL_SORT_BY_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE, PRODUCT_OPTIONS_SORT_BY_DROPDOWN, PRODUCT_SUPPLY_KEYS, TABLE_HEADERS_PRODUCT_SUPPLY } from '@utils/constants/admin';
import { EMPTY_STRING } from '@utils/constants/general';
import { PageProducts, ProductResponse } from '@utils/interfaces/product';
import { ProductSupply } from '@utils/interfaces/supply';

@Component({
  selector: 'app-list-of-products-supply',
  templateUrl: './list-of-products-supply.component.html',
  styleUrls: ['./list-of-products-supply.component.scss']
})
export class ListOfProductsSupplyComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_ELEMENTS_TABLE;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  sortBy: string = INITIAL_SORT_BY_ELEMENTS_TABLE;
  optionsSortByDropdown: Record<string, string | number>[] = PRODUCT_OPTIONS_SORT_BY_DROPDOWN;
  listOfProducts: ProductSupply[] = [];
  productId: string = EMPTY_STRING;
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  headers: Record<string, string | boolean>[] = TABLE_HEADERS_PRODUCT_SUPPLY;
  keys: (keyof ProductSupply)[] = PRODUCT_SUPPLY_KEYS as (keyof (ProductSupply))[];
  showModal: () => void = () => {};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
  }

  showModalWithProductId(item: any) {
    this.productId = item.productId;
    this.showModal();
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    this.getProducts(this.pageNumber, this.size, this.sortOrder, this.sortBy);
  }

  getProducts(pageNumber: number, size: number, sortOrder: string, sortBy: string): void {
    this.productService.getAllProducts(pageNumber, size, sortOrder, sortBy).subscribe({
      next: (pageProducts: PageProducts) => {
        const products = pageProducts.content.map((product: ProductResponse) => {
          return { productId: product.productId, name: product.name, quantity: product.quantity, accion: {
            icon: 'add',
            accion: this.showModalWithProductId.bind(this)
          }}
        })

        this.listOfProducts = products;
        this.totalPages = pageProducts.totalPages;
        this.totalElements = pageProducts.totalElements;
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  addNewSupplyCount(): void {
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
