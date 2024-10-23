import { Component, Input, OnInit } from '@angular/core';
import { ADD_PRODUCT_BUTTON_TEXT, BRAND_PRODUCT_INPUT_LABEL, BRAND_PRODUCT_INPUT_LABEL2, BRAND_PRODUCT_INPUT_NAME, CATEGORIES_PRODUCT_INPUT_LABEL, CATEGORIES_PRODUCT_INPUT_LABEL2, CATEGORIES_PRODUCT_INPUT_NAME, DESCRIPTION_PRODUCT_TEXTAREA_LABEL, DESCRIPTION_PRODUCT_TEXTAREA_NAME, DESCRIPTION_PRODUCT_TEXTAREA_PLACEHOLDER, MAX_LENGTH_PRODUCT_DESCRIPTION_FIELD, MAX_LENGTH_PRODUCT_NAME_FIELD, NAME_PRODUCT_INPUT_LABEL, NAME_PRODUCT_INPUT_NAME, NAME_PRODUCT_INPUT_PLACEHOLDER, PRICE_PRODUCT_INPUT_LABEL, PRICE_PRODUCT_INPUT_NAME, PRICE_PRODUCT_INPUT_PLACEHOLDER, PRODUCT_SAVED_TEXT, QUANTITY_PRODUCT_INPUT_LABEL, QUANTITY_PRODUCT_INPUT_NAME, QUANTITY_PRODUCT_INPUT_PLACEHOLDER, REGISTER_NEW_PRODUCT_TEXT, REGISTER_NEW_PRODUCT_TEXT_PRIMARY, SAVE_PRODUCT_BUTTON_TEXT, SERVER_ERROR_TEXT } from '@utils/constants/admin';
import { Size } from '@utils/types/size';
import { SizeEnum } from '@utils/enums/size';
import { ButtonTypeEnum } from '@utils/enums/button';
import { ButtonType } from '@utils/types/button';
import { StatusEnum } from '@utils/enums/status';
import { StatusType } from '@utils/types/status';
import { ProductRequest, ProductRequestDto } from '@utils/interfaces/product';
import { InputTypeEnum } from '@utils/enums/input';
import { InputType } from '@utils/types/input';
import { Validators } from '@angular/forms';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { BrandResponse } from '@utils/interfaces/brand';
import { CategoryResponse } from '@utils/interfaces/category';
import { ProductService } from '@src/app/core/services/product/product.service';
import { EMPTY_STRING, ERROR_ICON_PATH, SUCCESS_ICON_PATH, ZERO } from '@utils/constants/general';

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
  pathIcon: string = SUCCESS_ICON_PATH;
  toastMessage: string = EMPTY_STRING;
  toastStatus: StatusType = StatusEnum.SUCCESS;
  isDisabledSaveButton: boolean = true;
  isDisabledDropdowns: boolean = true;
  brandValue: number = ZERO
  categoriesValue: number[] = []
  labelBrandDropdown: string = BRAND_PRODUCT_INPUT_LABEL;
  labelBrandDropdown2: string = BRAND_PRODUCT_INPUT_LABEL2;
  nameBrandDropdown: string = BRAND_PRODUCT_INPUT_NAME;
  isErrorBrandDropdown: boolean = false;
  errorTextBrandDropdown: string = EMPTY_STRING;
  labelCategoryDropdown: string = CATEGORIES_PRODUCT_INPUT_LABEL;
  labelCategoryDropdown2: string = CATEGORIES_PRODUCT_INPUT_LABEL2;
  nameCategoryDropdown: string = CATEGORIES_PRODUCT_INPUT_NAME;
  errorTextCategoryDropdown: string = EMPTY_STRING;
  isErrorCategoryDropdown: boolean = false;
  optionsBrandDropdown: Record<string, string | number>[] = [];
  optionsCategoryDropdown: Record<string, string | number>[] = [];
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
  moreFields: Record<string, any[]> = {
    quantity: [ZERO, [Validators.required, Validators.min(1)]],
    price: [ZERO, [Validators.required, Validators.min(1)]]
  }
  showModal: () => void = () => {};
  showToast: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};
  resetDrowdownOption: () => void = () => {};
  resetDrowdownOptions: () => void = () => {};

  @Input() addNewProductCount: () => void = () => {};

  constructor(private brandService: BrandService, private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.brandService.getTotalBrands().subscribe({
      next: (data: BrandResponse[]) => {
        this.optionsBrandDropdown = data.map((brand) => ({ label: brand.name, value: brand.brandId }));
      },
      error: (error) => {
        console.error({ error });
      }
    })

    this.categoryService.getTotalCategories().subscribe({
      next: (data: CategoryResponse[]) => {
        this.optionsCategoryDropdown = data.map((category) => ({ label: category.name, value: category.categoryId }));
      },
      error: (error) => {
        console.error({ error });
      }
    })
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

  addProductCount(): void {
    this.addNewProductCount()
  }

  changeBrandValue(event: any): void {
    this.brandValue = event;

    if (this.brandValue !== ZERO && this.categoriesValue.length > 0) {
      this.isDisabledDropdowns = false;
    } else this.isDisabledDropdowns = true;

    this.hasErrors(BRAND_PRODUCT_INPUT_NAME);
  }
  
  changeCategoryValue(event: any): void {
    this.categoriesValue = event;

    if (this.brandValue !== ZERO && this.categoriesValue.length > 0) {
      this.isDisabledDropdowns = false;
    } else this.isDisabledDropdowns = true;
    
    this.hasErrors(CATEGORIES_PRODUCT_INPUT_NAME);
  }

  hasErrors(controlName: string) {
    if (controlName === BRAND_PRODUCT_INPUT_NAME && this.brandValue === ZERO) {
      this.errorTextBrandDropdown = 'Selecciona alguna marca';
      this.isErrorBrandDropdown = true;
    } else this.isErrorBrandDropdown = false; 

    if (controlName === CATEGORIES_PRODUCT_INPUT_NAME && this.categoriesValue.length === ZERO) {
      this.errorTextCategoryDropdown = 'Selecciona al menos una categoría';
      this.isErrorCategoryDropdown = true;
    } else this.isErrorCategoryDropdown = false; 
  }

  resetDropdowns(): void {
    this.brandValue = ZERO;
    this.categoriesValue = [];
    this.isDisabledDropdowns = true;
    this.isErrorBrandDropdown = false;
    this.isErrorCategoryDropdown = false;
    this.resetDrowdownOption();
    this.resetDrowdownOptions();
  }

  resetOption(resetSelectedOption: () => void): void {
    this.resetDrowdownOption = resetSelectedOption;
  }
  
  resetOptions(resetSelectedOptions: () => void): void {
    this.resetDrowdownOptions = resetSelectedOptions;
  }

  handleSubmit(productRequest: ProductRequestDto): void {
    const product: ProductRequest = {
      ...productRequest,
      quantity: Number(productRequest.quantity),
      price: Number(productRequest.price),
      brandId: this.brandValue,
      categoriesId: this.categoriesValue,
    }

    this.changeStatusSaveButton(true, false);

    this.productService.saveProduct(product).subscribe({
      next: () => {
        this.pathIcon = SUCCESS_ICON_PATH;
        this.toastMessage = PRODUCT_SAVED_TEXT;
        this.toastStatus = StatusEnum.SUCCESS;
        this.changeStatusSaveButton(false, true);
        this.showModal();
        this.showToast();
        this.addProductCount();

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
