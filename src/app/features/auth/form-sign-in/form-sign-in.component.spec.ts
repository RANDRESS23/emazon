import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSignInComponent } from './form-sign-in.component';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserCredentials } from '@utils/interfaces/auth';
import { RolesEnum } from '@utils/enums/roles';
import { of, throwError } from 'rxjs';
import { StatusEnum } from '@utils/enums/status';
import { ToastService } from '@src/app/shared/services/toast/toast.service';

describe('FormSignInComponent', () => {
  let component: FormSignInComponent;
  let fixture: ComponentFixture<FormSignInComponent>;
  let authService: AuthService;
  let router: Router;
  let toastService: ToastService;

  const mockUserCredentials: UserCredentials = {
    email: 'test@example.com',
    password: 'Password123'
  };

  beforeEach(() => {
    const authServiceMock = {
      login: jest.fn(),
      getRole: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn()
    };

    const toastServiceMock = {
      showToast: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [FormSignInComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormSignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService);
  });

  it('should call AuthService.login and navigate to the correct home page on success', () => {
    (authService.login as jest.Mock).mockReturnValue(of({ token: 'mockToken' }));
    (authService.getRole as jest.Mock).mockReturnValue(RolesEnum.ADMIN);
    
    const changeStatusSpy = jest.spyOn(component, 'changeStatusSaveButton');
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.handleSubmit(mockUserCredentials);

    expect(authService.login).toHaveBeenCalledWith(mockUserCredentials);
    expect(changeStatusSpy).toHaveBeenCalledWith(true, false);

    expect(showToastSpy).toHaveBeenCalledWith('Inicio de sesión exitoso', StatusEnum.SUCCESS, '/assets/icons/success-icon.svg');
    expect(changeStatusSpy).toHaveBeenCalledWith(false, true);
    expect(showToastSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/perfil/admin/inicio']);
  });

  it('should handle login error and show toast with error message', () => {
    const errorResponse = { status: 400, error: { message: 'Invalid credentials' } };
    (authService.login as jest.Mock).mockReturnValue(throwError(() => errorResponse));
    
    const changeStatusSpy = jest.spyOn(component, 'changeStatusSaveButton');
    const showToastSpy = jest.spyOn(toastService, 'showToast');

    component.handleSubmit(mockUserCredentials);

    expect(authService.login).toHaveBeenCalledWith(mockUserCredentials);
    expect(changeStatusSpy).toHaveBeenCalledWith(true, false);

    expect(component.toastMessage).toBe('Invalid credentials');
    expect(changeStatusSpy).toHaveBeenCalledWith(false, true);
    expect(showToastSpy).toHaveBeenCalledWith('Invalid credentials', StatusEnum.ERROR, '/assets/icons/error-icon.svg');
    expect(showToastSpy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to the correct page based on role', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.navigateToHomePage(RolesEnum.CLIENTE);
    expect(navigateSpy).toHaveBeenCalledWith(['/perfil/cliente/inicio']);

    component.navigateToHomePage(RolesEnum.AUX_BODEGA);
    expect(navigateSpy).toHaveBeenCalledWith(['/perfil/auxiliar-bodega/inicio']);

    component.navigateToHomePage('UNKNOWN_ROLE');
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});