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

@NgModule({
  declarations: [
    CategoryPanelComponent,
    BrandPanelComponent,
    ProductPanelComponent,
    WarehouseAssistantPanelComponent,
    LoginComponent,
    SupplyPanelComponent
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
