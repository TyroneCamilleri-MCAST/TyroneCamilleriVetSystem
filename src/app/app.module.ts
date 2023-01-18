import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppointmentService } from './services/appointment.service';
import {
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsListComponent,
    AppointmentAddComponent,
    AppointmentUpdateComponent,
    AppointmentViewComponent,
    AuthLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AppointmentService,
    AuthService,
    AuthGuardService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
