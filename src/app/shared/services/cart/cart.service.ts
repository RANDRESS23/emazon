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
  private cartProducts: CartProduct[] = [];
  private _products: BehaviorSubject<CartProduct[]>;

  constructor(private http: HttpClient) {
    this._products = new BehaviorSubject<CartProduct[]>(this.cartProducts);
  }

  get products(): Observable<CartProduct[]> {
    return this._products.asObservable();
  }

  saveProductInTheCart(product: CartProductRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.BASE_URL}/cart`, product).pipe(
      tap((response: Cart) => {
        this.cartProducts = response.products;
        this._products.next(this.cartProducts);
      })
    );;
  }

  getTotalProductsInTheCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.BASE_URL}/cart/all`);
  }

  setCartProducts(products: CartProduct[]): void {
    this.cartProducts = products;
    this._products.next(this.cartProducts);
  }
}
