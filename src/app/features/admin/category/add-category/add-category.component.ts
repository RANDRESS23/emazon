import { Component, Input, OnInit } from '@angular/core';
import { ADD_CATEGORY_BUTTON_TEXT, CATEGORY_SAVED_TEXT, DESCRIPTION_CATEGORY_TEXTAREA_LABEL, DESCRIPTION_CATEGORY_TEXTAREA_NAME, DESCRIPTION_CATEGORY_TEXTAREA_PLACEHOLDER, ERROR_ICON_PATH, MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD, MAX_LENGTH_CATEGORY_NAME_FIELD, NAME_CATEGORY_INPUT_LABEL, NAME_CATEGORY_INPUT_NAME, NAME_CATEGORY_INPUT_PLACEHOLDER, REGISTER_NEW_CATEGORY_TEXT, REGISTER_NEW_CATEGORY_TEXT_PRIMARY, SAVE_CATEGORY_BUTTON_TEXT, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/admin';
import { Size } from '@utils/types/size';
import { SizeEnum } from '@utils/enums/size';
import { ButtonType } from '@utils/types/button';
import { ButtonTypeEnum } from '@utils/enums/button';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { CategoryRequest } from '@utils/interfaces/category';
import { StatusType } from '@utils/types/status';
import { StatusEnum } from '@utils/enums/status';
import { EMPTY_STRING } from '@utils/constants/general';

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
  pathIcon: string = SUCCESS_ICON_PATH;
  toastMessage: string = EMPTY_STRING;
  toastStatus: StatusType = StatusEnum.SUCCESS;
  isDisabledSaveButton: boolean = true;
  showModal: () => void = () => {};
  showToast: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewCategoryCount: () => void = () => {};

  constructor(private categoryService: CategoryService) { }

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

  addCategoryCount(): void {
    this.addNewCategoryCount()
  }

  handleSubmit(category: CategoryRequest): void {
    this.changeStatusSaveButton(true, false);

    this.categoryService.saveCategory(category).subscribe({
      next: () => {
        this.pathIcon = SUCCESS_ICON_PATH;
        this.toastMessage = CATEGORY_SAVED_TEXT;
        this.toastStatus = StatusEnum.SUCCESS;
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.showToast();
        this.addCategoryCount();

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
