import { Component, OnInit } from '@angular/core';
import { ADD_CATEGORY_BUTTON_TEXT, CATEGORY_SAVED_TEXT, EMPTY_STRING, ERROR_ICON_PATH, MAX_LENGTH_DESCRIPTION_FIELD, MAX_LENGTH_NAME_FIELD, REGISTER_NEW_CATEGORY_TEXT, REGISTER_NEW_CATEGORY_TEXT_PRIMARY, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH } from '../../domain/constants/admin';
import { Size } from '../../domain/types/size';
import { SizeEnum } from '../../domain/enums/size';
import { ButtonType } from '../../domain/types/button';
import { ButtonTypeEnum } from '../../domain/enums/button';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { CategoryRequest } from '../../domain/interfaces/category';
import { StatusType } from '../../domain/types/status';
import { StatusEnum } from '../../domain/enums/status';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  buttonText: string = ADD_CATEGORY_BUTTON_TEXT;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  modalTitle: string = REGISTER_NEW_CATEGORY_TEXT;
  modalTitlePrimary: string = REGISTER_NEW_CATEGORY_TEXT_PRIMARY;
  nameMaxLength: number = MAX_LENGTH_NAME_FIELD;
  descriptionMaxLength: number = MAX_LENGTH_DESCRIPTION_FIELD;
  pathIcon: string = SUCCESS_ICON_PATH;
  toastMessage: string = EMPTY_STRING;
  toastStatus: StatusType = StatusEnum.SUCCESS;
  isDisabledSaveButton: boolean = true;
  showModal: () => void = () => {};
  showToast: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

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