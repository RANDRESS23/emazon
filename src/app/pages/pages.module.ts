import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPanelComponent } from './profile/admin/category-panel/category-panel.component';
import { AtomsModule } from '@atoms/atoms.module';
import { OrganismsModule } from '@organisms/organisms.module';
import { MoleculesModule } from '@molecules/molecules.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { BrandPanelComponent } from './profile/admin/brand-panel/brand-panel.component';
import { ProductPanelComponent } from './profile/admin/product-panel/product-panel.component';
import { FeaturesModule } from '../features/features.module';
import { WarehouseAssistantPanelComponent } from './profile/admin/warehouse-assistant-panel/warehouse-assistant-panel.component';
import { LoginComponent } from './login/login.component';
import { SupplyPanelComponent } from './profile/warehouse-assistant/supply-panel/supply-panel.component';
import { InicioAdminComponent } from './profile/admin/inicio/inicio.component';
import { InicioWarehouseAssistantComponent } from './profile/warehouse-assistant/inicio/inicio.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InicioComponent } from './inicio/inicio.component';
import { CartComponent } from './profile/client/cart/cart.component';

@NgModule({
  declarations: [
    CategoryPanelComponent,
    BrandPanelComponent,
    ProductPanelComponent,
    WarehouseAssistantPanelComponent,
    LoginComponent,
    SupplyPanelComponent,
    InicioAdminComponent,
    InicioWarehouseAssistantComponent,
    SignUpComponent,
    InicioComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    IconsModule,
    FeaturesModule
  ]
})
export class PagesModule { }
