import { animate, style, transition, trigger } from '@angular/animations';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_STRING } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';

@Component({
  selector: 'atom-dropdown-combobox',
  templateUrl: './dropdown-combobox.component.html',
  styleUrls: ['./dropdown-combobox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComboboxComponent),
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
export class DropdownComboboxComponent implements OnInit, ControlValueAccessor {
  valuesDropdown: number[] | string = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  selectedOptions: string[] = [];
  selectedOptionsValues: number[] = [];
  isDropdownOpen: boolean = false;
  maxSelection: number = 3;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;

  @Input() label: string = EMPTY_STRING;
  @Input() label2: string = EMPTY_STRING;
  @Input() options: Record<string, string | number>[] = [];
  @Input() isErrored?: boolean = false;
  @Input() errorText: string = EMPTY_STRING;
 
  constructor() { }

  ngOnInit(): void { }

  writeValue(value: any): void {
    this.valuesDropdown = value || '';
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

  selectOption(item: string, value: number | string): void {
    const index = this.selectedOptions.indexOf(item);
    
    if (index === -1) {
      if (this.selectedOptions.length < this.maxSelection) {
        this.selectedOptions.push(item);
        this.selectedOptionsValues.push(Number(value));
        this.toggleDropdown();
      }
    } else {
      this.selectedOptions.splice(index, 1);
      this.selectedOptionsValues.splice(index, 1);

      if (this.selectedOptions.length === 0) this.toggleDropdown();
    }

    this.valuesDropdown = this.selectedOptions.length === 0 ? '' : this.selectedOptionsValues;
    this.onChange(this.valuesDropdown);
    this.onTouched();
  }
}
