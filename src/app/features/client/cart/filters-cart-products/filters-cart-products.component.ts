import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { CategoryService } from '@src/app/core/services/category/category.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { INITIAL_PAGE_TABLE, LABEL_SHOW_BY_DROPDOWN, LABEL_SORT_ORDER_DROPDOWN, OPTIONS_SHOW_BY_DROPDOWN, OPTIONS_SORT_ORDER_DROPDOWN } from '@utils/constants/admin';
import { ALL_BRANDS_TEXT, ALL_CATEGORIES_TEXT, INITIAL_FILTER_BRAND, INITIAL_FILTER_CATEGORY, INITIAL_SIZE_PRODUCTS, LABEL_FILTER_CATEGORY_DROPDOWN, LABEL_FILTER_MARCA_DROPDOWN } from '@utils/constants/client';
import { EMPTY_STRING } from '@utils/constants/general';
import { BrandResponse } from '@utils/interfaces/brand';
import { CartProductFullInfo, ListCartProducts } from '@utils/interfaces/cart';
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
  
  @Input() pageNumber: number = INITIAL_PAGE_TABLE;
  @Input() size: number = INITIAL_SIZE_PRODUCTS;
  @Input() showSortByDropdown: boolean = false;
  @Input() optionsSortByDropdown: Record<string, string | number>[] = [{}];
  @Output() showFilterOrders = new EventEmitter<any>();

  constructor(private brandService: BrandService, private categoryService: CategoryService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getAllCartProducts(this.pageNumber, this.size, this.sortOrder, this.filterCategory, this.filterBrand).subscribe({
      next: (data2: ListCartProducts) => {
        this.getBrands(data2);
        this.getCategories(data2);
      },
      error: (error) => {
        console.error({ error });
      }
    });
  }

  getCartProducts(): CartProductFullInfo[] {
    let products: CartProductFullInfo[] = [];

    this.cartService.getAllCartProducts(this.pageNumber, this.size, this.sortOrder, this.filterCategory, this.filterBrand).subscribe({
      next: (data: ListCartProducts) => {
        products = data?.products?.content || [];
      },
      error: (error) => {
        console.error({ error });
      }
    });

    return products;
  }

  getBrands(cartClient: ListCartProducts): void {
    this.brandService.getTotalBrands().subscribe({
      next: (data: BrandResponse[]) => {
        const cartBrands: string[] = cartClient?.products?.content.map((product) => product.brand.name) || [];
            
        const options: Record<string, string | number>[] = data
          .map((brand) => ({ label: brand.name, value: brand.name }))
          .filter((brand) => cartBrands.includes(brand.value));
        
        this.optionsFilterBrandDropdown = [{ label: ALL_BRANDS_TEXT, value: INITIAL_FILTER_BRAND }, ...options];
      },
      error: (error) => {
        console.error({ error });
      }
    })
  }

  getCategories(cartClient: ListCartProducts): void {
    this.categoryService.getTotalCategories().subscribe({
      next: (data: CategoryResponse[]) => {
        const cartCategories: string[] = cartClient?.products?.content.map((product) => product.categories.map((category) => category.name)).flat() || [];
            
        const options: Record<string, string | number>[] = data
          .map((category) => ({ label: category.name, value: category.name }))
          .filter((category) => cartCategories.includes(category.value));
        
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
