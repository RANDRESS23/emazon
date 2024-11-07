import { Component, OnInit } from '@angular/core';
import { ProductService } from '@src/app/core/services/product/product.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { PRODUCT_REMOVED_IN_CART, PRODUCT_SAVED_IN_CART, PRODUCTS_REMOVED_IN_CART } from '@utils/constants/client';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { StatusEnum } from '@utils/enums/status';
import { CartProductInfo } from '@utils/interfaces/cart';
import { ProductResponse } from '@utils/interfaces/product';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  listOfProductsCart: CartProductInfo[] = [];
  toastMessage: string = EMPTY_STRING;

  constructor(private toastService: ToastService, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartClient.pipe(
      switchMap(({ products }) => 
        forkJoin(
          products.map((product) => 
            this.productService.getProductById(product.productId).pipe(
              map((data: ProductResponse) => ({ ...product, categories: data.categories }))
            )
          )
        )
      )
    ).subscribe({
        next: (productsWithCategories) => {
          this.listOfProductsCart = productsWithCategories;
        },
        error: (error) => { console.error({ error }) }
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
}
