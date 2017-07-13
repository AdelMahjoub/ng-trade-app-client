import { Injectable } from '@angular/core';

import { 
  Http, 
  Response, 
  Headers, 
  RequestOptions } from '@angular/http';

import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseApiUrlService } from '../shared/base-api-url.service';
import { Subject } from "rxjs/Subject";

@Injectable()
export class AuthService {

  baseUrl: string;

  authUser: any;

  onLogin = new Subject();
  onLogout = new Subject();
  userUpdated = new Subject<any>();

  constructor(
    private http: Http,
    public baseApiUrl: BaseApiUrlService,
    public router: Router) {
      this.baseUrl = this.baseApiUrl.getBaseApiUrl();
    }
  
  signup(email: string, password: string): Observable<any> {
  
    return this.http.post(`${this.baseUrl}/signup`, {email, password}, this.publicHeaders())
      .map((response: Response) => {
        return response.json();
      });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {email, password},this.publicHeaders())
      .map((response: Response) => {
        return response.json();
      });
  }

  checkEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/email-is-used`, {email}, this.publicHeaders())
      .map((response: Response) => {
        return response.json();
      });
  }

  checkUsername(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/username-is-used`, {username}, this.authHeaders())
      .map((response: Response) => {
        return response.json();
      });
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify-token`, this.authHeaders())
      .map((response: Response) => {
        let errors = response.json()['errors'];
        if(errors.length > 0) {
          this.onLogout.next();
          return false;
        }
        this.onLogin.next();
        return true;
      });
  }

  getAuthenticatedUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-auth-user`, this.authHeaders())
      .map((response: Response) => {
        this.redirectUnAuth(response);
        this.authUser = response.json()['user'];
        this.userUpdated.next(this.authUser);
        return response.json();
      });
  }

  updateAuthenticatedUser(obj: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/update-user`, obj, this.authHeaders())
      .map((response: Response) => {
        this.redirectUnAuth(response);
        if(!response.json()['errors']) {
          this.authUser = response.json()['user'];
        }
        return response.json();
      });
  }

  logout(): void {
    localStorage.clear();
    this.authUser = null;
    this.onLogout.next();
    this.router.navigate(['/']);
  }
  
  jwtToLocalStotage(jwt): void {
    localStorage.setItem('token', jwt);
  }

  jwtFromLocalStorage(): string {
    return localStorage.getItem('token');
  }

  authHeaders(): RequestOptions {
    const auth = 'Bearer ' + this.jwtFromLocalStorage();
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('authorization', auth);
    const options = new RequestOptions({ headers });
    return options;
  } 

  publicHeaders(): RequestOptions {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const options = new RequestOptions({ headers });
    return options;
  }

  redirectUnAuth(response: Response): void {
    let errors = response.json()['errors'] ? <Array<any>>response.json()['errors'] : [];
    if(errors.includes('Unauthorized', 0)) {
      this.onLogout.next();
      this.router.navigate(['/auth/login']);
      window.scrollTo(0, 0);
      return;
    }
  }

}