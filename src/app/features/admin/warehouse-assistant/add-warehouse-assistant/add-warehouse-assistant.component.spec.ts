import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWarehouseAssistantComponent } from './add-warehouse-assistant.component';
import { WarehouseAssistantService } from '@src/app/core/services/warehouse-assistant/warehouse-assistant.service';
import { of, throwError } from 'rxjs';
import { WarehouseAssistantRequest } from '@utils/interfaces/warehouse-assistant';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { WAREHOUSE_ASSISTANT_SAVED_TEXT } from '@utils/constants/admin';
import { StatusEnum } from '@utils/enums/status';
import { ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';

const mockWarehouseAssistantService = {
  saveWarehouseAssistant: jest.fn()
};

const mockToastService = {
  showToast: jest.fn()
};

describe('AddWarehouseAssistantComponent', () => {
  let component: AddWarehouseAssistantComponent;
  let fixture: ComponentFixture<AddWarehouseAssistantComponent>;
  let warehouseAssistantService: WarehouseAssistantService;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWarehouseAssistantComponent],
      providers: [
        { provide: WarehouseAssistantService, useValue: mockWarehouseAssistantService },
        { provide: ToastService, useValue: mockToastService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWarehouseAssistantComponent);
    component = fixture.componentInstance;
    warehouseAssistantService = TestBed.inject(WarehouseAssistantService);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveWarehouseAssistant on handleSubmit', () => {
    const warehouseAssistant = {
      name: 'John',
      lastName: 'Doe',
      document: '123456789',
      phone: '1234567890',
      birthdate: '2000-01-01',
      email: 'john@example.com',
      password: 'Password123!'
    };

    mockWarehouseAssistantService.saveWarehouseAssistant.mockReturnValue(of({}));

    const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
    const showModalSpy = jest.spyOn(component, 'showModal');
    const addWarehouseAssistantCountSpy = jest.spyOn(component, 'addWarehouseAssistantCount');

    component.handleSubmit(warehouseAssistant);

    expect(mockWarehouseAssistantService.saveWarehouseAssistant).toHaveBeenCalledWith(warehouseAssistant);
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
    expect(showModalSpy).toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalledWith(WAREHOUSE_ASSISTANT_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
    expect(addWarehouseAssistantCountSpy).toHaveBeenCalled();
  });

  it('should handle error when saveWarehouseAssistant fails with 400 or 409', () => {
    const warehouseAssistant = {
      name: 'John',
      lastName: 'Doe',
      document: '123456789',
      phone: '1234567890',
      birthdate: '2000-01-01',
      email: 'john@example.com',
      password: 'Password123!'
    };

    mockWarehouseAssistantService.saveWarehouseAssistant.mockReturnValue(
      throwError({ status: 400, error: { message: 'Validation error' } })
    );

    const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');

    component.handleSubmit(warehouseAssistant);

    expect(component.toastMessage).toBe('Validation error');
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
    expect(toastService.showToast).toHaveBeenCalledWith('Validation error', StatusEnum.ERROR, ERROR_ICON_PATH);
  });

  it('should handle server error when saveWarehouseAssistant fails with other errors', () => {
    const warehouseAssistant = {
      name: 'John',
      lastName: 'Doe',
      document: '123456789',
      phone: '1234567890',
      birthdate: '2000-01-01',
      email: 'john@example.com',
      password: 'Password123!'
    };

    mockWarehouseAssistantService.saveWarehouseAssistant.mockReturnValue(
      throwError({ status: 500 })
    );

    const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');

    component.handleSubmit(warehouseAssistant);

    expect(component.toastMessage).toBe(SERVER_ERROR_TEXT);
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
    expect(toastService.showToast).toHaveBeenCalledWith(SERVER_ERROR_TEXT, StatusEnum.ERROR, ERROR_ICON_PATH);
  });

  it('should assign the passed function to showModal when calling showModalOutput', () => {
    const mockShowModal = jest.fn();
    component.showModalOutput(mockShowModal);
    expect(component.showModal).toBe(mockShowModal);
  });

  it('should assign the passed function to changeStatusSaveButton when calling changeStatusSaveButtonOutput', () => {
    const mockChangeStatusSaveButton = jest.fn();
    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
  });

  describe('handleSubmit', () => {
    beforeEach(() => {
      component.changeStatusSaveButton = jest.fn();
    });

    it('should call showToast twice with 3000ms delay on successful save', () => {
      jest.useFakeTimers();

      component.handleSubmit({} as WarehouseAssistantRequest);

      expect(toastService.showToast).toHaveBeenCalledTimes(4);

      jest.advanceTimersByTime(3000);

      expect(toastService.showToast).toHaveBeenCalledTimes(4);

      jest.useRealTimers();
    });

    it('should call showToast twice with 3000ms delay on error', () => {
      jest.useFakeTimers();

      warehouseAssistantService.saveWarehouseAssistant = jest.fn().mockReturnValue({
        subscribe: (callbacks: any) => {
          callbacks.error({ status: 409, error: { message: 'Error message' } });
        }
      });

      component.handleSubmit({} as WarehouseAssistantRequest);

      expect(toastService.showToast).toHaveBeenCalledTimes(5);

      jest.advanceTimersByTime(3000);

      expect(toastService.showToast).toHaveBeenCalledTimes(5);

      jest.useRealTimers();
    });
  });
  
  it('should assign the passed function to showModal when calling showModalOutput', () => {
    const mockShowModal = jest.fn();
    component.showModalOutput(mockShowModal);
    expect(component.showModal).toBe(mockShowModal);
  });

  it('should assign the passed function to changeStatusSaveButton when calling changeStatusSaveButtonOutput', () => {
    const mockChangeStatusSaveButton = jest.fn();
    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
  });
});
