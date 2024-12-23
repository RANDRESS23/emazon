import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListOfBrandsComponent } from './list-of-brands.component';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { PageBrands } from '@utils/interfaces/brand';
import { INITIAL_PAGE_TABLE } from '@utils/constants/admin';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { RolesEnum } from '@utils/enums/roles';

describe('ListOfBrandsComponent', () => {
  let component: ListOfBrandsComponent;
  let brandService: BrandService;
  let authService: jest.Mocked<AuthService>;

  const mockPageBrands: PageBrands = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 2,
    totalPages: 1,
    content: [
      { brandId: 1, name: 'Brand 1', description: 'Description of brand 1' },
      { brandId: 2, name: 'Brand 2', description: 'Description of brand 2' }
    ]
  };

  beforeEach(() => {
    const brandServiceMock = {
      getAllBrands: jest.fn().mockReturnValue(of(mockPageBrands)),
    };

    const authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ListOfBrandsComponent,
        { provide: AuthService, useValue: authServiceMock },
        { provide: BrandService, useValue: brandServiceMock },
      ],
    });

    component = TestBed.inject(ListOfBrandsComponent);
    brandService = TestBed.inject(BrandService);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  });

  it('should call getBrands on ngOnInit', () => {
    const getBrandsSpy = jest.spyOn(component, 'getBrands');
    component.ngOnInit();
    expect(getBrandsSpy).toHaveBeenCalledWith(component.pageNumber, component.size, component.sortOrder);
  });

  it('should update the listOfBrands, totalPages, and totalElements when getBrands is successful', () => {
    component.getBrands(component.pageNumber, component.size, component.sortOrder);
    expect(component.listOfBrands).toEqual(mockPageBrands.content);
    expect(component.totalPages).toBe(mockPageBrands.totalPages);
    expect(component.totalElements).toBe(mockPageBrands.totalElements);
  });

  it('should log error when getBrands fails', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    jest.spyOn(brandService, 'getAllBrands').mockReturnValue(throwError({ status: 500 }));

    component.getBrands(component.pageNumber, component.size, component.sortOrder);
    expect(consoleLogSpy).toHaveBeenCalledWith({ error: { status: 500 } });
  });

  it('should update pageNumber and call getBrands on changePage', () => {
    const getBrandsSpy = jest.spyOn(component, 'getBrands');
    component.changePage(2);
    expect(component.pageNumber).toBe(2);
    expect(getBrandsSpy).toHaveBeenCalledWith(2, component.size, component.sortOrder);
  });

  it('should increment totalElements and call getBrands on addNewBrandCount', () => {
    const getBrandsSpy = jest.spyOn(component, 'getBrands');
    component.totalElements = 5;

    component.addNewBrandCount();
    expect(component.totalElements).toBe(2);
    expect(getBrandsSpy).toHaveBeenCalledWith(component.pageNumber, component.size, component.sortOrder);
  });

  it('should update size, sortOrder, and call getBrands on showAndSortBy', () => {
    const getBrandsSpy = jest.spyOn(component, 'getBrands');
    const event = [10, 'asc'];

    component.showFilterOrders(event);
    expect(component.size).toBe(10);
    expect(component.sortOrder).toBe('asc');
    expect(component.pageNumber).toBe(INITIAL_PAGE_TABLE);
    expect(getBrandsSpy).toHaveBeenCalledWith(INITIAL_PAGE_TABLE, 10, 'asc');
  });

  it('should set showButtonAddBrand to true if the role is ADMIN', () => {
    jest.spyOn(authService, 'getRole').mockReturnValue(RolesEnum.ADMIN);

    component.ngOnInit();

    expect(component.showButtonAddBrand).toBe(true);
    expect(jest.spyOn(authService, 'getRole')).toHaveBeenCalled();
  });

  it('should set showButtonAddBrand to false if the role is not ADMIN', () => {
    jest.spyOn(authService, 'getRole').mockReturnValue(RolesEnum.AUX_BODEGA);

    component.ngOnInit();

    expect(component.showButtonAddBrand).toBe(false);
    expect(jest.spyOn(authService, 'getRole')).toHaveBeenCalled();
  });
});
