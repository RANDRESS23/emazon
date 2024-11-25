import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { BUY_PRODUCTS_BUTTON_TEXT, SUCCESSFUL_PURCHASE } from '@utils/constants/client';
import { EMPTY_STRING, ERROR_ICON_PATH, SERVER_ERROR_TEXT, SUCCESS_ICON_PATH, ZERO } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { SizeEnum } from '@utils/enums/size';
import { StatusEnum } from '@utils/enums/status';
import { ButtonType } from '@utils/types/button';
import { Size } from '@utils/types/size';

@Component({
  selector: 'app-purchase-information',
  templateUrl: './purchase-information.component.html',
  styleUrls: ['./purchase-information.component.scss'],
  providers: [DatePipe]
})
export class PurchaseInformationComponent implements OnInit {
  buttonText: string = BUY_PRODUCTS_BUTTON_TEXT;
  buttonSizeMedium: Size = SizeEnum.MEDIUM;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  lastDateOfCartModification: string = EMPTY_STRING;
  totalPurchasePrice: number = ZERO;
  toastMessage: string = EMPTY_STRING;
  isDisablePurchaseButton: boolean = false;

  constructor(private toastService: ToastService, private router: Router, private cartService: CartService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.cartService.cartPagedClient.subscribe((cartPagedClient) => {
      this.totalPurchasePrice = cartPagedClient?.cart?.totalPrice;
      this.isDisablePurchaseButton = cartPagedClient?.cart?.totalPrice === 0;
      
      const date = cartPagedClient?.cart?.updatedAt.toString();
      this.lastDateOfCartModification = this.datePipe.transform(date, 'dd/MM/yyyy hh:mm:ss a') || '';
    });
  }

  purchaseProducts(): void {
    this.cartService.buyCartProducts()
      .subscribe({
        next: () => {
          this.toastService.showToast(SUCCESSFUL_PURCHASE, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
          else this.toastMessage = SERVER_ERROR_TEXT;
          
          this.toastService.showToast(this.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
        }
      })
  }
}
