import { Component, HostListener, OnInit } from '@angular/core';
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
  sidebarSelected = false;
  array: any[] = [];
  constructor(private cartnumber: FoodsService) {}
  ngOnInit(): void {
    this.checkScreenWidth();
    this.cartvalue = this.cartnumber.getCartLength.length;
    this.cartnumber.getCartLength().subscribe((orderedfoods: GetFood[]) => {
      this.cartvalue = orderedfoods.length;
    });
    this.array = this.cartnumber.getOrderedFood();
    console.log(this.array);
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
  }
  onCartCancel() {
    this.selected = false;
  }
  onMenuClick() {
    this.sidebarSelected = !this.sidebarSelected;
    console.log(this.sidebarSelected);
  }

  onNavCancel() {
    this.sidebarSelected = false;
    console.log(this.sidebarSelected);
  }
}
