import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, repeat, retry, tap } from 'rxjs';
import { User } from '../dto/user.dto';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  loginEndPoint: string = 'https://css.teknologija.com/authenticate';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private route: Router) {}

  signIn(user: any): Observable<User> {
    return this.httpClient
      .post<User>(this.loginEndPoint, user, this.httpHeader)
      .pipe(
        tap((user: User) => {
          localStorage.setItem('token', user.jwtToken);
          localStorage.setItem('username', user.username);
          localStorage.setItem('role', user.role);
        }),
        retry(2)
      );
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  public clearSession() {
    localStorage.clear();
    this.route.navigate(['authenticate']);
  }

  public getToken() {
    localStorage.getItem('token');
  }
}
