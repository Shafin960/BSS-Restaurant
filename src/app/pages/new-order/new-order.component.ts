import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { GetFood } from 'src/app/models/getFood';
import { GetTable } from 'src/app/models/getTables';
import { AssignTablesService } from 'src/app/services/assign-tables.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent {
  tables: GetTable[] = [];
  foods: GetFood[] = [];
  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private assign: AssignTablesService
  ) {}

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.http.get<any[]>(`${baseUrl}Table/datatable`).subscribe((posts) => {
      console.log(posts);
      this.tables = posts;
    });
    this.http.get<any[]>(`${baseUrl}Food/datatable`).subscribe((posts) => {
      console.log(posts);
      this.foods = posts;
    });
  }
}
