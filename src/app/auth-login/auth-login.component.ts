import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../dto/user.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit {
  user!: User;
  loginFailed: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  LoginForm = this.formBuilder.group({
    username: null,
    password: null,
  });

  ngOnInit(): void {}

  signIn() {
    this.authService.signIn(this.LoginForm.value).subscribe(() => {
      this.router.navigate(['/appointments']);
    });
  }
}
