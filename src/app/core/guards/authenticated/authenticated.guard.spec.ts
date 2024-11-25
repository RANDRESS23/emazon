import { TestBed } from '@angular/core/testing';
import { AuthenticatedGuard } from './authenticated.guard';
import { RolesEnum } from '@utils/enums/roles';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    const routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        AuthenticatedGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(AuthenticatedGuard);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
  });

  it('should allow activation when user is not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    const result = guard.canActivate(route, state);

    expect(result).toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to admin profile when authenticated as ADMIN', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.ADMIN);
    router.navigate.mockReturnValue(of(true) as any);

    guard.canActivate(route, state);

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledWith();
    expect(router.navigate).toHaveBeenCalledWith(['/perfil/admin/inicio']);
  });

  it('should redirect to warehouse assistant profile when authenticated as AUX_BODEGA', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.AUX_BODEGA);
    router.navigate.mockReturnValue(of(true) as any);

    guard.canActivate(route, state);

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledWith();
    expect(router.navigate).toHaveBeenCalledWith(['/perfil/auxiliar-bodega/inicio']);
  });

  it('should redirect to client profile when authenticated as CLIENTE', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.CLIENTE);
    router.navigate.mockReturnValue(of(true) as any);

    guard.canActivate(route, state);

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledWith();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to root when authenticated with an unknown role', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue('UNKNOWN_ROLE' as RolesEnum);
    router.navigate.mockReturnValue(of(true) as any);

    guard.canActivate(route, state);

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledWith();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});