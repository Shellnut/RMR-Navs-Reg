import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  public form: FormGroup;

  public colleges = ['CU', 'CSU', 'UNC', 'UNM', 'Other'];

  public data = {
    firstName: 'k',
    lastName: 's',
    phoneNumber: '7209877832',
    email: 'shellnut@gmail.com',
    gender: 'N/A',
    year: 'freshman',
    ECFirstName: 'L',
    ECLastName: 'W',
    ECPhone: '1234567890',
    college: 'CU'
  };

  constructor(private builder: FormBuilder,
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
      'ECPhone': [null, Validators.compose([Validators.required, Validators.pattern(phonePattern)])],
    });


  }

  ngOnInit() {

    // Get colleges

  }

  submit() {
    this.appService.submitJourney(this.data).subscribe((result) => {
      console.log('result is', result);
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
