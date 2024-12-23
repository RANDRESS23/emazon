import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { INITIAL_PAGE_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE } from '@utils/constants/admin';
import { INITIAL_FILTER_BRAND, INITIAL_FILTER_CATEGORY, INITIAL_SIZE_PRODUCTS, PRODUCT_REMOVED_IN_CART, PRODUCT_SAVED_IN_CART, PRODUCTS_REMOVED_IN_CART } from '@utils/constants/client';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH, ZERO } from '@utils/constants/general';
import { StatusEnum } from '@utils/enums/status';
import { CartProductFullInfo, ListCartProducts } from '@utils/interfaces/cart';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_PRODUCTS;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  filterCategory: string = INITIAL_FILTER_CATEGORY;
  filterBrand: string = INITIAL_FILTER_BRAND;
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  listOfProductsCart: CartProductFullInfo[] = [];
  toastMessage: string = EMPTY_STRING;

  constructor(private toastService: ToastService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartPagedClient.subscribe((cartPagedClient) => {
      this.listOfProductsCart = cartPagedClient?.products?.content || [];
      this.totalPages = cartPagedClient?.products?.totalPages;
      this.totalElements = cartPagedClient?.products?.totalElements;
    });

    this.getCartProducts();
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getCartProducts();
  }

  getCartProducts(): void {
    this.cartService.getAllCartProducts(this.pageNumber, this.size, this.sortOrder, this.filterCategory, this.filterBrand).subscribe({
      next: (data: ListCartProducts) => {
        this.listOfProductsCart = data?.products?.content || [];
        this.totalPages = data?.products?.totalPages;
        this.totalElements = data?.products?.totalElements;
      },
      error: (error) => {
        console.error({ error });
      }
    });
  }
  
  deleteProductCart(productId: number, quantity: number = 1): void {
    this.cartService.removeProductInTheCart({ productId, quantity })
      .subscribe({
        next: () => {
          this.toastService.showToast(
            quantity === 1 ? PRODUCT_REMOVED_IN_CART : PRODUCTS_REMOVED_IN_CART, 
            StatusEnum.SUCCESS, 
            SUCCESS_ICON_PATH
          );
        },
        error: (error) => {
          if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
          else this.toastMessage = SERVER_ERROR_TEXT;
          
          this.toastService.showToast(this.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
        }
      })
  }

  addProductCart(productId: number): void {
    this.cartService.saveProductInTheCart({ productId, quantity: 1 })
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
  }

  showFilterOrders(event: any): void {
    this.size = event[0];
    this.sortOrder = event[1];
    this.filterCategory = event[2];
    this.filterBrand = event[3];
    this.pageNumber = INITIAL_PAGE_TABLE;

    this.getCartProducts();
  }

  navigateToDetail(productId: number): void {
    this.router.navigate([`/producto/${productId}`]);
  }
}
