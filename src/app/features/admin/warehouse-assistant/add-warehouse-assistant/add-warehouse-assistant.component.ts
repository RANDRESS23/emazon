import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { WarehouseAssistantService } from '@src/app/core/services/warehouse-assistant/warehouse-assistant.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { ADD_WAREHOUSE_ASSISTANT_BUTTON_TEXT, REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT, REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT_PRIMARY, SAVE_WAREHOUSE_ASSISTANT_BUTTON_TEXT, WAREHOUSE_ASSISTANT_SAVED_TEXT } from '@utils/constants/admin';
import { BIRTHDATE_INPUT_LABEL, BIRTHDATE_INPUT_LABEL2, BIRTHDATE_INPUT_NAME, DOCUMENT_INPUT_LABEL, DOCUMENT_INPUT_LABEL2, DOCUMENT_INPUT_NAME, DOCUMENT_REGEX, EMAIL_INPUT_LABEL, EMAIL_INPUT_LABEL2, EMAIL_INPUT_NAME, EMAIL_REGEX, EMPTY_STRING, ERROR_ICON_PATH, LAST_NAME_INPUT_LABEL, LAST_NAME_INPUT_LABEL2, LAST_NAME_INPUT_NAME, NAME_INPUT_LABEL, NAME_INPUT_LABEL2, NAME_INPUT_NAME, NAME_REGEX, PASSWORD_INPUT_LABEL, PASSWORD_INPUT_LABEL2, PASSWORD_INPUT_NAME, PASSWORD_REGEX, PHONE_INPUT_LABEL, PHONE_INPUT_LABEL2, PHONE_INPUT_NAME, PHONE_REGEX, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { InputTypeEnum } from '@utils/enums/input';
import { SizeEnum } from '@utils/enums/size';
import { StatusEnum } from '@utils/enums/status';
import { WarehouseAssistantRequest } from '@utils/interfaces/warehouse-assistant';
import { ButtonType } from '@utils/types/button';
import { InputType } from '@utils/types/input';
import { Size } from '@utils/types/size';

@Component({
  selector: 'app-add-warehouse-assistant',
  templateUrl: './add-warehouse-assistant.component.html',
  styleUrls: ['./add-warehouse-assistant.component.scss']
})
export class AddWarehouseAssistantComponent implements OnInit {
  buttonSaveText: string = SAVE_WAREHOUSE_ASSISTANT_BUTTON_TEXT;
  buttonText: string = ADD_WAREHOUSE_ASSISTANT_BUTTON_TEXT;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  inputTypeText: InputType = InputTypeEnum.TEXT;
  inputTypeNumber: InputType = InputTypeEnum.NUMBER;
  inputTypeEmail: InputType = InputTypeEnum.EMAIL;
  inputTypePassword: InputType = InputTypeEnum.PASSWORD;
  inputTypeDate: InputType = InputTypeEnum.DATE;
  modalTitle: string = REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT;
  modalTitlePrimary: string = REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT_PRIMARY;
  toastMessage: string = EMPTY_STRING;
  isDisabledSaveButton: boolean = true;
  moreInputs: Record<string, string>[] = [
    {
      label: NAME_INPUT_LABEL,
      placeholder: NAME_INPUT_LABEL2,
      type: this.inputTypeText,
      name: NAME_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: LAST_NAME_INPUT_LABEL,
      placeholder: LAST_NAME_INPUT_LABEL2,
      type: this.inputTypeText,
      name: LAST_NAME_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: DOCUMENT_INPUT_LABEL,
      placeholder: DOCUMENT_INPUT_LABEL2,
      type: this.inputTypeText,
      name: DOCUMENT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: PHONE_INPUT_LABEL,
      placeholder: PHONE_INPUT_LABEL2,
      type: this.inputTypeText,
      name: PHONE_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: BIRTHDATE_INPUT_LABEL,
      placeholder: BIRTHDATE_INPUT_LABEL2,
      type: this.inputTypeDate,
      name: BIRTHDATE_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: EMAIL_INPUT_LABEL,
      placeholder: EMAIL_INPUT_LABEL2,
      type: this.inputTypeEmail,
      name: EMAIL_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: PASSWORD_INPUT_LABEL,
      placeholder: PASSWORD_INPUT_LABEL2,
      type: this.inputTypePassword,
      name: PASSWORD_INPUT_NAME,
      errorText: EMPTY_STRING
    }
  ]
  moreFields: Record<string, any[]> = {
    [NAME_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(NAME_REGEX)]],
    [LAST_NAME_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(NAME_REGEX)]],
    [DOCUMENT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(DOCUMENT_REGEX)]],
    [PHONE_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(PHONE_REGEX)]],
    [BIRTHDATE_INPUT_NAME]: [EMPTY_STRING, [Validators.required]],
    [EMAIL_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    [PASSWORD_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
  }
  showModal: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewWarehouseAssistantCount: () => void = () => {};

  constructor(private warehouseAssistantService: WarehouseAssistantService, private toastService: ToastService) { }

  ngOnInit(): void { }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  addWarehouseAssistantCount(): void {
    this.addNewWarehouseAssistantCount()
  }

  handleSubmit(warehouseAssistant: WarehouseAssistantRequest): void {
    this.changeStatusSaveButton(true, false);

    this.warehouseAssistantService.saveWarehouseAssistant(warehouseAssistant).subscribe({
      next: () => {
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.addWarehouseAssistantCount();
        
        this.toastService.showToast(WAREHOUSE_ASSISTANT_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
      },
      error: (error) => {
        if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
        else this.toastMessage = SERVER_ERROR_TEXT;
        
        this.changeStatusSaveButton(false, true);
        this.toastService.showToast(this.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
      }
    })
  }
}
