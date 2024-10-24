import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '@src/app/core/services/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
      logout: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
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
});