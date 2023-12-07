import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { GetTable } from 'src/app/models/getTables';
import { TableEmployee } from 'src/app/models/tableEmployee';
import { AssignTablesService } from 'src/app/services/assign-tables.service';

@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.css'],
})
export class AssignEmployeeComponent implements OnInit {
  isAddingEmployee = false;
  onToggleIsAddingEmployee() {
    this.isAddingEmployee = !this.isAddingEmployee;
  }
  table: GetTable = new GetTable();
  addedEmployees: TableEmployee[] = [];
  employees: TableEmployee[] = [];
  postEmployees: { employeeId: string; tableId: number }[] = [];
  constructor(
    private http: HttpClient,
    private assign: AssignTablesService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  value = this.assign.getTableId();
  ngOnInit(): void {
    this.getTable();
    this.getNonAssign();
  }
  getTable() {
    this.http
      .get<any>(`${baseUrl}Table/get/${this.value}`)
      .subscribe((posts) => {
        console.log(posts);
        this.table = posts;
      });
  }
  getNonAssign() {
    this.http
      .get<any>(`${baseUrl}Employee/non-assigned-employees/${this.value}`)
      .subscribe((posts) => {
        console.log(posts);
        this.employees = posts;
      });
  }

  addEmployeeToTable(employee: TableEmployee) {
    this.addedEmployees.push(employee);
    this.employees = this.employees.filter(
      (item) => item.employeeId !== employee.employeeId
    );
  }
  onRemoveEmployee(addedEmployee: TableEmployee) {
    this.employees.push(addedEmployee);
    this.addedEmployees = this.addedEmployees.filter(
      (item) => item.employeeId !== addedEmployee.employeeId
    );
  }

  onAddOnAssignedEmployees() {
    for (let addEmployee of this.addedEmployees) {
      this.postEmployees.push({
        employeeId: addEmployee.employeeId,
        tableId: this.value,
      });
    }

    this.http
      .post(`${baseUrl}EmployeeTable/create-range`, this.postEmployees)
      .subscribe((response) => {
        console.log(this.postEmployees);
        this.toastr.success('Employees Assigned', 'Operation Successful!');
        this.route.navigate(['/tables']);
      });
  }

  onCloseTab() {
    this.route.navigate(['/tables']);
  }
}
