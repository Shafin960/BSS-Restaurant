import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/environments/environment';
import { User } from 'src/app/models/user';
import { AutService } from 'src/app/services/aut.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent {
  user = new User();
  isError: boolean = false;
  isLoading = false;
  constructor(
    private authService: AutService,
    private route: Router,
    private http: HttpClient
  ) {}
  ngOnInit() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
  onLogin(user: User) {
    this.isLoading = true;
    this.authService.login(user).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.isLoading = false;
        this.route.navigate(['/']);
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Email or Password',
          footer: '<a href="#">Forgot Password?</a>',
        });
      }
    );
  }
}
