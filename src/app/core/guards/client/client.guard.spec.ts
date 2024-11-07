import { TestBed } from '@angular/core/testing';
import { ClientGuard } from './client.guard';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RolesEnum } from '@utils/enums/roles';
import { of } from 'rxjs';

describe('ClientGuard', () => {
  let guard: ClientGuard;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    const routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        ClientGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(ClientGuard);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
  });

  it('should navigate to /perfil/admin/inicio if user is ADMIN', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.ADMIN);

    const result = guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot);

    expect(result).toEqual(router.navigate(['/perfil/admin/inicio']));
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledTimes(2);
    expect(router.navigate).toHaveBeenCalledWith(['/perfil/admin/inicio']);
  });

  it('should navigate to /perfil/auxiliar-bodega/inicio if user is AUX_BODEGA', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.AUX_BODEGA);

    const result = guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot);

    expect(result).toEqual(router.navigate(['/perfil/auxiliar-bodega/inicio']));
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledTimes(3);
    expect(router.navigate).toHaveBeenCalledWith(['/perfil/auxiliar-bodega/inicio']);
  });

  it('should allow activation if user is not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    const result = guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
