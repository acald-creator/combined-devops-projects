import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { AuthMenuRegisterComponent } from '../auth-menu-register/auth-menu-register.component';
import { AuthService } from '../services/auth.service';
import { AuthMenuUserComponent } from './auth-menu-user/auth-menu-user.component';

@Component({
  selector: 'app-auth-menu-button',
  templateUrl: './auth-menu-button.component.html',
  styleUrls: ['./auth-menu-button.component.scss'],
})
export class AuthMenuButtonComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private modelController: ModalController
  ) { }

  async presentmodal(ev: any) {
    const modal = await this.modelController.create({
      component: AuthMenuUserComponent
    });
    return await modal.present();
  }

  async presentLogin(ev: any) {
    const modal = await this.modelController.create({
      component: AuthLoginComponent,
    });
    return await modal.present();
  }

  async presentRegister(ev: any) {
    const modal = await this.modelController.create({
      component: AuthMenuRegisterComponent
    });
    return await modal.present();
  }

  logout() {
    this.auth.logout;
  }

  ngOnInit() {}

}
