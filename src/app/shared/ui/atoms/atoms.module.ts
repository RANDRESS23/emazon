import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { ToastComponent } from './toast/toast.component';
import { TextareaComponent } from './textarea/textarea.component';
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    ToastComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    ToastComponent,
    TextareaComponent,
    ToastComponent
  ]
})
export class AtomsModule { }
