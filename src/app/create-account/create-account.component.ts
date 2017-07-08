import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../shared/services/app.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  public form: FormGroup;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public repeatPassword: string;
  public pending: boolean;
  public warning: string;

  constructor(private router: Router,
              private appService: AppService,
              private builder: FormBuilder) {

    const emailPattern = '[^@]+@[^@]+\.[a-zA-Z]{2,}';
    const namePattern = '[a-zA-Z]*$';
    const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

    // Form info
    this.form = builder.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(namePattern)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(namePattern)])],
      'email': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(emailPattern)])],
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(45), Validators.pattern(passwordPattern)])],
      'repeatPassword': [null, Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }

  // Submit Create account
  submit() {

    // Variables
    this.pending = true;
    this.warning = '';

    // Handle password
    const encryptedPassword = CryptoJS.enc.Base64.stringify(CryptoJS.SHA512(this.form.controls['password'].value));

    // Data to submit
    const submitData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: encryptedPassword
    };

    // Submit user
    this.appService.postUser(submitData).subscribe(() => {

      // Navigate to login page
      this.pending = false;
      this.router.navigate(['/login']);

    }, (err) => {

      // Set pending to false
      this.pending = false;

      // Handle erros
      if (err._body.includes('ER_DUP_ENTRY')) {
        this.warning = 'Email already exists';
      }
      else {
        this.warning = 'Something went wrong. Please try again';
      }

       console.log('err is', err);
    })

  }

  // Clear account
  clear() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }

}
