import { Injectable } from '@angular/core';

import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  RouterStateSnapshot, 
  Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated()
      .do((isAuthenticated) => {
        if(!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        }
      });
  }
}