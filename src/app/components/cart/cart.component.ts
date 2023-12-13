import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';
import { baseUrl } from 'src/app/environments/environment';
import { GetFood } from 'src/app/models/getFood';
import { GetTable } from 'src/app/models/getTables';
import { FoodDetails, OrderFood } from 'src/app/models/orderFood';
import { FoodsService } from 'src/app/services/foods.service';
import { GettableService } from 'src/app/services/gettable.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Output() cancelClicked = new EventEmitter<void>();
  @Output() zeroNow = new EventEmitter<void>();

  selectedTable = new GetTable();
  foodsToCheckOut: GetFood[] = [];
  subtotal = 0;
  submittedOrder = new OrderFood();

  constructor(
    private cartToFood: FoodsService,
    private table: GettableService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.foodsToCheckOut = this.cartToFood.getOrderedFood();
    this.subtotal = this.calculateTotalPrice();
    this.selectedTable = this.table.getTableDetails();
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const food of this.foodsToCheckOut) {
      totalPrice += food.totalPrice;
    }
    return totalPrice;
  }

  onCancel() {
    this.cancelClicked.emit();
  }
  onDecrementFood(food: GetFood) {
    if (food.count == 1) {
      food.count = 0;
      this.foodsToCheckOut = this.foodsToCheckOut.filter(
        (item) => item.id !== food.id
      );
      this.onDeleteItem(food);
    } else {
      food.count = food.count - 1;
      food.totalPrice = food.count * food.discountPrice;
    }
    this.subtotal = this.calculateTotalPrice();
  }
  onIncrementFood(food: GetFood) {
    food.count = food.count + 1;
    food.totalPrice = food.count * food.discountPrice;
    this.subtotal = this.calculateTotalPrice();
  }

  onDeleteItem(food: GetFood) {
    this.cartToFood.deleteThatFood(food);
    this.foodsToCheckOut = this.foodsToCheckOut.filter(
      (item) => item.id !== food.id
    );

    this.subtotal = this.calculateTotalPrice();
  }

  onSubmitOrder() {
    this.submittedOrder.tableId = this.selectedTable.id;
    this.submittedOrder.orderNumber = Date.now().toString();
    this.submittedOrder.amount = this.subtotal;
    this.submittedOrder.phoneNumber = '01687193003';
    this.submittedOrder.orderTime = new Date();
    this.foodsToCheckOut.forEach((item) => {
      const foodItem: FoodDetails = {
        foodId: item.id,
        quantity: item.count,
        unitPrice: item.discountPrice,
        totalPrice: item.count * item.price,
      };
      this.submittedOrder.items.push(foodItem);
    });
    console.log(this.submittedOrder);
    this.http
      .post(`${baseUrl}Order/create`, this.submittedOrder)
      .subscribe((resonseData) => {
        this.toastr.success('Order Placed', 'Operation Successful');
        console.log(this.submittedOrder);
      });
    this.cartToFood.deleteAllFoodsOfCart();

    this.onCancel();
  }
}
