import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css'],
})
export class AddTableComponent {
  table = new Table();

  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  imageUl: string | ArrayBuffer | null = '../../../assets/table.png';
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onAddTable(table: Table) {
    if (table.tableNumber == '') {
      this.toastr.error('Table Number Needed', 'Failed');
      return;
    }
    if (table.numberOfSeats <= 0) {
      this.toastr.error('Number of Seats must be greater than zero', 'Failed');
      return;
    }
    this.table.base64 = this.imageUl;
    this.http.post(`${baseUrl}Table/create`, table).subscribe((resonseData) => {
      this.route.navigate(['/tables']);
      this.toastr.success('Table Created', 'Operation Successful');
      console.log(table);
    });
  }
}
