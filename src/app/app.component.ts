import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loggedIn: boolean;

  constructor(private router: Router) {
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
