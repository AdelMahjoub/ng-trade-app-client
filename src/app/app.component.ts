import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated()
      .subscribe(
        (isAuth => {
          if(isAuth) {
            this.authService.getAuthenticatedUser()
              .subscribe();
          }
        })
      );
  }

}
