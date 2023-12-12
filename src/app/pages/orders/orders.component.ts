import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/app/environments/environment';
import { GetOrderedFoodDetails } from 'src/app/models/getOrderDetails';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  orders: GetOrderedFoodDetails[] = [];

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.http.get<any[]>(`${baseUrl}Order/datatable`).subscribe((posts) => {
      console.log(posts);
      this.orders = posts;
    });
  }
}
