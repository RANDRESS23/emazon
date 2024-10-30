import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
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
    component.writeValue(2);
    expect(component.valueDropdown).toEqual(2);

    component.writeValue('');
    expect(component.valueDropdown).toEqual('');
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

  it('should select an option and call onChange, onTouched, and toggle dropdown', () => {
    const mockOnChange = jest.fn();
    const mockOnTouched = jest.fn();
    component.registerOnChange(mockOnChange);
    component.registerOnTouched(mockOnTouched);
    component.toggleDropdown = jest.fn();

    component.selectOption('Option 1', 1);

    expect(component.selectedOption).toBe('Option 1');
    expect(component.valueDropdown).toBe(1);
    expect(mockOnChange).toHaveBeenCalledWith(1);
    expect(mockOnTouched).toHaveBeenCalled();
    expect(component.toggleDropdown).toHaveBeenCalled();
  });

  it('should deselect an option if it is already selected', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);
    component.selectedOption = 'Option 1';
    component.valueDropdown = 1;

    component.selectOption('Option 1', 1);

    expect(component.selectedOption).toBeNull();
    expect(component.valueDropdown).toBe('');
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('should close the dropdown after selecting an option', () => {
    component.isDropdownOpen = true;
    component.selectOption('Option 1', 1);

    expect(component.isDropdownOpen).toBe(false);
  });

  it('should not close the dropdown if no option is selected', () => {
    component.isDropdownOpen = true;
    component.selectOption('Option 1', '');

    expect(component.isDropdownOpen).toBe(false);
  });
});