import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {AppService} from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loggedIn: boolean;
  public user: any;

  constructor(private router: Router,
              private appService: AppService) {

    // On Route Change event
    router.events.subscribe(() => {
      this.user = this.appService.getUser();
      if (this.user.firstName) {
        this.loggedIn = true;
      }
    });

  }

  redirect(path) {
    this.router.navigate([path]);
  }

  admin(status: string) {
    if (status === 'login') {
      this.router.navigate(['login']);
    }
    else if (status === 'logout') {
      this.loggedIn = false;
    }
  }
}
