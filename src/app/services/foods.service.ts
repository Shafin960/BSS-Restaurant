import { Injectable } from '@angular/core';
import { GetFood } from '../models/getFood';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  orderFoods: GetFood[] = [];
  orderedFoodsChanged = new Subject<GetFood[]>();

  constructor() {}

  orderFood(food: GetFood) {
    this.orderFoods.push(food);
    this.orderedFoodsChanged.next(this.orderFoods.slice());
    console.log(this.orderFoods);
  }
  getOrderedFood() {
    return this.orderFoods;
  }
  deleteThatFood(food: GetFood) {
    this.orderFoods = this.orderFoods.filter((item) => item.id !== food.id);
    this.orderedFoodsChanged.next(this.orderFoods.slice());
    console.log(this.orderFoods);
  }
  getCartLength(): Observable<GetFood[]> {
    return this.orderedFoodsChanged.asObservable();
  }

  deleteAllFoodsOfCart() {
    this.orderFoods = [];
    this.orderedFoodsChanged.next([]);
  }
}
