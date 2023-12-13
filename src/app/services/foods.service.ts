import { EventEmitter, Injectable, Output } from '@angular/core';
import { GetFood } from '../models/getFood';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  orderFoods: GetFood[] = [];
  orderedFoodsChanged = new Subject<GetFood[]>();
  @Output() isRemoved = new EventEmitter<number>();
  @Output() allRemoved = new EventEmitter<void>();

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
    console.log(food);
    const removedFoodId = food.id;
    this.orderFoods = this.orderFoods.filter((item) => item.id !== food.id);
    this.orderedFoodsChanged.next(this.orderFoods.slice());
    this.isRemoved.emit(removedFoodId);
  }
  getCartLength(): Observable<GetFood[]> {
    return this.orderedFoodsChanged.asObservable();
  }

  deleteAllFoodsOfCart() {
    this.orderFoods = [];
    this.orderedFoodsChanged.next([]);
    this.allRemoved.emit();
  }
}
