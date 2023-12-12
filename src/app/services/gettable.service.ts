import { Injectable } from '@angular/core';
import { GetTable } from '../models/getTables';

@Injectable({
  providedIn: 'root',
})
export class GettableService {
  selectedTable = new GetTable();
  constructor() {}

  setTableDetails(table: GetTable) {
    this.selectedTable = table;
  }

  getTableDetails() {
    return this.selectedTable;
  }
}
