import { BrandProductResponse } from "./brand";
import { CategoryProductResponse } from "./category";

export interface CartProduct {
  cartProductId: number;
  cartId: number;
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
} 

export interface CartProductInfo extends CartProduct {
  brand: BrandProductResponse;
  categories: CategoryProductResponse[];
} 

export interface Cart {
  cartId: number;
  clientId: number;
  totalQuantity: number;
  totalPrice: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  products: CartProduct[];
}

export interface CartProductRequest {
  productId: number;
  quantity: number;
}

export interface CartProductFullInfo {
  cartProductId: number;
  productId: number;
  name: string;
  stockQuantity: number;
  nextSupplyDate: Date | string;
  totalQuantityInCart: number;
  unitPrice: number;
  totalPrice: number;
  categories: CategoryProductResponse[];
  brand: BrandProductResponse;
}

export interface PageProducts {
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	content: CartProductFullInfo[]
}

export interface ListCartProducts {
  cart: Omit<Cart, 'products'>;
  products: PageProducts;
}

export interface CartProductsBoughtDto {
  message: string;
}