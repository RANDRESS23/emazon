import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownTableComponent } from './dropdown-table.component';
import { By } from '@angular/platform-browser';

describe('DropdownTableComponent', () => {
  let component: DropdownTableComponent;
  let fixture: ComponentFixture<DropdownTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.label).toBe('');
    expect(component.options).toEqual([]);
  });

  it('should display the provided label', () => {
    const label = 'Select Category';
    component.label = label;
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelElement.textContent).toContain(label);
  });

  it('should emit selected option on action', () => {
    const optionChangeSpy = jest.spyOn(component.optionChange, 'emit');
    
    const mockEvent = {
      target: { value: 'option1' }
    };

    component.action(mockEvent);

    expect(optionChangeSpy).toHaveBeenCalledWith('option1');
  });

  it('should display the correct number of options in the dropdown', () => {
    const mockOptions = [
      { key: 'option1', value: 'Option 1' },
      { key: 'option2', value: 'Option 2' },
    ];

    component.options = mockOptions;
    fixture.detectChanges();

    const optionsElements = fixture.debugElement.queryAll(By.css('option'));
    expect(optionsElements.length).toBe(mockOptions.length);
  });
});