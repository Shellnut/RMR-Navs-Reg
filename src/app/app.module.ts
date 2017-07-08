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
import { JourneyComponent } from './journey/journey-registration/journey.component';
import { LaborersComponent } from './laborers/laborers.component';
import { AppService } from './shared/services/app.service';
import { JourneyAdminComponent } from './journey/journey-admin/journey-admin.component';
import { JourneyConfirmComponent } from './journey/journey-confirm/journey-confirm.component';

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
    JourneyAdminComponent,
    JourneyConfirmComponent,
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
        path: 'journey-admin',
        component: JourneyAdminComponent
      },
      {
        path: 'journey-confirm',
        component: JourneyConfirmComponent
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
