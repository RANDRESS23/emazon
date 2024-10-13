import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CANCEL_BUTTON_TEXT, DESCRIPTION_CATEGORY_TEXTAREA_NAME, EMPTY_STRING, MAX_LENGTH_FIELD_ERROR_TEXT, NAME_CATEGORY_INPUT_NAME, REQUIRED_FIELD_ERROR_TEXT, SAVE_CATEGORY_BUTTON_TEXT, SAVING_BUTTON_TEXT } from '@src/app/shared/domain/constants/admin';
import { ButtonTypeEnum } from '@src/app/shared/domain/enums/button';
import { InputTypeEnum } from '@src/app/shared/domain/enums/input';
import { SizeEnum } from '@src/app/shared/domain/enums/size';
import { ButtonType } from '@src/app/shared/domain/types/button';
import { InputType } from '@src/app/shared/domain/types/input';
import { Size } from '@src/app/shared/domain/types/size';

@Component({
  selector: 'molecule-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.scss']
})
export class FormBasicComponent implements OnInit {
  form!: FormGroup;

  inputType: InputType = InputTypeEnum.TEXT;
  inputErrorText: string = EMPTY_STRING;
  textareaErrorText: string = EMPTY_STRING;

  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeSubmit: ButtonType = ButtonTypeEnum.SUBMIT;
  
  buttonCancelText: string = CANCEL_BUTTON_TEXT;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  isDisabledSaveButton: boolean = true;
  loading: boolean = false;
  prevValues = {
    name: EMPTY_STRING,
    description: EMPTY_STRING
  }

  @Input() inputLabel: string = EMPTY_STRING;
  @Input() inputPlaceholder: string = EMPTY_STRING;
  @Input() inputName: string = EMPTY_STRING;
  @Input() textareaLabel: string = EMPTY_STRING;
  @Input() textareaPlaceholder: string = EMPTY_STRING;
  @Input() textareaName: string = EMPTY_STRING;
  @Input() buttonSaveText: string = EMPTY_STRING;
  @Input() showModal: () => void = () => {};
  @Input() nameMaxLength: number = 0;
  @Input() descriptionMaxLength: number = 0;
  @Output() formDataEvent = new EventEmitter<any>();
  @Output() changeStatusSaveButtonEvent = new EventEmitter<(isDisabled: boolean, loaded?: boolean) => void>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [EMPTY_STRING, [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      description: [EMPTY_STRING, [Validators.required, Validators.maxLength(this.descriptionMaxLength)]]
    });

    this.changeStatusSaveButtonEvent.emit(() => this.changeStatusSaveButton(this.isDisabledSaveButton, this.loading));
  }

  onShowModal(): void {
    this.showModal();
  }

  hasErrors(controlName: string) {
    const control = this.form.get(controlName);

    if (control?.hasError('required')) {
      this.getErrorText(controlName, 'required');
      this.changeStatusSaveButton(!this.form.valid);

      return (control?.touched || control?.dirty) && control?.hasError('required');
    }
    
    if (control?.hasError('maxlength')) {
      const requiredLength = control?.errors?.['maxlength']?.requiredLength;
      
      this.getErrorText(controlName, 'maxlength', requiredLength);
      this.changeStatusSaveButton(!this.form.valid);

      return (control?.touched || control?.dirty) && control?.hasError('maxlength');
    }
    
    this.changeStatusSaveButton(!this.form.valid || this.loading);

    return false
  }
  
  getErrorText(controlName: string, error: string, requiredLength?: number) {
    if (error === 'required') {
      this.inputErrorText = REQUIRED_FIELD_ERROR_TEXT;
      this.textareaErrorText = REQUIRED_FIELD_ERROR_TEXT;
    }

    if (controlName === NAME_CATEGORY_INPUT_NAME && error === 'maxlength') {
      this.inputErrorText = `${MAX_LENGTH_FIELD_ERROR_TEXT} ${requiredLength}`;
    }

    if (controlName === DESCRIPTION_CATEGORY_TEXTAREA_NAME && error === 'maxlength') {
      this.textareaErrorText = `${MAX_LENGTH_FIELD_ERROR_TEXT} ${requiredLength}`;
    }
  }

  changeStatusSaveButton(isDisabled: boolean, loaded?: boolean): void {
    this.isDisabledSaveButton = isDisabled;

    if (loaded !== undefined) {
      this.loading = !loaded;
      this.buttonSaveText = loaded ? SAVE_CATEGORY_BUTTON_TEXT : SAVING_BUTTON_TEXT;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const object = {
        name: this.form.value.name,
        description: this.form.value.description,
      }

      this.formDataEvent.emit(object);
    }
  }
}
