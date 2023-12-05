import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from 'src/app/models/Menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private route: Router) {}
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
}
