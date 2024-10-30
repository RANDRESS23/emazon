import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { ProductSupplyRequest, ProductSupplyResponse } from '@utils/interfaces/supply';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  private BASE_URL: string = environment.BASE_URL_TRANSACTION;

  constructor(private http: HttpClient) { }

  saveSupply(supply: ProductSupplyRequest): Observable<ProductSupplyResponse> {
    return this.http.post<ProductSupplyResponse>(`${this.BASE_URL}/supply`, supply);
  }
}
