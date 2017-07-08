import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const basePath = 'api';
let user = {};
let journeyUser = {};

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  submitJourney(data: any) {
    return this.http.post(`${basePath}/journey`, data);
  }

  getJourney() {
    return this.http.get(`${basePath}/journey`)
  }

  postUser(data: any) {
    return this.http.post(`${basePath}/user`, data);
  }

  authenticate(username: string) {
    return this.http.get(`${basePath}/user?username=${username}`);
  }

  setUser(data: any) {
    user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    }
  }

  getUser() {
    return user;
  }

  setJourneyConfirm(data: any) {
    journeyUser = data;
  }

  getJourneyConfirm() {
    return journeyUser;
  }

}
