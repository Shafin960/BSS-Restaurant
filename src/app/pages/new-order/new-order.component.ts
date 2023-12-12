import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { GetFood } from 'src/app/models/getFood';
import { GetTable } from 'src/app/models/getTables';
import { AssignTablesService } from 'src/app/services/assign-tables.service';
import { FoodsService } from 'src/app/services/foods.service';
import { GettableService } from 'src/app/services/gettable.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent {
  tables: GetTable[] = [];
  foods: GetFood[] = [];
  selectedTable = new GetTable();
  selectedFood: any;
  isTableSelected = false;
  isLoading = false;
  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private tableDetail: GettableService,
    private foodToCart: FoodsService
  ) {}

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.isLoading = true;
    this.http.get<any[]>(`${baseUrl}Table/datatable`).subscribe((posts) => {
      this.tables = posts;
    });
    this.http.get<any[]>(`${baseUrl}Food/datatable`).subscribe((posts) => {
      this.foods = posts;
      this.isLoading = false;
    });
  }
  selectTable(table: GetTable) {
    this.selectedTable = table;
    this.isTableSelected = true;
    this.tableDetail.setTableDetails(table);
  }
  onAddedToCart(food: GetFood) {
    food.isSelectedFood = true;
    food.count = 1;
    food.totalPrice = food.discountPrice;
    this.foodToCart.orderFood(food);
    this.toastr.success('Food Added To Cart', 'Item Added');
  }
}
