import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryComponent } from './add-category.component';
import { of, throwError } from 'rxjs';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '../../domain/interfaces/category';

jest.useFakeTimers();

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryService: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    const categoryServiceMock = {
      saveCategory: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AddCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;

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
      const showToastSpy = jest.spyOn(component, 'showToast');
      const addCategoryCountSpy = jest.spyOn(component, 'addCategoryCount');

      component.handleSubmit(mockCategory);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(categoryService.saveCategory).toHaveBeenCalledWith(mockCategory);
      expect(component.pathIcon).toBe('/assets/icons/success-icon.svg');
      expect(component.toastMessage).toBe('La categoría fue guardada con éxito');
      expect(component.toastStatus).toBe('success');  
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showModalSpy).toHaveBeenCalled();
      expect(showToastSpy).toHaveBeenCalled();
      expect(addCategoryCountSpy).toHaveBeenCalled();

      
      jest.advanceTimersByTime(3000);
      expect(showToastSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle category submission error (409 conflict)', () => {
      const mockCategory: CategoryRequest = {
        name: 'Category 1',
        description: 'Description of category 1'
      };

      const errorResponse = { status: 409, error: { message: 'Category already exists' } };
      categoryService.saveCategory.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
      const showToastSpy = jest.spyOn(component, 'showToast');

      component.handleSubmit(mockCategory);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(categoryService.saveCategory).toHaveBeenCalledWith(mockCategory);
      expect(component.toastMessage).toBe('Category already exists');
      expect(component.pathIcon).toBe('/assets/icons/error-icon.svg');
      expect(component.toastStatus).toBe('error');
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showToastSpy).toHaveBeenCalled();

      
      jest.advanceTimersByTime(3000);
      expect(showToastSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle category submission error (other errors)', () => {
      const mockCategory: CategoryRequest = {
        name: 'Category 1',
        description: 'Description of category 1'
      };

      const errorResponse = { status: 500 };  
      categoryService.saveCategory.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
      const showToastSpy = jest.spyOn(component, 'showToast');

      component.handleSubmit(mockCategory);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(categoryService.saveCategory).toHaveBeenCalledWith(mockCategory);
      expect(component.toastMessage).toBe('Error inesperado al guardar en el servidor');
      expect(component.pathIcon).toBe('/assets/icons/error-icon.svg');
      expect(component.toastStatus).toBe('error');
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showToastSpy).toHaveBeenCalled();

      
      jest.advanceTimersByTime(3000);
      expect(showToastSpy).toHaveBeenCalledTimes(2);
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

  it('should assign onShowToast to showToast property when showToastOutput is called', () => {
    const mockShowToast = jest.fn(); 

    component.showToastOutput(mockShowToast); 
    expect(component.showToast).toBe(mockShowToast);
  });

  it('should assign onChangeStatusSaveButton to changeStatusSaveButton property when changeStatusSaveButtonOutput is called', () => {
    const mockChangeStatusSaveButton = jest.fn(); 

    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
  });
});
