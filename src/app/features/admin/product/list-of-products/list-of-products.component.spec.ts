import { ListOfProductsComponent } from './list-of-products.component';
import { of, throwError } from 'rxjs';
import { ProductService } from '@src/app/core/services/product/product.service';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { RolesEnum } from '@utils/enums/roles';
import { PageProducts } from '@utils/interfaces/product';

describe('ListOfProductsComponent', () => {
  let component: ListOfProductsComponent;
  let productService: ProductService;
  let authService: jest.Mocked<AuthService>;

  const mockPageProducts: PageProducts = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 2,
    totalPages: 1,
    content: [
      { productId: 1, name: 'Product 1', description: 'Description of product 1', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] },
      { productId: 2, name: 'Product 2', description: 'Description of product 2', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] },
    ]
  };

  beforeEach(() => {
    const productServiceMock = {
      getAllProducts: jest.fn().mockReturnValue(of(mockPageProducts))
    }

    const authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ListOfProductsComponent,
        { provide: AuthService, useValue: authServiceMock },
        { provide: ProductService, useValue: productServiceMock },
      ],
    });

    component = TestBed.inject(ListOfProductsComponent);
    productService = TestBed.inject(ProductService);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on initialization', () => {
    const mockProducts = { content: [], totalPages: 0, totalElements: 0, pageSize: 10, pageNumber: 0 };
    
    jest.spyOn(productService, 'getAllProducts').mockReturnValue(of(mockProducts));
  
    component.ngOnInit();
  
    expect(productService.getAllProducts).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.sortBy
    );
  });

  it('should fetch and update the list of products', () => {
    const mockProducts = {
      content: [{ productId: 1, name: 'Test Product', description: 'description', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] }, { productId: 1, name: 'Test Product', description: 'description', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] }],
      totalPages: 2,
      totalElements: 2,
      pageSize: 10,
      pageNumber: 0
    };
  
    jest.spyOn(productService, 'getAllProducts').mockReturnValue(of(mockProducts));
  
    component.getProducts(1, 10, 'asc', 'name');
  
    expect(component.listOfProducts).toEqual(mockProducts.content);
    expect(component.totalPages).toBe(mockProducts.totalPages);
    expect(component.totalElements).toBe(mockProducts.totalElements);
  });

  it('should log an error if getProducts fails', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  
    jest.spyOn(productService, 'getAllProducts').mockReturnValue(throwError(() => new Error('Error fetching products')));
  
    component.getProducts(1, 10, 'asc', 'name');
  
    expect(consoleSpy).toHaveBeenCalledWith({ error: new Error('Error fetching products') });
  
    consoleSpy.mockRestore();
  });

  it('should update pageNumber and fetch products on page change', () => {
    const mockProducts = { content: [], totalPages: 0, totalElements: 0, pageSize: 10, pageNumber: 0 };
    
    jest.spyOn(productService, 'getAllProducts').mockReturnValue(of(mockProducts));
  
    component.changePage(2);
  
    expect(component.pageNumber).toBe(2);
  
    expect(jest.spyOn(productService, 'getAllProducts')).toHaveBeenCalledWith(2, component.size, component.sortOrder, component.sortBy);
  });

  it('should update filter options and fetch products on filter change', () => {
    const mockProducts = { content: [], totalPages: 0, totalElements: 0, pageSize: 10, pageNumber: 0 };
    
    jest.spyOn(productService, 'getAllProducts').mockReturnValue(of(mockProducts));
  
    const filterEvent = [10, 'desc', 'price'];
  
    component.showFilterOrders(filterEvent);
  
    expect(component.size).toBe(10);
    expect(component.sortOrder).toBe('desc');
    expect(component.sortBy).toBe('price');
    expect(component.pageNumber).toBe(0);
  
    expect(jest.spyOn(productService, 'getAllProducts')).toHaveBeenCalledWith(0, 10, 'desc', 'price');
  });  

  it('should set showButtonAddProduct to true if the role is ADMIN', () => {
    jest.spyOn(authService, 'getRole').mockReturnValue(RolesEnum.ADMIN);

    component.ngOnInit();

    expect(component.showButtonAddProduct).toBe(true);
    expect(jest.spyOn(authService, 'getRole')).toHaveBeenCalled();
  });
});