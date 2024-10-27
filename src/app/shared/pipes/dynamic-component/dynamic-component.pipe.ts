import { Pipe, PipeTransform, Type } from '@angular/core';
import { AddUserIconComponent } from '@atoms/icons/add-user-icon/add-user-icon.component';
import { BrandIconComponent } from '@atoms/icons/brand-icon/brand-icon.component';
import { CategoryIconComponent } from '@atoms/icons/category-icon/category-icon.component';
import { HomeIconComponent } from '@atoms/icons/home-icon/home-icon.component';
import { ProductIconComponent } from '@atoms/icons/product-icon/product-icon.component';
import { SupplyIconComponent } from '@atoms/icons/supply-icon/supply-icon.component';

@Pipe({
  name: 'dynamicComponent'
})
export class DynamicComponentPipe implements PipeTransform {

  constructor() {}

  transform(iconName: string): Type<any> | null {
    const componentsMap: Record<string, Type<any>> = {
      home: HomeIconComponent,
      category: CategoryIconComponent,
      brand: BrandIconComponent,
      product: ProductIconComponent,
      addUser: AddUserIconComponent,
      supply: SupplyIconComponent
    };

    return componentsMap[iconName] || null;
  }
}