import { 
  Component, 
  OnInit, 
  Input,
  OnDestroy,
  ViewChild,
  ElementRef} from '@angular/core';

import { 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import * as validator from 'validator';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.css']
})
export class OptionalComponent implements OnInit, OnDestroy {

  optionalForm: FormGroup;
  validationErrors = [];
  defaultValues: any;

  @ViewChild('submitBtn') submitBtn: ElementRef;

  userUpdatedSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.userUpdatedSubscription = this.authService.userUpdated.subscribe(
      (user: any) => {
        this.updateForm(user);
      }
    )
  }

  ngOnDestroy() {
    if(this.userUpdatedSubscription) {
      this.userUpdatedSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.optionalForm = new FormGroup({
      'firstName': new FormControl('', this.isAlpha),
      'lastName': new FormControl('', this.isAlpha),
      'age': new FormControl('', [this.isNumeric, Validators.min(18), Validators.max(200)]),
      'location': new FormControl(''),
      'phone': new FormControl('', this.isNumeric),
    });
  }

  updateForm(user: any): void {
    this.optionalForm.patchValue({
      'firstName': user['firstName'],
      'lastName': user['lastName'],
      'age': user['age'],
      'location': user['location'],
      'phone': user['phone']
    })
    this.defaultValues = {
      'firstName': user['firstName'],
      'lastName': user['lastName'],
      'age': user['age'],
      'location': user['location'],
      'phone': user['phone']
    }
    this.optionalForm.markAsPristine();
    this.optionalForm.markAsUntouched();
    this.optionalForm.updateValueAndValidity();
  }

  get firstName(): AbstractControl {
    return this.optionalForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.optionalForm.get('lastName');
  }

  get age(): AbstractControl {
    return this.optionalForm.get('age');
  }

  get location(): AbstractControl {
    return this.optionalForm.get('location');
  }

  get phone(): AbstractControl {
    return this.optionalForm.get('phone');
  }

  isAlpha(ctrl: FormControl): {[err: string]: boolean} {
    if(ctrl.value && !validator.isAlpha(ctrl.value)) {
      return {'isNotAlpha': true}
    }
    return null
  }

  isNumeric(ctrl: FormControl): {[err: string]: boolean} {
    if(ctrl.value && !validator.isNumeric(ctrl.value)) {
      return {'isNotNumeric': true}
    }
    return null;
  }

  submit(): void {
    if(this.formIsEmpty() || !this.valusHasChanged()) {
      return;
    }
    this.resetValidationsErrors();
    this.authService.updateAuthenticatedUser(this.optionalForm.value)
      .subscribe(
        (response) => {
          if(response['errors']) {
            return this.setValidationErrors(response['errors']);
          }
          (<HTMLButtonElement>this.submitBtn.nativeElement).focus();
          this.authService.userUpdated.next(response['user']);
        }
      )
  }

  formIsEmpty(): boolean {
    let empty = [];
    Object.keys(this.optionalForm.value).forEach(key => {
      if(this.optionalForm.value[key]) {
        this.optionalForm.value[key] = validator.escape(this.optionalForm.value[key]);
        empty.push(1)
      }
    });
    return empty.length === 0;
  }

  valusHasChanged(): boolean {
    let changes = [];
    Object.keys(this.optionalForm.value).forEach(key => {
      if(this.optionalForm.value[key] !== this.defaultValues[key]) {
        changes.push(1)
      }
    });
    return changes.length > 0;
  }

  resetValidationsErrors(): void {
    this.validationErrors = [];
  }

  setValidationErrors(errors): void {
    this.validationErrors = [...errors];
  }

}
