import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    authServiceMock = {
      getFullName: jest.fn().mockReturnValue('Raúl Quimbaya')
    } as unknown as jest.Mocked<AuthService>;

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should call getFullName and set fullName on initialization', () => {
    component.ngOnInit();
    expect(authServiceMock.getFullName).toHaveBeenCalled();
    expect(component.fullName).toBe('Raúl Quimbaya');
  });

  it('should receive menuItems as input', () => {
    const menuItemsMock = [
      { label: 'Home', route: '/home' },
      { label: 'Profile', route: '/profile' }
    ];
    component.menuItems = menuItemsMock;
    fixture.detectChanges();

    expect(component.menuItems).toEqual(menuItemsMock);
  });
});