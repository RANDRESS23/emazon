import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComboboxComponent } from './dropdown-combobox.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DropdownComboboxComponent', () => {
  let component: DropdownComboboxComponent;
  let fixture: ComponentFixture<DropdownComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComboboxComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dropdown closed', () => {
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should toggle dropdown when toggleDropdown is called', () => {
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);

    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should add an option when selectOption is called and it is not selected', () => {
    component.options = [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }];
    const optionName = 'Option 1';
    const optionValue = 1;

    component.selectOption(optionName, optionValue);
    expect(component.selectedOptions).toContain(optionName);
    expect(component.selectedOptionsValues).toContain(optionValue);
  });

  it('should remove an option when selectOption is called and it is already selected', () => {
    component.selectedOptions = ['Option 1'];
    component.selectedOptionsValues = [1];

    component.selectOption('Option 1', 1);
    expect(component.selectedOptions).not.toContain('Option 1');
    expect(component.selectedOptionsValues).not.toContain(1);
  });

  it('should emit optionsChange event when an option is selected', () => {
    const optionsChangeSpy = jest.spyOn(component.optionsChange, 'emit');
    component.selectOption('Option 1', 1);

    expect(optionsChangeSpy).toHaveBeenCalledWith([1]);
  });

  it('should reset selected options when resetOptions is called', () => {
    component.selectedOptions = ['Option 1', 'Option 2'];
    component.selectedOptionsValues = [1, 2];

    component.resetOptions();

    expect(component.selectedOptions).toEqual([]);
    expect(component.selectedOptionsValues).toEqual([]);
  });

  it('should emit resetSelectedOptions with resetOptions function on ngOnInit', () => {
    const resetSpy = jest.spyOn(component.resetSelectedOptions, 'emit');
    component.ngOnInit();

    expect(resetSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalledWith(expect.any(Function));
  });
});
