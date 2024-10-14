import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_STRING } from '@domain/constants/admin';

@Component({
  selector: 'atom-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() textareaLabel: string = EMPTY_STRING;
  @Input() textareaPlaceholder: string = EMPTY_STRING;
  @Input() textareaName: string = EMPTY_STRING;
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

  setDisabledState?(isDisabled: boolean): void {
    // Aquí puedes manejar si el campo debe estar deshabilitado
  }

  onInputChange(event: any): void {
    const value = event.target.value;

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
