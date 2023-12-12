import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from 'src/app/models/Menu';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css'],
})
export class MobileNavbarComponent {
  constructor(private route: Router) {}
  @Output() cancelClickedSide = new EventEmitter<void>();
  menus: IMenu[] = [
    {
      text: 'Home',
      link: '/home',
      icon: 'home',
    },
    {
      text: 'Employees',
      link: '/employees',
      icon: 'groups',
    },
    {
      text: 'Tables',
      link: '/tables',
      icon: 'list_alt',
    },
    {
      text: 'Foods',
      link: '/foods',
      icon: 'food_bank',
    },
    {
      text: 'New Order',
      link: '/neworder',
      icon: 'assignment_turned_in',
    },
    {
      text: 'Orders',
      link: '/orders',
      icon: 'list',
    },
  ];

  onLogout() {
    this.route.navigate(['/login']);
    localStorage.removeItem('authToken');
  }

  onCollpase() {
    this.cancelClickedSide.emit();
  }
}
