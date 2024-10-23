import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CANCEL_BUTTON_TEXT, DESCRIPTION_CATEGORY_TEXTAREA_NAME, EMPTY_STRING, MAX_LENGTH_FIELD_ERROR_TEXT, MIN_VALUE_FIELD_ERROR_TEXT, NAME_CATEGORY_INPUT_NAME, PATTERN_ERRORS, REQUIRED_FIELD_ERROR_TEXT, LOADING_BUTTON_TEXT, ZERO } from '@utils/constants/admin';
import { ButtonTypeEnum } from '@utils/enums/button';
import { InputTypeEnum } from '@utils/enums/input';
import { SizeEnum } from '@utils/enums/size';
import { ButtonType } from '@utils/types/button';
import { InputType } from '@utils/types/input';
import { Size } from '@utils/types/size';

@Component({
  selector: 'molecule-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.scss']
})
export class FormBasicComponent implements OnInit, OnChanges {
  form!: FormGroup;

  inputType: InputType = InputTypeEnum.TEXT;
  inputErrorText: string = EMPTY_STRING;
  textareaErrorText: string = EMPTY_STRING;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeSubmit: ButtonType = ButtonTypeEnum.SUBMIT;
  buttonCancelText: string = CANCEL_BUTTON_TEXT;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  isDisabledSaveButton: boolean = true;
  buttonSaveTextPrev: string = EMPTY_STRING;
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
  @Input() nameMaxLength: number = ZERO;
  @Input() descriptionMaxLength: number = ZERO;
  @Input() moreFields: Record<string, any[]> = {};
  @Input() moreInputs: Record<string, string>[] = [];
  @Input() isDisabledDropdowns: boolean | null = null;
  @Input() isDisabledSaveIcon: boolean = false;
  @Output() formDataEvent = new EventEmitter<any>();
  @Output() changeStatusSaveButtonEvent = new EventEmitter<(isDisabled: boolean, loaded?: boolean) => void>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.inputLabel === EMPTY_STRING && this.textareaLabel === EMPTY_STRING) {
      this.form = this.formBuilder.group({ ...this.moreFields });
    } else {
      this.form = this.formBuilder.group({
        name: [EMPTY_STRING, [Validators.required, Validators.maxLength(this.nameMaxLength)]],
        description: [EMPTY_STRING, [Validators.required, Validators.maxLength(this.descriptionMaxLength)]],
        ...this.moreFields
      });
    }

    this.changeStatusSaveButtonEvent.emit(() => this.changeStatusSaveButton(this.isDisabledSaveButton, this.loading));
    this.buttonSaveTextPrev = this.buttonSaveText;
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if (!this.form) return;

    this.changeStatusSaveButton(!this.form.valid || this.loading || !!this.isDisabledDropdowns);

    if (this.isDisabledDropdowns === null) return;
    
    if (changes['isDisabledDropdowns']) {
      this.changeStatusSaveButton(this.isDisabledDropdowns);
    }
  }

  onShowModal(): void {
    this.showModal();
  }

  hasErrors(controlName: string) {
    const control = this.form.get(controlName);
    
    if (control?.hasError('required')) {
      this.getErrorText(controlName, 'required');
      
      return (control?.touched || control?.dirty) && control?.hasError('required');
    }
    
    if (control?.hasError('maxlength')) {
      const requiredLength = control?.errors?.['maxlength']?.requiredLength;
      this.getErrorText(controlName, 'maxlength', requiredLength);

      return (control?.touched || control?.dirty) && control?.hasError('maxlength');
    }

    if (control?.hasError('pattern')) {
      this.getErrorText(controlName, 'pattern');

      return (control?.touched || control?.dirty) && control?.hasError('pattern');
    }

    if (control?.hasError('min')) {
      const min = control?.errors?.['min']?.min;
      
      this.getErrorText(controlName, 'min', min);

      return (control?.touched || control?.dirty) && control?.hasError('min');
    }

    if (this.isDisabledSaveIcon) {
      setTimeout(() => {
        this.changeStatusSaveButton(!this.form.valid || this.loading || !!this.isDisabledDropdowns);
      }, 0);
    }

    return false
  }
  
  getErrorText(controlName: string, error: string, requiredLength?: number) {
    if (error === 'required') {
      this.inputErrorText = REQUIRED_FIELD_ERROR_TEXT;
      this.textareaErrorText = REQUIRED_FIELD_ERROR_TEXT;

      if (this.moreInputs.length > 0) {
        this.moreInputs.forEach((input) => {
          if (input['name'] === controlName) input['errorText'] = REQUIRED_FIELD_ERROR_TEXT;
        });
      }
    }
    
    if (error === 'pattern') {
      if (this.moreInputs.length > 0) {
        this.moreInputs.forEach((input) => {
          if (input['name'] === controlName) input['errorText'] = PATTERN_ERRORS[controlName as keyof typeof PATTERN_ERRORS];
        });
      }
    }

    if (controlName === NAME_CATEGORY_INPUT_NAME && error === 'maxlength') {
      this.inputErrorText = `${MAX_LENGTH_FIELD_ERROR_TEXT} ${requiredLength}`;
    }

    if (controlName === DESCRIPTION_CATEGORY_TEXTAREA_NAME && error === 'maxlength') {
      this.textareaErrorText = `${MAX_LENGTH_FIELD_ERROR_TEXT} ${requiredLength}`;
    }

    if (error === 'min') {
      this.moreInputs.forEach((input) => {
        if (input['name'] === controlName) input['errorText'] = MIN_VALUE_FIELD_ERROR_TEXT;
      });
    }
  }

  changeStatusSaveButton(isDisabled: boolean, loaded?: boolean): void {
    this.isDisabledSaveButton = isDisabled;

    if (loaded !== undefined) {
      this.loading = !loaded;
      this.buttonSaveText = loaded ? this.buttonSaveTextPrev : LOADING_BUTTON_TEXT;
    }
  }

  onSubmit(): void {
    if (this.form.valid) this.formDataEvent.emit(this.form.value);
  }
}
