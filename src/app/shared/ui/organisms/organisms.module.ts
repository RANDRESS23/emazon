import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormBasicComponent } from './modal-form-basic/modal-form-basic.component';
import { AtomsModule } from "../atoms/atoms.module";
import { MoleculesModule } from "../molecules/molecules.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ModalFormBasicComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AtomsModule,
    MoleculesModule
],
  exports: [
    ModalFormBasicComponent
  ]
})
export class OrganismsModule { }
