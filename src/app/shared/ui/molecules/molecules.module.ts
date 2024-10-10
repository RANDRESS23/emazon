import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBasicComponent } from './form-basic/form-basic.component';
import { AtomsModule } from "../atoms/atoms.module";
import { IconsModule } from '../atoms/icons/icons.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormBasicComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    IconsModule,
    ReactiveFormsModule
],
  exports: [
    FormBasicComponent
  ]
})
export class MoleculesModule { }
