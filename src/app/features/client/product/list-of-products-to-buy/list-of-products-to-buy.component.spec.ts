import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfProductsToBuyComponent } from './list-of-products-to-buy.component';
import { of, throwError } from 'rxjs';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { ProductService } from '@src/app/core/services/product/product.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { PageProducts, ProductResponse } from '@utils/interfaces/product';
import { RolesEnum } from '@utils/enums/roles';
import { ERROR_CLIENT_NOT_LOGGED2, PRODUCT_SAVED_IN_CART } from '@utils/constants/client';
import { StatusEnum } from '@utils/enums/status';
import { ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { Router } from '@angular/router';

describe('ListOfProductsToBuyComponent', () => {
  let component: ListOfProductsToBuyComponent;
  let fixture: ComponentFixture<ListOfProductsToBuyComponent>;
  let mockAuthService: any;
  let mockProductService: any;
  let mockToastService: any;
  let mockCartService: any;
  let routerMock: any;

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn()
    };
    
    mockProductService = {
      getAllProducts: jest.fn().mockReturnValue(of({
        content: [],
        totalPages: 1,
        totalElements: 10
      }))
    };

    mockToastService = {
      showToast: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    mockCartService = {
      saveProductInTheCart: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [ListOfProductsToBuyComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ProductService, useValue: mockProductService },
        { provide: ToastService, useValue: mockToastService },
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfProductsToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from getProducts', () => {
    expect(mockProductService.getAllProducts).toHaveBeenCalledWith(
      component.pageNumber, 
      component.size, 
      component.sortOrder, 
      component.sortBy
    );
    expect(component.listOfProducts).toEqual([]);
    expect(component.totalPages).toBe(1);
    expect(component.totalElements).toBe(10);
  });

  it('should change the page number and call getProducts on page change', () => {
    jest.spyOn(component, 'getProducts');
    component.changePage(2);
    expect(component.pageNumber).toBe(2);
    expect(component.getProducts).toHaveBeenCalledWith(2, component.size, component.sortOrder, component.sortBy);
  });

  it('should call navigateToDetail when image product is clicked', () => {
    const productId = 1;

    component.navigateToDetail(productId);
    expect(routerMock.navigate).toHaveBeenCalledWith([`/producto/${productId}`]);
  });

  it('should fetch products and set data on getProducts', () => {
    const mockProductData: PageProducts = {
      pageNumber: 1,
      pageSize: 10,
      totalElements: 20,
      totalPages: 2,
      content: []
    };
    mockProductService.getAllProducts.mockReturnValue(of(mockProductData));
    component.getProducts(1, 10, 'asc', 'name');
    expect(component.listOfProducts).toEqual(mockProductData.content);
    expect(component.totalPages).toBe(mockProductData.totalPages);
    expect(component.totalElements).toBe(mockProductData.totalElements);
  });

  it('should add a product to the cart and show success toast if authenticated and client role', () => {
    const product: ProductResponse = { productId: 1, name: 'Test Product', description: 'A product', quantity: 10, price: 100, categories: [], brand: { brandId: 1, name: 'Test Brand' } };
    mockAuthService.isAuthenticated.mockReturnValue(true);
    mockAuthService.getRole.mockReturnValue(RolesEnum.CLIENTE);
    mockCartService.saveProductInTheCart.mockReturnValue(of({}));

    component.addProductToCart(product);

    expect(mockCartService.saveProductInTheCart).toHaveBeenCalledWith({ productId: product.productId, quantity: 1 });
    expect(mockToastService.showToast).toHaveBeenCalledWith(PRODUCT_SAVED_IN_CART, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
  });

  it('should show error toast if add product to cart fails with 409 or 400 status', () => {
    const product: ProductResponse = { productId: 1, name: 'Test Product', description: 'A product', quantity: 10, price: 100, categories: [], brand: { brandId: 1, name: 'Test Brand' } };
    const error = { status: 409, error: { message: 'Product already in cart' } };
    mockAuthService.isAuthenticated.mockReturnValue(true);
    mockAuthService.getRole.mockReturnValue(RolesEnum.CLIENTE);
    mockCartService.saveProductInTheCart.mockReturnValueOnce(throwError(error));

    component.addProductToCart(product);

    expect(component.toastMessage).toBe('Product already in cart');
    expect(mockToastService.showToast).toHaveBeenCalledWith('Product already in cart', StatusEnum.ERROR, ERROR_ICON_PATH);
  });

  it('should show generic error message if add product to cart fails with unexpected status', () => {
    const product: ProductResponse = { productId: 1, name: 'Test Product', description: 'A product', quantity: 10, price: 100, categories: [], brand: { brandId: 1, name: 'Test Brand' } };
    const error = { status: 500 };
    mockAuthService.isAuthenticated.mockReturnValue(true);
    mockAuthService.getRole.mockReturnValue(RolesEnum.CLIENTE);
    mockCartService.saveProductInTheCart.mockReturnValueOnce(throwError(error));

    component.addProductToCart(product);

    expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
    expect(mockToastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
  });

  it('should show error toast if user is not authenticated when adding product to cart', () => {
    const product: ProductResponse = { productId: 1, name: 'Test Product', description: 'A product', quantity: 10, price: 100, categories: [], brand: { brandId: 1, name: 'Test Brand' } };
    mockAuthService.isAuthenticated.mockReturnValue(false);

    component.addProductToCart(product);

    expect(mockToastService.showToast).toHaveBeenCalledWith(ERROR_CLIENT_NOT_LOGGED2, StatusEnum.ERROR, ERROR_ICON_PATH);
  });
});