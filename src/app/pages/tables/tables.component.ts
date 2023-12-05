import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { GetTable } from 'src/app/models/getTables';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables: GetTable[] = [];
  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getTable();
  }
  onAddTable() {
    this.route.navigate(['/addtable']);
  }
  getTable() {
    this.http.get<any[]>(`${baseUrl}Table/datatable`).subscribe((posts) => {
      console.log(posts);
      this.tables = posts;
    });
  }
  onDeleteTable(id: number) {
    this.http.delete(`${baseUrl}Table/delete/${id}`).subscribe(
      () => {
        console.log('Food deleted successfully');
        this.getTable();
        this.toastr.success('Table Deleted', 'Delete');
        this.route.navigate(['/tables']);
      },
      (error) => {
        console.error('Error deleting food:', error);
      }
    );
  }
}
