import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/environments/environment';
import { GetEmployee } from 'src/app/models/getEmployee';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: GetEmployee[] = [];
  isLoading = false;
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Employee from list. This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }

  getEmployee() {
    this.isLoading = true;
    this.http.get<any[]>(`${baseUrl}Employee/datatable`).subscribe((posts) => {
      console.log(posts);
      this.employees = posts;
      this.isLoading = false;
    });
  }
}
