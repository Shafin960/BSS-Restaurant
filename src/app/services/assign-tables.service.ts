import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssignTablesService {
  tableNumber!: number;
  constructor() {}

  setTableId(id: number) {
    this.tableNumber = id;
  }
  getTableId() {
    return this.tableNumber;
  }
}
