import { Component, Input, OnInit } from '@angular/core';
import { ADD_CATEGORY_BUTTON_TEXT, CATEGORY_SAVED_TEXT, DESCRIPTION_CATEGORY_TEXTAREA_LABEL, DESCRIPTION_CATEGORY_TEXTAREA_NAME, DESCRIPTION_CATEGORY_TEXTAREA_PLACEHOLDER, MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD, MAX_LENGTH_CATEGORY_NAME_FIELD, NAME_CATEGORY_INPUT_LABEL, NAME_CATEGORY_INPUT_NAME, NAME_CATEGORY_INPUT_PLACEHOLDER, REGISTER_NEW_CATEGORY_TEXT, REGISTER_NEW_CATEGORY_TEXT_PRIMARY, SAVE_CATEGORY_BUTTON_TEXT } from '@utils/constants/admin';
import { Size } from '@utils/types/size';
import { SizeEnum } from '@utils/enums/size';
import { ButtonType } from '@utils/types/button';
import { ButtonTypeEnum } from '@utils/enums/button';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { CategoryRequest } from '@utils/interfaces/category';
import { StatusEnum } from '@utils/enums/status';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { ToastService } from '@src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  inputLabel: string = NAME_CATEGORY_INPUT_LABEL;
  inputPlaceholder: string = NAME_CATEGORY_INPUT_PLACEHOLDER;
  inputName: string = NAME_CATEGORY_INPUT_NAME;
  textareaLabel: string = DESCRIPTION_CATEGORY_TEXTAREA_LABEL;
  textareaPlaceholder: string = DESCRIPTION_CATEGORY_TEXTAREA_PLACEHOLDER;
  textareaName: string = DESCRIPTION_CATEGORY_TEXTAREA_NAME;
  buttonSaveText: string = SAVE_CATEGORY_BUTTON_TEXT;
  buttonText: string = ADD_CATEGORY_BUTTON_TEXT;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  modalTitle: string = REGISTER_NEW_CATEGORY_TEXT;
  modalTitlePrimary: string = REGISTER_NEW_CATEGORY_TEXT_PRIMARY;
  nameMaxLength: number = MAX_LENGTH_CATEGORY_NAME_FIELD;
  descriptionMaxLength: number = MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD;
  toastMessage: string = EMPTY_STRING;
  isDisabledSaveButton: boolean = true;
  showModal: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewCategoryCount: () => void = () => {};

  constructor(private categoryService: CategoryService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  addCategoryCount(): void {
    this.addNewCategoryCount()
  }

  handleSubmit(category: CategoryRequest): void {
    this.changeStatusSaveButton(true, false);

    this.categoryService.saveCategory(category).subscribe({
      next: () => {
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.addCategoryCount();

        this.toastService.showToast(CATEGORY_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
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
