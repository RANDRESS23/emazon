import { Component, Input, OnInit } from '@angular/core';
import { ADD_PRODUCT_BUTTON_TEXT, BRAND_PRODUCT_INPUT_LABEL, BRAND_PRODUCT_INPUT_LABEL2, BRAND_PRODUCT_INPUT_NAME, CATEGORIES_PRODUCT_INPUT_LABEL, CATEGORIES_PRODUCT_INPUT_LABEL2, CATEGORIES_PRODUCT_INPUT_NAME, DESCRIPTION_PRODUCT_TEXTAREA_LABEL, DESCRIPTION_PRODUCT_TEXTAREA_NAME, DESCRIPTION_PRODUCT_TEXTAREA_PLACEHOLDER, MAX_LENGTH_PRODUCT_DESCRIPTION_FIELD, MAX_LENGTH_PRODUCT_NAME_FIELD, NAME_PRODUCT_INPUT_LABEL, NAME_PRODUCT_INPUT_NAME, NAME_PRODUCT_INPUT_PLACEHOLDER, PRICE_PRODUCT_INPUT_LABEL, PRICE_PRODUCT_INPUT_NAME, PRICE_PRODUCT_INPUT_PLACEHOLDER, PRODUCT_SAVED_TEXT, QUANTITY_PRODUCT_INPUT_LABEL, QUANTITY_PRODUCT_INPUT_NAME, QUANTITY_PRODUCT_INPUT_PLACEHOLDER, REGISTER_NEW_PRODUCT_TEXT, REGISTER_NEW_PRODUCT_TEXT_PRIMARY, SAVE_PRODUCT_BUTTON_TEXT, SERVER_ERROR_TEXT } from '@utils/constants/admin';
import { Size } from '@utils/types/size';
import { SizeEnum } from '@utils/enums/size';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';
import { StatusEnum } from '@utils/enums/status';
import { StatusType } from '@utils/types/status';
import { ProductRequest } from '@utils/interfaces/product';
import { InputTypeEnum } from '@utils/enums/input';
import { InputType } from '@utils/types/input';
import { Validators } from '@angular/forms';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { BrandResponse } from '@utils/interfaces/brand';
import { CategoryResponse } from '@utils/interfaces/category';
import { ProductService } from '@src/app/core/services/product/product.service';
import { EMPTY_STRING, ERROR_ICON_PATH, SUCCESS_ICON_PATH, ZERO } from '@utils/constants/general';
import { ToastService } from '@src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  inputLabel: string = NAME_PRODUCT_INPUT_LABEL;
  inputPlaceholder: string = NAME_PRODUCT_INPUT_PLACEHOLDER;
  inputName: string = NAME_PRODUCT_INPUT_NAME;
  inputTypeNumber: InputType = InputTypeEnum.NUMBER;
  textareaLabel: string = DESCRIPTION_PRODUCT_TEXTAREA_LABEL;
  textareaPlaceholder: string = DESCRIPTION_PRODUCT_TEXTAREA_PLACEHOLDER;
  textareaName: string = DESCRIPTION_PRODUCT_TEXTAREA_NAME;
  buttonSaveText: string = SAVE_PRODUCT_BUTTON_TEXT;
  buttonText: string = ADD_PRODUCT_BUTTON_TEXT;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  modalTitle: string = REGISTER_NEW_PRODUCT_TEXT;
  modalTitlePrimary: string = REGISTER_NEW_PRODUCT_TEXT_PRIMARY;
  nameMaxLength: number = MAX_LENGTH_PRODUCT_NAME_FIELD;
  descriptionMaxLength: number = MAX_LENGTH_PRODUCT_DESCRIPTION_FIELD;
  toastMessage: string = EMPTY_STRING;
  isDisabledSaveButton: boolean = true;
  moreInputs: Record<string, string>[] = [
    {
      label: QUANTITY_PRODUCT_INPUT_LABEL,
      placeholder: QUANTITY_PRODUCT_INPUT_PLACEHOLDER,
      type: this.inputTypeNumber,
      name: QUANTITY_PRODUCT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: PRICE_PRODUCT_INPUT_LABEL,
      placeholder: PRICE_PRODUCT_INPUT_PLACEHOLDER,
      type: this.inputTypeNumber,
      name: PRICE_PRODUCT_INPUT_NAME,
      errorText: EMPTY_STRING
    }
  ]
  moreDropdowns: Record<string, any>[] = []
  moreDropdownsCombobox: Record<string, any>[] = []
  moreFields: Record<string, any[]> = {
    quantity: [EMPTY_STRING, [Validators.required, Validators.min(1)]],
    price: [EMPTY_STRING, [Validators.required, Validators.min(1)]],
    brandId: [EMPTY_STRING, [Validators.required]],
    categoriesId: [EMPTY_STRING, [Validators.required]]
  }
  showModal: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewProductCount: () => void = () => {};

  constructor(private brandService: BrandService, private categoryService: CategoryService, private productService: ProductService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.brandService.getTotalBrands().subscribe({
      next: (data: BrandResponse[]) => {
        const optionsBrandDropdown: Record<string, string | number>[] = data
          .map((brand) => ({ label: brand.name, value: brand.brandId }));

        this.moreDropdowns = [
          {
            label: BRAND_PRODUCT_INPUT_LABEL,
            label2: BRAND_PRODUCT_INPUT_LABEL2,
            options: optionsBrandDropdown,
            name: BRAND_PRODUCT_INPUT_NAME,
            errorText: EMPTY_STRING
          }
        ]
      },
      error: (error) => {
        console.error({ error });
      }
    })

    this.categoryService.getTotalCategories().subscribe({
      next: (data: CategoryResponse[]) => {
        const optionsCategoryDropdown: Record<string, string | number>[] = data
          .map((category) => ({ label: category.name, value: category.categoryId }));

        this.moreDropdownsCombobox = [
          {
            label: CATEGORIES_PRODUCT_INPUT_LABEL,
            label2: CATEGORIES_PRODUCT_INPUT_LABEL2,
            options: optionsCategoryDropdown,
            name: CATEGORIES_PRODUCT_INPUT_NAME,
            errorText: EMPTY_STRING
          }
        ]
      },
      error: (error) => {
        console.error({ error });
      }
    })
  }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  addProductCount(): void {
    this.addNewProductCount()
  }

  handleSubmit(product: ProductRequest): void {
    this.changeStatusSaveButton(true, false);

    this.productService.saveProduct(product).subscribe({
      next: () => {
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.addProductCount();

        this.toastService.showToast(PRODUCT_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
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
