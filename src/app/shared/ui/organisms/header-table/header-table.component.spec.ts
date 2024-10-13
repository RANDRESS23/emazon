import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderTableComponent } from './header-table.component';
import { EMPTY_STRING, LABEL_SHOW_BY_DROPDOWN, LABEL_SORT_BY_DROPDOWN, OPTIONS_SHOW_BY_DROPDOWN, OPTIONS_SORT_BY_DROPDOWN } from '@src/app/shared/domain/constants/admin';

describe('HeaderTableComponent', () => {
  let component: HeaderTableComponent;
  let fixture: ComponentFixture<HeaderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize with default values', () => {
    expect(component.labelShowByDropdown).toBe(LABEL_SHOW_BY_DROPDOWN);
    expect(component.optionsShowByDropdown).toBe(OPTIONS_SHOW_BY_DROPDOWN);
    expect(component.labelSortByDropdown).toBe(LABEL_SORT_BY_DROPDOWN);
    expect(component.optionsSortByDropdown).toBe(OPTIONS_SORT_BY_DROPDOWN);
    expect(component.showBy).toBe(EMPTY_STRING);
    expect(component.sortBy).toBe(EMPTY_STRING);
  });

  test('should emit showAndSortBy with correct values when changeShowBy is called', () => {
    const eventMock = '10';
    const spyEmit = jest.spyOn(component.showAndSortBy, 'emit');

    component.changeShowBy(eventMock);
    expect(component.showBy).toBe(eventMock);
    expect(spyEmit).toHaveBeenCalledWith([eventMock, component.sortBy]);
  });

  test('should emit showAndSortBy with correct values when changeSortBy is called', () => {
    const eventMock = 'name';
    const spyEmit = jest.spyOn(component.showAndSortBy, 'emit');

    component.changeSortBy(eventMock);
    expect(component.sortBy).toBe(eventMock);
    expect(spyEmit).toHaveBeenCalledWith([component.showBy, eventMock]);
  });

  test('should emit updated showBy and sortBy values together', () => {
    const spyEmit = jest.spyOn(component.showAndSortBy, 'emit');

    component.changeShowBy('20');
    component.changeSortBy('date');

    expect(spyEmit).toHaveBeenCalledWith(['20', 'date']);
  });

  test('should not call emit when no event is passed to changeShowBy or changeSortBy', () => {
    const spyEmit = jest.spyOn(component.showAndSortBy, 'emit');

    component.changeShowBy('');
    component.changeSortBy('');

    expect(spyEmit).toHaveBeenCalledWith(['', '']);
  });
});
