import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { baseUrl } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutService {
  constructor(private http: HttpClient) {}

  public login(user: User): Observable<string> {
    return this.http.post(`${baseUrl}Authentication/login`, user, {
      responseType: 'text',
    });
  }
}
