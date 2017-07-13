import { 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl } from '@angular/forms';

import { 
  Component, 
  OnInit } from '@angular/core';

import { Router } from '@angular/router';

import * as validator from 'validator';

import { 
  shrinkAnimation, 
  slideUpAnimation } from '../../shared/utils/animations';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    shrinkAnimation(200),
    slideUpAnimation(300, '200px')
  ]
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loginResponseErrors: string [];

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, this.isEmail]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  isEmail(ctrl: FormControl): {[err: string]: boolean} {
    if(ctrl.value && !validator.isEmail(ctrl.value)) {
      return {'invalidEmail': true}
    }
    return null;
  }

  login(): void {
    if(this.loginForm.valid && this.email.value && this.password.value) {
      this.resetLoginResponseErrors();
      this.authService.login(this.email.value, this.password.value).subscribe(
        (response => {
          this.handleLoginResponse(response, () => {
            this.authService.onLogin.next();
            this.router.navigate(['/games']);
          });
        })
      )
    }
  }

  resetForm(): void {
    if(!this.loginForm.pristine) {
      this.loginForm.reset();
    }
    this.resetLoginResponseErrors();
  }

  resetLoginResponseErrors(): void {
    this.loginResponseErrors = [];
  }

  setLoginResponseErrors(errors): void {
    this.loginResponseErrors = [...errors];
  }

  handleLoginResponse(response, callback): any {
    if(response['errors'] && response['errors'].length > 0) {
      this.setLoginResponseErrors(response['errors']);
      return;
    }
    this.authService.jwtToLocalStotage(response['token']);
    return callback();
  }
}
