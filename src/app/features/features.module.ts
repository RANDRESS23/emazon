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
import { AddWarehouseAssistantComponent } from './admin/warehouse-assistant/add-warehouse-assistant/add-warehouse-assistant.component';
import { ListOfWarehouseAssistantComponent } from './admin/warehouse-assistant/list-of-warehouse-assistant/list-of-warehouse-assistant.component';
import { FormSignInComponent } from './auth/form-sign-in/form-sign-in.component';
import { ListOfProductsSupplyComponent } from './warehouse-assistant/supply/list-of-products-supply/list-of-products-supply.component';
import { AddSupplyComponent } from './warehouse-assistant/supply/add-supply/add-supply.component';
import { RouterModule } from '@angular/router';
import { FormSignUpComponent } from './auth/form-sign-up/form-sign-up.component';
import { ListOfProductsToBuyComponent } from './client/product/list-of-products-to-buy/list-of-products-to-buy.component';
import { CartProductsComponent } from './client/cart/cart-products/cart-products.component';
import { FiltersCartProductsComponent } from './client/cart/filters-cart-products/filters-cart-products.component';
import { PurchaseInformationComponent } from './client/cart/purchase-information/purchase-information.component';
import { AllProductDetailComponent } from './client/product/all-product-detail/all-product-detail.component';

@NgModule({
  declarations: [
    AddCategoryComponent,
    ListOfCategoriesComponent,
    AddBrandComponent,
    ListOfBrandsComponent,
    AddProductComponent,
    ListOfProductsComponent,
    AddWarehouseAssistantComponent,
    ListOfWarehouseAssistantComponent,
    FormSignInComponent,
    ListOfProductsSupplyComponent,
    AddSupplyComponent,
    FormSignUpComponent,
    ListOfProductsToBuyComponent,
    CartProductsComponent,
    FiltersCartProductsComponent,
    PurchaseInformationComponent,
    AllProductDetailComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    IconsModule,
    ServicesModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AddCategoryComponent,
    AddBrandComponent,
    AddProductComponent,
    AddWarehouseAssistantComponent,
    ListOfCategoriesComponent,
    ListOfBrandsComponent,
    ListOfProductsComponent,
    ListOfWarehouseAssistantComponent,
    ListOfProductsSupplyComponent,
    ListOfProductsToBuyComponent,
    CartProductsComponent,
    FiltersCartProductsComponent,
    PurchaseInformationComponent,
    AllProductDetailComponent,
    FormSignInComponent,
    FormSignUpComponent
  ]
})
export class FeaturesModule { }
