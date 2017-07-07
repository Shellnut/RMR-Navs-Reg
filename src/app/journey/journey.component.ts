import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    phoneNumber: '',
    email: '',
    gender: 'N/A',
    year: 'freshman',
    ECFirstName: '',
    ECLastName: '',
    ECPhone: '',
    college: ['CU'],
    specialNeeds: '',
  };

  constructor(private builder: FormBuilder) {

    // Form info
    this.form = builder.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern('[a-zA-Z]*$')])],
      'lastName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern('[a-zA-Z]*$')])],
      'phoneNumber': [null, Validators.compose([Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')])],
      'email': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,}')])],
      'ECFirstName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern('[a-zA-Z]*$')])],
      'ECLastName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern('[a-zA-Z]*$')])],
      'ECPhone': [null, Validators.compose([Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')])],
      'college': [null],
      'year': [null],
    });


  }

  ngOnInit() {

    // Get colleges

  }

}
