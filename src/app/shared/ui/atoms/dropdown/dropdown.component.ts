import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY_STRING } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';

@Component({
  selector: 'atom-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
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
export class DropdownComponent implements OnInit {
  selectedOption: string | null = null;
  isDropdownOpen: boolean = false;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;

  @Input() label: string = EMPTY_STRING;
  @Input() label2: string = EMPTY_STRING;
  @Input() options: Record<string, string | number>[] = [];
  @Input() isErrored?: boolean = false;
  @Input() errorText: string = EMPTY_STRING;
  @Output() optionChange = new EventEmitter<any>();
  @Output() resetSelectedOption = new EventEmitter<() => void>();
 
  constructor() { }

  ngOnInit(): void {
    this.resetSelectedOption.emit(() => this.resetOption());
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(item: string, value: string | number): void {
    if (this.selectedOption === item) {
      this.selectedOption = null;
      value = 0;
    } else this.selectedOption = item;

    this.toggleDropdown();
    this.optionChange.emit(value);
  }

  resetOption(): void {
    this.selectedOption = null;
  }
}
