export interface CategoryRequest {
  name: string;
  description: string;
}

export interface CategoryResponse extends CategoryRequest {
  categoryId: number;
}

export interface CategoryProductResponse {
  categoryId: number;
  name: string;
}

export interface PageCategories {
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	content: CategoryResponse[]
}