import { 
  Component, 
  OnInit, 
  OnDestroy} from '@angular/core';

import { 
  FormGroup, 
  FormControl, 
  Validators,
  AbstractControl} from "@angular/forms";

import { Subscription } from "rxjs/Subscription";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: any;

  getAuthUserSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getAuthUserSubscription = this.authService.getAuthenticatedUser().subscribe(
      (response => {
        this.user = response['user'];
        this.authService.userUpdated.next(this.user);
      })
    )
  }

  ngOnDestroy() {
    if(this.getAuthUserSubscription) {
      this.getAuthUserSubscription.unsubscribe();
    }
  }

}
