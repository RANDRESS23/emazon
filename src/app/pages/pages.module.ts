import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPanelComponent } from './profile/admin/category-panel/category-panel.component';
import { AtomsModule } from '../shared/ui/atoms/atoms.module';
import { OrganismsModule } from '../shared/ui/organisms/organisms.module';
import { MoleculesModule } from '../shared/ui/molecules/molecules.module';
import { IconsModule } from '../shared/ui/atoms/icons/icons.module';
import { ComponentsModule } from '../shared/components/components.module';
import { BrandPanelComponent } from './profile/admin/brand-panel/brand-panel.component';

@NgModule({
  declarations: [
    CategoryPanelComponent,
    BrandPanelComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    IconsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
