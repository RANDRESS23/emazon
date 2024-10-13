import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

      // Call with true (disabled)
      component.setDisabledState?.(true);
      expect(component.setDisabledState).toBeDefined();

      // Call with false (enabled)
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
});