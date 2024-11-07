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