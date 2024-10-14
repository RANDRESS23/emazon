import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBrandComponent } from './add-brand.component';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrandRequest, BrandResponse } from '../../domain/interfaces/brand';

jest.useFakeTimers();

describe('AddBrandComponent', () => {
  let component: AddBrandComponent;
  let fixture: ComponentFixture<AddBrandComponent>;
  let brandService: jest.Mocked<BrandService>;

  beforeEach(async () => {
    const brandServiceMock = {
      saveBrand: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AddBrandComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(AddBrandComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleSubmit', () => {
    it('should handle successful brand submission', () => {
      const mockBrand: BrandRequest = {
        name: 'Brand 1',
        description: 'Description of brand 1'
      };

      const mockBrandResponse: BrandResponse = {
        brandId: 1,
        name: 'Brand 1',
        description: 'Description of brand 1'
      };
      brandService.saveBrand.mockReturnValue(of(mockBrandResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
      const showModalSpy = jest.spyOn(component, 'showModal');
      const showToastSpy = jest.spyOn(component, 'showToast');
      const addBrandCountSpy = jest.spyOn(component, 'addBrandCount');

      component.handleSubmit(mockBrand);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(brandService.saveBrand).toHaveBeenCalledWith(mockBrand);
      expect(component.pathIcon).toBe('/assets/icons/success-icon.svg');
      expect(component.toastMessage).toBe('La marca fue guardada con éxito');
      expect(component.toastStatus).toBe('success');  
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showModalSpy).toHaveBeenCalled();
      expect(showToastSpy).toHaveBeenCalled();
      expect(addBrandCountSpy).toHaveBeenCalled();

      
      jest.advanceTimersByTime(3000);
      expect(showToastSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle brand submission error (409 conflict)', () => {
      const mockBrand: BrandRequest = {
        name: 'Brand 1',
        description: 'Description of brand 1'
      };

      const errorResponse = { status: 409, error: { message: 'Brand already exists' } };
      brandService.saveBrand.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
      const showToastSpy = jest.spyOn(component, 'showToast');

      component.handleSubmit(mockBrand);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(brandService.saveBrand).toHaveBeenCalledWith(mockBrand);
      expect(component.toastMessage).toBe('Brand already exists');
      expect(component.pathIcon).toBe('/assets/icons/error-icon.svg');
      expect(component.toastStatus).toBe('error');
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showToastSpy).toHaveBeenCalled();

      
      jest.advanceTimersByTime(3000);
      expect(showToastSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle brand submission error (other errors)', () => {
      const mockBrand: BrandRequest = {
        name: 'Brand 1',
        description: 'Description of brand 1'
      };

      const errorResponse = { status: 500 };  
      brandService.saveBrand.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
      const showToastSpy = jest.spyOn(component, 'showToast');

      component.handleSubmit(mockBrand);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(brandService.saveBrand).toHaveBeenCalledWith(mockBrand);
      expect(component.toastMessage).toBe('Error inesperado al guardar en el servidor');
      expect(component.pathIcon).toBe('/assets/icons/error-icon.svg');
      expect(component.toastStatus).toBe('error');
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showToastSpy).toHaveBeenCalled();

      
      jest.advanceTimersByTime(3000);
      expect(showToastSpy).toHaveBeenCalledTimes(2);
    });
  });

  it('should call addBrandCount on addBrandCount method', () => {
    const addBrandCountSpy = jest.spyOn(component, 'addNewBrandCount');
    component.addBrandCount();
    expect(addBrandCountSpy).toHaveBeenCalled();
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
