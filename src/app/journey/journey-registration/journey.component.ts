import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  public form: FormGroup;

  public colleges = ['CU', 'CSU', 'UNC', 'UNM', 'Other'];

  public data = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    year: '',
    ECFirstName: '',
    ECLastName: '',
    ECPhone: '',
    college: ''
  };

  constructor(private builder: FormBuilder,
              private router: Router,
              private appService: AppService) {

    const phonePattern = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
    const emailPattern = '[^@]+@[^@]+\.[a-zA-Z]{2,}';
    const namePattern = '[a-zA-Z]*$';

    // Form info
    this.form = builder.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(namePattern)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(namePattern)])],
      'phoneNumber': [null, Validators.compose([Validators.required, Validators.pattern(phonePattern)])],
      'email': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(emailPattern)])],
      'ECFirstName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(namePattern)])],
      'ECLastName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(namePattern)])],
      'ECPhone': [null, Validators.compose([Validators.required, Validators.pattern(phonePattern)])]
    });

  }

  ngOnInit() {

    // Get colleges

  }

  submit() {

    // Submit data
    this.appService.submitJourney(this.data).subscribe((result) => {

      // Parse response
      const data = JSON.parse(result['_body']);

      this.appService.setJourneyConfirm(data);

      // Navigate to confirm page
      this.router.navigate(['/journey-confirm']);

    }, (err) => {
      console.log('err is', err);
    })
  }

  clear() {
    this.data = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      gender: 'N/A',
      year: 'freshman',
      ECFirstName: '',
      ECLastName: '',
      ECPhone: '',
      college: 'CU'
    }
  }

}
