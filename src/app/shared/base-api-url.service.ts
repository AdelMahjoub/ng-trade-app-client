import { Injectable } from '@angular/core';

@Injectable()
export class BaseApiUrlService {

  constructor() { }

  baseApiUrl = '/api';

  getBaseApiUrl(): string {
    return this.baseApiUrl;
  }

}