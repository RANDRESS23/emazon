import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { ToastComponent } from './toast/toast.component';
import { TextareaComponent } from './textarea/textarea.component';
import { IconsModule } from './icons/icons.module';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownTableComponent } from './dropdown-table/dropdown-table.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownComboboxComponent } from './dropdown-combobox/dropdown-combobox.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    ToastComponent,
    TextareaComponent,
    PaginationComponent,
    DropdownTableComponent,
    DropdownComponent,
    DropdownComboboxComponent,
    MenuButtonComponent
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
    ToastComponent,
    PaginationComponent,
    DropdownTableComponent,
    DropdownComponent,
    DropdownComboboxComponent,
    MenuButtonComponent
  ]
})
export class AtomsModule { }
