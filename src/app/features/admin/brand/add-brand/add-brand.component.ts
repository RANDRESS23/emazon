import { Component, Input, OnInit } from '@angular/core';
import { Size } from '@utils/types/size';
import { SizeEnum } from '@utils/enums/size';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';
import { ADD_BRAND_BUTTON_TEXT, BRAND_SAVED_TEXT, DESCRIPTION_BRAND_TEXTAREA_LABEL, DESCRIPTION_BRAND_TEXTAREA_NAME, DESCRIPTION_BRAND_TEXTAREA_PLACEHOLDER, MAX_LENGTH_BRAND_DESCRIPTION_FIELD, MAX_LENGTH_BRAND_NAME_FIELD, NAME_BRAND_INPUT_LABEL, NAME_BRAND_INPUT_NAME, NAME_BRAND_INPUT_PLACEHOLDER, REGISTER_NEW_BRAND_TEXT, REGISTER_NEW_BRAND_TEXT_PRIMARY, SAVE_BRAND_BUTTON_TEXT, SERVER_ERROR_TEXT } from '@utils/constants/admin';
import { StatusEnum } from '@utils/enums/status';
import { StatusType } from '@utils/types/status';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { BrandRequest } from '@utils/interfaces/brand';
import { EMPTY_STRING, ERROR_ICON_PATH, SUCCESS_ICON_PATH } from '@utils/constants/general';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  inputLabel: string = NAME_BRAND_INPUT_LABEL;
  inputPlaceholder: string = NAME_BRAND_INPUT_PLACEHOLDER;
  inputName: string = NAME_BRAND_INPUT_NAME;
  textareaLabel: string = DESCRIPTION_BRAND_TEXTAREA_LABEL;
  textareaPlaceholder: string = DESCRIPTION_BRAND_TEXTAREA_PLACEHOLDER;
  textareaName: string = DESCRIPTION_BRAND_TEXTAREA_NAME;
  buttonSaveText: string = SAVE_BRAND_BUTTON_TEXT;
  buttonText: string = ADD_BRAND_BUTTON_TEXT;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  modalTitle: string = REGISTER_NEW_BRAND_TEXT;
  modalTitlePrimary: string = REGISTER_NEW_BRAND_TEXT_PRIMARY;
  nameMaxLength: number = MAX_LENGTH_BRAND_NAME_FIELD;
  descriptionMaxLength: number = MAX_LENGTH_BRAND_DESCRIPTION_FIELD;
  pathIcon: string = SUCCESS_ICON_PATH;
  toastMessage: string = EMPTY_STRING;
  toastStatus: StatusType = StatusEnum.SUCCESS;
  isDisabledSaveButton: boolean = true;
  showModal: () => void = () => {};
  showToast: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewBrandCount: () => void = () => {};

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
  }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
  }
  
  showToastOutput(onShowToast: () => void): void {
    this.showToast = onShowToast;
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  addBrandCount(): void {
    this.addNewBrandCount()
  }

  handleSubmit(brand: BrandRequest): void {
    this.changeStatusSaveButton(true, false);

    this.brandService.saveBrand(brand).subscribe({
      next: () => {
        this.pathIcon = SUCCESS_ICON_PATH;
        this.toastMessage = BRAND_SAVED_TEXT;
        this.toastStatus = StatusEnum.SUCCESS;
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.showToast();
        this.addBrandCount();

        setTimeout(() => {
          this.showToast();
        }, 3000);
      },
      error: (error) => {
        if (error.status === 409) this.toastMessage = error.error.message;
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
