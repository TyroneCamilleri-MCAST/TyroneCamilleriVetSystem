import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthGuardService as AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'authenticate', component: AuthLoginComponent },
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  {
    path: 'appointments',
    component: AppointmentsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments/:id',
    component: AppointmentUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: AppointmentViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AppointmentAddComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
