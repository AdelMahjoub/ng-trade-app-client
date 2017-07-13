import { 
  Component, 
  OnInit } from '@angular/core';

import { 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl} from "@angular/forms";

import { Router } from '@angular/router';

import * as validator from 'validator';

import { 
  shrinkAnimation, 
  slideUpAnimation } from '../../shared/utils/animations';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    shrinkAnimation(200),
    slideUpAnimation(300, '200px')
  ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupResponseErrors: string[];

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, this.isEmail], this.emailInUse.bind(this)),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'passwordConfirm': new FormControl('', Validators.required, this.passwordMismatch.bind(this))
    });
  }

  get email(): AbstractControl {
    return this.signupForm.get('email');
  }

  get password(): AbstractControl {
    return this.signupForm.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.signupForm.get('passwordConfirm');
  }

  isEmail(ctrl: FormControl): {[err: string]: boolean} {
    if(ctrl.value && !validator.isEmail(ctrl.value)) {
      return {'invalidEmail': true}
    }
    return null;
  }

  passwordMismatch(ctrl: FormControl): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if(ctrl.value !== this.password.value) {
        resolve({'passwordMismatch': true});
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  emailInUse(ctrl: FormControl): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.authService.checkEmail(ctrl.value).subscribe(
        (res: any) => {
          if(res.emailIsUsed) {
            resolve({'emailIsUsed': true});
          } else {
            resolve(null);
          }
        }
      );
    });
    return promise;
  }

  register(): void {
    if(this.signupForm.valid && this.email.value && this.password.value) {
      this.resetSignupResponseErrors();
      this.authService.signup(this.email.value, this.password.value).subscribe(
        (response => {
          this.handleSignupResponse(response['errors'], () => {
            this.authService.onLogin.next();
            this.router.navigate(['/games']);
          });
        })
      )
    }
  }

  resetForm(): void {
    if(!this.signupForm.pristine) {
      this.signupForm.reset();
    }
    this.resetSignupResponseErrors();
  }

  resetSignupResponseErrors(): void {
    this.signupResponseErrors = [];
  }

  setSignupResponseErrors(errors): void {
    this.signupResponseErrors = [...errors];
  }

  handleSignupResponse(errors, callback): any {
    if(errors.length > 0) {
      this.setSignupResponseErrors(errors);
      return;
    }
    this.authService.login(this.email.value, this.password.value).subscribe(
      (response => {
        this.authService.jwtToLocalStotage(response['token']);
        return callback();
      })
    )
  }

}
