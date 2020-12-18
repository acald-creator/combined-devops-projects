import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMenuButtonComponent } from './auth-menu-button/auth-menu-button.component';
import { AuthMenuRegisterComponent } from './auth-menu-register/auth-menu-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiModule } from '../api/api.module';

const entryComponents = [AuthMenuButtonComponent, AuthMenuRegisterComponent, AuthLoginComponent];
const components = [...entryComponents];

@NgModule({
  entryComponents,
  declarations: entryComponents,
  exports: components,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApiModule
  ]
})
export class AuthModule { }
