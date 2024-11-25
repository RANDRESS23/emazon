import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormBasicComponent } from './modal-form-basic/modal-form-basic.component';
import { AtomsModule } from "../atoms/atoms.module";
import { MoleculesModule } from "../molecules/molecules.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { HeaderTableComponent } from './header-table/header-table.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ModalFormBasicComponent,
    TableComponent,
    HeaderTableComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AtomsModule,
    MoleculesModule,
    PipesModule
],
  exports: [
    ModalFormBasicComponent,
    TableComponent,
    HeaderTableComponent
  ]
})
export class OrganismsModule { }
