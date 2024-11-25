import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { ProductService } from '@src/app/core/services/product/product.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { INITIAL_PAGE_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE } from '@utils/constants/admin';
import { ADD_PRODUCT_TO_CART_BUTTON_TEXT, ERROR_CLIENT_NOT_LOGGED2, ERROR_CLIENT_NOT_LOGGED3, INITIAL_FILTER_BRAND, INITIAL_FILTER_CATEGORY, INITIAL_SIZE_PRODUCTS, PRODUCT_ID_VALUE, PRODUCT_REMOVED_IN_CART, PRODUCT_SAVED_IN_CART, PRODUCTS_REMOVED_IN_CART } from '@utils/constants/client';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH, ZERO } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { RolesEnum } from '@utils/enums/roles';
import { SizeEnum } from '@utils/enums/size';
import { StatusEnum } from '@utils/enums/status';
import { Cart, ListCartProducts } from '@utils/interfaces/cart';
import { ProductResponse } from '@utils/interfaces/product';
import { ButtonType } from '@utils/types/button';
import { Size } from '@utils/types/size';

@Component({
  selector: 'app-all-product-detail',
  templateUrl: './all-product-detail.component.html',
  styleUrls: ['./all-product-detail.component.scss']
})
export class AllProductDetailComponent implements OnInit {
  buttonText: string = ADD_PRODUCT_TO_CART_BUTTON_TEXT;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  toastMessage: string = EMPTY_STRING;
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_PRODUCTS;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  filterCategory: string = INITIAL_FILTER_CATEGORY;
  filterBrand: string = INITIAL_FILTER_BRAND;
  product: ProductResponse = { brand: { name: EMPTY_STRING } } as ProductResponse;
  productQuantityInTheCart: number = ZERO;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private toastService: ToastService, private productService: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const productId: number = params[PRODUCT_ID_VALUE];
      
      this.productService.getProductById(productId).subscribe({
        next: (data: ProductResponse) => {
          this.product = data;
        },
        error: (error) => {
          console.error({ error });
          this.router.navigate(['/']);
        }
      });
    });

    this.cartService.cartPagedClient.subscribe((cartPagedClient) => {
      const listOfProductsCart = cartPagedClient?.products?.content || [];

      if (listOfProductsCart.length === 0) this.productQuantityInTheCart = ZERO;

      listOfProductsCart.forEach((product) => {
        if (product.productId === this.product.productId) this.productQuantityInTheCart = product.totalQuantityInCart;
      });
    });

    this.cartService.getTotalProductsInTheCart().subscribe({
      next: (data: Cart) => {
        this.size = data.products.length !== 0 ? data.products.length : INITIAL_SIZE_PRODUCTS;
        
        this.getCartProducts();
      },
      error: (error) => {
        console.error({ error });
      }
    })
  }

  getCartProducts(): void {
    this.cartService.getAllCartProducts(this.pageNumber, this.size, this.sortOrder, this.filterCategory, this.filterBrand).subscribe({
      next: (data: ListCartProducts) => {
        const listOfProductsCart = data?.products?.content || [];

        if (listOfProductsCart.length === 0) this.productQuantityInTheCart = ZERO;

        listOfProductsCart.forEach((product) => {
          if (product.productId === this.product.productId) this.productQuantityInTheCart = product.totalQuantityInCart;
        });
      },
      error: (error) => {
        console.error({ error });
      }
    });
  }

  deleteProductCart(productId: number, quantity: number = 1): void {
      if (this.authService.isAuthenticated() 
        && this.authService.getRole() === RolesEnum.CLIENTE) {
          
          if (this.productQuantityInTheCart === 0) return;

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
      } else {
        this.toastService.showToast(ERROR_CLIENT_NOT_LOGGED3, StatusEnum.ERROR, ERROR_ICON_PATH);
      }
  }

  addProductCart(productId: number): void {
    if (this.authService.isAuthenticated() 
      && this.authService.getRole() === RolesEnum.CLIENTE) {
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
    } else {
      this.toastService.showToast(ERROR_CLIENT_NOT_LOGGED2, StatusEnum.ERROR, ERROR_ICON_PATH);
    }
  }
}
