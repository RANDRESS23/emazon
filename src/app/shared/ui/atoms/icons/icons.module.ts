import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveIconComponent } from './save-icon/save-icon.component';
import { AddBoxIconComponent } from './add-box-icon/add-box-icon.component';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { EyeClosedIconComponent } from './eye-closed-icon/eye-closed-icon.component';



@NgModule({
  declarations: [
    SaveIconComponent,
    AddBoxIconComponent,
    EyeIconComponent,
    EyeClosedIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SaveIconComponent,
    AddBoxIconComponent,
    EyeIconComponent,
    EyeClosedIconComponent
  ]
})
export class IconsModule { }
