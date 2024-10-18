import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.textareaLabel).toBe('');
    expect(component.textareaPlaceholder).toBe('');
    expect(component.textareaName).toBe('');
    expect(component.isErrored).toBe(false);
    expect(component.errorText).toBe('');
    expect(component.value).toBe('');
  });

  it('should update the value when writeValue is called', () => {
    component.writeValue('Test value');
    expect(component.value).toBe('Test value');
  });

  it('should set value to empty string if writeValue is called with null or undefined', () => {
    component.writeValue(null);
    expect(component.value).toBe('');
    
    component.writeValue(undefined);
    expect(component.value).toBe('');
  });

  it('should register onChange function', () => {
    const onChangeFn = jest.fn();
    component.registerOnChange(onChangeFn);
    
    component.onChange('Test value');
    expect(onChangeFn).toHaveBeenCalledWith('Test value');
  });

  it('should register onTouched function', () => {
    const onTouchedFn = jest.fn();
    component.registerOnTouched(onTouchedFn);
    
    component.onTouched();
    expect(onTouchedFn).toHaveBeenCalled();
  });

  it('should emit changes when textarea input is changed', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    
    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textarea.value = 'New input';
    textarea.dispatchEvent(new Event('input'));

    expect(component.value).toBe('New input');
    expect(onChangeSpy).toHaveBeenCalledWith('New input');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
