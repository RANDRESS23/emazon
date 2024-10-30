import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBrandComponent } from './add-brand.component';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrandRequest, BrandResponse } from '@utils/interfaces/brand';
import { ERROR_ICON_PATH, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { BRAND_SAVED_TEXT, SERVER_ERROR_TEXT } from '@utils/constants/admin';
import { StatusEnum } from '@utils/enums/status';
import { ToastService } from '@src/app/shared/services/toast/toast.service';

jest.useFakeTimers();

describe('AddBrandComponent', () => {
  let component: AddBrandComponent;
  let fixture: ComponentFixture<AddBrandComponent>;
  let brandService: jest.Mocked<BrandService>;
  let toastService: jest.Mocked<ToastService>;

  beforeEach(async () => {
    const brandServiceMock = {
      saveBrand: jest.fn()
    };
    const toastServiceMock = {
      showToast: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AddBrandComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBrandComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;

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
      const addBrandCountSpy = jest.spyOn(component, 'addBrandCount');

      component.handleSubmit(mockBrand);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(brandService.saveBrand).toHaveBeenCalledWith(mockBrand);
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(showModalSpy).toHaveBeenCalled();
      expect(addBrandCountSpy).toHaveBeenCalled();
      expect(toastService.showToast).toHaveBeenCalledWith(BRAND_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);

      jest.advanceTimersByTime(3000);
      expect(toastService.showToast).toHaveBeenCalledTimes(1);
    });

    it('should handle brand submission error (409 conflict)', () => {
      const mockBrand: BrandRequest = {
        name: 'Brand 1',
        description: 'Description of brand 1'
      };

      const errorResponse = { status: 409, error: { message: 'Brand already exists' } };
      brandService.saveBrand.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');

      component.handleSubmit(mockBrand);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(brandService.saveBrand).toHaveBeenCalledWith(mockBrand);
      expect(component.toastMessage).toBe('Brand already exists');
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(toastService.showToast).toHaveBeenCalledWith('Brand already exists', StatusEnum.ERROR, ERROR_ICON_PATH);

      jest.advanceTimersByTime(3000);
      expect(toastService.showToast).toHaveBeenCalledTimes(1);
    });

    it('should handle brand submission error (other errors)', () => {
      const mockBrand: BrandRequest = {
        name: 'Brand 1',
        description: 'Description of brand 1'
      };

      const errorResponse = { status: 500 };
      brandService.saveBrand.mockReturnValue(throwError(() => errorResponse));

      const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');

      component.handleSubmit(mockBrand);

      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
      expect(brandService.saveBrand).toHaveBeenCalledWith(mockBrand);
      expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
      expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
      expect(toastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);

      jest.advanceTimersByTime(3000);
      expect(toastService.showToast).toHaveBeenCalledTimes(1);
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

  it('should assign onChangeStatusSaveButton to changeStatusSaveButton property when changeStatusSaveButtonOutput is called', () => {
    const mockChangeStatusSaveButton = jest.fn();

    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
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

  it('should assign onChangeStatusSaveButton to changeStatusSaveButton property when changeStatusSaveButtonOutput is called', () => {
    const mockChangeStatusSaveButton = jest.fn(); 

    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
  });
});
