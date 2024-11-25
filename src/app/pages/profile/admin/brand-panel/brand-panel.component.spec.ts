import { TestBed } from '@angular/core/testing';
import { BrandPanelComponent } from './brand-panel.component';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { RolesEnum } from '@utils/enums/roles';
import { MENU_ITEMS_ADMIN, MENU_ITEMS_WAREHOUSE_ASSISTANT } from '@utils/constants/general';

describe('BrandPanelComponent', () => {
  let component: BrandPanelComponent;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      getRole: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    await TestBed.configureTestingModule({
      declarations: [ BrandPanelComponent ]
    })
    .compileComponents();

    component = new BrandPanelComponent(mockAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign MENU_ITEMS_ADMIN if the role is ADMIN', () => {
    mockAuthService.getRole.mockReturnValue(RolesEnum.ADMIN);

    component.ngOnInit();

    expect(component.menuItems).toBe(MENU_ITEMS_ADMIN);
    expect(mockAuthService.getRole).toHaveBeenCalled();
  });

  it('should assign MENU_ITEMS_WAREHOUSE_ASSISTANT if the role is not ADMIN', () => {
    mockAuthService.getRole.mockReturnValue(RolesEnum.AUX_BODEGA);

    component.ngOnInit();

    expect(component.menuItems).toBe(MENU_ITEMS_WAREHOUSE_ASSISTANT);
    expect(mockAuthService.getRole).toHaveBeenCalled();
  });
});
