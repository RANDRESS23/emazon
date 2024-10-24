import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBasicComponent } from './form-basic/form-basic.component';
import { AtomsModule } from "../atoms/atoms.module";
import { IconsModule } from '../atoms/icons/icons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    FormBasicComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    IconsModule,
    ReactiveFormsModule,
    RouterModule
],
  exports: [
    FormBasicComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class MoleculesModule { }
