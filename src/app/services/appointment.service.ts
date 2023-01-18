import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../dto/appointment.dto';
import { User } from '../dto/user.dto';

@Injectable()
export class AppointmentService {
  endpoint: string = 'https://css.teknologija.com/appointment';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.endpoint, this.httpHeader);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(
      this.endpoint + '/' + id,
      this.httpHeader
    );
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(
      this.endpoint,
      appointment,
      this.httpHeader
    );
  }

  updateAppointment(
    id: number,
    appointment: Appointment
  ): Observable<Appointment> {
    return this.httpClient.put<Appointment>(
      this.endpoint + '/' + id,
      appointment,
      this.httpHeader
    );
  }

  deleteAppointment(id: number): Observable<any> {
    return this.httpClient.delete(this.endpoint + '/' + id, this.httpHeader);
  }
}
