import { animate, style, transition, trigger } from '@angular/animations';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_STRING } from '@utils/constants/general';
import { InputTypeEnum } from '@utils/enums/input';

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
  ],
  animations: [
    trigger('ErrorTextAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  value: string = EMPTY_STRING;
  onChange: any = () => {};
  onTouched: any = () => {};
  showPassword: boolean = false;

  @Input() inputLabel: string = EMPTY_STRING;
  @Input() inputPlaceholder: string = EMPTY_STRING;
  @Input() inputType: string = EMPTY_STRING;
  @Input() inputName: string = EMPTY_STRING;
  @Input() isErrored?: boolean = false;
  @Input() isDisabled?: boolean = false;
  @Input() errorText: string = EMPTY_STRING;

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

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.inputType = this.showPassword ? InputTypeEnum.TEXT : InputTypeEnum.PASSWORD
  }
}
