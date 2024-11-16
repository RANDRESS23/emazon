import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseInformationComponent } from './purchase-information.component';
import { ERROR_ICON_PATH, SERVER_ERROR_TEXT } from '@utils/constants/general';
import { StatusEnum } from '@utils/enums/status';
import { of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { CartService } from '@src/app/shared/services/cart/cart.service';

describe('PurchaseInformationComponent', () => {
  let component: PurchaseInformationComponent;
  let fixture: ComponentFixture<PurchaseInformationComponent>;
  let toastServiceMock: any;
  let routerMock: any;
  let cartServiceMock: any;

  beforeEach(async () => {
    toastServiceMock = { showToast: jest.fn() };
    routerMock = { navigate: jest.fn() };
    cartServiceMock = {
      cartPagedClient: of({ cart: { totalPrice: 100, updatedAt: new Date() } }),
      buyCartProducts: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PurchaseInformationComponent],
      providers: [
        DatePipe,
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: CartService, useValue: cartServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba inicial para confirmar la creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize totalPurchasePrice, isDisablePurchaseButton, and lastDateOfCartModification on ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.totalPurchasePrice).toBe(100);
    expect(component.isDisablePurchaseButton).toBe(false);
    expect(component.lastDateOfCartModification).toBeDefined();
  });

  it('should show error toast with custom message on 409 or 400 error in purchaseProducts', () => {
    const mockErrorResponse = { status: 409, error: { message: 'Custom error message' } };
    cartServiceMock.buyCartProducts.mockReturnValue(throwError(mockErrorResponse));

    component.purchaseProducts();
    fixture.detectChanges();

    expect(component.toastMessage).toBe('Custom error message');
    expect(toastServiceMock.showToast).toHaveBeenCalledWith('Custom error message', StatusEnum.ERROR, ERROR_ICON_PATH);
  });

  it('should show server error toast on non-409/400 error in purchaseProducts', () => {
    const mockErrorResponse = { status: 500, error: { message: 'Internal Server Error' } };
    cartServiceMock.buyCartProducts.mockReturnValue(throwError(mockErrorResponse));

    component.purchaseProducts();
    fixture.detectChanges();

    expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
    expect(toastServiceMock.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
  });
});
