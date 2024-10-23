import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ADD_CATEGORY_CLOSE_ICON_ALT, ADD_CATEGORY_CLOSE_ICON_PATH } from '@utils/constants/admin';
import { EMPTY_STRING } from '@utils/constants/general';
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
  showToast: boolean = false;
  pathCloseIcon: string = ADD_CATEGORY_CLOSE_ICON_PATH;
  closeIconAlt: string = ADD_CATEGORY_CLOSE_ICON_ALT;
  statusSuccess: StatusType = StatusEnum.SUCCESS;
  statusError: StatusType = StatusEnum.ERROR;
  statusWarning: StatusType = StatusEnum.WARNING;

  @Input() pathIcon: string = EMPTY_STRING;
  @Input() label: string = EMPTY_STRING;
  @Input() status: StatusType = StatusEnum.SUCCESS;
  @Output() toastEvent = new EventEmitter<() => void>();

  constructor() { }

  ngOnInit(): void {
    this.toastEvent.emit(() => this.onShowToast());
  }

  onShowToast(): void {
    this.showToast = !this.showToast;
  }
}
