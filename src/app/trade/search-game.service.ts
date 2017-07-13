import { Subject } from 'rxjs/Subject';
import { BaseApiUrlService } from './../shared/base-api-url.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchGameService {

  baseUrl: string;

  gamesUpdated = new Subject<any>();

  constructor(
    private http: Http,
    private authService: AuthService,
    public baseApiUrl: BaseApiUrlService) { 

      this.baseUrl = this.baseApiUrl.getBaseApiUrl();
  }

  findGames(searchTerm): Observable<any> {
    let options = this.authService.authHeaders();
    return this.http.get(`${this.baseUrl}/search?query=${searchTerm}`, options)
      .map(
        ((response: Response) => {
          return response.json();
        })
      )
  }
  
}