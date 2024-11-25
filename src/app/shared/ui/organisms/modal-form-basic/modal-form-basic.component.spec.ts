import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFormBasicComponent } from './modal-form-basic.component';
import { EMPTY_STRING } from '@utils/constants/general';

describe('ModalFormBasicComponent', () => {
  let component: ModalFormBasicComponent;
  let fixture: ComponentFixture<ModalFormBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormBasicComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize with default values', () => {
    expect(component.showModal).toBe(false);
    expect(component.modalTitle).toBe(EMPTY_STRING);
    expect(component.modalTitlePrimary).toBe(EMPTY_STRING);
    expect(component.nameMaxLength).toBe(0);
    expect(component.descriptionMaxLength).toBe(0);
    expect(component.isDisabledSaveButton).toBe(true);
  });

  test('should emit modalEvent with correct function on init', () => {
    const spyEmit = jest.spyOn(component.modalEvent, 'emit');
    
    component.ngOnInit();
    expect(spyEmit).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith(expect.any(Function));
  });

  test('should toggle showModal when onShowModal is called', () => {
    component.onShowModal();
    expect(component.showModal).toBe(true);

    component.onShowModal();
    expect(component.showModal).toBe(false);
  });

  test('should add and remove "no-scroll" class to body when onShowModal is called', () => {
    const spyAddClass = jest.spyOn(document.body.classList, 'add');
    const spyRemoveClass = jest.spyOn(document.body.classList, 'remove');

    component.onShowModal();
    expect(spyAddClass).toHaveBeenCalledWith('no-scroll');

    component.onShowModal();
    expect(spyRemoveClass).toHaveBeenCalledWith('no-scroll');
  });

  test('should emit changeStatusSaveButtonEvent with correct function on init', () => {
    const spyEmit = jest.spyOn(component.changeStatusSaveButtonEvent, 'emit');

    component.ngOnInit();
    expect(spyEmit).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith(expect.any(Function));
  });

  test('should update changeStatusSaveButton when changeStatusSaveButtonOutput is called', () => {
    const mockFunction = jest.fn();

    component.changeStatusSaveButtonOutput(mockFunction);
    expect(component.changeStatusSaveButton).toBe(mockFunction);
  });

  test('should emit formDataEvent with formData when handleSubmit is called', () => {
    const mockFormData = { name: 'Test', description: 'Test Description' };
    const spyEmit = jest.spyOn(component.formDataEvent, 'emit');

    component.handleSubmit(mockFormData);
    expect(spyEmit).toHaveBeenCalledWith(mockFormData);
  });

  test('should emit modalEvent when ngOnInit is called', () => {
    const spyEmit = jest.spyOn(component.modalEvent, 'emit');

    component.ngOnInit();
    expect(spyEmit).toHaveBeenCalledWith(expect.any(Function));
  });
});