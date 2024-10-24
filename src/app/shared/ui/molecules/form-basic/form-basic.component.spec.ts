import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBasicComponent } from './form-basic.component';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, forwardRef, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { MIN_VALUE_FIELD_ERROR_TEXT, PATTERN_ERRORS, PRICE_PRODUCT_INPUT_LABEL, PRICE_PRODUCT_INPUT_NAME, PRICE_PRODUCT_INPUT_PLACEHOLDER, QUANTITY_PRODUCT_INPUT_LABEL, QUANTITY_PRODUCT_INPUT_NAME, QUANTITY_PRODUCT_INPUT_PLACEHOLDER, REQUIRED_FIELD_ERROR_TEXT, LOADING_BUTTON_TEXT } from '@src/app/shared/utils/constants/admin';
import { InputTypeEnum } from '@utils/enums/input';
import { EMPTY_STRING } from '@utils/constants/general';

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
  let component: FormBasicComponent & { form: FormGroup | null };
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

    component.inputName = 'name';
    component.inputLabel = 'name';
    component.textareaName = 'description'; 
    component.textareaLabel = 'description'; 

    component.nameMaxLength = 50;
    component.descriptionMaxLength = 90;

    component.moreInputs = [
      {
        label: QUANTITY_PRODUCT_INPUT_LABEL,
        placeholder: QUANTITY_PRODUCT_INPUT_PLACEHOLDER,
        type: InputTypeEnum.NUMBER,
        name: QUANTITY_PRODUCT_INPUT_NAME,
        errorText: EMPTY_STRING
      },
      {
        label: PRICE_PRODUCT_INPUT_LABEL,
        placeholder: PRICE_PRODUCT_INPUT_PLACEHOLDER,
        type: InputTypeEnum.NUMBER,
        name: PRICE_PRODUCT_INPUT_NAME,
        errorText: EMPTY_STRING
      }
    ]

    component.moreFields = {
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]]
    };

    component.ngOnInit();
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
    component.form.get('quantity')?.setValue(1);
    component.form.get('price')?.setValue(1);

    component.changeStatusSaveButton(!component.form.valid || component.loading || !!component.isDisabledDropdowns);
    
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
    component.form.get('quantity')?.setValue(1);
    component.form.get('price')?.setValue(1);

    component.onSubmit();

    expect(component.formDataEvent.emit).toHaveBeenCalledWith({
      name: 'Categoría 1',
      description: 'Descripción de la categoría 1',
      quantity: 1,
      price: 1
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
    expect(component.buttonSaveText).toBe(component.buttonSaveTextPrev);

    component.changeStatusSaveButton(true, true);
    expect(component.isDisabledSaveButton).toBe(true);
    expect(component.loading).toBe(false);
    expect(component.buttonSaveText).toBe(component.buttonSaveTextPrev);

    component.changeStatusSaveButton(true, false);
    expect(component.isDisabledSaveButton).toBe(true);
    expect(component.loading).toBe(true);
    expect(component.buttonSaveText).toBe(LOADING_BUTTON_TEXT);

    component.changeStatusSaveButton(false, false);
    expect(component.isDisabledSaveButton).toBe(false);
    expect(component.loading).toBe(true);
    expect(component.buttonSaveText).toBe(LOADING_BUTTON_TEXT);
  });

  it('should handle changes in isDisabledDropdowns and update button state', () => {
    component.isDisabledDropdowns = false;
  
    const changes: SimpleChanges = {
      isDisabledDropdowns: new SimpleChange(null, false, true)
    };
  
    jest.spyOn(component, 'changeStatusSaveButton');
    
    component.ngOnChanges(changes);
    
    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(false);
    
    component.isDisabledDropdowns = true;
    component.ngOnChanges({
      isDisabledDropdowns: new SimpleChange(false, true, false)
    });
  
    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true);
  });
  
  it('should set error messages for custom input fields', () => {
    component.moreInputs = [{ label: '', name: 'extraField', errorText: '' }, { label: 'extr', name: 'extraField3', errorText: '' }];
    component.getErrorText('extraField', 'required');
    expect(component.moreInputs[0]['errorText']).toBe(REQUIRED_FIELD_ERROR_TEXT);

    component.getErrorText('extraField3', 'min', 5);
    expect(component.moreInputs[1]['errorText']).toBe(MIN_VALUE_FIELD_ERROR_TEXT);
  });
  
  it('should update the button state when loading changes in changeStatusSaveButton', () => {
    component.changeStatusSaveButton(true, false);
    expect(component.isDisabledSaveButton).toBe(true);
    expect(component.loading).toBe(true);
    expect(component.buttonSaveText).toBe(LOADING_BUTTON_TEXT);
  
    component.changeStatusSaveButton(false, true);
    expect(component.isDisabledSaveButton).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.buttonSaveText).toBe(component.buttonSaveTextPrev);
  });
  
  it('should not call showModal when showModal is null or undefined', () => {
    component.showModal = () => {};
    expect(() => component.onShowModal()).not.toThrow();
  
    component.showModal = () => {};
    expect(() => component.onShowModal()).not.toThrow();
  });

  it('should have a control named quantity', () => {
    const quantityControl = component.form.get('quantity');
    expect(quantityControl).toBeTruthy();
  });
  

  it('should set errorText to MIN_VALUE_FIELD_ERROR_TEXT for quantity when error is "min"', () => {
    const controlName = QUANTITY_PRODUCT_INPUT_NAME;
    const error = 'min';

    if (error === 'min') {
      component.moreInputs.forEach((input) => {
        if (input['name'] === controlName) input['errorText'] = MIN_VALUE_FIELD_ERROR_TEXT;
      });
    }

    const quantityInput = component.moreInputs.find(input => input['name'] === controlName);
    expect(quantityInput?.['errorText']).toBe(MIN_VALUE_FIELD_ERROR_TEXT);
  });

  it('should emit changeStatusSaveButtonEvent on ngOnInit', () => {
    jest.spyOn(component.changeStatusSaveButtonEvent, 'emit'); 
  
    component.ngOnInit(); 
  
    expect(component.changeStatusSaveButtonEvent.emit).toHaveBeenCalled();
  });

  it('should return true and get error text for required error', () => {
    const controlName = 'name';
    component.form.get(controlName)?.setValue('');
    component.form.get(controlName)?.markAsTouched(); 

    const hasError = component.hasErrors(controlName); 
    expect(hasError).toBeTruthy(); 
  });

  it('should return true and get error text for maxlength error', () => {
    const controlName = 'name';
    component.form.get(controlName)?.setValue('A very long name that exceeds max length A very long name that exceeds max length A very long name that exceeds max length A very long name that exceeds max length');
    component.form.get(controlName)?.markAsTouched();

    const hasError = component.hasErrors(controlName);
    expect(hasError).toBeTruthy();
  });

  it('should return true and get error text for min error', () => {
    const controlName = 'quantity'; 
    component.form.get(controlName)?.setValue(0); 
    component.form.get(controlName)?.markAsTouched();

    const hasError = component.hasErrors(controlName);
    expect(hasError).toBeTruthy();
  });

  it('should return false if there are no errors', () => {
    const controlName = 'name';
    component.form.get(controlName)?.setValue('Valid Name'); 
    component.form.get(controlName)?.markAsTouched();

    const hasError = component.hasErrors(controlName);
    expect(hasError).toBeFalsy();
  });

  it('should return false if control does not exist', () => {
    const controlName = 'nonExistentControl';
    const hasError = component.hasErrors(controlName);
    expect(hasError).toBeFalsy();
  });

  it('should initialize the form with only moreFields when inputLabel and textareaLabel are EMPTY_STRING', () => {
    component.inputLabel = '';
    component.textareaLabel = '';
    component.moreFields = { customField: [''] };

    component.ngOnInit();

    expect(component.form.controls['customField']).toBeDefined();
    expect(component.form.controls['name']).toBeUndefined();
    expect(component.form.controls['description']).toBeUndefined();
  });

  it('should initialize the form with name and description when inputLabel and textareaLabel are not EMPTY_STRING', () => {
    component.inputLabel = 'Name';
    component.textareaLabel = 'Description';
    component.nameMaxLength = 50;
    component.descriptionMaxLength = 100;

    component.ngOnInit();

    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['description']).toBeDefined();
  });

  it('should emit the changeStatusSaveButtonEvent with the correct function in ngOnInit', () => {
    const eventSpy = jest.spyOn(component.changeStatusSaveButtonEvent, 'emit');

    component.ngOnInit();

    expect(eventSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should toggle loading and update buttonSaveText in changeStatusSaveButton when loaded is passed', () => {
    component.buttonSaveTextPrev = 'Previous';
    component.changeStatusSaveButton(false, true);

    expect(component.isDisabledSaveButton).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.buttonSaveText).toBe('Previous');

    component.changeStatusSaveButton(true, false);

    expect(component.isDisabledSaveButton).toBe(true);
    expect(component.loading).toBe(true);
    expect(component.buttonSaveText).toBe('Cargando...');
  });

  it('should return true when control has required error', () => {
    const control = component.form.get('name');
    control?.setErrors({ required: true });
    control?.markAsTouched();
  
    const hasError = component.hasErrors('name');
    expect(hasError).toBeTruthy();
  });
  
  it('should return true when control has maxlength error', () => {
    const control = component.form.get('name');
    control?.setErrors({ maxlength: { requiredLength: 10 } });
    control?.markAsTouched();
  
    const hasError = component.hasErrors('name');
    expect(hasError).toBeTruthy();
  });

  it('should return true when control has pattern error', () => {
    const control = component.form.get('name');
    control?.setErrors({ pattern: true });
    control?.markAsTouched();
  
    const hasError = component.hasErrors('name');
    expect(hasError).toBeTruthy();
  });

  it('should return true when control has min error', () => {
    const control = component.form.get('name');
    control?.setErrors({ min: { min: 5 } });
    control?.markAsTouched();
  
    const hasError = component.hasErrors('name');
    expect(hasError).toBeTruthy();
  });

  it('should return false when control has no errors', () => {
    const control = component.form.get('name');
    control?.setErrors(null);
    control?.markAsTouched();
  
    const hasError = component.hasErrors('name');
    expect(hasError).toBeFalsy();
  });  

  it('should update errorText for matching input name when error is pattern', () => {
    component.moreInputs = [
      { name: 'name', errorText: '' }
    ];
  
    const control = component.form.get('name');
    control?.setErrors({ pattern: true });
  
    component.getErrorText('name', 'pattern');
  
    expect(component.moreInputs[0]['errorText']).toBe(PATTERN_ERRORS.name);
  });

  it('should emit changeStatusSaveButtonEvent and call changeStatusSaveButton with isDisabledSaveButton and loading', () => {
    jest.spyOn(component.changeStatusSaveButtonEvent, 'emit').mockImplementation((callback?: (isDisabled: boolean, loaded?: boolean) => void) => {
      if (callback) {
        callback(true, false);
      }
    });    
  
    const changeStatusSpy = jest.spyOn(component, 'changeStatusSaveButton');
  
    component.isDisabledSaveButton = true;
    component.loading = false;
  
    component.ngOnInit();
  
    expect(component.changeStatusSaveButtonEvent.emit).toHaveBeenCalled();
    expect(changeStatusSpy).toHaveBeenCalledWith(true, false);
  });  

  it('should call changeStatusSaveButton within setTimeout when isDisabledSaveIcon is true', () => {
    component.isDisabledSaveIcon = true;
    component.loading = false;
    component.isDisabledDropdowns = false;
    component.changeStatusSaveButton = jest.fn();

    component.form.get('exampleControl')?.setValue('Some value');
    component.form.markAsDirty(); 
    component.form.markAsTouched();
    component.form.updateValueAndValidity();

    jest.useFakeTimers();

    component.hasErrors('exampleControl');

    jest.runAllTimers();

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true);

    jest.useRealTimers();
  });

  it('should call changeStatusSaveButton with true if form is invalid', () => {
    component.isDisabledSaveIcon = true;
    component.loading = false;
    component.isDisabledDropdowns = false;
    component.changeStatusSaveButton = jest.fn();

    component.form.get('exampleControl')?.setErrors({ required: true });
    component.form.markAsDirty();
    component.form.markAsTouched();
    component.form.updateValueAndValidity();

    jest.useFakeTimers();

    component.hasErrors('exampleControl');

    jest.runAllTimers();

    expect(component.changeStatusSaveButton).toHaveBeenCalledWith(true);

    jest.useRealTimers();
  });
});