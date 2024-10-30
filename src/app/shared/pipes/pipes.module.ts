import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentPipe } from './dynamic-component/dynamic-component.pipe';

@NgModule({
  declarations: [
    DynamicComponentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicComponentPipe
  ]
})
export class PipesModule { }
