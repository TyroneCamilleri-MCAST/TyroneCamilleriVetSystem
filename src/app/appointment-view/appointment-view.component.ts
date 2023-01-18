import { Component, OnInit } from '@angular/core';
import { Appointment } from '../dto/appointment.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css'],
})
export class AppointmentViewComponent implements OnInit {
  constructor(
    private appoitmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  appointment?: Appointment;

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.appoitmentService.getAppointment(id).subscribe((res: Appointment) => {
      this.appointment = res;
    });
  }
}
