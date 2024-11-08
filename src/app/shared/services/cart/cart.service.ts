import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Cart, CartProductRequest, ListCartProducts } from '@utils/interfaces/cart';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BASE_URL: string = environment.BASE_URL_CART;
  private cartPaged: ListCartProducts = {} as ListCartProducts;
  private _cart_paged: BehaviorSubject<ListCartProducts>;

  constructor(private http: HttpClient) {
    this._cart_paged = new BehaviorSubject<ListCartProducts>(this.cartPaged);
  }

  get cartPagedClient(): Observable<ListCartProducts> {
    return this._cart_paged.asObservable();
  }

  saveProductInTheCart(product: CartProductRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.BASE_URL}/cart`, product).pipe(
      tap((response: Cart) => {
        this.setCart(product, response, true);
      })
    );
  }
  
  removeProductInTheCart(product: CartProductRequest): Observable<Cart> {
    return this.http.request<Cart>('delete', `${this.BASE_URL}/cart`, { body: product }).pipe(
      tap((response: Cart) => {
        this.setCart(product, response, false);
      })
    );
  }

  getAllCartProducts(page: number, size: number, sortOrder: string, category: string, brand: string): Observable<ListCartProducts> {
    return this.http.get<ListCartProducts>(`${this.BASE_URL}/cart?page=${page}&size=${size}&sortOrder=${sortOrder}&category=${category}&brand=${brand}`).pipe(
      tap((response: ListCartProducts) => {
        this.cartPaged = response;
        this._cart_paged.next(this.cartPaged);
      })
    );
  }

  getTotalProductsInTheCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.BASE_URL}/cart/all`);
  }

  private setCart(product: CartProductRequest, cart: Cart, isAddProductInTheCart: boolean): void {
    const { products: _, ...restCart } = cart;
    const productsUpdated = this.cartPaged.products.content.map((productCart) => {
      if (productCart.productId === product.productId) {
        return { 
          ...productCart, 
          totalQuantityInCart: isAddProductInTheCart 
            ? productCart.totalQuantityInCart + product.quantity 
            : productCart.totalQuantityInCart - product.quantity, 
          totalPrice: isAddProductInTheCart 
            ? productCart.totalPrice + (productCart.unitPrice * product.quantity) 
            : productCart.totalPrice - (productCart.unitPrice * product.quantity) 
        };
      }
      return productCart; 
    }).filter((productCart) => productCart.totalQuantityInCart > 0);

    this.cartPaged.cart = restCart;
    this.cartPaged.products.content = productsUpdated;
    this._cart_paged.next(this.cartPaged);
  }

  setInitialCart(): void {
    this.cartPaged = {} as ListCartProducts;
    this._cart_paged.next(this.cartPaged);
  }
}
