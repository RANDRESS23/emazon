import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Cart, CartProduct, CartProductRequest } from '@utils/interfaces/cart';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BASE_URL: string = environment.BASE_URL_CART;
  private cart: Cart = { products: [] as CartProduct[] } as Cart;
  private _cart: BehaviorSubject<Cart>;

  constructor(private http: HttpClient) {
    this._cart = new BehaviorSubject<Cart>(this.cart);
  }
  
  get cartClient(): Observable<Cart> {
    return this._cart.asObservable();
  }

  saveProductInTheCart(product: CartProductRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.BASE_URL}/cart`, product).pipe(
      tap((response: Cart) => {
        this.cart = response;
        this._cart.next(this.cart);
      })
    );
  }
  
  removeProductInTheCart(product: CartProductRequest): Observable<Cart> {
    return this.http.request<Cart>('delete', `${this.BASE_URL}/cart`, { body: product }).pipe(
      tap((response: Cart) => {
        this.cart = response;
        this._cart.next(this.cart);
      })
    );
  }

  getTotalProductsInTheCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.BASE_URL}/cart/all`);
  }

  setCartProducts(products: CartProduct[]): void {
    this.cart.products = products;
    this._cart.next(this.cart);
  }
}
