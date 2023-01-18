import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageTitle = 'TCAssignmentVet';
  constructor(private authService: AuthService) {}

  getValue(): string | null {
    return localStorage.getItem('username');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticate(): string {
    return String(this.authService.isAuthenticated());
  }

  signOut() {
    this.authService.clearSession();
  }
}
