import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-journey-admin',
  templateUrl: './journey-admin.component.html',
  styleUrls: ['./journey-admin.component.css']
})
export class JourneyAdminComponent implements OnInit {

  public journey: Array<any>;

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.appService.getJourney().subscribe((resp) => {

      // Set Journey table
      this.journey = JSON.parse(resp['_body']);

    }, (err) => {
      console.log('err is', err);
    })

  }

}
