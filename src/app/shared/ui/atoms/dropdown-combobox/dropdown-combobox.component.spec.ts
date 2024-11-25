import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComboboxComponent } from './dropdown-combobox.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DropdownComboboxComponent', () => {
  let component: DropdownComboboxComponent;
  let fixture: ComponentFixture<DropdownComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComboboxComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComboboxComponent);
    component = fixture.componentInstance;
    component.options = [
      { name: 'Option 1', value: 1 },
      { name: 'Option 2', value: 2 },
      { name: 'Option 3', value: 3 },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value correctly with writeValue', () => {
    component.writeValue([1, 2]);
    expect(component.valuesDropdown).toEqual([1, 2]);

    component.writeValue('');
    expect(component.valuesDropdown).toEqual('');
  });

  it('should register onChange function', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);
    expect(component.onChange).toBe(mockOnChange);
  });

  it('should register onTouched function', () => {
    const mockOnTouched = jest.fn();
    component.registerOnTouched(mockOnTouched);
    expect(component.onTouched).toBe(mockOnTouched);
  });

  it('should toggle dropdown open state', () => {
    component.isDropdownOpen = false;
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);

    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should select an option and close dropdown if maxSelection not reached', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);
    component.toggleDropdown = jest.fn();

    component.selectOption('Option 1', 1);

    expect(component.selectedOptions).toContain('Option 1');
    expect(component.selectedOptionsValues).toContain(1);
    expect(mockOnChange).toHaveBeenCalledWith([1]);
    expect(component.toggleDropdown).toHaveBeenCalled();
  });

  it('should not add option if maxSelection is reached', () => {
    component.maxSelection = 1;
    component.selectOption('Option 1', 1);
    component.selectOption('Option 2', 2);

    expect(component.selectedOptions.length).toBe(1);
    expect(component.selectedOptionsValues).toEqual([1]);
  });

  it('should deselect option and update valuesDropdown', () => {
    component.selectOption('Option 1', 1);
    component.selectOption('Option 1', 1);

    expect(component.selectedOptions).not.toContain('Option 1');
    expect(component.selectedOptionsValues).not.toContain(1);
    expect(component.valuesDropdown).toBe('');
  });

  it('should call onTouched when selecting an option', () => {
    const mockOnTouched = jest.fn();
    component.registerOnTouched(mockOnTouched);

    component.selectOption('Option 1', 1);

    expect(mockOnTouched).toHaveBeenCalled();
  });

  it('should not toggle dropdown when maxSelection is reached', () => {
    component.maxSelection = 1;
    component.selectOption('Option 1', 1);
    component.toggleDropdown = jest.fn();

    component.selectOption('Option 2', 2);
    expect(component.toggleDropdown).not.toHaveBeenCalled();
  });

  it('should open dropdown if selectedOptions is empty after deselecting', () => {
    component.toggleDropdown = jest.fn();
    component.selectOption('Option 1', 1);
    component.selectOption('Option 1', 1);

    expect(component.toggleDropdown).toHaveBeenCalledTimes(2);
  });
});