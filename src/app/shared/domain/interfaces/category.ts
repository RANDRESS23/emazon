export interface CategoryRequest {
  name: string;
  description: string;
}

export interface CategoryResponse {
  categoryId: number;
  name: string;
  description: string;
}