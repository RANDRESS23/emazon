import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { ProductService } from '@src/app/core/services/product/product.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { INITIAL_PAGE_TABLE, INITIAL_SORT_BY_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE } from '@utils/constants/admin';
import { ERROR_CLIENT_NOT_LOGGED2, INITIAL_SIZE_PRODUCTS, PRODUCT_SAVED_IN_CART } from '@utils/constants/client';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { RolesEnum } from '@utils/enums/roles';
import { StatusEnum } from '@utils/enums/status';
import { PageProducts, ProductResponse } from '@utils/interfaces/product';

@Component({
  selector: 'app-list-of-products-to-buy',
  templateUrl: './list-of-products-to-buy.component.html',
  styleUrls: ['./list-of-products-to-buy.component.scss']
})
export class ListOfProductsToBuyComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_PRODUCTS;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  sortBy: string = INITIAL_SORT_BY_ELEMENTS_TABLE;
  listOfProducts: ProductResponse[] = [];
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  toastMessage: string = EMPTY_STRING;

  constructor(private authService: AuthService, private productService: ProductService, private toastService: ToastService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts(this.pageNumber, this.size, this.sortOrder, this.sortBy);
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

  addProductToCart(product: ProductResponse): void {
    if (this.authService.isAuthenticated() 
      && this.authService.getRole() === RolesEnum.CLIENTE) {
        this.cartService.saveProductInTheCart({ productId: product.productId, quantity: 1 })
          .subscribe({
            next: () => {
              this.toastService.showToast(PRODUCT_SAVED_IN_CART, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
            },
            error: (error) => {
              if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
              else this.toastMessage = SERVER_ERROR_TEXT;
              
              this.toastService.showToast(this.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
            }
          })
    } else {
      this.toastService.showToast(ERROR_CLIENT_NOT_LOGGED2, StatusEnum.ERROR, ERROR_ICON_PATH);
    }
  }

  navigateToDetail(productId: number): void {
    this.router.navigate([`/producto/${productId}`]);
  }
}
