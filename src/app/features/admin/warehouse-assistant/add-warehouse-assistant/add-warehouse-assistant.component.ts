import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { WarehouseAssistantService } from '@src/app/core/services/warehouse-assistant/warehouse-assistant.service';
import { ADD_WAREHOUSE_ASSISTANT_BUTTON_TEXT, BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_LABEL, BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_LABEL2, BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_NAME, DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_LABEL, DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_LABEL2, DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_NAME, EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL, EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL2, EMAIL_WAREHOUSE_ASSISTANT_INPUT_NAME, LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL, LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL2, LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_NAME, NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL, NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL2, NAME_WAREHOUSE_ASSISTANT_INPUT_NAME, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL2, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME, PHONE_WAREHOUSE_ASSISTANT_INPUT_LABEL, PHONE_WAREHOUSE_ASSISTANT_INPUT_LABEL2, PHONE_WAREHOUSE_ASSISTANT_INPUT_NAME, REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT, REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT_PRIMARY, SAVE_WAREHOUSE_ASSISTANT_BUTTON_TEXT, SERVER_ERROR_TEXT, WAREHOUSE_ASSISTANT_SAVED_TEXT } from '@utils/constants/admin';
import { DOCUMENT_REGEX, EMAIL_REGEX, EMPTY_STRING, ERROR_ICON_PATH, NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { InputTypeEnum } from '@utils/enums/input';
import { SizeEnum } from '@utils/enums/size';
import { StatusEnum } from '@utils/enums/status';
import { WarehouseAssistantRequest } from '@utils/interfaces/warehouse-assistant';
import { ButtonType } from '@utils/types/button';
import { InputType } from '@utils/types/input';
import { Size } from '@utils/types/size';
import { StatusType } from '@utils/types/status';

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
  pathIcon: string = SUCCESS_ICON_PATH;
  toastMessage: string = EMPTY_STRING;
  toastStatus: StatusType = StatusEnum.SUCCESS;
  isDisabledSaveButton: boolean = true;
  moreInputs: Record<string, string>[] = [
    {
      label: NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL,
      placeholder: NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL2,
      type: this.inputTypeText,
      name: NAME_WAREHOUSE_ASSISTANT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL,
      placeholder: LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL2,
      type: this.inputTypeText,
      name: LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_LABEL,
      placeholder: DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_LABEL2,
      type: this.inputTypeText,
      name: DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: PHONE_WAREHOUSE_ASSISTANT_INPUT_LABEL,
      placeholder: PHONE_WAREHOUSE_ASSISTANT_INPUT_LABEL2,
      type: this.inputTypeText,
      name: PHONE_WAREHOUSE_ASSISTANT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_LABEL,
      placeholder: BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_LABEL2,
      type: this.inputTypeDate,
      name: BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL,
      placeholder: EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL2,
      type: this.inputTypeEmail,
      name: EMAIL_WAREHOUSE_ASSISTANT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL,
      placeholder: PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL2,
      type: this.inputTypePassword,
      name: PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME,
      errorText: EMPTY_STRING
    }
  ]
  moreFields: Record<string, any[]> = {
    [NAME_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(NAME_REGEX)]],
    [LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(NAME_REGEX)]],
    [DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(DOCUMENT_REGEX)]],
    [PHONE_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(PHONE_REGEX)]],
    [BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required]],
    [EMAIL_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    [PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
  }
  showModal: () => void = () => {};
  showToast: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewWarehouseAssistantCount: () => void = () => {};

  constructor(private warehouseAssistantService: WarehouseAssistantService) { }

  ngOnInit(): void { }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
  }
  
  showToastOutput(onShowToast: () => void): void {
    this.showToast = onShowToast;
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
        this.pathIcon = SUCCESS_ICON_PATH;
        this.toastMessage = WAREHOUSE_ASSISTANT_SAVED_TEXT;
        this.toastStatus = StatusEnum.SUCCESS;
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.showToast();
        this.addWarehouseAssistantCount();

        setTimeout(() => {
          this.showToast();
        }, 3000);
      },
      error: (error) => {
        if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
        else this.toastMessage = SERVER_ERROR_TEXT;
        
        this.pathIcon = ERROR_ICON_PATH;
        this.toastStatus = StatusEnum.ERROR;
        this.changeStatusSaveButton(false, true);
        this.showToast();

        setTimeout(() => {
          this.showToast();
        }, 3000);
      }
    })
  }
}
