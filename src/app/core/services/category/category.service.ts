import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '@src/app/shared/domain/interfaces/category';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BASE_URL: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  saveCategory(category: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${this.BASE_URL}/category`, category);
  }
}
