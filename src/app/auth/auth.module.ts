// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

// Components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OptionalComponent } from './profile/optional/optional.component';
import { PasswordComponent } from './profile/password/password.component';
import { EmailComponent } from './profile/email/email.component';
import { UsernameComponent } from './profile/username/username.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    SignupComponent, 
    LoginComponent, 
    ProfileComponent, OptionalComponent, PasswordComponent, EmailComponent, UsernameComponent
  ]
})
export class AuthModule { }
