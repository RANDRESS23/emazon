import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { RolesEnum } from '@utils/enums/roles';
import { of } from 'rxjs';
import { Cart } from '@utils/interfaces/cart';
import { StatusEnum } from '@utils/enums/status';
import { ERROR_CLIENT_NOT_LOGGED } from '@utils/constants/client';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: any;
  let cartServiceMock: any;
  let toastServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn(),
      logout: jest.fn(),
    };
    
    toastServiceMock = {
      showToast: jest.fn()
    };
    
    routerMock = {
      navigate: jest.fn()
    };

    cartServiceMock = {
      saveProductInTheCart: jest.fn(),
      getTotalProductsInTheCart: jest.fn(),
      setInitialCart: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct values when authenticated as CLIENTE', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.getRole.mockReturnValue(RolesEnum.CLIENTE);
    cartServiceMock.cartPagedClient = of({ cart: { totalQuantity: 5 } });
    cartServiceMock.getTotalProductsInTheCart.mockReturnValue(of({ totalQuantity: 5 }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLogged).toBe(true);
    expect(component.isClient).toBe(true);
    expect(component.countCartProducts).toBe(5);
    expect(component.cartNotEmpty).toBe(true);
  });

  it('should initialize with correct values when not authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLogged).toBe(false);
    expect(component.isClient).toBe(true);
  });

  it('should call navigateToLoginPage when login button is clicked', () => {
    component.navigateToLoginPage();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call navigateToSignUpPage when sign-up button is clicked', () => {
    component.navigateToSignUpPage();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/sign-up']);
  });

  it('should call navigateToCart when cart button is clicked and user is authenticated as CLIENTE', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.getRole.mockReturnValue(RolesEnum.CLIENTE);

    component.navigateToCart();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/perfil/cliente/carrito']);
  });

  it('should show error toast when navigating to cart and user is not authenticated as CLIENTE', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);
    component.navigateToCart();
    expect(toastServiceMock.showToast).toHaveBeenCalledWith(ERROR_CLIENT_NOT_LOGGED, StatusEnum.ERROR, '/assets/icons/error-icon.svg');
  });

  it('should toggle showNavbarMobileContent when toggleNavbarMobileContent is called', () => {
    expect(component.showNavbarMobileContent).toBe(false);
    component.toggleNavbarMobileContent();
    expect(component.showNavbarMobileContent).toBe(true);
    component.toggleNavbarMobileContent();
    expect(component.showNavbarMobileContent).toBe(false);
  });

  it('should call signOut when signOut is called', () => {
    component.signOut();
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(cartServiceMock.setInitialCart).toHaveBeenCalled();
  });

  it('should subscribe to cart updates and update the cart information', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.getRole.mockReturnValue(RolesEnum.CLIENTE);
    const cart: Cart = { cartId: 1, clientId: 1, totalQuantity: 10, totalPrice: 100, createdAt: '', updatedAt: '', products: [] };
    cartServiceMock.cartPagedClient = of({ cart });
    cartServiceMock.getTotalProductsInTheCart.mockReturnValue(of(cart));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.countCartProducts).toBe(10);
    expect(component.cartNotEmpty).toBe(true);
  });

  it('should set cartNotEmpty to false if totalQuantity is 0', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.getRole.mockReturnValue(RolesEnum.CLIENTE);
    const emptyCart: Cart = { cartId: 1, clientId: 1, totalQuantity: 0, totalPrice: 0, createdAt: '', updatedAt: '', products: [] };
    cartServiceMock.cartPagedClient = of({ cart: emptyCart });
    cartServiceMock.getTotalProductsInTheCart.mockReturnValue(of(emptyCart));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.cartNotEmpty).toBe(false);
  });
});