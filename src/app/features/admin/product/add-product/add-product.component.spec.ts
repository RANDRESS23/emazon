import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { ProductService } from '@src/app/core/services/product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BRAND_PRODUCT_INPUT_NAME } from '@utils/constants/admin';

const mockBrandService = {
  getTotalBrands: jest.fn(),
};

const mockCategoryService = {
  getTotalCategories: jest.fn(),
};

const mockProductService = {
  saveProduct: jest.fn(),
};

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: BrandService, useValue: mockBrandService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: ProductService, useValue: mockProductService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    mockBrandService.getTotalBrands.mockReturnValue(of([{ name: 'Brand 1', brandId: 1 }]));
    mockCategoryService.getTotalCategories.mockReturnValue(of([{ name: 'Category 1', categoryId: 1 }]));
    fixture.detectChanges();
  });

  it('should load brands and categories on init', () => {
    expect(component.optionsBrandDropdown).toEqual([{ label: 'Brand 1', value: 1 }]);
    expect(component.optionsCategoryDropdown).toEqual([{ label: 'Category 1', value: 1 }]);
  });

  it('should update brandValue and check for errors', () => {
    component.changeBrandValue(2);
    expect(component.brandValue).toBe(2);
    expect(component.isDisabledDropdowns).toBe(true);
    expect(component.isErrorBrandDropdown).toBe(false);
  });

  it('should update categoriesValue and check for errors', () => {
    component.brandValue = 1;
    component.changeCategoryValue([1, 2]);
    expect(component.categoriesValue).toEqual([1, 2]);
    expect(component.isDisabledDropdowns).toBe(false);
    expect(component.isErrorCategoryDropdown).toBe(false);
  });

  it('should validate brand dropdown and show error if brand is not selected', () => {
    component.changeBrandValue(0);
    component.hasErrors('brand');
    expect(component.isErrorBrandDropdown).toBe(true);
    expect(component.errorTextBrandDropdown).toBe('Selecciona alguna marca');
  });

  it('should validate category dropdown and show error if no categories selected', () => {
    component.changeCategoryValue([]);
    component.hasErrors('categories');
    expect(component.isErrorCategoryDropdown).toBe(true);
    expect(component.errorTextCategoryDropdown).toBe('Selecciona al menos una categoría');
  });

  it('should reset dropdowns to default values', () => {
    component.brandValue = 1;
    component.categoriesValue = [1, 2];
    component.isDisabledDropdowns = false;
    component.isErrorBrandDropdown = true;

    component.resetDropdowns();
    expect(component.brandValue).toBe(0);
    expect(component.categoriesValue).toEqual([]);
    expect(component.isDisabledDropdowns).toBe(true);
    expect(component.isErrorBrandDropdown).toBe(false);
  });

  it('should handle product submission successfully', () => {
    const productRequest = { name: 'Test Product', description: 'description', quantity: 5, price: 10, brandId: 1, categoriesId: [1] };
    mockProductService.saveProduct.mockReturnValue(of({}));

    component.brandValue = 1;
    component.categoriesValue = [1];
    component.handleSubmit(productRequest);

    expect(mockProductService.saveProduct).toHaveBeenCalledWith({
      ...productRequest,
      quantity: 5,
      price: 10,
      brandId: 1,
      categoriesId: [1],
    });
    expect(component.toastStatus).toBe('success');
  });

  it('should handle product submission with error', () => {
    const productRequest = { name: 'Test Product', description: 'description', quantity: 100, price: 100, brandId: 1, categoriesId: [1] };
    mockProductService.saveProduct.mockReturnValue(throwError({ status: 409, error: { message: 'Error' } }));

    component.handleSubmit(productRequest);

    expect(component.toastMessage).toBe('Error');
    expect(component.toastStatus).toBe('error');
  });

  it('should trigger addProductCount when called', () => {
    const addProductCountSpy = jest.spyOn(component, 'addNewProductCount');
    component.addProductCount();
    expect(addProductCountSpy).toHaveBeenCalled();
  });

  it('should set brand dropdown error when brand value is ZERO', () => {
    component.brandValue = 0; 
    component.hasErrors(BRAND_PRODUCT_INPUT_NAME);
    
    expect(component.isErrorBrandDropdown).toBeTruthy();
    expect(component.errorTextBrandDropdown).toBe('Selecciona alguna marca');
  });
  
  it('should not set brand dropdown error when brand value is different from ZERO', () => {
    component.brandValue = 1;
    component.hasErrors(BRAND_PRODUCT_INPUT_NAME);
    
    expect(component.isErrorBrandDropdown).toBeFalsy();
    expect(component.errorTextBrandDropdown).toBe('');
  });
  
  it('should log error when brandService fails', () => {
    const error = { status: 500, message: 'Internal Server Error' };
    jest.spyOn(console, 'error');
    jest.spyOn(mockBrandService, 'getTotalBrands').mockImplementation(() => throwError(error));
  
    component.ngOnInit();
  
    expect(console.error).toHaveBeenCalledWith({ error });
  });
  
  it('should log error when categoryService fails', () => {
    const error = { status: 500, message: 'Internal Server Error' };
    jest.spyOn(console, 'error');
    jest.spyOn(mockCategoryService, 'getTotalCategories').mockImplementation(() => throwError(error));
  
    component.ngOnInit();
  
    expect(console.error).toHaveBeenCalledWith({ error });
  });
  
  it('should reset dropdown values', () => {
    component.brandValue = 1;
    component.categoriesValue = [1, 2];
    component.isDisabledDropdowns = false;
    component.isErrorBrandDropdown = true;
    component.isErrorCategoryDropdown = true;
  
    component.resetDropdowns();
  
    expect(component.brandValue).toBe(0);
    expect(component.categoriesValue).toEqual([]);
    expect(component.isDisabledDropdowns).toBeTruthy();
    expect(component.isErrorBrandDropdown).toBeFalsy();
    expect(component.isErrorCategoryDropdown).toBeFalsy();
  });

  it('should handle validation errors when product data is invalid', () => {
    const invalidProductRequest = { name: '', description: '', quantity: -1, price: -10, brandId: 0, categoriesId: [] };
    component.handleSubmit(invalidProductRequest);
    expect(component.toastStatus).toBe('error');
    expect(component.toastMessage).toContain('Error');
  });

  it('should handle service error when saving product fails', () => {
    mockProductService.saveProduct.mockReturnValue(throwError({ status: 500 }));
    const productRequest = { name: 'Test Product', description: 'description', quantity: 5, price: 10, brandId: 1, categoriesId: [1] };
    component.handleSubmit(productRequest);
    expect(component.toastMessage).toBe('Error inesperado al guardar en el servidor');
    expect(component.toastStatus).toBe('error');
  });  

  it('should set showModal using showModalOutput', () => {
    const mockFunction = jest.fn();
    
    component.showModalOutput(mockFunction);
    
    expect(component.showModal).toBe(mockFunction);
  });
  
  it('should set showToast using showToastOutput', () => {
    const mockFunction = jest.fn();
    
    component.showToastOutput(mockFunction);
    
    expect(component.showToast).toBe(mockFunction);
  });
  
  it('should set changeStatusSaveButton using changeStatusSaveButtonOutput', () => {
    const mockFunction = jest.fn();
    
    component.changeStatusSaveButtonOutput(mockFunction);
    
    expect(component.changeStatusSaveButton).toBe(mockFunction);
  });
  
  it('should set resetDropdownOption using resetOption', () => {
    const mockFunction = jest.fn();
    
    component.resetOption(mockFunction);
    
    expect(component.resetDrowdownOption).toBe(mockFunction);
  });
  
  it('should set resetDropdownOptions using resetOptions', () => {
    const mockFunction = jest.fn();
    
    component.resetOptions(mockFunction);
    
    expect(component.resetDrowdownOptions).toBe(mockFunction);
  });

  it('should call showToast twice with 3 seconds delay when handleSubmit is successful', fakeAsync(() => {
    const productRequestMock = { name: 'Test Product', description: 'description', quantity: 5, price: 10, brandId: 1, categoriesId: [1] };
    const saveProductSpy = jest.spyOn(mockProductService, 'saveProduct').mockReturnValue(of({}));
    const showToastSpy = jest.spyOn(component, 'showToast');
  
    component.handleSubmit(productRequestMock);
  
    expect(saveProductSpy).toHaveBeenCalled();
    expect(component.showToast).toHaveBeenCalledTimes(1);
  
    tick(3000);
    expect(showToastSpy).toHaveBeenCalledTimes(2);
  }));
  
  it('should call showToast twice with 3 seconds delay when handleSubmit encounters an error', fakeAsync(() => {
    const productRequestMock = { name: 'Test Product', description: 'description', quantity: 5, price: 10, brandId: 1, categoriesId: [1] };
    const errorResponse = { status: 409, error: { message: 'Conflict' } };
    const saveProductSpy = jest.spyOn(mockProductService, 'saveProduct').mockReturnValue(throwError(errorResponse));
    const showToastSpy = jest.spyOn(component, 'showToast');
  
    component.handleSubmit(productRequestMock);
  
    expect(saveProductSpy).toHaveBeenCalled();
    expect(showToastSpy).toHaveBeenCalledTimes(1);
  
    tick(3000);
    expect(showToastSpy).toHaveBeenCalledTimes(2);
  }));
});