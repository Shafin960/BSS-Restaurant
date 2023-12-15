import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/environments/environment';
import { GetEmployee } from 'src/app/models/getEmployee';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length = 0;
  displayedItems: GetEmployee[] = [];
  employees: GetEmployee[] = [];
  isLoading = false;

  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.onPageChange(event);
    });
  }
  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedItems = this.employees.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.getEmployee();
    this.onPageChange(event);
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
      this.displayedItems = this.employees;
      this.displayedItems = this.employees.slice(0, 5);
      this.length = this.employees.length;
      this.isLoading = false;
    });
  }
}
