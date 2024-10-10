import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ADD_CATEGORY_CLOSE_ICON_ALT, ADD_CATEGORY_CLOSE_ICON_PATH, EMPTY_STRING } from '@src/app/shared/domain/constants/admin';

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
  pathCloseIcon: string = ADD_CATEGORY_CLOSE_ICON_PATH;
  closeIconAlt: string = ADD_CATEGORY_CLOSE_ICON_ALT;
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Output() modalEvent = new EventEmitter<() => void>();
  @Input() modalTitle: string = EMPTY_STRING;
  @Input() modalTitlePrimary: string = EMPTY_STRING;
  @Input() nameMaxLength: number = 0;
  @Input() descriptionMaxLength: number = 0;
  @Output() formDataEvent = new EventEmitter<any>();
  @Input() isDisabledSaveButton: boolean = true;
  @Output() changeStatusSaveButtonEvent = new EventEmitter<(isDisabled: boolean, loaded?: boolean) => void>();

  constructor() { }

  ngOnInit(): void {
    this.modalEvent.emit(() => this.onShowModal());
    this.changeStatusSaveButtonEvent.emit(() => this.changeStatusSaveButton(this.isDisabledSaveButton, false));
  }

  onShowModal(): void {
    this.showModal = !this.showModal;
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  handleSubmit(formData: any): void {
    this.formDataEvent.emit(formData);
  }
}
