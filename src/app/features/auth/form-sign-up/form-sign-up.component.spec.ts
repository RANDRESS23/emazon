import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSignUpComponent } from './form-sign-up.component';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SIGN_UP_BUTTON_TEXT, SIGN_UP_SUCCESSFULLY_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { ClientRequest, ClientResponse, TokenInterface, UserCredentials } from '@utils/interfaces/auth';
import { of, throwError } from 'rxjs';
import { StatusEnum } from '@utils/enums/status';
import { Permission, Role } from '@utils/interfaces/warehouse-assistant';

describe('FormSignUpComponent', () => {
  let component: FormSignUpComponent;
  let fixture: ComponentFixture<FormSignUpComponent>;
  let authService: AuthService;
  let router: Router;
  let toastService: ToastService;

  beforeEach(async () => {
    const authServiceMock = {
      saveClient: jest.fn(),
      login: jest.fn(),
    };
    const routerMock = {
      navigate: jest.fn(),
    };
    const toastServiceMock = {
      showToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [FormSignUpComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.buttonSaveText).toBe(SIGN_UP_BUTTON_TEXT);
    expect(component.isDisabledSaveIcon).toBeTruthy();
    expect(component.toastMessage).toBe(EMPTY_STRING);
  });

  it('should set changeStatusSaveButton function', () => {
    const mockFunction = jest.fn();
    component.changeStatusSaveButtonOutput(mockFunction);
    expect(component.changeStatusSaveButton).toBe(mockFunction);
  });

  describe('handleSubmit', () => {
    const clientRequest: ClientRequest = {
      name: 'John',
      lastName: 'Doe',
      document: '123456789',
      phone: '5551234',
      birthdate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    it('should call saveClient and navigate on successful sign up', () => {
      const mockPermission: Permission = {
        permissionId: '1',
        name: 'READ',
      }
      
      const mockRole: Role = {
        roleId: '1',
        name: 'CLIENTE',
        description: 'Cliente',
        permissionList: [mockPermission]
      }
      
      const mockUser: ClientResponse = { 
        userId: '1',
        name: 'John',
        lastName: 'Doe',
        document: '123456789',
        phone: '5551234',
        birthdate: '2000-01-01',
        email: 'email@email.com',
        role: mockRole,
       };

      jest.spyOn(authService, 'saveClient').mockReturnValue(of(mockUser));
      jest.spyOn(component, 'login').mockImplementation();

      component.changeStatusSaveButton = jest.fn();
      component.handleSubmit(clientRequest);

      expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true, false);
      expect(authService.saveClient).toHaveBeenCalledWith(clientRequest);
      expect(component.login).toHaveBeenCalledWith({ email: clientRequest.email, password: clientRequest.password });
      expect(toastService.showToast).toHaveBeenCalledWith(SIGN_UP_SUCCESSFULLY_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
      expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    });

    it('should handle 400 or 409 error and show error toast', () => {
      const errorResponse = { status: 409, error: { message: 'Conflict error' } };
      jest.spyOn(authService, 'saveClient').mockReturnValue(throwError(errorResponse));

      component.changeStatusSaveButton = jest.fn();
      component.handleSubmit(clientRequest);

      expect(component.toastMessage).toBe(errorResponse.error.message);
      expect(toastService.showToast).toHaveBeenCalledWith(component.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
      expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    });

    it('should handle server error and show generic error toast', () => {
      const errorResponse = { status: 500 };
      jest.spyOn(authService, 'saveClient').mockReturnValue(throwError(errorResponse));

      component.changeStatusSaveButton = jest.fn();
      component.handleSubmit(clientRequest);

      expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
      expect(toastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
      expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    });
  });

  describe('login', () => {
    const userCredentials: UserCredentials = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    it('should navigate to home page on successful login', () => {
      const mockToken: TokenInterface = { token: 'token' };

      jest.spyOn(authService, 'login').mockReturnValue(of(mockToken));
      component.login(userCredentials);
      expect(authService.login).toHaveBeenCalledWith(userCredentials);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should handle 400 or 409 error and show error toast', () => {
      const errorResponse = { status: 409, error: { message: 'Conflict error' } };
      jest.spyOn(authService, 'login').mockReturnValue(throwError(errorResponse));

      component.changeStatusSaveButton = jest.fn();
      component.login(userCredentials);

      expect(component.toastMessage).toBe(errorResponse.error.message);
      expect(toastService.showToast).toHaveBeenCalledWith(component.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
      expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    });

    it('should handle server error and show generic error toast', () => {
      const errorResponse = { status: 500 };
      jest.spyOn(authService, 'login').mockReturnValue(throwError(errorResponse));

      component.changeStatusSaveButton = jest.fn();
      component.login(userCredentials);

      expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
      expect(toastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
      expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    });
  });
});