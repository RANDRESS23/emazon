import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_STRING } from '@utils/constants/admin';

@Component({
  selector: 'atom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() inputLabel: string = EMPTY_STRING;
  @Input() inputPlaceholder: string = EMPTY_STRING;
  @Input() inputType: string = EMPTY_STRING;
  @Input() inputName: string = EMPTY_STRING;
  @Input() isErrored?: boolean = false;
  @Input() errorText: string = EMPTY_STRING;

  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() { }

  ngOnInit(): void { }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onInputChange(event: any): void {
    const value = event.target.value;

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
