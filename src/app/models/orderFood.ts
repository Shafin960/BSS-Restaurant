export class OrderFood {
  tableId = 0;
  orderNumber = '';
  amount = 0;
  phoneNumber = '';
  orderTime!: Date;
  items: FoodDetails[] = [];
}
export class FoodDetails {
  foodId = 0;
  quantity = 0;
  unitPrice = 0;
  totalPrice = 0;
}
