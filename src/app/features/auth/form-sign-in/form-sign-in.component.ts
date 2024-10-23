import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL, EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL2, EMAIL_WAREHOUSE_ASSISTANT_INPUT_NAME, ERROR_ICON_PATH, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL2, PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME, SERVER_ERROR_TEXT, SIGN_IN_BUTTON_TEXT, SUCCESS_ICON_PATH } from '@utils/constants/admin';
import { EMAIL_REGEX, EMPTY_STRING, LOGED_SUCCESSFULLY_TEXT, PASSWORD_REGEX } from '@utils/constants/general';
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
  pathIcon: string = SUCCESS_ICON_PATH;
  toastMessage: string = EMPTY_STRING;
  toastStatus: StatusType = StatusEnum.SUCCESS;
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
    [PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
  }
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};
  showToast: () => void = () => {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  showToastOutput(onShowToast: () => void): void {
    this.showToast = onShowToast;
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
        this.pathIcon = SUCCESS_ICON_PATH;
        this.toastMessage = LOGED_SUCCESSFULLY_TEXT;
        this.toastStatus = StatusEnum.SUCCESS;
        this.changeStatusSaveButton(false, true);
        this.showToast();
        this.navigateToHomePage(this.authService.getRole());

        setTimeout(() => {
          this.showToast();
        }, 3000);
      },
      error: (error) => {
        if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
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
