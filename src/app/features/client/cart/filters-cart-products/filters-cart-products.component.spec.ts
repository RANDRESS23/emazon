import { TestBed } from '@angular/core/testing';
import { FiltersCartProductsComponent } from './filters-cart-products.component';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { BrandResponse } from '@utils/interfaces/brand';
import { EventEmitter } from '@angular/core';
import { of, throwError } from 'rxjs';
import { CategoryResponse } from '@utils/interfaces/category';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ListCartProducts } from '@utils/interfaces/cart';

describe('FiltersCartProductsComponent', () => {
  let component: FiltersCartProductsComponent;
  let cartServiceMock: jest.Mocked<CartService>;
  let brandServiceMock: jest.Mocked<BrandService>;
  let categoryServiceMock: jest.Mocked<CategoryService>;

  beforeEach(() => {
    cartServiceMock = {
      getAllCartProducts: jest.fn()
    } as unknown as jest.Mocked<CartService>;

    brandServiceMock = {
      getTotalBrands: jest.fn()
    } as unknown as jest.Mocked<BrandService>;

    categoryServiceMock = {
      getTotalCategories: jest.fn()
    } as unknown as jest.Mocked<CategoryService>;

    TestBed.configureTestingModule({
      declarations: [FiltersCartProductsComponent],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: BrandService, useValue: brandServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(FiltersCartProductsComponent);
    component = fixture.componentInstance;
    component.showFilterOrders = new EventEmitter<any>();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load cart products, brands, and categories on ngOnInit', () => {
    const mockCartProducts: ListCartProducts = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 10, totalPrice: 100, createdAt: new Date(), updatedAt: new Date() },
      products: {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 1,
        totalPages: 1,
        content: []
      }
    };

    cartServiceMock.getAllCartProducts.mockReturnValue(of(mockCartProducts));
    brandServiceMock.getTotalBrands.mockReturnValue(of([{ brandId: 1, name: 'Brand1' }] as BrandResponse[]));
    categoryServiceMock.getTotalCategories.mockReturnValue(of([{ categoryId: 1, name: 'Category1' }] as CategoryResponse[]));

    component.ngOnInit();

    expect(cartServiceMock.getAllCartProducts).toHaveBeenCalledWith(
      component.pageNumber, component.size, component.sortOrder, component.filterCategory, component.filterBrand
    );
    expect(brandServiceMock.getTotalBrands).toHaveBeenCalled();
    expect(categoryServiceMock.getTotalCategories).toHaveBeenCalled();
  });

  it('should emit changes when changeShowBy is called', () => {
    jest.spyOn(component.showFilterOrders, 'emit');
    component.changeShowBy('10');
    expect(component.showBy).toBe('10');
    expect(component.showFilterOrders.emit).toHaveBeenCalledWith([component.showBy, component.sortOrder, component.filterCategory, component.filterBrand]);
  });

  it('should emit changes when changeSortOrder is called', () => {
    jest.spyOn(component.showFilterOrders, 'emit');
    component.changeSortOrder('asc');
    expect(component.sortOrder).toBe('asc');
    expect(component.showFilterOrders.emit).toHaveBeenCalledWith([component.showBy, component.sortOrder, component.filterCategory, component.filterBrand]);
  });

  it('should emit changes when changeFilterCategory is called', () => {
    jest.spyOn(component.showFilterOrders, 'emit');
    component.changeFilterCategory('category1');
    expect(component.filterCategory).toBe('category1');
    expect(component.showFilterOrders.emit).toHaveBeenCalledWith([component.showBy, component.sortOrder, component.filterCategory, component.filterBrand]);
  });

  it('should emit changes when changeFilterBrand is called', () => {
    jest.spyOn(component.showFilterOrders, 'emit');
    component.changeFilterBrand('brand1');
    expect(component.filterBrand).toBe('brand1');
    expect(component.showFilterOrders.emit).toHaveBeenCalledWith([component.showBy, component.sortOrder, component.filterCategory, component.filterBrand]);
  });

  it('should fetch and set brands correctly in getBrands', () => {
    const mockCartClient: ListCartProducts = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 10, totalPrice: 100, createdAt: new Date(), updatedAt: new Date() },
      products: { pageNumber: 0, pageSize: 10, totalElements: 1, totalPages: 1, content: [{ productId: 1, cartProductId: 1, name: 'product', nextSupplyDate: new Date(), stockQuantity: 100, unitPrice: 100, totalQuantityInCart: 2, totalPrice: 200, brand: { brandId: 1, name: 'Brand1' }, categories: [{ categoryId: 1, name: 'Category1' }] }] }
    };

    brandServiceMock.getTotalBrands.mockReturnValue(of([{ brandId: 1, name: 'Brand1', description: 'Description1' }]));
    component.getBrands(mockCartClient);

    expect(brandServiceMock.getTotalBrands).toHaveBeenCalled();
    expect(component.optionsFilterBrandDropdown).toEqual([{ label: 'Todas las marcas', value: 'all' }, { label: 'Brand1', value: 'Brand1' }]);
  });

  it('should fetch and set categories correctly in getCategories', () => {
    const mockCartClient: ListCartProducts = {
      cart: { cartId: 1, clientId: 1, totalQuantity: 10, totalPrice: 100, createdAt: new Date(), updatedAt: new Date() },
      products: { pageNumber: 0, pageSize: 10, totalElements: 1, totalPages: 1, content: [{ productId: 1, cartProductId: 1, name: 'product', nextSupplyDate: new Date(), stockQuantity: 100, unitPrice: 100, totalQuantityInCart: 2, totalPrice: 200, brand: { brandId: 1, name: 'Brand1' }, categories: [{ categoryId: 1, name: 'Category1' }] }] }
    };

    categoryServiceMock.getTotalCategories.mockReturnValue(of([{ categoryId: 1, name: 'Category1', description: 'Description1' }]));
    component.getCategories(mockCartClient);

    expect(categoryServiceMock.getTotalCategories).toHaveBeenCalled();
    expect(component.optionsFilterCategoryDropdown).toEqual([{ label: 'Todas las categorías', value: 'all' }, { label: 'Category1', value: 'Category1' }]);
  });

  it('should handle error in ngOnInit when getAllCartProducts fails', () => {
    const error = new Error('Failed to load cart products');
    cartServiceMock.getAllCartProducts.mockReturnValue(throwError(() => error));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();

    expect(cartServiceMock.getAllCartProducts).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.filterCategory,
      component.filterBrand
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith({ error });

    consoleErrorSpy.mockRestore();
  });

  it('should return cart products in getCartProducts', () => {
    const mockProducts = [{ cartProductId: 1, name: 'Product 1' }] as any;
    const mockData = { products: { content: mockProducts } } as ListCartProducts;
    cartServiceMock.getAllCartProducts.mockReturnValue(of(mockData));

    const products = component.getCartProducts();

    expect(products).toEqual(mockProducts);
    expect(cartServiceMock.getAllCartProducts).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.filterCategory,
      component.filterBrand
    );
  });

  it('should handle error in getCartProducts when getAllCartProducts fails', () => {
    const error = new Error('Failed to load cart products');
    cartServiceMock.getAllCartProducts.mockReturnValue(throwError(() => error));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const products = component.getCartProducts();

    expect(products).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith({ error });

    consoleErrorSpy.mockRestore();
  });

  it('should filter brands in getBrands', () => {
    const cartClientMock = { products: { content: [{ brand: { name: 'Brand1' } }] } } as ListCartProducts;
    const brandData = [{ name: 'Brand1' }, { name: 'Brand2' }] as BrandResponse[];
    brandServiceMock.getTotalBrands.mockReturnValue(of(brandData));

    component.getBrands(cartClientMock);

    expect(component.optionsFilterBrandDropdown).toEqual([
      { label: 'Todas las marcas', value: 'all' },
      { label: 'Brand1', value: 'Brand1' }
    ]);
  });

  it('should handle error in getBrands when getTotalBrands fails', () => {
    const error = new Error('Failed to load brands');
    brandServiceMock.getTotalBrands.mockReturnValue(throwError(() => error));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const mockProducts = [{ cartProductId: 1, name: 'Product 1' }] as any;
    component.getBrands({ products: { content: mockProducts } } as ListCartProducts);

    expect(consoleErrorSpy).toHaveBeenCalledWith({ error });

    consoleErrorSpy.mockRestore();
  });

  it('should filter categories in getCategories', () => {
    const cartClientMock = { 
      products: { 
        content: [{ categories: [{ name: 'Category1' }, { name: 'Category2' }] }] 
      } 
    } as ListCartProducts;
    const categoryData = [{ name: 'Category1' }, { name: 'Category3' }] as CategoryResponse[];
    categoryServiceMock.getTotalCategories.mockReturnValue(of(categoryData));

    component.getCategories(cartClientMock);

    expect(component.optionsFilterCategoryDropdown).toEqual([
      { label: 'Todas las categorías', value: 'all' },
      { label: 'Category1', value: 'Category1' }
    ]);
  });

  it('should handle error in getCategories when getTotalCategories fails', () => {
    const error = new Error('Failed to load categories');
    categoryServiceMock.getTotalCategories.mockReturnValue(throwError(() => error));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const mockProducts = [{ cartProductId: 1, name: 'Product 1' }] as any;
    component.getCategories({ products: { content: mockProducts } } as ListCartProducts);

    expect(consoleErrorSpy).toHaveBeenCalledWith({ error });

    consoleErrorSpy.mockRestore();
  });

  it('should return an empty array when data, products, or content is undefined in getCartProducts', () => {
    cartServiceMock.getAllCartProducts.mockReturnValue(of({} as ListCartProducts));
  
    const products = component.getCartProducts();
  
    expect(products).toEqual([]);
    expect(cartServiceMock.getAllCartProducts).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.filterCategory,
      component.filterBrand
    );
  });  

  it('should set cartBrands as an empty array when cartClient, products, or content is undefined in getBrands', () => {
    const cartClientMock = {} as ListCartProducts;
  
    brandServiceMock.getTotalBrands.mockReturnValue(of([]));
  
    component.getBrands(cartClientMock);
  
    expect(component.optionsFilterBrandDropdown).toEqual([
      { label: 'Todas las marcas', value: 'all' }
    ]);
  });  

  it('should set cartCategories as an empty array when cartClient, products, or content is undefined in getCategories', () => {
    const cartClientMock = {} as ListCartProducts;
  
    categoryServiceMock.getTotalCategories.mockReturnValue(of([]));
  
    component.getCategories(cartClientMock);
  
    expect(component.optionsFilterCategoryDropdown).toEqual([
      { label: 'Todas las categorías', value: 'all' }
    ]);
  });  
});