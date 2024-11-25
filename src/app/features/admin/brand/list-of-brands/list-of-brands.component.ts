import { Component, OnInit } from '@angular/core';
import { BRAND_KEYS, INITIAL_PAGE_TABLE, INITIAL_SIZE_ELEMENTS_TABLE, INITIAL_SORT_ORDER_ELEMENTS_TABLE, INITIAL_TOTAL_ELEMENTS_TABLE, INITIAL_TOTAL_PAGE_TABLE, TABLE_HEADERS_BRAND } from '@utils/constants/admin';
import { BrandResponse, PageBrands } from '@utils/interfaces/brand';
import { BrandService } from '@src/app/core/services/brand/brand.service';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { RolesEnum } from '@utils/enums/roles';

@Component({
  selector: 'app-list-of-brands',
  templateUrl: './list-of-brands.component.html',
  styleUrls: ['./list-of-brands.component.scss']
})
export class ListOfBrandsComponent implements OnInit {
  pageNumber: number = INITIAL_PAGE_TABLE;
  size: number = INITIAL_SIZE_ELEMENTS_TABLE;
  sortOrder: string = INITIAL_SORT_ORDER_ELEMENTS_TABLE;
  listOfBrands: BrandResponse[] = [];
  totalPages: number = INITIAL_TOTAL_PAGE_TABLE;
  totalElements: number = INITIAL_TOTAL_ELEMENTS_TABLE;
  headers: Record<string, string | boolean>[] = TABLE_HEADERS_BRAND;
  keys: (keyof BrandResponse)[] = BRAND_KEYS as (keyof (BrandResponse))[];
  showButtonAddBrand: boolean = false;

  constructor(private brandService: BrandService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getBrands(this.pageNumber, this.size, this.sortOrder);
    this.showButtonAddBrand = this.authService.getRole() === RolesEnum.ADMIN;
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    this.getBrands(this.pageNumber, this.size, this.sortOrder);
  }

  getBrands(pageNumber: number, size: number, sortOrder: string): void {
    this.brandService.getAllBrands(pageNumber, size, sortOrder).subscribe({
      next: (pageBrands: PageBrands) => {
        this.listOfBrands = pageBrands.content;
        this.totalPages = pageBrands.totalPages;
        this.totalElements = pageBrands.totalElements;
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  addNewBrandCount(): void {
    this.totalElements = this.totalElements++;
    this.getBrands(this.pageNumber, this.size, this.sortOrder);
  }

  showFilterOrders(event: any): void {
    this.size = event[0];
    this.sortOrder = event[1];
    this.pageNumber = INITIAL_PAGE_TABLE;

    this.getBrands(this.pageNumber, this.size, this.sortOrder);
  }
}
