import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryComponent } from './add-category.component';
import { of, throwError } from 'rxjs';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '@utils/interfaces/category';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { ERROR_ICON_PATH, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { StatusEnum } from '@utils/enums/status';
import { CATEGORY_SAVED_TEXT } from '@utils/constants/admin';

jest.useFakeTimers();

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryService: jest.Mocked<CategoryService>;
  let toastService: jest.Mocked<ToastService>;

  beforeEach(async () => {
    const categoryServiceMock = {
      saveCategory: jest.fn()
    };

    const toastServiceMock = {
      showToast: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AddCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>; 

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleSubmit', () => {
    it('should handle successful category submission', () => {
      const mockCategory: CategoryRequest = {
        name: 'Category 1',
        description: 'Description of category 1'
      };

      const mockCategoryResponse: CategoryResponse = {
        categoryId: 1,
        name: 'Category 1',
        description: 'Description of category 1'
      };

      categoryService.saveCategory.mockReturnValue(of(mockCategoryResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
      const showModalSpy = jest.spyOn(component, 'showModal');
      const addCategoryCountSpy = jest.spyOn(component, 'addCategoryCount');

      component.handleSubmit(mockCategory);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(categoryService.saveCategory).toHaveBeenCalledWith(mockCategory);
      expect(toastService.showToast).toHaveBeenCalledWith(CATEGORY_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH); 
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showModalSpy).toHaveBeenCalled();
      expect(addCategoryCountSpy).toHaveBeenCalled();

      jest.advanceTimersByTime(3000);
    });

    it('should handle category submission error (409 conflict)', () => {
      const mockCategory: CategoryRequest = {
        name: 'Category 1',
        description: 'Description of category 1'
      };

      const errorResponse = { status: 409, error: { message: 'Category already exists' } };
      categoryService.saveCategory.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');

      component.handleSubmit(mockCategory);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(categoryService.saveCategory).toHaveBeenCalledWith(mockCategory);
      expect(component.toastMessage).toBe('Category already exists');
      expect(toastService.showToast).toHaveBeenCalledWith('Category already exists', StatusEnum.ERROR, ERROR_ICON_PATH);
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);

      jest.advanceTimersByTime(3000);
    });

    it('should handle category submission error (other errors)', () => {
      const mockCategory: CategoryRequest = {
        name: 'Category 1',
        description: 'Description of category 1'
      };

      const errorResponse = { status: 500 };  
      categoryService.saveCategory.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');

      component.handleSubmit(mockCategory);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(categoryService.saveCategory).toHaveBeenCalledWith(mockCategory);
      expect(component.toastMessage).toBe('Error inesperado en el servidor');
      expect(toastService.showToast).toHaveBeenCalledWith('Error inesperado en el servidor', StatusEnum.ERROR, ERROR_ICON_PATH);
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);

      jest.advanceTimersByTime(3000);
    });
  });

  it('should call addCategoryCount on addCategoryCount method', () => {
    const addCategoryCountSpy = jest.spyOn(component, 'addNewCategoryCount');
    component.addCategoryCount();
    expect(addCategoryCountSpy).toHaveBeenCalled();
  });

  it('should assign onShowModal to showModal property when showModalOutput is called', () => {
    const mockShowModal = jest.fn(); 

    component.showModalOutput(mockShowModal); 
    expect(component.showModal).toBe(mockShowModal);
  });

  it('should assign onChangeStatusSaveButton to changeStatusSaveButton property when changeStatusSaveButtonOutput is called', () => {
    const mockChangeStatusSaveButton = jest.fn(); 

    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
  });

  it('should call addCategoryCount on addCategoryCount method', () => {
    const addCategoryCountSpy = jest.spyOn(component, 'addNewCategoryCount');
    component.addCategoryCount();
    expect(addCategoryCountSpy).toHaveBeenCalled();
  });

  it('should assign onShowModal to showModal property when showModalOutput is called', () => {
    const mockShowModal = jest.fn(); 

    component.showModalOutput(mockShowModal); 
    expect(component.showModal).toBe(mockShowModal);
  });

  it('should assign onChangeStatusSaveButton to changeStatusSaveButton property when changeStatusSaveButtonOutput is called', () => {
    const mockChangeStatusSaveButton = jest.fn(); 

    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
  });
});
