import { animate, style, transition, trigger } from '@angular/animations';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_STRING, ZERO } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';

@Component({
  selector: 'atom-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  animations: [
    trigger('optionsAnimationContainer', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  valueDropdown: string | number = ZERO;
  onChange: any = () => {};
  onTouched: any = () => {};
  selectedOption: string | null = null;
  isDropdownOpen: boolean = false;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;

  @Input() label: string = EMPTY_STRING;
  @Input() label2: string = EMPTY_STRING;
  @Input() options: Record<string, string | number>[] = [];
  @Input() isErrored?: boolean = false;
  @Input() errorText: string = EMPTY_STRING;
 
  constructor() { }

  ngOnInit(): void { }

  writeValue(value: any): void {
    this.valueDropdown = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(item: string, value: string | number): void {
    if (this.selectedOption === item) {
      this.selectedOption = null;
      value = EMPTY_STRING;
    } else this.selectedOption = item;

    this.valueDropdown = value;
    this.onChange(value);
    this.onTouched();
    this.toggleDropdown();
  }
}
