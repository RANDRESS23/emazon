import { ListOfProductsComponent } from './list-of-products.component';
import { of, throwError } from 'rxjs';
import { ProductService } from '@src/app/core/services/product/product.service';

describe('ListOfProductsComponent', () => {
  let component: ListOfProductsComponent;
  let productService: jest.Mocked<ProductService>;

  beforeEach(() => {
    productService = {
      getAllProducts: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    component = new ListOfProductsComponent(productService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on initialization', () => {
    const mockProducts = { content: [], totalPages: 0, totalElements: 0, pageSize: 10, pageNumber: 0 };
    
    productService.getAllProducts.mockReturnValue(of(mockProducts));
  
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
  
    productService.getAllProducts.mockReturnValue(of(mockProducts));
  
    component.getProducts(1, 10, 'asc', 'name');
  
    expect(component.listOfProducts).toEqual(mockProducts.content);
    expect(component.totalPages).toBe(mockProducts.totalPages);
    expect(component.totalElements).toBe(mockProducts.totalElements);
  });

  it('should log an error if getProducts fails', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  
    productService.getAllProducts.mockReturnValue(throwError(() => new Error('Error fetching products')));
  
    component.getProducts(1, 10, 'asc', 'name');
  
    expect(consoleSpy).toHaveBeenCalledWith({ error: new Error('Error fetching products') });
  
    consoleSpy.mockRestore();
  });

  it('should update pageNumber and fetch products on page change', () => {
    const mockProducts = { content: [], totalPages: 0, totalElements: 0, pageSize: 10, pageNumber: 0 };
    
    productService.getAllProducts.mockReturnValue(of(mockProducts));
  
    component.changePage(2);
  
    expect(component.pageNumber).toBe(2);
  
    expect(productService.getAllProducts).toHaveBeenCalledWith(2, component.size, component.sortOrder, component.sortBy);
  });

  it('should update filter options and fetch products on filter change', () => {
    const mockProducts = { content: [], totalPages: 0, totalElements: 0, pageSize: 10, pageNumber: 0 };
    
    productService.getAllProducts.mockReturnValue(of(mockProducts));
  
    const filterEvent = [10, 'desc', 'price'];
  
    component.showFilterOrders(filterEvent);
  
    expect(component.size).toBe(10);
    expect(component.sortOrder).toBe('desc');
    expect(component.sortBy).toBe('price');
    expect(component.pageNumber).toBe(0);
  
    expect(productService.getAllProducts).toHaveBeenCalledWith(0, 10, 'desc', 'price');
  });  
});