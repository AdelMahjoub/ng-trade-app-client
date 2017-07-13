import { 
  Component, 
  OnInit, 
  OnDestroy,
  ViewChild, 
  ElementRef } from '@angular/core';

import {
   FormGroup, 
   FormControl, 
   Validators, 
   AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit, OnDestroy {

  @ViewChild('usernameField') usernameField: ElementRef;

  usernameForm: FormGroup;

  validationErrors= [];

  userUpdatedSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.userUpdatedSubscription = this.authService.userUpdated.subscribe(
      (user: any) => {
        this.updateForm(user['username']);
      }
    )
  }

ngOnDestroy() {
    if(this.userUpdatedSubscription) {
      this.userUpdatedSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.usernameForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(4)], this.userNameInUse.bind(this))
    });
  }
  
  updateForm(username: string): void {
    this.username.patchValue(username);
    this.usernameForm.markAsPristine();
    this.usernameForm.markAsUntouched();
    this.usernameForm.updateValueAndValidity();
  }

  get username(): AbstractControl {
    return this.usernameForm.get('username');
  }

  userNameInUse(ctrl: FormControl): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.authService.checkUsername(ctrl.value).subscribe(
        (res: any) => {
          if(res.usernameIsUsed) {
            resolve({'usernameIsUsed': true});
          } else {
            resolve(null);
          }
        }
      );
    });
    return promise;
  }

  submit(): void {
    if(!this.usernameForm.valid) {
      return;
    }
    this.resetValidationsErrors();
    this.authService.updateAuthenticatedUser(this.usernameForm.value)
      .subscribe(
        (response) => {
          if(response['errors']) {
            return this.setValidationErrors(response['errors']);
          }
          (<HTMLInputElement>this.usernameField.nativeElement).blur();
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
