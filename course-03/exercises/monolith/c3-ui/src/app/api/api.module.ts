import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const components = [];

@NgModule({
  declarations: components,
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: components
})
export class ApiModule { }
