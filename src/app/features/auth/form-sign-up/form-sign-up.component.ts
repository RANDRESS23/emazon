import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { EMAIL_INPUT_LABEL, EMAIL_INPUT_LABEL2, EMAIL_INPUT_NAME, EMAIL_REGEX, PASSWORD_REGEX, EMPTY_STRING, PASSWORD_INPUT_LABEL, PASSWORD_INPUT_LABEL2, PASSWORD_INPUT_NAME, SIGN_UP_BUTTON_TEXT, SUCCESS_ICON_PATH, SERVER_ERROR_TEXT, ERROR_ICON_PATH, SIGN_UP_SUCCESSFULLY_TEXT, NAME_INPUT_LABEL, NAME_INPUT_LABEL2, NAME_INPUT_NAME, LAST_NAME_INPUT_LABEL, LAST_NAME_INPUT_LABEL2, LAST_NAME_INPUT_NAME, DOCUMENT_INPUT_LABEL, DOCUMENT_INPUT_LABEL2, PHONE_INPUT_LABEL, PHONE_INPUT_LABEL2, BIRTHDATE_INPUT_LABEL, BIRTHDATE_INPUT_LABEL2, BIRTHDATE_INPUT_NAME, DOCUMENT_INPUT_NAME, PHONE_INPUT_NAME, NAME_REGEX, DOCUMENT_REGEX, PHONE_REGEX } from '@utils/constants/general';
import { InputTypeEnum } from '@utils/enums/input';
import { StatusEnum } from '@utils/enums/status';
import { ClientRequest, UserCredentials } from '@utils/interfaces/auth';
import { InputType } from '@utils/types/input';

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit {
  buttonSaveText: string = SIGN_UP_BUTTON_TEXT;
  inputTypeText: InputType = InputTypeEnum.TEXT;
  inputTypeDate: InputType = InputTypeEnum.DATE;
  inputTypeEmail: InputType = InputTypeEnum.EMAIL;
  inputTypePassword: InputType = InputTypeEnum.PASSWORD;
  isDisabledSaveIcon: boolean = true;
  toastMessage: string = EMPTY_STRING;
  moreInputs: Record<string, string>[] = [
    {
      label: NAME_INPUT_LABEL,
      placeholder: NAME_INPUT_LABEL2,
      type: this.inputTypeText,
      name: NAME_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: LAST_NAME_INPUT_LABEL,
      placeholder: LAST_NAME_INPUT_LABEL2,
      type: this.inputTypeText,
      name: LAST_NAME_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: DOCUMENT_INPUT_LABEL,
      placeholder: DOCUMENT_INPUT_LABEL2,
      type: this.inputTypeText,
      name: DOCUMENT_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: PHONE_INPUT_LABEL,
      placeholder: PHONE_INPUT_LABEL2,
      type: this.inputTypeText,
      name: PHONE_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: BIRTHDATE_INPUT_LABEL,
      placeholder: BIRTHDATE_INPUT_LABEL2,
      type: this.inputTypeDate,
      name: BIRTHDATE_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: EMAIL_INPUT_LABEL,
      placeholder: EMAIL_INPUT_LABEL2,
      type: this.inputTypeEmail,
      name: EMAIL_INPUT_NAME,
      errorText: EMPTY_STRING
    },
    {
      label: PASSWORD_INPUT_LABEL,
      placeholder: PASSWORD_INPUT_LABEL2,
      type: this.inputTypePassword,
      name: PASSWORD_INPUT_NAME,
      errorText: EMPTY_STRING
    }
  ]
  moreFields: Record<string, any[]> = {
    [NAME_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(NAME_REGEX)]],
    [LAST_NAME_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(NAME_REGEX)]],
    [DOCUMENT_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(DOCUMENT_REGEX)]],
    [PHONE_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(PHONE_REGEX)]],
    [BIRTHDATE_INPUT_NAME]: [EMPTY_STRING, [Validators.required]],
    [EMAIL_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    [PASSWORD_INPUT_NAME]: [EMPTY_STRING, [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
  }
  changeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void = () => {};

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  changeStatusSaveButtonOutput(onChangeStatusSaveButton: (isDisabled: boolean, loaded?: boolean) => void): void {
    this.changeStatusSaveButton = onChangeStatusSaveButton;
  }

  handleSubmit(clientRequest: ClientRequest): void {
    this.changeStatusSaveButton(true, false);
    
    this.authService.saveClient(clientRequest).subscribe({
      next: () => {
        this.changeStatusSaveButton(false, true);
        this.login({ email: clientRequest.email, password: clientRequest.password });

        this.toastService.showToast(SIGN_UP_SUCCESSFULLY_TEXT, StatusEnum.SUCCESS, SUCCESS_ICON_PATH);
      },
      error: (error) => {
        if (error.status === 409 || error.status === 400) this.toastMessage = error.error.message;
        else this.toastMessage = SERVER_ERROR_TEXT;
        
        this.changeStatusSaveButton(false, true);
        this.toastService.showToast(this.toastMessage, StatusEnum.ERROR, ERROR_ICON_PATH);
      }
    })
  }

  login(userCredentials: UserCredentials): void {
    this.authService.login(userCredentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
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
