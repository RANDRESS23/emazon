import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryRequest, CategoryResponse, PageCategories } from '@src/app/shared/utils/interfaces/category';
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
  
  getAllCategories(page: number, size: number, sortOrder: string): Observable<PageCategories> {
    return this.http.get<PageCategories>(`${this.BASE_URL}/category?page=${page}&size=${size}&sortOrder=${sortOrder}`);
  }

  getTotalCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.BASE_URL}/category/all`);
  }
}
