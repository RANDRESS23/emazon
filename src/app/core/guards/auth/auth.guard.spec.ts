import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;
  let routeMock: Partial<ActivatedRouteSnapshot>;
  let stateMock: Partial<RouterStateSnapshot>;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    routeMock = {
      data: { role: 'admin' }
    };

    stateMock = {};
  });

  it('should allow activation if user is authenticated and has the correct role', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue('admin');

    const result = guard.canActivate(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalled();
  });

  it('should deny activation and navigate to /login if user is not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    const result = guard.canActivate(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should deny activation and navigate to /login if user does not have the correct role', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue('user');

    const result = guard.canActivate(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});