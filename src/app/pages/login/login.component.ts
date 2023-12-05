import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AutService } from 'src/app/services/aut.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent {
  user = new User();
  isLoading = false;
  constructor(private authService: AutService, private route: Router) {}
  ngOnInit() {
    localStorage.removeItem('authToken');
  }
  onLogin(user: User) {
    this.isLoading = true;
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.isLoading = false;
      this.route.navigate(['/']);
    });
  }
}
