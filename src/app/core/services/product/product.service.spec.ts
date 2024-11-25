import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@src/environments/environment';
import { PageProducts, ProductRequest, ProductResponse } from '@utils/interfaces/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  const BASE_URL = environment.BASE_URL_STOCK;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveProduct', () => {
    it('should make a POST request to save the product', () => {
      const mockProductRequest: ProductRequest = { name: 'Test Product', description: 'description', quantity: 100, price: 100, brandId: 1, categoriesId: [1] };
      const mockProductResponse: ProductResponse = { productId: 1, name: 'Test Product', description: 'description', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] };

      service.saveProduct(mockProductRequest).subscribe(response => {
        expect(response).toEqual(mockProductResponse);
      });

      const req = httpTestingController.expectOne(`${BASE_URL}/product`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockProductRequest);

      req.flush(mockProductResponse);
    });
  });

  describe('getAllProducts', () => {
    it('should make a GET request to retrieve all products with pagination', () => {
      const mockPageProducts: PageProducts = {
        content: [
          { productId: 1, name: 'Test Product', description: 'description', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] },
          { productId: 1, name: 'Test Product', description: 'description', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] }
        ],
        totalElements: 2,
        totalPages: 1,
        pageSize: 10,
        pageNumber: 0
      };

      const page = 0;
      const size = 10;
      const sortOrder = 'asc';
      const sortBy = 'name';

      service.getAllProducts(page, size, sortOrder, sortBy).subscribe(response => {
        expect(response).toEqual(mockPageProducts);
      });

      const req = httpTestingController.expectOne(`${BASE_URL}/product?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockPageProducts);
    });
  });
});