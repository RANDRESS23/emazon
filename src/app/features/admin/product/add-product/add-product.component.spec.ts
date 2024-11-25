import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { ProductService } from '@src/app/core/services/product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BRAND_PRODUCT_INPUT_LABEL, BRAND_PRODUCT_INPUT_LABEL2, BRAND_PRODUCT_INPUT_NAME, CATEGORIES_PRODUCT_INPUT_LABEL, CATEGORIES_PRODUCT_INPUT_LABEL2, CATEGORIES_PRODUCT_INPUT_NAME, PRODUCT_SAVED_TEXT } from '@utils/constants/admin';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { StatusEnum } from '@utils/enums/status';
import { ToastService } from '@src/app/shared/services/toast/toast.service';

const mockBrandService = {
  getTotalBrands: jest.fn(),
};

const mockCategoryService = {
  getTotalCategories: jest.fn(),
};

const mockProductService = {
  saveProduct: jest.fn(),
};

const mockToastService = {
  showToast: jest.fn(),
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
        { provide: ToastService, useValue: mockToastService },
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
    expect(component.moreDropdowns).toEqual([
      {
        label: BRAND_PRODUCT_INPUT_LABEL,
        label2: BRAND_PRODUCT_INPUT_LABEL2,
        options: [{ label: 'Brand 1', value: 1 }],
        name: BRAND_PRODUCT_INPUT_NAME,
        errorText: EMPTY_STRING,
      },
    ]);
    expect(component.moreDropdownsCombobox).toEqual([
      {
        label: CATEGORIES_PRODUCT_INPUT_LABEL,
        label2: CATEGORIES_PRODUCT_INPUT_LABEL2,
        options: [{ label: 'Category 1', value: 1 }],
        name: CATEGORIES_PRODUCT_INPUT_NAME,
        errorText: EMPTY_STRING,
      },
    ]);
  });

  it('should handle product submission with error', () => {
    const productRequest = {
      name: 'Test Product',
      description: 'description',
      quantity: 5,
      price: 10,
      brandId: 1,
      categoriesId: [1],
    };
    mockProductService.saveProduct.mockReturnValue(throwError({ status: 409, error: { message: 'Error' } }));

    component.handleSubmit(productRequest);

    expect(component.toastMessage).toBe('Error');
  });

  it('should log error when brandService fails', () => {
    const error = { status: 500, message: 'Internal Server Error' };
    jest.spyOn(console, 'error');
    mockBrandService.getTotalBrands.mockImplementation(() => throwError(error));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith({ error });
  });

  it('should log error when categoryService fails', () => {
    const error = { status: 500, message: 'Internal Server Error' };
    jest.spyOn(console, 'error');
    mockCategoryService.getTotalCategories.mockImplementation(() => throwError(error));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith({ error });
  });

  it('should set showModal using showModalOutput', () => {
    const mockFunction = jest.fn();

    component.showModalOutput(mockFunction);

    expect(component.showModal).toBe(mockFunction);
  });

  it('should set changeStatusSaveButton using changeStatusSaveButtonOutput', () => {
    const mockFunction = jest.fn();

    component.changeStatusSaveButtonOutput(mockFunction);

    expect(component.changeStatusSaveButton).toBe(mockFunction);
  });

  it('should call changeStatusSaveButton, showModal, addProductCount and showToast on successful product save', () => {
    const productRequest = {
      name: 'Test Product',
      description: 'description',
      quantity: 5,
      price: 10,
      brandId: 1,
      categoriesId: [1],
    };
    mockProductService.saveProduct.mockReturnValue(of(null));

    jest.spyOn(component, 'changeStatusSaveButton');
    jest.spyOn(component, 'showModal');
    jest.spyOn(component, 'addProductCount');

    component.handleSubmit(productRequest);

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true, false);
    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    expect(component.showModal).toHaveBeenCalled();
    expect(component.addProductCount).toHaveBeenCalled();
    expect(mockToastService.showToast).toHaveBeenCalledWith(PRODUCT_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
  });

  it('should set toastMessage to SERVER_ERROR_TEXT on error', () => {
    const productRequest = {
      name: 'Test Product',
      description: 'description',
      quantity: 5,
      price: 10,
      brandId: 1,
      categoriesId: [1],
    };
    const errorResponse = { status: 500, error: { message: 'Server error' } };
    
    component.changeStatusSaveButton = jest.fn();
  
    mockProductService.saveProduct.mockReturnValue(throwError(errorResponse));
  
    component.handleSubmit(productRequest);
  
    expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    expect(mockToastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
  });
  
  it('should set toastMessage to error message on conflict error (409)', () => {
    const productRequest = {
      name: 'Test Product',
      description: 'description',
      quantity: 5,
      price: 10,
      brandId: 1,
      categoriesId: [1],
    };
    const errorResponse = { status: 409, error: { message: 'Conflict error' } };
  
    component.changeStatusSaveButton = jest.fn();
  
    mockProductService.saveProduct.mockReturnValue(throwError(errorResponse)); 
  
    component.handleSubmit(productRequest);
  
    expect(component.toastMessage).toBe('Conflict error');
    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    expect(mockToastService.showToast).toHaveBeenCalledWith('Conflict error', StatusEnum.ERROR, ERROR_ICON_PATH);
  });  
});
