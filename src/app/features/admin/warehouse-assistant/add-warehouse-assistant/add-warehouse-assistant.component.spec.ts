import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWarehouseAssistantComponent } from './add-warehouse-assistant.component';
import { WarehouseAssistantService } from '@src/app/core/services/warehouse-assistant/warehouse-assistant.service';
import { of, throwError } from 'rxjs';
import { WarehouseAssistantRequest } from '@utils/interfaces/warehouse-assistant';

const mockWarehouseAssistantService = {
  saveWarehouseAssistant: jest.fn()
};

describe('AddWarehouseAssistantComponent', () => {
  let component: AddWarehouseAssistantComponent;
  let fixture: ComponentFixture<AddWarehouseAssistantComponent>;
  let warehouseAssistantService: WarehouseAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWarehouseAssistantComponent],
      providers: [
        { provide: WarehouseAssistantService, useValue: mockWarehouseAssistantService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWarehouseAssistantComponent);
    component = fixture.componentInstance;
    warehouseAssistantService = TestBed.inject(WarehouseAssistantService);
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

    // Mock del servicio
    mockWarehouseAssistantService.saveWarehouseAssistant.mockReturnValue(of({}));

    const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
    const showModalSpy = jest.spyOn(component, 'showModal');
    const showToastSpy = jest.spyOn(component, 'showToast');
    const addWarehouseAssistantCountSpy = jest.spyOn(component, 'addWarehouseAssistantCount');

    // Ejecutar el método handleSubmit
    component.handleSubmit(warehouseAssistant);

    // Verificar que el servicio fue llamado
    expect(mockWarehouseAssistantService.saveWarehouseAssistant).toHaveBeenCalledWith(warehouseAssistant);
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(true, false);
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
    expect(showModalSpy).toHaveBeenCalled();
    expect(showToastSpy).toHaveBeenCalledTimes(1);
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

    // Mock de error del servicio
    mockWarehouseAssistantService.saveWarehouseAssistant.mockReturnValue(
      throwError({ status: 400, error: { message: 'Validation error' } })
    );

    const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
    const showToastSpy = jest.spyOn(component, 'showToast');

    // Ejecutar el método handleSubmit
    component.handleSubmit(warehouseAssistant);

    // Verificar que el mensaje de error fue asignado correctamente
    expect(component.toastMessage).toBe('Validation error');
    expect(component.toastStatus).toBe('error');
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
    expect(showToastSpy).toHaveBeenCalledTimes(1);
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

    // Mock de error del servidor
    mockWarehouseAssistantService.saveWarehouseAssistant.mockReturnValue(
      throwError({ status: 500 })
    );

    const changeStatusSaveButtonSpy = jest.spyOn(component, 'changeStatusSaveButton');
    const showToastSpy = jest.spyOn(component, 'showToast');

    // Ejecutar el método handleSubmit
    component.handleSubmit(warehouseAssistant);

    // Verificar que el mensaje de error del servidor fue asignado correctamente
    expect(component.toastMessage).toBe('Error inesperado al guardar en el servidor');
    expect(component.toastStatus).toBe('error');
    expect(changeStatusSaveButtonSpy).toHaveBeenCalledWith(false, true);
    expect(showToastSpy).toHaveBeenCalledTimes(1);
  });
  
  it('should assign the passed function to showModal when calling showModalOutput', () => {
    const mockShowModal = jest.fn();
    component.showModalOutput(mockShowModal);
    expect(component.showModal).toBe(mockShowModal);
  });

  it('should assign the passed function to showToast when calling showToastOutput', () => {
    const mockShowToast = jest.fn();
    component.showToastOutput(mockShowToast);
    expect(component.showToast).toBe(mockShowToast);
  });

  it('should assign the passed function to changeStatusSaveButton when calling changeStatusSaveButtonOutput', () => {
    const mockChangeStatusSaveButton = jest.fn();
    component.changeStatusSaveButtonOutput(mockChangeStatusSaveButton);
    expect(component.changeStatusSaveButton).toBe(mockChangeStatusSaveButton);
  });

  // Pruebas para setTimeout en handleSubmit
  describe('handleSubmit', () => {
    beforeEach(() => {
      component.changeStatusSaveButton = jest.fn();
      component.showToast = jest.fn();
    });

    it('should call showToast twice with 3000ms delay on successful save', () => {
      jest.useFakeTimers(); // Activar temporizadores falsos

      component.handleSubmit({} as WarehouseAssistantRequest);

      // Verifica que showToast se llama inmediatamente
      expect(component.showToast).toHaveBeenCalledTimes(1);

      // Adelanta el tiempo 3000ms
      jest.advanceTimersByTime(3000);

      // Verifica que showToast se llama nuevamente después de 3000ms
      expect(component.showToast).toHaveBeenCalledTimes(2);

      jest.useRealTimers(); // Restablecer temporizadores reales
    });

    it('should call showToast twice with 3000ms delay on error', () => {
      jest.useFakeTimers(); // Activar temporizadores falsos

      warehouseAssistantService.saveWarehouseAssistant = jest.fn().mockReturnValue({
        subscribe: (callbacks: any) => {
          // Simula un error en el servicio
          callbacks.error({ status: 409, error: { message: 'Error message' } });
        }
      });

      component.handleSubmit({} as WarehouseAssistantRequest);

      // Verifica que showToast se llama inmediatamente
      expect(component.showToast).toHaveBeenCalledTimes(1);

      // Adelanta el tiempo 3000ms
      jest.advanceTimersByTime(3000);

      // Verifica que showToast se llama nuevamente después de 3000ms
      expect(component.showToast).toHaveBeenCalledTimes(2);

      jest.useRealTimers(); // Restablecer temporizadores reales
    });
  });
});
