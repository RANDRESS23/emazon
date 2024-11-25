import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTypeEnum } from '@utils/enums/input';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: InputComponent,
          multi: true
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should register as ControlValueAccessor', () => {
    const valueAccessor: ControlValueAccessor = component;
    expect(valueAccessor.writeValue).toBeDefined();
    expect(valueAccessor.registerOnChange).toBeDefined();
    expect(valueAccessor.registerOnTouched).toBeDefined();
  });

  it('should call writeValue and update the value', () => {
    component.writeValue('test');
    expect(component.value).toBe('test');
  });

  describe('writeValue', () => {
    it('should set the value when writeValue is called', () => {
      component.writeValue('test value');
      expect(component.value).toBe('test value');
    });

    it('should set value as empty string if null or undefined is passed', () => {
      component.writeValue(null);
      expect(component.value).toBe('');
      
      component.writeValue(undefined);
      expect(component.value).toBe('');
    });
  });

  describe('registerOnChange', () => {
    it('should register onChange function', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      expect(component.onChange).toBe(fn);
    });
  });

  describe('registerOnTouched', () => {
    it('should register onTouched function', () => {
      const fn = jest.fn();
      component.registerOnTouched(fn);
      expect(component.onTouched).toBe(fn);
    });
  });

  describe('setDisabledState', () => {
    it('should define setDisabledState and call it without errors', () => {
      expect(component.setDisabledState).toBeDefined();

      component.setDisabledState?.(true);
      expect(component.setDisabledState).toBeDefined();

      component.setDisabledState?.(false);
      expect(component.setDisabledState).toBeDefined();
    });
  });

  describe('onInputChange', () => {
    it('should update the value and call onChange and onTouched when input changes', () => {
      const onChangeSpy = jest.fn();
      const onTouchedSpy = jest.fn();

      component.registerOnChange(onChangeSpy);
      component.registerOnTouched(onTouchedSpy);

      const mockEvent = { target: { value: 'new input value' } };
      component.onInputChange(mockEvent);

      expect(component.value).toBe('new input value');
      expect(onChangeSpy).toHaveBeenCalledWith('new input value');
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('default values and properties', () => {
    it('should have default values for inputs', () => {
      expect(component.inputLabel).toBe('');
      expect(component.inputPlaceholder).toBe('');
      expect(component.inputType).toBe('');
      expect(component.inputName).toBe('');
      expect(component.isErrored).toBe(false);
      expect(component.errorText).toBe('');
    });
  });

  it('should toggle showPassword from false to true and set inputType to TEXT', () => {
    component.toggleShowPassword();
    
    expect(component.showPassword).toBeTruthy(); 
    expect(component.inputType).toBe(InputTypeEnum.TEXT); 
  });

  it('should toggle showPassword from true to false and set inputType to PASSWORD', () => {
    component.showPassword = true; 
    component.inputType = InputTypeEnum.TEXT; 

    component.toggleShowPassword();
    
    expect(component.showPassword).toBeFalsy(); 
    expect(component.inputType).toBe(InputTypeEnum.PASSWORD);
  });

  it('should register as a ControlValueAccessor', () => {
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.writeValue).toBeDefined();
  });

  it('should call onChange and onTouched when input changes', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith('test');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});