import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/environments/environment';
import { GetEmployee } from 'src/app/models/getEmployee';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: GetEmployee[] = [];
  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getEmployee();
  }
  onAddEmployee() {
    this.route.navigate(['/addemployee']);
  }
  onDeleteEmployee(id: string) {
    this.http.delete(`${baseUrl}Employee/delete/${id}`).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.getEmployee();
        this.toastr.success('Employee Deleted', 'Operation Successful');
        this.route.navigate(['/employees']);
      },
      (error) => {
        console.error('Employee deleting food:', error);
      }
    );
  }

  getEmployee() {
    this.http.get<any[]>(`${baseUrl}Employee/datatable`).subscribe((posts) => {
      console.log(posts);
      this.employees = posts;
    });
  }
}
