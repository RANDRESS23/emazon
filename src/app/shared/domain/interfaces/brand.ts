export interface BrandRequest {
  name: string;
  description: string;
}

export interface BrandResponse {
  brandId: number;
  name: string;
  description: string;
}

export interface PageBrands {
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	content: BrandResponse[]
}