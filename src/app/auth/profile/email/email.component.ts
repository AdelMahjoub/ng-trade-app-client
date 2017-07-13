import { 
  Component, 
  OnInit, 
  Input,
  OnDestroy, 
  ElementRef,
  ViewChild} from '@angular/core';

import { 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl} from "@angular/forms";

import { AuthService } from '../../auth.service';

import { Subscription } from 'rxjs/Subscription';

import * as validator from 'validator';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit, OnDestroy {

  @ViewChild('emailField') emailField: ElementRef;

  validationErrors = [];
  emailForm: FormGroup;

  userUpdatedSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.userUpdatedSubscription = this.authService.userUpdated.subscribe(
      (user: any) =>{
        this.updateForm(user['email']);
      }
    )
  }

  ngOnDestroy() {
    if(this.userUpdatedSubscription) {
      this.userUpdatedSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.emailForm = new FormGroup({
      'email': new FormControl('', [Validators.required, this.isEmail], this.emailInUse.bind(this)),
    })
  }

  updateForm(email: string) {
    this.email.patchValue(email);
    this.emailForm.markAsPristine();
    this.emailForm.markAsUntouched();
    this.emailForm.updateValueAndValidity();
  }

  get email(): AbstractControl {
    return this.emailForm.get('email');
  }

  isEmail(ctrl: FormControl): {[err: string]: boolean} {
    if(!validator.isEmail(ctrl.value)) {
      return {'invalidEmail': true}
    }
    return null;
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

  submit(): void {
    if(!this.emailForm.valid) {
      return;
    }
    this.resetValidationsErrors();
    this.authService.updateAuthenticatedUser(this.emailForm.value)
      .subscribe(
        (response) => {
          if(response['errors']) {
            return this.setValidationErrors(response['errors']);
          }
          (<HTMLInputElement>this.emailField.nativeElement).blur();
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
