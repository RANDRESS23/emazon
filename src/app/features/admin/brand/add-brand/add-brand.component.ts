import { Component, Input, OnInit } from '@angular/core';
import { Size } from '@utils/types/size';
import { SizeEnum } from '@utils/enums/size';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';
import { ADD_BRAND_BUTTON_TEXT, BRAND_SAVED_TEXT, DESCRIPTION_BRAND_TEXTAREA_LABEL, DESCRIPTION_BRAND_TEXTAREA_NAME, DESCRIPTION_BRAND_TEXTAREA_PLACEHOLDER, MAX_LENGTH_BRAND_DESCRIPTION_FIELD, MAX_LENGTH_BRAND_NAME_FIELD, NAME_BRAND_INPUT_LABEL, NAME_BRAND_INPUT_NAME, NAME_BRAND_INPUT_PLACEHOLDER, REGISTER_NEW_BRAND_TEXT, REGISTER_NEW_BRAND_TEXT_PRIMARY, SAVE_BRAND_BUTTON_TEXT, SERVER_ERROR_TEXT } from '@utils/constants/admin';
import { StatusEnum } from '@utils/enums/status';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { BrandRequest } from '@utils/interfaces/brand';
import { EMPTY_STRING, ERROR_ICON_PATH, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { ToastService } from '@src/app/shared/services/toast/toast.service';

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
  toastMessage: string = EMPTY_STRING;
  isDisabledSaveButton: boolean = true;
  showModal: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewBrandCount: () => void = () => {};

  constructor(private brandService: BrandService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
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
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.addBrandCount();

        this.toastService.showToast(BRAND_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
      },
      error: (error) => {
        if (error.status === 409) this.toastMessage = error.error.message;
        else this.toastMessage = SERVER_ERROR_TEXT;
        
        this.changeStatusSaveButton(false, true);
        this.toastService.showToast(this.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
      }
    })
  }
}
