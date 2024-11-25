import { TestBed } from '@angular/core/testing';
import { AllProductDetailComponent } from './all-product-detail.component';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { ProductService } from '@src/app/core/services/product/product.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ERROR_ICON_PATH, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { StatusEnum } from '@utils/enums/status';
import { ERROR_CLIENT_NOT_LOGGED2, ERROR_CLIENT_NOT_LOGGED3, PRODUCT_SAVED_IN_CART } from '@utils/constants/client';

describe('AllProductDetailComponent', () => {
  let component: AllProductDetailComponent;
  let authServiceMock: any;
  let toastServiceMock: any;
  let productServiceMock: any;
  let cartServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn()
    };

    toastServiceMock = {
      showToast: jest.fn()
    };

    productServiceMock = {
      getProductById: jest.fn()
    };

    cartServiceMock = {
      cartPagedClient: of({ products: { content: [] } }),
      getTotalProductsInTheCart: jest.fn().mockReturnValue(of({})),
      getAllCartProducts: jest.fn(),
      removeProductInTheCart: jest.fn(),
      saveProductInTheCart: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    activatedRouteMock = {
      params: of({ productId: 1 })
    };

    TestBed.configureTestingModule({
      providers: [
        AllProductDetailComponent,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: ProductService, useValue: productServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    component = TestBed.inject(AllProductDetailComponent);
  });

  it('should initialize correctly and fetch product details', () => {
    const mockProduct = { productId: 1, name: 'Test Product', brand: { name: 'Brand' } };
    productServiceMock.getProductById.mockReturnValue(of(mockProduct));

    component.ngOnInit();

    expect(productServiceMock.getProductById).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockProduct);
  });

  it('should navigate to home on error fetching product details', () => {
    productServiceMock.getProductById.mockReturnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle cart updates and update product quantity', () => {
    const mockCartClient = {
      products: {
        content: [{ productId: 1, totalQuantityInCart: 5 }]
      }
    };
    cartServiceMock.cartPagedClient = of(mockCartClient);

    component.product = { productId: 1 } as any;
    component.ngOnInit();

    expect(component.productQuantityInTheCart).toEqual(5);
  });

  it('should call deleteProductCart and handle unauthenticated user', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);

    component.deleteProductCart(1);

    expect(toastServiceMock.showToast).toHaveBeenCalledWith(
      ERROR_CLIENT_NOT_LOGGED3, 
      StatusEnum.ERROR, 
      ERROR_ICON_PATH
    );
  });

  it('should call deleteProductCart and handle authenticated user with 0 quantity', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.getRole.mockReturnValue('CLIENTE');
    component.productQuantityInTheCart = 0;

    component.deleteProductCart(1);

    expect(cartServiceMock.removeProductInTheCart).not.toHaveBeenCalled();
  });

  it('should call deleteProductCart and handle removal error', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.getRole.mockReturnValue('CLIENTE');
    component.productQuantityInTheCart = 5;

    cartServiceMock.removeProductInTheCart.mockReturnValue(
      throwError(() => ({ status: 409, error: { message: 'Conflict' } }))
    );

    component.deleteProductCart(1);

    expect(toastServiceMock.showToast).toHaveBeenCalledWith('Conflict', StatusEnum.ERROR,  ERROR_ICON_PATH);
  });

  it('should add product to cart when authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.getRole.mockReturnValue('CLIENTE');

    cartServiceMock.saveProductInTheCart.mockReturnValue(of(null));

    component.addProductCart(1);

    expect(toastServiceMock.showToast).toHaveBeenCalledWith(
      PRODUCT_SAVED_IN_CART, 
      StatusEnum.SUCCESS,
      SUCCESS_ICON_PATH
    );
  });

  it('should not add product to cart when unauthenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);

    component.addProductCart(1);

    expect(toastServiceMock.showToast).toHaveBeenCalledWith(
      ERROR_CLIENT_NOT_LOGGED2, 
      StatusEnum.ERROR, 
      ERROR_ICON_PATH
    );
  });

  it('should handle cart products update correctly', () => {
    const mockProducts = {
      products: {
        content: [{ productId: 1, totalQuantityInCart: 10 }]
      }
    };

    cartServiceMock.getAllCartProducts.mockReturnValue(of(mockProducts));

    component.product = { productId: 1 } as any;
    component.getCartProducts();

    expect(cartServiceMock.getAllCartProducts).toHaveBeenCalled();
    expect(component.productQuantityInTheCart).toEqual(10);
  });
});
