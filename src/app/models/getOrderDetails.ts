import { Food } from './food';
import { EmployeeTable } from './getTables';

export class GetOrderedFoodDetails {
  id = '';
  orderNumber = '';
  amount = 0;
  orderStatus = 1;
  orderTime = '';
  table = new Table();
  orderItems: OrderItem[] = [];
}

export class Table {
  id = 0;
  tableNumber = '';
  numberOfSeats = 0;
  isOccupied = true;
  image = '';
  employees: EmployeeTable[] = [];
}

export class OrderItem {
  id = '';
  quantity = 0;
  unitPrice = 0;
  totalPrice = 0;
  food = new Food();
}
