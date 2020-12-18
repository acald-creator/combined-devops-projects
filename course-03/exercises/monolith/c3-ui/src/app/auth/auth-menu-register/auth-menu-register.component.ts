import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { group } from 'console';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-menu-register',
  templateUrl: './auth-menu-register.component.html',
  styleUrls: ['./auth-menu-register.component.scss'],
})
export class AuthMenuRegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      passwordConfirm: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.]+$')
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+$')
      ]))
    }, { validators: this.passwordsMatch });
  }

  onSubmit($event) {
    $event.preventDefault();

    if (!this.registerForm.valid) { return; }

    const newUser: User = {
      email: this.registerForm.controls.email.value,
      name: this.registerForm.controls.name.value
    };

    this.auth.register(newUser, this.registerForm.controls.password.value).then((user) => {
      this.modal.dismiss();
    }).catch((e) => {
      this.error = e.statusText;
      throw e;
    });
  }
    passwordsMatch(group: FormGroup) {
      return group.controls.password.value === group.controls.passwordConfirm.value ? null : { passwordMisMatch: true };
    }
  }

