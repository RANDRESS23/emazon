import { ListOfProductsSupplyComponent } from './list-of-products-supply.component';
import { ProductService } from '@src/app/core/services/product/product.service';
import { PageProducts } from '@utils/interfaces/product';
import { of, throwError } from 'rxjs';
import { INITIAL_PAGE_TABLE } from '@utils/constants/admin';

describe('ListOfProductsSupplyComponent', () => {
  let component: ListOfProductsSupplyComponent;
  let productServiceMock: jest.Mocked<ProductService>;

  beforeEach(() => {
    productServiceMock = {
      getAllProducts: jest.fn().mockReturnValue(of({ 
        pageNumber: 1,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        content: []
      }))
    } as unknown as jest.Mocked<ProductService>;

    component = new ListOfProductsSupplyComponent(productServiceMock);
  });

  it('should call getProducts on initialization', () => {
    const getProductsSpy = jest.spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(getProductsSpy).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.sortBy
    );
  });

  it('should update showModal callback when showModalOutput is called', () => {
    const mockCallback = jest.fn();
    component.showModalOutput(mockCallback);
    expect(component.showModal).toBe(mockCallback);
  });

  it('should set productId and call showModal when showModalWithProductId is called', () => {
    const mockProduct = { productId: 123 };
    const showModalSpy = jest.spyOn(component, 'showModal');
    component.showModalWithProductId(mockProduct);
    expect(component.productId).toBe(123);
    expect(showModalSpy).toHaveBeenCalled();
  });

  it('should call getProducts with updated page number when changePage is called', () => {
    const getProductsSpy = jest.spyOn(component, 'getProducts');
    component.changePage(2);
    expect(component.pageNumber).toBe(2);
    expect(getProductsSpy).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.sortBy
    );
  });

  it('should update listOfProducts, totalPages, and totalElements when getProducts succeeds', () => {
    const mockResponse: PageProducts = {
      pageNumber: 1,
      pageSize: 10,
      totalElements: 2,
      totalPages: 3,
      content: [
        { productId: 1, name: 'Product 1', description: 'Desc 1', quantity: 10, price: 100, categories: [], brand: { brandId: 1, name: 'Brand A' } },
        { productId: 2, name: 'Product 2', description: 'Desc 2', quantity: 5, price: 200, categories: [], brand: { brandId: 2, name: 'Brand B' } }
      ]
    };

    productServiceMock.getAllProducts.mockReturnValue(of(mockResponse));

    component.getProducts(1, 10, 'asc', 'name');

    expect(productServiceMock.getAllProducts).toHaveBeenCalledWith(1, 10, 'asc', 'name');
    expect(component.listOfProducts).toEqual([
      { productId: 1, name: 'Product 1', quantity: 10, accion: { icon: 'add', accion: expect.any(Function) } },
      { productId: 2, name: 'Product 2', quantity: 5, accion: { icon: 'add', accion: expect.any(Function) } }
    ]);
    expect(component.totalPages).toBe(3);
    expect(component.totalElements).toBe(2);
  });

  it('should log error when getProducts fails', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockError = { status: 500, message: 'Server error' };
    productServiceMock.getAllProducts.mockReturnValue(throwError(mockError));

    component.getProducts(1, 10, 'asc', 'name');

    expect(consoleSpy).toHaveBeenCalledWith({ error: mockError });
  });

  it('should call getProducts with current page details when addNewSupplyCount is called', () => {
    const getProductsSpy = jest.spyOn(component, 'getProducts');
    component.addNewSupplyCount();
    expect(getProductsSpy).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.sortBy
    );
  });

  it('should update size, sortOrder, sortBy, and pageNumber and call getProducts when showFilterOrders is called', () => {
    const getProductsSpy = jest.spyOn(component, 'getProducts');
    const event = [20, 'desc', 'price'];
    component.showFilterOrders(event);

    expect(component.size).toBe(20);
    expect(component.sortOrder).toBe('desc');
    expect(component.sortBy).toBe('price');
    expect(component.pageNumber).toBe(INITIAL_PAGE_TABLE);
    expect(getProductsSpy).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.sortBy
    );
  });
});