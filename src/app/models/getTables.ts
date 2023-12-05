export class GetTable {
  id = 0;
  tableNumber = '';
  numberOfSeats = 0;
  isOccupied = true;
  image = '';
  employees: EmployeeTable[] = [];
}

export class EmployeeTable {
  employeeTableId = 0;
  employeeId = '';
  name = '';
}
