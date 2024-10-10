import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBasicComponent } from './form-basic.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Component, forwardRef, Input, NO_ERRORS_SCHEMA } from '@angular/core';

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
      declarations: [
        FormBasicComponent,
        MockAtomInputComponent,
        MockAtomTextareaComponent
      ],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    expect(component.form.controls['name'].value).toBe('');
    expect(component.form.controls['description'].value).toBe('');
  });

  it('should disable the save button when the form is invalid', () => {
    expect(component.isDisabledSaveButton).toBe(true);
  });

  it('should call onShowModal when onShowModal is triggered', () => {
    const spy = jest.spyOn(component, 'onShowModal');
    component.onShowModal();
    expect(spy).toHaveBeenCalled();
  });
});