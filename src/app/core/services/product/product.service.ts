import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageProducts, ProductRequest, ProductResponse } from '@utils/interfaces/product';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL: string = environment.BASE_URL_STOCK;

  constructor(private http: HttpClient) { }

  saveProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.BASE_URL}/product`, product);
  }

  getAllProducts(page: number, size: number, sortOrder: string, sortBy: string): Observable<PageProducts> {
    return this.http.get<PageProducts>(`${this.BASE_URL}/product?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
  }
}
