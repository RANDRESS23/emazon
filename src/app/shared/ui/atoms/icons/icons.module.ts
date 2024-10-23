import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveIconComponent } from './save-icon/save-icon.component';
import { AddBoxIconComponent } from './add-box-icon/add-box-icon.component';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { EyeClosedIconComponent } from './eye-closed-icon/eye-closed-icon.component';
import { MenuIconComponent } from './menu-icon/menu-icon.component';
import { CancelIconComponent } from './cancel-icon/cancel-icon.component';



@NgModule({
  declarations: [
    SaveIconComponent,
    AddBoxIconComponent,
    EyeIconComponent,
    EyeClosedIconComponent,
    MenuIconComponent,
    CancelIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SaveIconComponent,
    AddBoxIconComponent,
    EyeIconComponent,
    EyeClosedIconComponent,
    MenuIconComponent,
    CancelIconComponent
  ]
})
export class IconsModule { }
