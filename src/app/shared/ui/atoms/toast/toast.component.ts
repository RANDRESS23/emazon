import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '@src/app/shared/services/toast/toast.service';
import { CLOSE_ICON_ALT, CLOSE_ICON_PATH, EMPTY_STRING, TOAST_VISIBILITY_DURATION } from '@utils/constants/general';
import { StatusEnum } from '@utils/enums/status';
import { StatusType } from '@utils/types/status';

@Component({
  selector: 'atom-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('modalAnimationToast', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20%)' }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  toastTimeoutId: any;

  showToast: boolean = false;
  pathCloseIcon: string = CLOSE_ICON_PATH;
  closeIconAlt: string = CLOSE_ICON_ALT;
  statusSuccess: StatusType = StatusEnum.SUCCESS;
  statusError: StatusType = StatusEnum.ERROR;
  statusWarning: StatusType = StatusEnum.WARNING;
  pathIcon: string = EMPTY_STRING;
  message: string = EMPTY_STRING;
  status: StatusType = StatusEnum.SUCCESS;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast: Toast) => {
      this.message = toast.message;
      this.status = toast.type;
      this.pathIcon = toast.pathIcon;
      this.showToast = true;

      if (this.toastTimeoutId) clearTimeout(this.toastTimeoutId);

      this.toastTimeoutId = setTimeout(() => {
        this.showToast = false;
      }, TOAST_VISIBILITY_DURATION);
    });
  }

  closeToast(): void {
    if (this.toastTimeoutId) clearTimeout(this.toastTimeoutId);

    this.showToast = false;
  }
}
