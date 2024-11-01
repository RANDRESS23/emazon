import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
      logout: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should initialize isLogged based on AuthService.isAuthenticated', () => {
    (authService.isAuthenticated as jest.Mock).mockReturnValue(true);

    component.ngOnInit();

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(component.isLogged).toBe(true);
  });

  it('should toggle showNavbarMobileContent', () => {
    expect(component.showNavbarMobileContent).toBe(false);

    component.toggleNavbarMobileContent();
    expect(component.showNavbarMobileContent).toBe(true);

    component.toggleNavbarMobileContent();
    expect(component.showNavbarMobileContent).toBe(false);
  });

  it('should call AuthService.logout on signOut', () => {
    component.signOut();

    expect(authService.logout).toHaveBeenCalled();
  });

  it('should correctly render menuItems input', () => {
    const mockMenuItems = [
      { label: 'Inicio', route: '/inicio' },
      { label: 'Perfil', route: '/perfil' }
    ];
    
    component.menuItems = mockMenuItems;
    fixture.detectChanges();

    expect(component.menuItems.length).toBe(2);
    expect(component.menuItems).toEqual(mockMenuItems);
  });

  it('should navigate to login page when navigateToLoginPage is called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.navigateToLoginPage();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to sign-up page when navigateToSignUpPage is called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.navigateToSignUpPage();
    expect(navigateSpy).toHaveBeenCalledWith(['/sign-up']);
  });
});