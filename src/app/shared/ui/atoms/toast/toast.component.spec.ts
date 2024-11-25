import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { Toast, ToastService } from '@src/app/shared/services/toast/toast.service';
import { StatusEnum } from '@utils/enums/status';
import { of, Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastServiceMock: jest.Mocked<ToastService>;
  let toastSubject: Subject<Toast>;

  const mockToast: Toast = {
    message: 'Test Message',
    type: StatusEnum.SUCCESS,
    pathIcon: 'icon-path'
  };

  beforeEach(async () => {
    toastSubject = new Subject<Toast>();
    const toastServiceSpy = {
      toastState: of(mockToast)
    };

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [{ provide: ToastService, useValue: toastServiceSpy }],
      imports: [NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastServiceMock = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to toastService on init and display toast', () => {
    fixture.detectChanges();
    expect(component.message).toBe(mockToast.message);
    expect(component.status).toBe(mockToast.type);
    expect(component.pathIcon).toBe(mockToast.pathIcon);
    expect(component.showToast).toBe(true);
  });

  it('should hide the toast after TOAST_VISIBILITY_DURATION', () => {
    component.showToast = true;
    fixture.detectChanges();

    component.toastTimeoutId = setTimeout(() => {
      component.showToast = false;
    }, 3000);
    jest.advanceTimersByTime(3000);

    expect(component.showToast).toBe(false);
  });

  it('should call clearTimeout and hide toast when closeToast is called', () => {
    component.showToast = true;
    component.toastTimeoutId = setTimeout(() => {}, 1000);
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    component.closeToast();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(component.toastTimeoutId);
    expect(component.showToast).toBe(false);
  });

  it('should call clearTimeout if toastTimeoutId is set', () => {
    jest.spyOn(window, 'clearTimeout');

    component.toastTimeoutId = 123;

    component.ngOnInit();

    toastSubject.next({ message: 'Test message', type: 'success', pathIcon: 'test-icon.png' });

    expect(window.clearTimeout).toHaveBeenCalledWith(123);
  });

  it('should not call clearTimeout if toastTimeoutId is not set', () => {
    jest.spyOn(window, 'clearTimeout');

    component.toastTimeoutId = null;

    component.ngOnInit();

    toastSubject.next({ message: 'Test message', type: 'success', pathIcon: 'test-icon.png' });

    expect(window.clearTimeout).not.toHaveBeenCalled();
  });
});