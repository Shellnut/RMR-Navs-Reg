import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../shared/services/app.service';

// Security imports
declare const require: any;
import * as CryptoJS from 'crypto-js';
const utilities = require('../../../server/utilities/utilities');
const appConfig = require('../../../server/config/app-config.json');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public username: string;
  public password: string;
  public pending: boolean;
  public warning: string;

  constructor(private router: Router,
              private appService: AppService,
              private builder: FormBuilder) {

    // Form info
    this.form = builder.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

  }


  ngOnInit() {
  }

  login() {

    this.pending = true;

    // Authenticate
    this.appService.authenticate(this.username).subscribe((resp) => {

      const data = JSON.parse(resp['_body']);
      this.pending = false;

      // Decrypt the password
      const decryptData = {
        HMAC: data.HMAC,
        ciphertext: data.ciphertext,
        iv: data.iv,
        salt: data.salt
      };
      const decrypted = utilities.decrypt(decryptData, appConfig.secret);

      // Check to see if passwords match
      if (decrypted === CryptoJS.enc.Base64.stringify(CryptoJS.SHA512(this.password))) {
        this.appService.setUser(data);
        this.router.navigate(['/journey-admin']);
      }
      else {
        this.warning = 'Incorrect Password';
      }

    }, (err) => {
      this.pending = false;
      this.warning = 'Something went wrong';
      console.log('err is', err);
    })
  }

  cancel() {
    this.username = '';
    this.password = '';
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

}
