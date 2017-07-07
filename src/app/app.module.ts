import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ContactComponent } from './contact/contact.component';
import { JourneyComponent } from './journey/journey.component';
import { LaborersComponent } from './laborers/laborers.component';
import { AppService } from './shared/services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateAccountComponent,
    EditAccountComponent,
    ContactComponent,
    JourneyComponent,
    LaborersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([{
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'create-account',
        component: CreateAccountComponent
      },
      {
        path: 'edit-account',
        component: EditAccountComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'journey',
        component: JourneyComponent
      },
      {
        path: 'laborers',
        component: LaborersComponent
      },
      {
        path: '**',
        component: HomeComponent
      }
    ])
  ],
  providers: [DatePipe, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
