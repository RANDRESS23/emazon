import { TestBed } from '@angular/core/testing';
import { HeaderTableComponent } from './header-table.component';
import { LABEL_SHOW_BY_DROPDOWN, LABEL_SORT_BY_DROPDOWN, LABEL_SORT_ORDER_DROPDOWN, OPTIONS_SHOW_BY_DROPDOWN, OPTIONS_SORT_ORDER_DROPDOWN } from '@src/app/shared/utils/constants/admin';

describe('HeaderTableComponent', () => {
  let component: HeaderTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTableComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HeaderTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit showFilterOrders when changeShowBy is called', () => {
    jest.spyOn(component.showFilterOrders, 'emit');
  
    const event = '10';
    component.changeShowBy(event);
  
    expect(component.showBy).toBe(event);
    expect(component.showFilterOrders.emit).toHaveBeenCalledWith([event, component.sortOrder, component.sortBy]);
  });

  it('should emit showFilterOrders when changeSortOrder is called', () => {
    jest.spyOn(component.showFilterOrders, 'emit');
  
    const event = 'asc';
    component.changeSortOrder(event);
  
    expect(component.sortOrder).toBe(event);
    expect(component.showFilterOrders.emit).toHaveBeenCalledWith([component.showBy, event, component.sortBy]);
  });

  it('should emit showFilterOrders when changeSortBy is called', () => {
    jest.spyOn(component.showFilterOrders, 'emit');
  
    const event = 'name';
    component.changeSortBy(event);
  
    expect(component.sortBy).toBe(event);
    expect(component.showFilterOrders.emit).toHaveBeenCalledWith([component.showBy, component.sortOrder, event]);
  });

  it('should initialize input properties correctly', () => {
    component.showSortByDropdown = true;
    component.optionsSortByDropdown = [{ label: 'Name', value: 'name' }];
  
    expect(component.showSortByDropdown).toBe(true);
    expect(component.optionsSortByDropdown).toEqual([{ label: 'Name', value: 'name' }]);
  });

  it('should initialize label and options properties correctly', () => {
    expect(component.labelShowByDropdown).toBe(LABEL_SHOW_BY_DROPDOWN);
    expect(component.labelSortOrderDropdown).toBe(LABEL_SORT_ORDER_DROPDOWN);
    expect(component.labelSortByDropdown).toBe(LABEL_SORT_BY_DROPDOWN);
    expect(component.optionsShowByDropdown).toEqual(OPTIONS_SHOW_BY_DROPDOWN);
    expect(component.optionsSortOrderDropdown).toEqual(OPTIONS_SORT_ORDER_DROPDOWN);
  });  
});