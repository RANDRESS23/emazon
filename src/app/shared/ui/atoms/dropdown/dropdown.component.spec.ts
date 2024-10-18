import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { EMPTY_STRING } from '@utils/constants/admin';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize with default values', () => {
    expect(component.selectedOption).toBeNull();
    expect(component.isDropdownOpen).toBe(false);
    expect(component.label).toBe(EMPTY_STRING);
    expect(component.label2).toBe(EMPTY_STRING);
    expect(component.isErrored).toBe(false);
    expect(component.errorText).toBe(EMPTY_STRING);
    expect(component.options).toEqual([]);
  });

  test('should emit resetSelectedOption with correct function on init', () => {
    const spyEmit = jest.spyOn(component.resetSelectedOption, 'emit');
    
    component.ngOnInit();
    expect(spyEmit).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith(expect.any(Function));
  });

  test('should toggle isDropdownOpen when toggleDropdown is called', () => {
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);

    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });

  test('should set selectedOption and emit value on selectOption', () => {
    const spyEmit = jest.spyOn(component.optionChange, 'emit');
    const mockItem = 'Option 1';
    const mockValue = 1;

    component.selectOption(mockItem, mockValue);
    expect(component.selectedOption).toBe(mockItem);
    expect(component.isDropdownOpen).toBe(true);
    expect(spyEmit).toHaveBeenCalledWith(mockValue);
  });

  test('should reset selectedOption when selecting the same option again', () => {
    const spyEmit = jest.spyOn(component.optionChange, 'emit');
    const mockItem = 'Option 1';
    const mockValue = 1;

    component.selectedOption = mockItem;
    component.selectOption(mockItem, mockValue);
    expect(component.selectedOption).toBeNull();
    expect(spyEmit).toHaveBeenCalledWith(0);
  });

  test('should reset selectedOption when resetOption is called', () => {
    component.selectedOption = 'Option 1';
    component.resetOption();
    expect(component.selectedOption).toBeNull();
  });
});
