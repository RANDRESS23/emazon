import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { LABEL_SHOW_BY_DROPDOWN, LABEL_SORT_BY_DROPDOWN, LABEL_SORT_ORDER_DROPDOWN, OPTIONS_SHOW_BY_DROPDOWN, OPTIONS_SORT_ORDER_DROPDOWN } from '@utils/constants/admin';
import { ALL_BRANDS_TEXT, ALL_CATEGORIES_TEXT, INITIAL_FILTER_BRAND, INITIAL_FILTER_CATEGORY, LABEL_FILTER_CATEGORY_DROPDOWN, LABEL_FILTER_MARCA_DROPDOWN } from '@utils/constants/client';
import { EMPTY_STRING } from '@utils/constants/general';
import { BrandResponse } from '@utils/interfaces/brand';
import { CategoryResponse } from '@utils/interfaces/category';

@Component({
  selector: 'app-filters-cart-products',
  templateUrl: './filters-cart-products.component.html',
  styleUrls: ['./filters-cart-products.component.scss']
})
export class FiltersCartProductsComponent implements OnInit {
  labelShowByDropdown: string = LABEL_SHOW_BY_DROPDOWN;
  optionsShowByDropdown: Record<string, string | number>[] = OPTIONS_SHOW_BY_DROPDOWN;
  labelSortOrderDropdown: string = LABEL_SORT_ORDER_DROPDOWN;
  optionsSortOrderDropdown: Record<string, string | number>[] = OPTIONS_SORT_ORDER_DROPDOWN;
  labelFilterCategoryDropdown: string = LABEL_FILTER_CATEGORY_DROPDOWN;
  optionsFilterCategoryDropdown: Record<string, string | number>[] = [{}];
  labelFilterBrandDropdown: string = LABEL_FILTER_MARCA_DROPDOWN;
  optionsFilterBrandDropdown: Record<string, string | number>[] = [{}];
  showBy: string = EMPTY_STRING;
  sortOrder: string = EMPTY_STRING;
  filterCategory: string = EMPTY_STRING;
  filterBrand: string = EMPTY_STRING;
  
  @Input() showSortByDropdown: boolean = false;
  @Input() optionsSortByDropdown: Record<string, string | number>[] = [{}];
  @Output() showFilterOrders = new EventEmitter<any>();

  constructor(private brandService: BrandService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.brandService.getTotalBrands().subscribe({
      next: (data: BrandResponse[]) => {
        const options: Record<string, string | number>[] = data
          .map((brand) => ({ label: brand.name, value: brand.name }));
        
        this.optionsFilterBrandDropdown = [{ label: ALL_BRANDS_TEXT, value: INITIAL_FILTER_BRAND }, ...options];
      },
      error: (error) => {
        console.error({ error });
      }
    })

    this.categoryService.getTotalCategories().subscribe({
      next: (data: CategoryResponse[]) => {
        const options: Record<string, string | number>[] = data
          .map((category) => ({ label: category.name, value: category.name }));
        this.optionsFilterCategoryDropdown = [{ label: ALL_CATEGORIES_TEXT, value: INITIAL_FILTER_CATEGORY }, ...options];
      },
      error: (error) => {
        console.error({ error });
      }
    })
  }

  changeShowBy(event: any): void {
    this.showBy = event;
    this.showFilterOrders.emit([this.showBy, this.sortOrder, this.filterCategory, this.filterBrand]);
  }

  changeSortOrder(event: any): void {
    this.sortOrder = event;
    this.showFilterOrders.emit([this.showBy, this.sortOrder, this.filterCategory, this.filterBrand]);
  }
  
  changeFilterCategory(event: any): void {
    this.filterCategory = event;
    this.showFilterOrders.emit([this.showBy, this.sortOrder, this.filterCategory, this.filterBrand]);
  }
  
  changeFilterBrand(event: any): void {
    this.filterBrand = event;
    this.showFilterOrders.emit([this.showBy, this.sortOrder, this.filterCategory, this.filterBrand]);
  }
}
