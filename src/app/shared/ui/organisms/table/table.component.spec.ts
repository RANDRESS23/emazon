import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { ProductResponse } from '@utils/interfaces/product';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize @Input properties correctly', () => {
    const mockList: ProductResponse[] = [
      { productId: 1, name: 'Test Product', description: 'description', quantity: 100, price: 100, brand: { brandId: 1, name: 'brand' }, categories: [{ categoryId: 1, name: 'category' }] }
    ];
    const mockHeaders = [{ label: 'Name', sortable: true }];
    const mockKeys = ['name', 'description'] as ('name' | 'description')[];

    component.list = mockList;
    component.headers = mockHeaders;
    component.keys = mockKeys;

    fixture.detectChanges();

    expect(component.list).toEqual(mockList);
    expect(component.headers).toEqual(mockHeaders);
    expect(component.keys).toEqual(mockKeys);
  });

  it('should return true when isNumber is called with a number', () => {
    const result = component.isNumber(5);
    expect(result).toBe(true);
  });

  it('should return false when isNumber is called with a non-number', () => {
    const result = component.isNumber('test');
    expect(result).toBe(false);
  });

  it('should parse categories correctly in parseItem', () => {
    const mockItem = {
      categories: [
        { id: 1, name: 'Category A' },
        { id: 2, name: 'Category B' }
      ]
    };
    const result = component.parseItem(mockItem, 'categories');
    expect(result).toBe('Category A, Category B');
  });

  it('should parse brand correctly in parseItem', () => {
    const mockItem = {
      brand: { id: 1, name: 'Brand A' }
    };
    const result = component.parseItem(mockItem, 'brand');
    expect(result).toBe('Brand A');
  });

  it('should format price correctly in parseItem', () => {
    const mockItem = {
      price: 100
    };
    const result = component.parseItem(mockItem, 'price');
    expect(result).toBe('$ 100');
  });

  it('should return the value as is when key is not categories, brand or price in parseItem', () => {
    const mockItem = {
      name: 'Product A'
    };
    const result = component.parseItem(mockItem, 'name');
    expect(result).toBe('Product A');
  });

  it('should handle empty category list in parseItem', () => {
    const mockItem = {
      categories: []
    };
    const result = component.parseItem(mockItem, 'categories');
    expect(result).toBe('');
  });
});
