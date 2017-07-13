import { Subject } from 'rxjs/Subject';
import { BaseApiUrlService } from './../shared/base-api-url.service';
import { AuthService } from './../auth/auth.service';
import { Game } from './../games/game.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TradeService {

  tradeNotification = new Subject<string>();
  constructor(
    private http: Http,
    private authService: AuthService,
    private baseUrl: BaseApiUrlService) { }

  addToCollection(game: Game): Observable<any> {
    let baseUrl = this.baseUrl.getBaseApiUrl();
    let options = this.authService.authHeaders();
    return this.http.post(`${baseUrl}/add-game`, game, options)
      .map(
        ((response: Response) => {
          this.authService.redirectUnAuth(response);
          return response.json();
        })
      )
  }

  getAllGames(): Observable<any> {
    let baseUrl = this.baseUrl.getBaseApiUrl();
    let options = this.authService.publicHeaders();
    return this.http.get(`${baseUrl}/games`, options)
      .map(
        ((response: Response) => {
          return response.json();
        })
      )
  }

  getUserInfo(username: string): Observable<any> {
    let baseUrl = this.baseUrl.getBaseApiUrl();
    let options = this.authService.authHeaders();
    return this.http.post(`${baseUrl}/get-user`, {username}, options)
      .map(
        ((response: Response) => {
          this.authService.redirectUnAuth(response);
          return response.json();
        })
      )
  }

  requestGame(gameId: string): Observable<any> {
    let baseUrl = this.baseUrl.getBaseApiUrl();
    let options = this.authService.authHeaders();
    return this.http.post(`${baseUrl}/request-game`, {gameId}, options)
      .map(
        ((response: Response) => {
          this.authService.redirectUnAuth(response);
          let errors = response.json()['errors'];
          if(errors.length === 0) {
            this.authService.getAuthenticatedUser()
              .subscribe()
          }
          return response.json();
        })
      )
  }

  retract(gameId: string): Observable<any> {
    let baseUrl = this.baseUrl.getBaseApiUrl();
    let options = this.authService.authHeaders();
    return this.http.post(`${baseUrl}/retract`, {gameId}, options)
      .map(
        ((response: Response) => {
          this.authService.redirectUnAuth(response);
          let errors = response.json()['errors'];
          if(errors.length === 0) {
            this.authService.getAuthenticatedUser()
              .subscribe()
          }
          return response.json();
        })
      )
  }

  discard(gameId: string): Observable<any> {
    let baseUrl = this.baseUrl.getBaseApiUrl();
    let options = this.authService.authHeaders();
    return this.http.post(`${baseUrl}/discard`, {gameId}, options)
      .map(
        ((response: Response) => {
          this.authService.redirectUnAuth(response);
          let errors = response.json()['errors'];
          if(errors.length === 0) {
            this.authService.getAuthenticatedUser()
              .subscribe()
          }
          return response.json();
        })
      )
  }
 
}
