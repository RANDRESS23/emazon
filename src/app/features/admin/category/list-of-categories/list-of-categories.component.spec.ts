import { TestBed } from '@angular/core/testing';
import { ListOfCategoriesComponent } from './list-of-categories.component';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { PageCategories } from '@utils/interfaces/category';
import { of, throwError } from 'rxjs';
import { INITIAL_PAGE_TABLE } from '@utils/constants/admin';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { RolesEnum } from '@utils/enums/roles';

describe('ListOfCategoriesComponent', () => {
  let component: ListOfCategoriesComponent;
  let categoryService: CategoryService;
  let authService: jest.Mocked<AuthService>;

  const mockPageCategories: PageCategories = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 2,
    totalPages: 1,
    content: [
      { categoryId: 1, name: 'Category 1', description: 'Description of category 1' },
      { categoryId: 2, name: 'Category 2', description: 'Description of category 2' }
    ]
  };

  beforeEach(() => {
    const categoryServiceMock = {
      getAllCategories: jest.fn().mockReturnValue(of(mockPageCategories)),
    };

    const authServiceMock = {
      isAuthenticated: jest.fn(),
      getRole: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ListOfCategoriesComponent,
        { provide: AuthService, useValue: authServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
      ],
    });

    component = TestBed.inject(ListOfCategoriesComponent);
    categoryService = TestBed.inject(CategoryService);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  });

  it('should call getCategories on ngOnInit', () => {
    const getCategoriesSpy = jest.spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(getCategoriesSpy).toHaveBeenCalledWith(component.pageNumber, component.size, component.sortOrder);
  });

  it('should update the listOfCategories, totalPages, and totalElements when getCategories is successful', () => {
    component.getCategories(component.pageNumber, component.size, component.sortOrder);
    expect(component.listOfCategories).toEqual(mockPageCategories.content);
    expect(component.totalPages).toBe(mockPageCategories.totalPages);
    expect(component.totalElements).toBe(mockPageCategories.totalElements);
  });

  it('should log error when getCategories fails', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    jest.spyOn(categoryService, 'getAllCategories').mockReturnValue(throwError({ status: 500 }));

    component.getCategories(component.pageNumber, component.size, component.sortOrder);
    expect(consoleLogSpy).toHaveBeenCalledWith({ error: { status: 500 } });
  });

  it('should update pageNumber and call getCategories on changePage', () => {
    const getCategoriesSpy = jest.spyOn(component, 'getCategories');
    component.changePage(2);
    expect(component.pageNumber).toBe(2);
    expect(getCategoriesSpy).toHaveBeenCalledWith(2, component.size, component.sortOrder);
  });

  it('should increment totalElements and call getCategories on addNewCategoryCount', () => {
    const getCategoriesSpy = jest.spyOn(component, 'getCategories');
    component.totalElements = 5;

    component.addNewCategoryCount();
    expect(component.totalElements).toBe(2);
    expect(getCategoriesSpy).toHaveBeenCalledWith(component.pageNumber, component.size, component.sortOrder);
  });

  it('should update size, sortOrder, and call getCategories on showAndSortBy', () => {
    const getCategoriesSpy = jest.spyOn(component, 'getCategories');
    const event = [10, 'asc'];

    component.showFilterOrders(event);
    expect(component.size).toBe(10);
    expect(component.sortOrder).toBe('asc');
    expect(component.pageNumber).toBe(INITIAL_PAGE_TABLE);
    expect(getCategoriesSpy).toHaveBeenCalledWith(INITIAL_PAGE_TABLE, 10, 'asc');
  });

  it('should set showButtonAddCategory to true if the role is ADMIN', () => {
    jest.spyOn(authService, 'getRole').mockReturnValue(RolesEnum.ADMIN);

    component.ngOnInit();

    expect(component.showButtonAddCategory).toBe(true);
    expect(jest.spyOn(authService, 'getRole')).toHaveBeenCalled();
  });

  it('should set showButtonAddCategory to false if the role is not ADMIN', () => {
    jest.spyOn(authService, 'getRole').mockReturnValue(RolesEnum.AUX_BODEGA);

    component.ngOnInit();

    expect(component.showButtonAddCategory).toBe(false);
    expect(jest.spyOn(authService, 'getRole')).toHaveBeenCalled();
  });
});
