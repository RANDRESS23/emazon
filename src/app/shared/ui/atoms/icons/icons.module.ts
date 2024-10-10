import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveIconComponent } from './save-icon/save-icon.component';
import { AddBoxIconComponent } from './add-box-icon/add-box-icon.component';



@NgModule({
  declarations: [
    SaveIconComponent,
    AddBoxIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SaveIconComponent,
    AddBoxIconComponent
  ]
})
export class IconsModule { }
