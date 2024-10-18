export interface BrandRequest {
  name: string;
  description: string;
}

export interface BrandResponse extends BrandRequest {
  brandId: number;
}

export interface BrandProductResponse {
  brandId: number;
  name: string;
}

export interface PageBrands {
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	content: BrandResponse[]
}