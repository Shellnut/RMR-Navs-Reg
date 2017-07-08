import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilitiesService {

  constructor(private datePipe: DatePipe) { }

  generateToken(username: string, userID: number) {
    const date = this.datePipe.transform(new Date(new Date()).getTime() + (1000 * 60 * 60 * 24 * 30), 'yyyy-MM-dd HH:mm:ss');
    return {
      username: username,
      tokenID: this.gen_uuid().replace(/-/g, ''),
      expires: date,
      userID: userID
    };
  }

  gen_uuid() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

}
