import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { baseUrl } from '../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IAuthResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class AutService {
  constructor(private route: Router, private http: HttpClient) {}

  // login(user: User)  {
  //   return this.http.post(`${baseUrl}Authentication/login`, user);
  // }
  public login(user: User): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(
      `${baseUrl}Authentication/login`,
      user
    );
  }
  isLoggedIn() {
    return localStorage.getItem('authToken') != null;
  }
  getUser() {
    let temp = localStorage.getItem('user');
    if (temp) {
      return JSON.parse(temp);
    }
  }
}
