import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journey-confirm',
  templateUrl: './journey-confirm.component.html',
  styleUrls: ['./journey-confirm.component.css']
})
export class JourneyConfirmComponent implements OnInit {

  public data: any = {};

  constructor(private appService: AppService,
              private router: Router) { }

  ngOnInit() {

    // Get Journey Data
    this.data = this.appService.getJourneyConfirm();

    // Navigate away if null
    if (!this.data.firstName) {
      this.router.navigate(['/journey']);
    }

  }

}
