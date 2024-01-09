import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  isQR = false;
  constructor(private authService: AutService, private route: Router) {}
  ngOnInit() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
  toggleQR() {
    this.isQR = !this.isQR;
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
