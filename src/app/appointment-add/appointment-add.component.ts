import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css'],
})
export class AppointmentAddComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointment!: Appointment;
  vetNotesAllowed = false;

  durations = [
    { name: '10 mins', value: 10 },
    { name: '15 mins', value: 15 },
    { name: '30 mins', value: 30 },
  ];

  animals = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile'];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    if (localStorage.getItem('role') == 'VET') {
      this.router.navigate(['/appointments']);
    }
  }

  get patientName() {
    return this.appointmentForm.get('patientName');
  }

  get animalType() {
    return this.appointmentForm.get('animalType');
  }

  get ownerIdCardNumber() {
    return this.appointmentForm.get('ownerIdCardNumber');
  }

  get ownerName() {
    return this.appointmentForm.get('ownerName');
  }

  get ownerSurname() {
    return this.appointmentForm.get('ownerSurname');
  }

  get ownerContactNumber() {
    return this.appointmentForm.get('ownerContactNumber');
  }

  get appointmentDate() {
    return this.appointmentForm.get('appointmentDate');
  }

  get appointmentTime() {
    return this.appointmentForm.get('appoinmentTime');
  }

  get appointmentDuration() {
    return this.appointmentForm.get('appointmentDuration');
  }

  get reasonForAppointment() {
    return this.appointmentForm.get('reasonForAppointment');
  }

  get vetNotes() {
    return this.appointmentForm.get('vetNotes');
  }

  ngOnInit(): void {
    let date = new Date().getDate();
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      animalType: [this.animals[0], Validators.required],
      ownerIdCardNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{5,}[a-zA-Z]$'),
        ]),
      ],
      ownerName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      ownerSurname: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      ownerContactNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{8}$'),
        ]),
      ],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      appointmentDuration: [this.durations[0].value, Validators.required],
      reasonForAppointment: ['', Validators.required],
      vetNotes: null,
    });
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      this.appointmentForm.value.appointmentDate = this.datePipe.transform(
        this.appointmentForm.value.appointmentDate,
        'dd/MM/yyyy'
      );
      this.appointmentService
        .addAppointment(this.appointmentForm.value)
        .subscribe();
      this.router.navigate(['/appointments']);
    }
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value) {
      const today = new Date();
      const dateToCheck = new Date(control.value);
      if (dateToCheck < today) {
        return { 'Invalid date': true };
      }
    }
    return null;
  }
}
