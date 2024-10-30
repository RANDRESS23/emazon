import { AddSupplyComponent } from './add-supply.component';
import { SupplyService } from '@src/app/core/services/supply/supply.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { EventEmitter, SimpleChange } from '@angular/core';
import { ProductSupplyResponse } from '@utils/interfaces/supply';
import { StatusEnum } from '@utils/enums/status';
import { of, throwError } from 'rxjs';

describe('AddSupplyComponent', () => {
  let component: AddSupplyComponent;
  let supplyServiceMock: jest.Mocked<SupplyService>;
  let toastServiceMock: jest.Mocked<ToastService>;

  beforeEach(() => {
    supplyServiceMock = {
      saveSupply: jest.fn()
    } as unknown as jest.Mocked<SupplyService>;

    toastServiceMock = {
      showToast: jest.fn()
    } as unknown as jest.Mocked<ToastService>;

    component = new AddSupplyComponent(supplyServiceMock, toastServiceMock);
    component.modalEvent = new EventEmitter();
  });

  it('should emit modalEvent on initialization', () => {
    const emitSpy = jest.spyOn(component.modalEvent, 'emit');
    component.ngOnInit();
    expect(emitSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should update moreFields when productId changes', () => {
    const productId = '123';
    component.productId = productId;

    component.ngOnChanges({
      productId: new SimpleChange(null, productId, true)
    });

    expect(component.moreFields).toEqual({
      'productId': [productId, [expect.any(Function), expect.any(Function)]],
      'extraQuantity': ['', [expect.any(Function), expect.any(Function)]]
    });
  });

  it('should call supplyService.saveSupply and show success toast on successful save', () => {
    const response: ProductSupplyResponse = {
      supplyId: 1,
      productId: 123,
      extraQuantity: 10,
      auxBodegaId: 1,
      date: '2023-01-01',
      hour: '10:00',
      state: { stateId: 1, name: StatusEnum.APROBADO },
      failureReason: ''
    };

    component.showModal = jest.fn();
    component.changeStatusSaveButton = jest.fn();
    const addSupplyCountSpy = jest.spyOn(component, 'addSupplyCount');
    supplyServiceMock.saveSupply.mockReturnValue(of(response));

    component.handleSubmit({ productId: 123, extraQuantity: '10' });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true, false);
    expect(supplyServiceMock.saveSupply).toHaveBeenCalledWith({
      productId: 123,
      quantity: 10,
      isAddProductQuantity: true
    });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    expect(component.showModal).toHaveBeenCalled();
    expect(addSupplyCountSpy).toHaveBeenCalled();
    expect(toastServiceMock.showToast).toHaveBeenCalledWith('El suministro fue guardado con éxito', StatusEnum.SUCCESS, '/assets/icons/success-icon.svg');
  });

  it('should call showToast with error message on supply rejection', () => {
    const response: ProductSupplyResponse = {
      supplyId: 1,
      productId: 123,
      extraQuantity: 10,
      auxBodegaId: 1,
      date: '2023-01-01',
      hour: '10:00',
      state: { stateId: 1, name: StatusEnum.RECHAZADO },
      failureReason: 'Insufficient quantity'
    };

    component.showModal = jest.fn();
    component.changeStatusSaveButton = jest.fn();
    supplyServiceMock.saveSupply.mockReturnValue(of(response));

    component.handleSubmit({ productId: 123, extraQuantity: '10' });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true, false);
    expect(supplyServiceMock.saveSupply).toHaveBeenCalledWith({
      productId: 123,
      quantity: 10,
      isAddProductQuantity: true
    });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    expect(component.showModal).toHaveBeenCalled();
    expect(toastServiceMock.showToast).toHaveBeenCalledWith('Insufficient quantity', StatusEnum.ERROR, '/assets/icons/error-icon.svg');
  });

  it('should handle server error and show error toast', () => {
    component.showModal = jest.fn();
    component.changeStatusSaveButton = jest.fn();
    supplyServiceMock.saveSupply.mockReturnValue(throwError({ status: 409, error: { message: 'Conflict error' } }));

    component.handleSubmit({ productId: 123, extraQuantity: '10' });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true, false);
    expect(supplyServiceMock.saveSupply).toHaveBeenCalledWith({
      productId: 123,
      quantity: 10,
      isAddProductQuantity: true
    });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    expect(toastServiceMock.showToast).toHaveBeenCalledWith('Conflict error', StatusEnum.ERROR, '/assets/icons/error-icon.svg');
  });

  it('should handle unexpected error and show generic error toast', () => {
    component.showModal = jest.fn();
    component.changeStatusSaveButton = jest.fn();
    supplyServiceMock.saveSupply.mockReturnValue(throwError({ status: 500 }));

    component.handleSubmit({ productId: 123, extraQuantity: '10' });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true, false);
    expect(supplyServiceMock.saveSupply).toHaveBeenCalledWith({
      productId: 123,
      quantity: 10,
      isAddProductQuantity: true
    });

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false, true);
    expect(toastServiceMock.showToast).toHaveBeenCalledWith('Error inesperado en el servidor', StatusEnum.ERROR, '/assets/icons/error-icon.svg');
  });

  it('should set showModal correctly when showModalOutput is called', () => {
    const mockFunction = jest.fn();

    component.showModalOutput(mockFunction);

    expect(component.showModal).toBe(mockFunction);
  });

  it('should set changeStatusSaveButton correctly when changeStatusSaveButtonOutput is called', () => {
    const mockFunction = jest.fn();

    component.changeStatusSaveButtonOutput(mockFunction);

    expect(component.changeStatusSaveButton).toBe(mockFunction);
  });
});