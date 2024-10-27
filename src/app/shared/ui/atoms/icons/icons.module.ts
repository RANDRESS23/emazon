import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveIconComponent } from './save-icon/save-icon.component';
import { AddBoxIconComponent } from './add-box-icon/add-box-icon.component';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { EyeClosedIconComponent } from './eye-closed-icon/eye-closed-icon.component';
import { MenuIconComponent } from './menu-icon/menu-icon.component';
import { CancelIconComponent } from './cancel-icon/cancel-icon.component';
import { HomeIconComponent } from './home-icon/home-icon.component';
import { BrandIconComponent } from './brand-icon/brand-icon.component';
import { CategoryIconComponent } from './category-icon/category-icon.component';
import { ProductIconComponent } from './product-icon/product-icon.component';
import { AddUserIconComponent } from './add-user-icon/add-user-icon.component';
import { SupplyIconComponent } from './supply-icon/supply-icon.component';



@NgModule({
  declarations: [
    SaveIconComponent,
    AddBoxIconComponent,
    EyeIconComponent,
    EyeClosedIconComponent,
    MenuIconComponent,
    CancelIconComponent,
    HomeIconComponent,
    BrandIconComponent,
    CategoryIconComponent,
    ProductIconComponent,
    AddUserIconComponent,
    SupplyIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SaveIconComponent,
    AddBoxIconComponent,
    EyeIconComponent,
    EyeClosedIconComponent,
    MenuIconComponent,
    CancelIconComponent,
    HomeIconComponent,
    BrandIconComponent,
    CategoryIconComponent,
    ProductIconComponent,
    AddUserIconComponent,
    SupplyIconComponent
  ]
})
export class IconsModule { }
