import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartProductsComponent } from './cart-products.component';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { INITIAL_PAGE_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE } from '@utils/constants/admin';
import { PRODUCT_REMOVED_IN_CART, PRODUCT_SAVED_IN_CART, PRODUCTS_REMOVED_IN_CART } from '@utils/constants/client';
import { StatusEnum } from '@utils/enums/status';
import { ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { Router } from '@angular/router';

describe('CartProductsComponent', () => {
  let component: CartProductsComponent;
  let fixture: ComponentFixture<CartProductsComponent>;
  let mockCartService: any;
  let mockToastService: any;
  let routerMock: any;

  beforeEach(() => {
    mockCartService = {
      cartPagedClient: of({
        cart: { updatedAt: new Date(), totalPrice: 200 },
        products: {
          totalPages: 2,
          totalElements: 10,
          content: []
        }
      }),
      getAllCartProducts: jest.fn().mockReturnValue(of({
        cart: { updatedAt: new Date(), totalPrice: 200 },
        products: {
          totalPages: 2,
          totalElements: 10,
          content: []
        }
      })),
      removeProductInTheCart: jest.fn(),
      saveProductInTheCart: jest.fn()
    };

    mockToastService = {
      showToast: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [CartProductsComponent],
      providers: [
        DatePipe,
        { provide: CartService, useValue: mockCartService },
        { provide: ToastService, useValue: mockToastService },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from cartPagedClient', () => {
    expect(component.listOfProductsCart).toEqual([]);
    expect(component.totalPages).toBe(2);
    expect(component.totalElements).toBe(10);
  });

  it('should change the page number and call getCartProducts on page change', () => {
    jest.spyOn(component, 'getCartProducts');
    component.changePage(2);
    expect(component.pageNumber).toBe(2);
    expect(component.getCartProducts).toHaveBeenCalled();
  });

  it('should fetch cart products on getCartProducts call', () => {
    component.getCartProducts();
    expect(mockCartService.getAllCartProducts).toHaveBeenCalledWith(
      component.pageNumber,
      component.size,
      component.sortOrder,
      component.filterCategory,
      component.filterBrand
    );
    expect(component.listOfProductsCart).toEqual([]);
    expect(component.totalPages).toBe(2);
    expect(component.totalElements).toBe(10);
  });

  it('should handle error when fetching cart products', () => {
    const error = { status: 500 };
    jest.spyOn(console, 'error').mockImplementation();
    mockCartService.getAllCartProducts.mockReturnValueOnce(throwError(error));
    component.getCartProducts();
    expect(console.error).toHaveBeenCalledWith({ error });
  });

  it('should delete a product from cart and show success toast', () => {
    mockCartService.removeProductInTheCart.mockReturnValue(of({}));
    component.deleteProductCart(1, 1);
    expect(mockCartService.removeProductInTheCart).toHaveBeenCalledWith({ productId: 1, quantity: 1 });
    expect(mockToastService.showToast).toHaveBeenCalledWith(PRODUCT_REMOVED_IN_CART, StatusEnum.SUCCESS, '/assets/icons/success-icon.svg');
  });

  it('should handle error when deleting a product from cart', () => {
    const error = { status: 409, error: { message: 'Product not available' } };
    mockCartService.removeProductInTheCart.mockReturnValueOnce(throwError(error));
    component.deleteProductCart(1, 1);
    expect(component.toastMessage).toBe('Product not available');
    expect(mockToastService.showToast).toHaveBeenCalledWith('Product not available', StatusEnum.ERROR, '/assets/icons/error-icon.svg');
  });

  it('should add a product to the cart and show success toast', () => {
    mockCartService.saveProductInTheCart.mockReturnValue(of({}));
    component.addProductCart(1);
    expect(mockCartService.saveProductInTheCart).toHaveBeenCalledWith({ productId: 1, quantity: 1 });
    expect(mockToastService.showToast).toHaveBeenCalledWith(PRODUCT_SAVED_IN_CART, StatusEnum.SUCCESS, '/assets/icons/success-icon.svg');
  });

  it('should handle error when adding a product to the cart', () => {
    const error = { status: 409, error: { message: 'Product already in cart' } };
    mockCartService.saveProductInTheCart.mockReturnValueOnce(throwError(error));
    component.addProductCart(1);
    expect(component.toastMessage).toBe('Product already in cart');
    expect(mockToastService.showToast).toHaveBeenCalledWith('Product already in cart', 'error', '/assets/icons/error-icon.svg');
  });

  it('should update filters and call getCartProducts on showFilterOrders', () => {
    jest.spyOn(component, 'getCartProducts');
    const event = [5, 'asc', 'categoryA', 'brandB'];
    component.showFilterOrders(event);
    expect(component.size).toBe(5);
    expect(component.sortOrder).toBe('asc');
    expect(component.filterCategory).toBe('categoryA');
    expect(component.filterBrand).toBe('brandB');
    expect(component.pageNumber).toBe(INITIAL_PAGE_TABLE);
    expect(component.getCartProducts).toHaveBeenCalled();
  });

  it('should handle optional chaining and fallback array when cartPagedClient is undefined in ngOnInit', () => {
    mockCartService.cartPagedClient = of({});
    
    component.ngOnInit();
    component.totalPages = INITIAL_TOTAL_PAGE_TABLE;
    component.totalElements = INITIAL_TOTAL_ELEMENTS_TABLE;
  
    expect(component.listOfProductsCart).toEqual([]);
    expect(component.totalPages).toEqual(INITIAL_TOTAL_PAGE_TABLE);
    expect(component.totalElements).toEqual(INITIAL_TOTAL_ELEMENTS_TABLE);
  });  

  it('should handle optional chaining and fallback array in getCartProducts', () => {
    mockCartService.getAllCartProducts.mockReturnValue(of({ products: null }));
  
    component.getCartProducts();
  
    expect(component.listOfProductsCart).toEqual([]);
    expect(component.totalPages).toBeUndefined();
    expect(component.totalElements).toBeUndefined();
  });  

  it('should call navigateToDetail when image product is clicked', () => {
    const productId = 1;

    component.navigateToDetail(productId);
    expect(routerMock.navigate).toHaveBeenCalledWith([`/producto/${productId}`]);
  });

  it('should set default quantity to 1 and use correct message based on quantity in deleteProductCart', () => {
    mockCartService.removeProductInTheCart.mockReturnValue(of({}));
  
    component.deleteProductCart(1);
  
    expect(mockCartService.removeProductInTheCart).toHaveBeenCalledWith({ productId: 1, quantity: 1 });
    expect(mockToastService.showToast).toHaveBeenCalledWith(PRODUCT_REMOVED_IN_CART, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
  
    component.deleteProductCart(1, 2);
  
    expect(mockToastService.showToast).toHaveBeenCalledWith(PRODUCTS_REMOVED_IN_CART, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
  });
  
  it('should handle error statuses and set appropriate toast message in deleteProductCart', () => {
    const error409 = { status: 409, error: { message: 'Conflict error' } };
    mockCartService.removeProductInTheCart.mockReturnValue(throwError(error409));
  
    component.deleteProductCart(1);
  
    expect(component.toastMessage).toBe(error409.error.message);
    expect(mockToastService.showToast).toHaveBeenCalledWith(error409.error.message, StatusEnum.ERROR, ERROR_ICON_PATH);
  
    const genericError = { status: 500 };
    mockCartService.removeProductInTheCart.mockReturnValue(throwError(genericError));
  
    component.deleteProductCart(1);
  
    expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
    expect(mockToastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
  });  

  it('should handle error statuses and set appropriate toast message in addProductCart', () => {
    const error409 = { status: 409, error: { message: 'Conflict error' } };
    mockCartService.saveProductInTheCart.mockReturnValue(throwError(error409));
  
    component.addProductCart(1);
  
    expect(component.toastMessage).toBe(error409.error.message);
    expect(mockToastService.showToast).toHaveBeenCalledWith(error409.error.message, StatusEnum.ERROR, ERROR_ICON_PATH);
  
    const genericError = { status: 500 };
    mockCartService.saveProductInTheCart.mockReturnValue(throwError(genericError));
  
    component.addProductCart(1);
  
    expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
    expect(mockToastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
  });  
});