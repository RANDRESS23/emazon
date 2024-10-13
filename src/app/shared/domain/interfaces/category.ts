export interface CategoryRequest {
  name: string;
  description: string;
}

export interface CategoryResponse {
  categoryId: number;
  name: string;
  description: string;
}

export interface PageCategories {
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	content: CategoryResponse[]
}