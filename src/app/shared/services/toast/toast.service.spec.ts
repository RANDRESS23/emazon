import { TestBed } from '@angular/core/testing';
import { Toast, ToastService } from './toast.service';
import { StatusEnum } from '@utils/enums/status';
import { take } from 'rxjs';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });
    service = TestBed.inject(ToastService);
  });

  it('should emit toast with given message, type, and pathIcon', (done) => {
    const testMessage = 'Test message';
    const testType = StatusEnum.ERROR;
    const testPathIcon = '/assets/icons/error-icon.svg';

    service.toastState.pipe(take(1)).subscribe((toast: Toast) => {
      expect(toast.message).toBe(testMessage);
      expect(toast.type).toBe(testType);
      expect(toast.pathIcon).toBe(testPathIcon);
      done();
    });

    service.showToast(testMessage, testType, testPathIcon);
  });

  it('should emit toast with default type as SUCCESS when type is not provided', (done) => {
    const testMessage = 'Default success message';
    const testPathIcon = '/assets/icons/success-icon.svg';

    service.toastState.pipe(take(1)).subscribe((toast: Toast) => {
      expect(toast.message).toBe(testMessage);
      expect(toast.type).toBe(StatusEnum.SUCCESS);
      expect(toast.pathIcon).toBe(testPathIcon);
      done();
    });

    service.showToast(testMessage, undefined, testPathIcon);
  });
});
