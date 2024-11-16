import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cart, CartProductRequest, CartProductsBoughtDto, ListCartProducts } from '@utils/interfaces/cart';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should save product in the cart and update cart state', (done) => {
    service['cartPaged'] = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 1, totalPrice: 50, createdAt: '', updatedAt: '' },
      products: { 
        pageNumber: 1, 
        pageSize: 10, 
        totalElements: 1, 
        totalPages: 1, 
        content: [{ productId: 123, totalQuantityInCart: 1, stockQuantity: 100, unitPrice: 50, totalPrice: 50, nextSupplyDate: '', name: 'product', brand: { brandId: 1, name: 'brand' }, cartProductId: 1, categories: [{ name: 'categoría', categoryId: 1 }] }] 
      }
    };
    const product: CartProductRequest = { productId: 123, quantity: 2 };
    const response: Cart = { 
      cartId: 1, clientId: 1, totalQuantity: 2, totalPrice: 100, createdAt: '', updatedAt: '', products: [] 
    };

    service.saveProductInTheCart(product).subscribe((res) => {
      expect(res).toEqual(response);
      done();
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/cart`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should remove product from the cart and update cart state', (done) => {
    service['cartPaged'] = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 1, totalPrice: 50, createdAt: '', updatedAt: '' },
      products: { 
        pageNumber: 1, 
        pageSize: 10, 
        totalElements: 1, 
        totalPages: 1, 
        content: [{ productId: 123, totalQuantityInCart: 1, stockQuantity: 100, unitPrice: 50, totalPrice: 50, nextSupplyDate: '', name: 'product', brand: { brandId: 1, name: 'brand' }, cartProductId: 1, categories: [{ name: 'categoría', categoryId: 1 }] }] 
      }
    };
    const product: CartProductRequest = { productId: 123, quantity: 1 };
    const response: Cart = { 
      cartId: 1, clientId: 1, totalQuantity: 1, totalPrice: 50, createdAt: '', updatedAt: '', products: [] 
    };

    service.removeProductInTheCart(product).subscribe((res) => {
      expect(res).toEqual(response);
      done();
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/cart`);
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });

  it('should get all cart products and update cartPaged', (done) => {
    const response: ListCartProducts = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 3, totalPrice: 300, createdAt: '', updatedAt: '' },
      products: { pageNumber: 1, pageSize: 10, totalElements: 3, totalPages: 1, content: [] }
    };

    service.getAllCartProducts(1, 10, 'asc', 'all', 'all').subscribe((res) => {
      expect(res).toEqual(response);
      done();
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/cart?page=1&size=10&sortOrder=asc&category=all&brand=all`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should get total products in the cart', (done) => {
    const response: Cart = { 
      cartId: 1, clientId: 1, totalQuantity: 5, totalPrice: 500, createdAt: '', updatedAt: '', products: [] 
    };

    service.getTotalProductsInTheCart().subscribe((res) => {
      expect(res).toEqual(response);
      done();
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/cart/all`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should increment and update cart products correctly', () => {
    service['cartPaged'] = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 1, totalPrice: 50, createdAt: '', updatedAt: '' },
      products: { 
        pageNumber: 1, 
        pageSize: 10, 
        totalElements: 1, 
        totalPages: 1, 
        content: [{ productId: 123, totalQuantityInCart: 1, stockQuantity: 100, unitPrice: 50, totalPrice: 50, nextSupplyDate: '', name: 'product', brand: { brandId: 1, name: 'brand' }, cartProductId: 1, categories: [{ name: 'categoría', categoryId: 1 }] }] 
      }
    };

    const product: CartProductRequest = { productId: 123, quantity: 1 };
    const response: Cart = { 
      cartId: 1, clientId: 1, totalQuantity: 2, totalPrice: 100, createdAt: '', updatedAt: '', products: []
    };

    service['setCart'](product, response, true);
    expect(service['cartPaged'].products.content[0].totalQuantityInCart).toBe(2);
    expect(service['cartPaged'].products.content[0].totalPrice).toBe(100);
  });

  it('should decrement and update cart products correctly', () => {
    service['cartPaged'] = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 2, totalPrice: 100, createdAt: '', updatedAt: '' },
      products: { 
        pageNumber: 1, 
        pageSize: 10, 
        totalElements: 1, 
        totalPages: 1, 
        content: [{ productId: 123, totalQuantityInCart: 2, stockQuantity: 100, unitPrice: 50, totalPrice: 100, nextSupplyDate: '', name: 'product', brand: { brandId: 1, name: 'brand' }, cartProductId: 1, categories: [{ name: 'categoría', categoryId: 1 }] }] 
      }
    };

    const product: CartProductRequest = { productId: 123, quantity: 1 };
    const response: Cart = { 
      cartId: 1, clientId: 1, totalQuantity: 1, totalPrice: 50, createdAt: '', updatedAt: '', products: []
    };

    service['setCart'](product, response, false);
    expect(service['cartPaged'].products.content[0].totalQuantityInCart).toBe(1);
    expect(service['cartPaged'].products.content[0].totalPrice).toBe(50);
  });

  it('should reset cartPaged to initial state', () => {
    service['cartPaged'] = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 1, totalPrice: 50, createdAt: '', updatedAt: '' },
      products: { 
        pageNumber: 1, 
        pageSize: 10, 
        totalElements: 1, 
        totalPages: 1, 
        content: [{ productId: 123, totalQuantityInCart: 1, stockQuantity: 100, unitPrice: 50, totalPrice: 50, nextSupplyDate: '', name: 'product', brand: { brandId: 1, name: 'brand' }, cartProductId: 1, categories: [{ name: 'categoría', categoryId: 1 }] }] 
      }
    };

    service.setInitialCart();
    expect(service['cartPaged']).toEqual({} as ListCartProducts);
  });

  it('should make a POST request to buy cart products and call setInitialCart', (done) => {
    const mockResponse: CartProductsBoughtDto = { message: 'Purchase successful' };

    service.buyCartProducts().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/cart/buy`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});

    req.flush(mockResponse);
  });
});
