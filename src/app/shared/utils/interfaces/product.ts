import { BrandProductResponse } from "./brand";
import { CategoryProductResponse } from "./category";

export interface ProductRequestDto {
  name: string;
  description: string;
  quantity: string | number;
  price: string | number;
}

export interface ProductRequest extends ProductRequestDto {
  categoriesId: number[];
  brandId: number;
}

export interface ProductResponse {
  productId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  categories: CategoryProductResponse[];
  brand: BrandProductResponse;
}

export interface PageProducts {
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	content: ProductResponse[]
}