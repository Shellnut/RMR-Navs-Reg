import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const basePath = 'api';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  submitJourney(data: any) {
    return this.http.post(`${basePath}/journey`, data);
  }

}
