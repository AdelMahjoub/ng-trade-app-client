import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: any;

  getAuthUserSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getAuthUserSubscription = 
    this.authService.getAuthenticatedUser()
      .subscribe(
        (response => {
          this.user = response['user'];
        }) 
      )
  }

  ngOnDestroy () {
    if(this.getAuthUserSubscription) {
      this.getAuthUserSubscription.unsubscribe();
    }
  }

}
