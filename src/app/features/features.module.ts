import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { AtomsModule } from '@atoms/atoms.module';
import { MoleculesModule } from '@molecules/molecules.module';
import { OrganismsModule } from '@organisms/organisms.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { ServicesModule } from '../core/services/services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListOfCategoriesComponent } from './admin/category/list-of-categories/list-of-categories.component';
import { AddBrandComponent } from './admin/brand/add-brand/add-brand.component';
import { ListOfBrandsComponent } from './admin/brand/list-of-brands/list-of-brands.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { ListOfProductsComponent } from './admin/product/list-of-products/list-of-products.component';

@NgModule({
  declarations: [
    AddCategoryComponent,
    ListOfCategoriesComponent,
    AddBrandComponent,
    ListOfBrandsComponent,
    AddProductComponent,
    ListOfProductsComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    IconsModule,
    ServicesModule,
    ReactiveFormsModule
  ],
  exports: [
    AddCategoryComponent,
    AddBrandComponent,
    AddProductComponent,
    ListOfCategoriesComponent,
    ListOfBrandsComponent,
    ListOfProductsComponent
  ]
})
export class FeaturesModule { }
