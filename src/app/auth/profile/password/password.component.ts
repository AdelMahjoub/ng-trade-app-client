import { 
  Component, 
  OnInit, 
  ViewChild,
  ElementRef} from '@angular/core';

import { 
  FormGroup, 
  Validators, 
  FormControl, 
  AbstractControl} from '@angular/forms';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  @ViewChild('passwordField') passwordField: ElementRef;
  @ViewChild('passwordConfirmField') passwordConfirmField: ElementRef;

  passwordForm: FormGroup;

  validationErrors = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.passwordForm = new FormGroup({
      'password': new FormControl('', [Validators.required ,Validators.minLength(6)]),
      'passwordConfirm': new FormControl('', Validators.required, this.passwordMismatch.bind(this))
    })
  }

  get password(): AbstractControl {
    return this.passwordForm.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.passwordForm.get('passwordConfirm');
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

  submit(): void {
    if(!this.passwordForm.valid) {
      return;
    }
    this.authService.updateAuthenticatedUser({password: this.password.value})
      .subscribe(
        (response) => {
          if(response['errors']) {
            return this.setValidationErrors(response['errors']);
          }
          (<HTMLInputElement>this.passwordField.nativeElement).blur();
          (<HTMLInputElement>this.passwordConfirmField.nativeElement).blur();
          this.passwordForm.reset();
          this.authService.userUpdated.next(response['user']);
        }
      )
  }

  resetValidationsErrors(): void {
    this.validationErrors = [];
  }

  setValidationErrors(errors): void {
    this.validationErrors = [...errors];
  }

}
