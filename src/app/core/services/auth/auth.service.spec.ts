import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { TOKEN_KEY_LOCAL_STORAGE } from '@utils/constants/general';
import { environment } from '@src/environments/environment';
import { TokenInterface, UserCredentials } from '@utils/interfaces/auth';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jest.Mocked<Router>;
  let storageMock: jest.SpyInstance;

  beforeEach(() => {
    const routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    storageMock = jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });

  it('should make a login request and store the token', () => {
    const userCredentials: UserCredentials = { email: 'test@gmail.com', password: 'test' };
    const tokenResponse: TokenInterface = { token: 'fake.jwt.token' };

    service.login(userCredentials).subscribe((response) => {
      expect(response.token).toBe('fake.jwt.token');
    });

    const req = httpMock.expectOne(`${environment.BASE_URL_USER}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(tokenResponse);

    expect(storageMock).toHaveBeenCalledWith(TOKEN_KEY_LOCAL_STORAGE, 'fake.jwt.token');
  });

  it('should return null when no token is found', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const token = service.getToken();

    expect(token).toBeNull();
  });

  it('should return the stored token', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake.jwt.token');

    const token = service.getToken();

    expect(token).toBe('fake.jwt.token');
  });

  it('should return false if token is missing or expired', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    expect(service.isAuthenticated()).toBe(false);

    const expiredToken = 'fake.expired.jwt.token';
    const expiredPayload = { exp: Date.now() / 1000 - 10 };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(expiredToken);
    jest.spyOn(global, 'atob').mockReturnValue(JSON.stringify(expiredPayload));

    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return true if token is valid and not expired', () => {
    const validToken = 'fake.valid.jwt.token';
    const validPayload = { exp: Date.now() / 1000 + 1000 };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(validToken);
    jest.spyOn(global, 'atob').mockReturnValue(JSON.stringify(validPayload));

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  });

  it('should remove token and navigate to login on logout', () => {
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem');

    service.logout();

    expect(removeItemSpy).toHaveBeenCalledWith(TOKEN_KEY_LOCAL_STORAGE);
    expect(router.navigate).toHaveBeenCalledWith(['/login']); 

    removeItemSpy.mockRestore();
  });

  it('should return an empty string if token is missing when getting role', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const role = service.getRole();

    expect(role).toBe('');
  });

  it('should return the role from a valid token', () => {
    const validToken = 'fake.jwt.token';
    const validPayload = { role: 'ADMIN' };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(validToken);
    jest.spyOn(global, 'atob').mockReturnValue(JSON.stringify(validPayload));

    const role = service.getRole();

    expect(role).toBe('ADMIN');
  });

  it('should return the fullName from a valid token', () => {
    const validToken = 'fake.jwt.token';
    const validPayload = { fullName: 'Raul' };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(validToken);
    jest.spyOn(global, 'atob').mockReturnValue(JSON.stringify(validPayload));

    const fullName = service.getFullName();

    expect(fullName).toBe('Raul');
  });

  it('should return empty string from a invalid token', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const fullName = service.getFullName();

    expect(fullName).toBe('');
  });
});