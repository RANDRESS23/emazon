import { TestBed } from '@angular/core/testing';
import { ClientGuard } from './client.guard';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RolesEnum } from '@utils/enums/roles';

describe('ClientGuard', () => {
  let guard: ClientGuard;
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
        ClientGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(ClientGuard);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
  });

  it('should allow activation when user is authenticated and has CLIENTE role', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.CLIENTE);

    const result = guard.canActivate(route, state);

    expect(result).toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledWith();
    expect(router.navigate).not.toHaveBeenCalled(); 
  });

  it('should block activation and redirect to /login if user is not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    const result = guard.canActivate(route, state);

    expect(result).toBe(false);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should block activation and redirect to /login if user is authenticated but not CLIENTE', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.ADMIN);

    const result = guard.canActivate(route, state);

    expect(result).toBe(false);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledWith();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should block activation and redirect to /login if user is AUX_BODEGA', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getRole.mockReturnValue(RolesEnum.AUX_BODEGA);

    const result = guard.canActivate(route, state);

    expect(result).toBe(false);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalledWith();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return a UrlTree when router.navigate is called', () => {
    const urlTreeMock = {} as any;
    router.navigate.mockReturnValue(Promise.resolve(false));  

    authService.isAuthenticated.mockReturnValue(false);

    const result = guard.canActivate(route, state);
    
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBe(false); 
  });
});