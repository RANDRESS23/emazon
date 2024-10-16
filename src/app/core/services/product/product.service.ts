import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRequest, ProductResponse } from '@domain/interfaces/product';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  saveProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.BASE_URL}/product`, product);
  }
}
