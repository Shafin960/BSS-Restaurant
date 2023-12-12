import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { GetTable } from 'src/app/models/getTables';
import { AssignTablesService } from 'src/app/services/assign-tables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables: GetTable[] = [];
  isLoading = false;

  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private assign: AssignTablesService
  ) {}
  ngOnInit(): void {
    this.getTable();
  }
  onAddTable() {
    this.route.navigate(['/addtable']);
  }
  getTable() {
    this.isLoading = true;
    this.http.get<any[]>(`${baseUrl}Table/datatable`).subscribe((posts) => {
      console.log(posts);
      this.tables = posts;
      this.isLoading = false;
    });
  }
  onDeleteTable(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to remove this Table from the list. This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${baseUrl}Table/delete/${id}`).subscribe(
          () => {
            console.log('Table deleted successfully');
            this.getTable();
            this.toastr.success('Table Deleted', 'Delete');
            this.route.navigate(['/tables']);
          },
          (error) => {
            console.error('Error deleting food:', error);
          }
        );
      }
    });
  }
  onAssignEmployee(id: number) {
    this.assign.setTableId(id);
    this.route.navigate(['/assign']);
  }

  deleteTableEmployeeItem(employeeTableId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to remove this employee from this table.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${baseUrl}EmployeeTable/delete/${employeeTableId}`)
          .subscribe(
            () => {
              this.getTable();
              this.toastr.success(
                'Employee Removed From This Table',
                'Successful'
              );
            },
            (error) => {
              console.error('Deletion failed', error);
            }
          );
      }
    });
  }
}
