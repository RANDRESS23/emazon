import { Injectable } from '@angular/core';
import { StatusEnum } from '@utils/enums/status';
import { StatusType } from '@utils/types/status';
import { Subject } from 'rxjs';

export interface Toast {
  message: string;
  type: StatusType;
  pathIcon: string
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastSubject = new Subject<Toast>();
  toastState = this.toastSubject.asObservable();

  showToast(message: string, type: StatusType = StatusEnum.SUCCESS, pathIcon: string): void {
    this.toastSubject.next({ message, type, pathIcon });
  }
}
