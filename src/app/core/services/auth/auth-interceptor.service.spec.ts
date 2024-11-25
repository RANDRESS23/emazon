import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthInterceptorService', () => {
  let authInterceptor: AuthInterceptorService;
  let authService: jest.Mocked<AuthService>;
  let next: jest.Mocked<HttpHandler>;

  beforeEach(() => {
    authService = {
      getToken: jest.fn(),
      isAuthenticated: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    next = {
      handle: jest.fn().mockReturnValue(of({} as HttpEvent<any>)),
    } as jest.Mocked<HttpHandler>;

    authInterceptor = new AuthInterceptorService(authService);
  });

  it('should pass through request unchanged if no token is present', () => {
    authService.getToken.mockReturnValue(null);
    authService.isAuthenticated.mockReturnValue(false);

    const request = new HttpRequest('GET', '/test');
    authInterceptor.intercept(request, next);

    expect(authService.getToken).toHaveBeenCalled();
    expect(authService.isAuthenticated).not.toHaveBeenCalled();
    expect(next.handle).toHaveBeenCalledWith(request);
  });

  it('should pass through request unchanged if token exists but user is not authenticated', () => {
    authService.getToken.mockReturnValue('mockToken');
    authService.isAuthenticated.mockReturnValue(false);

    const request = new HttpRequest('GET', '/test');
    authInterceptor.intercept(request, next);

    expect(authService.getToken).toHaveBeenCalled();
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(next.handle).toHaveBeenCalledWith(request);
  });

  it('should add Authorization header if token exists and user is authenticated', () => {
    authService.getToken.mockReturnValue('mockToken');
    authService.isAuthenticated.mockReturnValue(true);
  
    const request = new HttpRequest('GET', '/test');
    authInterceptor.intercept(request, next);
  
    expect(authService.getToken).toHaveBeenCalled();
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(next.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          lazyUpdate: expect.arrayContaining([
            expect.objectContaining({
              name: 'Authorization',
              value: 'Bearer mockToken',
            }),
          ]),
        }),
      })
    );
  });  
});