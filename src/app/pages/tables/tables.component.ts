import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { GetTable } from 'src/app/models/getTables';
import { AssignTablesService } from 'src/app/services/assign-tables.service';
import Swal from 'sweetalert2';

declare function loadin(): any;
declare function leaving(): any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length = 0;
  displayedItems: GetTable[] = [];
  tables: GetTable[] = [];
  isLoading = false;
  showAssignComp: boolean = false;
  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private assign: AssignTablesService
  ) {}

  ngOnInit(): void {
    this.getTable();
    this.onPageChange(event);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.onPageChange(event);
    });
  }
  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedItems = this.tables.slice(startIndex, endIndex);
  }

  onAddTable() {
    leaving();
    this.route.navigate(['/addtable']);
  }

  getTable() {
    this.isLoading = true;
    this.http.get<any[]>(`${baseUrl}Table/datatable`).subscribe((posts) => {
      this.tables = posts;
      this.displayedItems = this.tables;
      this.displayedItems = this.tables.slice(0, 5);
      this.length = this.tables.length;
      this.isLoading = false;
      loadin();
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
    this.showAssignComp = !this.showAssignComp;
    // this.route.navigate(['/assign']);
  }

  onCloseModal() {
    this.showAssignComp = !this.showAssignComp;
  }

  tableChanged() {
    this.showAssignComp = !this.showAssignComp;
    this.getTable();
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
