import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartProductsComponent } from './cart-products.component';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { INITIAL_PAGE_TABLE } from '@utils/constants/admin';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT } from '@utils/constants/general';
import { PRODUCT_REMOVED_IN_CART, PRODUCT_SAVED_IN_CART } from '@utils/constants/client';
import { StatusEnum } from '@utils/enums/status';

describe('CartProductsComponent', () => {
  let component: CartProductsComponent;
  let fixture: ComponentFixture<CartProductsComponent>;
  let mockCartService: any;
  let mockToastService: any;

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

    TestBed.configureTestingModule({
      declarations: [CartProductsComponent],
      providers: [
        DatePipe,
        { provide: CartService, useValue: mockCartService },
        { provide: ToastService, useValue: mockToastService }
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
    expect(component.totalPurchasePrice).toBe(200);
    expect(component.lastDateOfCartModification).not.toBe(EMPTY_STRING);
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
    expect(component.totalPurchasePrice).toBe(200);
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
});