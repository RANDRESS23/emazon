import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AtomsModule } from '../ui/atoms/atoms.module';
import { MoleculesModule } from '../ui/molecules/molecules.module';
import { OrganismsModule } from '../ui/organisms/organisms.module';
import { IconsModule } from '../ui/atoms/icons/icons.module';
import { ServicesModule } from '@src/app/core/services/services.module';
import { ListOfCategoriesComponent } from './list-of-categories/list-of-categories.component';

@NgModule({
  declarations: [
    AddCategoryComponent,
    ListOfCategoriesComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    IconsModule,
    ServicesModule
  ],
  exports: [
    AddCategoryComponent,
    ListOfCategoriesComponent
  ]
})
export class ComponentsModule { }
