import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { StatusEnum } from '@utils/enums/status';
import { EMPTY_STRING, ERROR_ICON_PATH, QUANTITY_REGEX, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH, TRUE_TEXT } from '@utils/constants/general';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { InputType } from '@utils/types/input';
import { InputTypeEnum } from '@utils/enums/input';
import { EXTRA_QUANTITY_SUPPLY_INPUT_LABEL, EXTRA_QUANTITY_SUPPLY_INPUT_LABEL2, EXTRA_QUANTITY_SUPPLY_INPUT_NAME, ID_PRODUCT_SUPPLY_INPUT_LABEL, ID_PRODUCT_SUPPLY_INPUT_LABEL2, ID_PRODUCT_SUPPLY_INPUT_NAME, REGISTER_NEW_SUPPLY_TEXT, REGISTER_NEW_SUPPLY_TEXT_PRIMARY, SAVE_SUPPLY_BUTTON_TEXT, SUPPLY_SAVED_TEXT } from '@utils/constants/warehouse-assistant';
import { Validators } from '@angular/forms';
import { SupplyService } from '@src/app/core/services/supply/supply.service';
import { ProductSupplyRequest, ProductSupplyResponse, SupplyRequest } from '@utils/interfaces/supply';

@Component({
  selector: 'app-add-supply',
  templateUrl: './add-supply.component.html',
  styleUrls: ['./add-supply.component.scss']
})
export class AddSupplyComponent implements OnInit, OnChanges {
  buttonSaveText: string = SAVE_SUPPLY_BUTTON_TEXT;
  modalTitle: string = REGISTER_NEW_SUPPLY_TEXT;
  modalTitlePrimary: string = REGISTER_NEW_SUPPLY_TEXT_PRIMARY;
  toastMessage: string = EMPTY_STRING;
  isDisabledSaveButton: boolean = true;
  inputTypeNumber: InputType = InputTypeEnum.NUMBER;
  moreInputs: Record<string, string>[] = [
    {
      label: ID_PRODUCT_SUPPLY_INPUT_LABEL,
      placeholder: ID_PRODUCT_SUPPLY_INPUT_LABEL2,
      type: this.inputTypeNumber,
      name: ID_PRODUCT_SUPPLY_INPUT_NAME,
      errorText: EMPTY_STRING,
      isDisabled: TRUE_TEXT,
    },
    {
      label: EXTRA_QUANTITY_SUPPLY_INPUT_LABEL,
      placeholder: EXTRA_QUANTITY_SUPPLY_INPUT_LABEL2,
      type: this.inputTypeNumber,
      name: EXTRA_QUANTITY_SUPPLY_INPUT_NAME,
      errorText: EMPTY_STRING
    }
  ]
  moreFields: Record<string, any[]> = {};
  showModal: () => void = () => {};
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  @Input() addNewSupplyCount: () => void = () => {};
  @Input() productId: string = EMPTY_STRING;
  @Output() modalEvent = new EventEmitter<() => void>();

  constructor(private supplyService: SupplyService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.modalEvent.emit(() => this.showModal());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      this.moreFields = {
        [ID_PRODUCT_SUPPLY_INPUT_NAME]: [this.productId, [Validators.required, Validators.pattern(QUANTITY_REGEX)]],
        [EXTRA_QUANTITY_SUPPLY_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(QUANTITY_REGEX)]]
      }
    }
  }

  showModalOutput(onShowModal: () => void): void {
    this.showModal = onShowModal;
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  addSupplyCount(): void {
    this.addNewSupplyCount()
  }

  handleSubmit(supply: SupplyRequest): void {
    this.changeStatusSaveButton(true, false);

    const supplyRequest: ProductSupplyRequest = {
      productId: supply.productId,
      quantity: Number(supply.extraQuantity),
      isAddProductQuantity: true
    }

    this.supplyService.saveSupply(supplyRequest).subscribe({
      next: (response: ProductSupplyResponse) => {
        this.changeStatusSaveButton(false, true);
        this.showModal();

        if (response.state.name === StatusEnum.RECHAZADO) {
          this.toastService.showToast(response.failureReason, StatusEnum.ERROR, ERROR_ICON_PATH);
          return  
        }
        
        this.addSupplyCount();
        this.toastService.showToast(SUPPLY_SAVED_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
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
