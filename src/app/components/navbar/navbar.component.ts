import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetFood } from 'src/app/models/getFood';
import { FoodsService } from 'src/app/services/foods.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScreenBelow800: boolean = false;
  selected = false;
  cartvalue = 0;

  constructor(private route: Router, private cartnumber: FoodsService) {}
  ngOnInit(): void {
    this.checkScreenWidth();
    this.cartvalue = this.cartnumber.orderFood.length;
    this.cartnumber.getCartLength().subscribe((orderedfoods: GetFood[]) => {
      this.cartvalue = orderedfoods.length;
    });
    console.log(this.cartvalue);
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
