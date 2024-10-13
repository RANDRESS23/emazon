import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize with default values', () => {
    expect(component.showToast).toBe(false);
    expect(component.pathIcon).toBe('');
    expect(component.label).toBe('');
    expect(component.status).toBe(component.statusSuccess);
  });

  test('should emit toastEvent when component initializes', () => {
    const spyEmit = jest.spyOn(component.toastEvent, 'emit');
    component.ngOnInit();
    expect(spyEmit).toHaveBeenCalledWith(expect.any(Function));
  });

  test('should toggle showToast when onShowToast is called', () => {
    expect(component.showToast).toBe(false);
    component.onShowToast();
    expect(component.showToast).toBe(true); 
    component.onShowToast();
    expect(component.showToast).toBe(false);
  });
});