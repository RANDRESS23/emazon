import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CLOSE_ICON_ALT, CLOSE_ICON_PATH, EMPTY_STRING, ZERO } from '@utils/constants/general';

@Component({
  selector: 'organism-modal-form-basic',
  templateUrl: './modal-form-basic.component.html',
  styleUrls: ['./modal-form-basic.component.scss'],
  animations: [
    trigger('modalAnimationContainer', [
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalAnimationContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class ModalFormBasicComponent implements OnInit {
  showModal: boolean = false;
  pathCloseIcon: string = CLOSE_ICON_PATH;
  closeIconAlt: string = CLOSE_ICON_ALT;
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() inputLabel: string = EMPTY_STRING;
  @Input() inputPlaceholder: string = EMPTY_STRING;
  @Input() inputName: string = EMPTY_STRING;
  @Input() textareaLabel: string = EMPTY_STRING;
  @Input() textareaPlaceholder: string = EMPTY_STRING;
  @Input() textareaName: string = EMPTY_STRING;
  @Input() buttonSaveText: string = EMPTY_STRING;
  @Input() modalTitle: string = EMPTY_STRING;
  @Input() modalTitlePrimary: string = EMPTY_STRING;
  @Input() nameMaxLength: number = ZERO;
  @Input() descriptionMaxLength: number = ZERO;
  @Input() moreFields: Record<string, any[]> = {};
  @Input() moreInputs: Record<string, string>[] = [];
  @Input() moreDropdowns: Record<string, string>[] = [];
  @Input() moreDropdownsCombobox: Record<string, string>[] = [];
  @Input() isDisabledSaveButton: boolean = true;
  @Output() modalEvent = new EventEmitter<() => void>();
  @Output() formDataEvent = new EventEmitter<any>();
  @Output() changeStatusSaveButtonEvent = new EventEmitter<(isDisabled: boolean, loaded?: boolean) => void>();

  constructor() { }

  ngOnInit(): void {
    this.modalEvent.emit(() => this.onShowModal());
    this.changeStatusSaveButtonEvent.emit(() => this.changeStatusSaveButton(this.isDisabledSaveButton, false));
  }

  onShowModal(): void {
    this.showModal = !this.showModal;

    if (this.showModal) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  handleSubmit(formData: any): void {
    this.formDataEvent.emit(formData);
  }
}
