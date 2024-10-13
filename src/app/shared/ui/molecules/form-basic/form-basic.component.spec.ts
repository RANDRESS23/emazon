import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBasicComponent } from './form-basic.component';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { SAVE_CATEGORY_BUTTON_TEXT, SAVING_BUTTON_TEXT } from '@src/app/shared/domain/constants/admin';

@Component({
  selector: 'atom-input',
  template: '<input [value]="value" (input)="onChange($event.target.value)">',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockAtomInputComponent),
      multi: true
    }
  ]
})
class MockAtomInputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

@Component({
  selector: 'atom-textarea',
  template: '<textarea [value]="value" (input)="onChange($event.target.value)"></textarea>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockAtomTextareaComponent),
      multi: true
    }
  ]
})
class MockAtomTextareaComponent implements ControlValueAccessor {
  @Input() value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

describe('FormBasicComponent', () => {
  let component: FormBasicComponent;
  let fixture: ComponentFixture<FormBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBasicComponent, MockAtomInputComponent, MockAtomTextareaComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBasicComponent);
    component = fixture.componentInstance;

    component.nameMaxLength = 50;
    component.descriptionMaxLength = 90;

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields and validators', () => {
    component.ngOnInit();
    
    expect(component.form).toBeDefined();
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
    expect(component.form.get('name')?.validator).toBeTruthy();
    expect(component.form.get('description')?.validator).toBeTruthy();
  });

  it('should emit the save button state change in the OnInit', () => {
    jest.spyOn(component.changeStatusSaveButtonEvent, 'emit');
    component.ngOnInit();
    
    expect(component.changeStatusSaveButtonEvent.emit).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should update the error text when there are validation errors in the input', () => {
    component.ngOnInit();

    component.form.get('name')?.setValue('a'.repeat(51));
    component.form.get('name')?.markAsDirty();
    component.hasErrors('name');

    expect(component.inputErrorText).toBe('El campo debe tener un máximo de caracteres de 50');
    expect(component.isDisabledSaveButton).toBe(true);
  });

  it('should update the error text when there are required validation error in the input', () => {
    component.ngOnInit();

    component.form.get('name')?.setValue('');
    component.form.get('name')?.markAsDirty();
    component.hasErrors('name');

    expect(component.inputErrorText).toBe('El campo es requerido');
    expect(component.isDisabledSaveButton).toBe(true);
  });

  it('should update the error text when there are required validation error in the textarea', () => {
    component.ngOnInit();

    component.form.get('name')?.setValue('a');
    component.form.get('description')?.setValue('');
    component.form.get('description')?.markAsDirty();
    component.hasErrors('description');

    expect(component.textareaErrorText).toBe('El campo es requerido');
    expect(component.isDisabledSaveButton).toBe(true);
  });

  it('should update the error text when there are validation errors in the textarea', () => {
    component.ngOnInit();

    component.form.get('name')?.setValue('a'.repeat(10));
    component.form.get('description')?.setValue('a'.repeat(91));
    component.form.get('description')?.markAsDirty();
    component.hasErrors('description');
    
    expect(component.textareaErrorText).toBe('El campo debe tener un máximo de caracteres de 90');
    expect(component.isDisabledSaveButton).toBe(true);
  });

  it('should disable the save button if the form is invalid', () => {
    component.ngOnInit();

    component.form.get('name')?.setValue('');
    component.form.get('description')?.setValue('');

    component.hasErrors('name');
    expect(component.isDisabledSaveButton).toBe(true);
  });

  it('should enable the save button if the form is valid', () => {
    component.ngOnInit();

    component.form.get('name')?.setValue('Nombre válido');
    component.form.get('description')?.setValue('Descripción válida');

    component.hasErrors('name');
    expect(component.isDisabledSaveButton).toBe(false);
  });

  it('should call showModal when onShowModal is called', () => {
    const showModalSpy = jest.fn();
    component.showModal = showModalSpy;

    component.onShowModal();
    expect(showModalSpy).toHaveBeenCalled();
  });

  it('should output the form data when onSubmit is called and the form is valid', () => {
    jest.spyOn(component.formDataEvent, 'emit');

    component.ngOnInit();
    component.form.get('name')?.setValue('Categoría 1');
    component.form.get('description')?.setValue('Descripción de la categoría 1');

    component.onSubmit();

    expect(component.formDataEvent.emit).toHaveBeenCalledWith({
      name: 'Categoría 1',
      description: 'Descripción de la categoría 1'
    });
  });

  it('should not output form data when onSubmit is called and the form is invalid', () => {
    jest.spyOn(component.formDataEvent, 'emit');

    component.ngOnInit();
    component.form.get('name')?.setValue('');
    component.form.get('description')?.setValue('');

    component.onSubmit();

    expect(component.formDataEvent.emit).not.toHaveBeenCalled();
  });

  it('should change the save button state correctly in changeStatusSaveButton', () => {
    component.changeStatusSaveButton(true);
    expect(component.isDisabledSaveButton).toBe(true);

    component.changeStatusSaveButton(false, true);
    expect(component.isDisabledSaveButton).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.buttonSaveText).toBe(SAVE_CATEGORY_BUTTON_TEXT);

    component.changeStatusSaveButton(true, true);
    expect(component.isDisabledSaveButton).toBe(true);
    expect(component.loading).toBe(false);
    expect(component.buttonSaveText).toBe(SAVE_CATEGORY_BUTTON_TEXT);

    component.changeStatusSaveButton(true, false);
    expect(component.isDisabledSaveButton).toBe(true);
    expect(component.loading).toBe(true);
    expect(component.buttonSaveText).toBe(SAVING_BUTTON_TEXT);

    component.changeStatusSaveButton(false, false);
    expect(component.isDisabledSaveButton).toBe(false);
    expect(component.loading).toBe(true);
    expect(component.buttonSaveText).toBe(SAVING_BUTTON_TEXT);
  });
});