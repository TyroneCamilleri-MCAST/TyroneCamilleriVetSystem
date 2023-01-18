import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.css'],
})
export class AppointmentUpdateComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointment!: Appointment;
  vetNotesAllowed = false;

  durations = [
    { name: '10 mins', value: 10 },
    { name: '15 mins', value: 15 },
    { name: '30 mins', value: 30 },
  ];

  animals = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile'];

  role: String | null = localStorage.getItem('role');
  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    if (this.role == 'VET' || this.role == 'ADMIN') {
      this.vetNotesAllowed = true;
    } else {
      this.vetNotesAllowed = false;
    }
  }

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentService.getAppointment(id).subscribe((res: Appointment) => {
      let date = res.appointmentDate.split('/').reverse().join('-');
      this.appointmentForm = this.formBuilder.group({
        patientName: res.patientName,
        animalType: res.animalType,
        ownerIdCardNumber: res.ownerIdCardNumber,
        ownerName: res.ownerName,
        ownerSurname: res.ownerSurname,
        ownerContactNumber: res.ownerContactNumber,
        appointmentDate: date,
        appointmentTime: res.appointmentTime,
        appointmentDuration: res.appointmentDuration,
        reasonForAppointment: res.reasonForAppointment,
        vetNotes: res.vetNotes,
      });
    });
  }

  updateAppointment() {
    this.appointmentForm.value.appointmentDate = this.datePipe.transform(
      this.appointmentForm.value.appointmentDate,
      'dd/MM/yyyy'
    );
    this.appointmentService
      .updateAppointment(
        Number(this.route.snapshot.paramMap.get('id')),
        this.appointmentForm.value
      )
      .subscribe();
    this.router.navigate(['/appointments']);
  }
}
