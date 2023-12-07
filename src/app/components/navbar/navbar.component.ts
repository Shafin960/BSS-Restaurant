import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScreenBelow800: boolean = false;
  selected = false;
  constructor(private route: Router) {}
  ngOnInit(): void {
    this.checkScreenWidth();
  }
  checkScreenWidth() {
    this.isScreenBelow800 = window.innerWidth < 1150;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
  }

  onClilckCart() {
    this.selected = !this.selected;
    // this.route.navigate(['/cart']);
    console.log('Clicking');
  }
  onCartCancel() {
    this.selected = false;
  }
}
