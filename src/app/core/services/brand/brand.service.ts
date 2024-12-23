import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandRequest, BrandResponse, PageBrands } from '@src/app/shared/utils/interfaces/brand';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private BASE_URL: string = environment.BASE_URL_STOCK;

  constructor(private http: HttpClient) { }

  saveBrand(brand: BrandRequest): Observable<BrandResponse> {
    return this.http.post<BrandResponse>(`${this.BASE_URL}/brand`, brand);
  }

  getAllBrands(page: number, size: number, sortOrder: string): Observable<PageBrands> {
    return this.http.get<PageBrands>(`${this.BASE_URL}/brand?page=${page}&size=${size}&sortOrder=${sortOrder}`);
  }
  
  getTotalBrands(): Observable<BrandResponse[]> {
    return this.http.get<BrandResponse[]>(`${this.BASE_URL}/brand/all`);
  }
}
