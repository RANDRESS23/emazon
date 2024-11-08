import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersCartProductsComponent } from './filters-cart-products.component';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { BrandResponse } from '@utils/interfaces/brand';
import { EventEmitter } from '@angular/core';
import { of, throwError } from 'rxjs';
import { CategoryResponse } from '@utils/interfaces/category';

const mockBrandService = {
  getTotalBrands: jest.fn(),
};

const mockCategoryService = {
  getTotalCategories: jest.fn(),
};

describe('FiltersCartProductsComponent', () => {
  let component: FiltersCartProductsComponent;
  let fixture: ComponentFixture<FiltersCartProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersCartProductsComponent],
      providers: [
        { provide: BrandService, useValue: mockBrandService },
        { provide: CategoryService, useValue: mockCategoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersCartProductsComponent);
    component = fixture.componentInstance;
    component.showFilterOrders = new EventEmitter<any>();
    mockBrandService.getTotalBrands.mockReturnValue(of([{ name: 'Brand 1', brandId: 1 }]));
    mockCategoryService.getTotalCategories.mockReturnValue(of([{ name: 'Category 1', categoryId: 1 }]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should populate optionsFilterBrandDropdown from BrandService on success', () => {
      const brandData: BrandResponse[] = [
        { brandId: 1, name: 'Brand A', description: 'Desc A' },
        { brandId: 2, name: 'Brand B', description: 'Desc B' }
      ];
      mockBrandService.getTotalBrands.mockReturnValue(of(brandData));

      component.ngOnInit();

      expect(component.optionsFilterBrandDropdown.length).toBe(3); // ALL_BRANDS_TEXT + 2 brands
      expect(component.optionsFilterBrandDropdown[1]['label']).toBe('Brand A');
      expect(component.optionsFilterBrandDropdown[2]['label']).toBe('Brand B');
    });

    it('should log error if getTotalBrands fails', () => {
      const consoleSpy = jest.spyOn(console, 'error');
      mockBrandService.getTotalBrands.mockReturnValue(throwError(() => new Error('Brand fetch error')));

      component.ngOnInit();

      expect(consoleSpy).toHaveBeenCalledWith({ error: new Error('Brand fetch error') });
    });

    it('should populate optionsFilterCategoryDropdown from CategoryService on success', () => {
      const categoryData: CategoryResponse[] = [
        { categoryId: 1, name: 'Category A', description: 'Desc A' },
        { categoryId: 2, name: 'Category B', description: 'Desc B' }
      ];
      mockCategoryService.getTotalCategories.mockReturnValue(of(categoryData));

      component.ngOnInit();

      expect(component.optionsFilterCategoryDropdown.length).toBe(3);
      expect(component.optionsFilterCategoryDropdown[1]['label']).toBe('Category A');
      expect(component.optionsFilterCategoryDropdown[2]['label']).toBe('Category B');
    });

    it('should log error if getTotalCategories fails', () => {
      const consoleSpy = jest.spyOn(console, 'error');
      mockCategoryService.getTotalCategories.mockReturnValue(throwError(() => new Error('Category fetch error')));

      component.ngOnInit();

      expect(consoleSpy).toHaveBeenCalledWith({ error: new Error('Category fetch error') });
    });
  });

  describe('changeShowBy', () => {
    it('should update showBy and emit showFilterOrders', () => {
      jest.spyOn(component.showFilterOrders, 'emit');
      const event = '10';

      component.changeShowBy(event);

      expect(component.showBy).toBe(event);
      expect(component.showFilterOrders.emit).toHaveBeenCalledWith([
        component.showBy,
        component.sortOrder,
        component.filterCategory,
        component.filterBrand
      ]);
    });
  });

  describe('changeSortOrder', () => {
    it('should update sortOrder and emit showFilterOrders', () => {
      jest.spyOn(component.showFilterOrders, 'emit');
      const event = 'asc';

      component.changeSortOrder(event);

      expect(component.sortOrder).toBe(event);
      expect(component.showFilterOrders.emit).toHaveBeenCalledWith([
        component.showBy,
        component.sortOrder,
        component.filterCategory,
        component.filterBrand
      ]);
    });
  });

  describe('changeFilterCategory', () => {
    it('should update filterCategory and emit showFilterOrders', () => {
      jest.spyOn(component.showFilterOrders, 'emit');
      const event = 'Category A';

      component.changeFilterCategory(event);

      expect(component.filterCategory).toBe(event);
      expect(component.showFilterOrders.emit).toHaveBeenCalledWith([
        component.showBy,
        component.sortOrder,
        component.filterCategory,
        component.filterBrand
      ]);
    });
  });

  describe('changeFilterBrand', () => {
    it('should update filterBrand and emit showFilterOrders', () => {
      jest.spyOn(component.showFilterOrders, 'emit');
      const event = 'Brand A';

      component.changeFilterBrand(event);

      expect(component.filterBrand).toBe(event);
      expect(component.showFilterOrders.emit).toHaveBeenCalledWith([
        component.showBy,
        component.sortOrder,
        component.filterCategory,
        component.filterBrand
      ]);
    });
  });
});