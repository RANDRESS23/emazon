import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY_STRING } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';

@Component({
  selector: 'atom-dropdown-combobox',
  templateUrl: './dropdown-combobox.component.html',
  styleUrls: ['./dropdown-combobox.component.scss'],
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
export class DropdownComboboxComponent implements OnInit {
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
  @Output() optionsChange = new EventEmitter<any>();
  @Output() resetSelectedOptions = new EventEmitter<() => void>();
 
  constructor() { }

  ngOnInit(): void {
    this.resetSelectedOptions.emit(() => this.resetOptions());
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(item: string, value: string | number): void {
    const index = this.selectedOptions.indexOf(item);
    
    if (index === -1) {
      if (this.selectedOptions.length < this.maxSelection) {
        this.selectedOptions.push(item);
        this.selectedOptionsValues.push(value as number);
        this.toggleDropdown();
      }
    } else {
      this.selectedOptions.splice(index, 1);
      this.selectedOptionsValues.splice(index, 1);
    }
  
    this.optionsChange.emit(this.selectedOptionsValues);
  }

  resetOptions(): void {
    this.selectedOptions = [];
    this.selectedOptionsValues = [];
  }
}
