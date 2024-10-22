import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { PageWarehouseAssistants, WarehouseAssistantRequest, WarehouseAssistantResponse } from '@utils/interfaces/warehouse-assistant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseAssistantService {
  private BASE_URL: string = environment.BASE_URL_USER;

  constructor(private http: HttpClient) { }

  saveWarehouseAssistant(warehouseAssistant: WarehouseAssistantRequest): Observable<WarehouseAssistantResponse> {
    return this.http.post<WarehouseAssistantResponse>(`${this.BASE_URL}/user/aux-bodega-user`, warehouseAssistant);
  }

  getAllWarehouseAssistants(page: number, size: number, sortOrder: string, sortBy: string): Observable<PageWarehouseAssistants> {
    return this.http.get<PageWarehouseAssistants>(`${this.BASE_URL}/user/aux-bodega-user?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
  }
}
