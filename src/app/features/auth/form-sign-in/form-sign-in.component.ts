import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL, EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL2, EMAIL_WAREHOUSE_ASSISTANT_INPUT_NAME, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL2, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME, SERVER_ERROR_TEXT, SIGN_IN_BUTTON_TEXT } from '@utils/constants/admin';
import { EMAIL_REGEX, EMPTY_STRING, ERROR_ICON_PATH, LOGED_SUCCESSFULLY_TEXT, PASSWORD_REGEX, SUCCESS_ICON_PATH } from '@utils/constants/general';
import { InputTypeEnum } from '@utils/enums/input';
import { RolesEnum } from '@utils/enums/roles';
import { StatusEnum } from '@utils/enums/status';
import { UserCredentials } from '@utils/interfaces/auth';
import { InputType } from '@utils/types/input';
import { RoleType } from '@utils/types/roles';
import { StatusType } from '@utils/types/status';

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.scss']
})
export class FormSignInComponent implements OnInit {
  buttonSaveText: string = SIGN_IN_BUTTON_TEXT;
  inputTypeEmail: InputType = InputTypeEnum.EMAIL;
  inputTypePassword: InputType = InputTypeEnum.PASSWORD;
  isDisabledSaveIcon: boolean = true;
  toastMessage: string = EMPTY_STRING;
  moreInputs: Record<string, string>[] = [
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
    [EMAIL_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    [PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required]]
  }
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  navigateToHomePage(role: RoleType | string): void {
    switch (role) {
      case RolesEnum.ADMIN:
        this.router.navigate(['/perfil/admin/inicio']);
        break;
      case RolesEnum.AUX_BODEGA:
        this.router.navigate(['/perfil/auxiliar-bodega/inicio']);
        break;
      case RolesEnum.CLIENTE:
        this.router.navigate(['/perfil/cliente/inicio']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  handleSubmit(userCredentials: UserCredentials): void {
    this.changeStatusSaveButton(true, false);
    
    this.authService.login(userCredentials).subscribe({
      next: () => {
        this.changeStatusSaveButton(false, true);
        this.navigateToHomePage(this.authService.getRole());

        this.toastService.showToast(LOGED_SUCCESSFULLY_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
      },
      error: (error) => {
        if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
        else this.toastMessage = SERVER_ERROR_TEXT;
        
        this.changeStatusSaveButton(false, true);
        this.toastService.showToast(this.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
      }
    })
  }
}
