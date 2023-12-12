import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetFood } from 'src/app/models/getFood';
import { baseUrl } from 'src/app/environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  foods: GetFood[] = [];
  isLoading = false;
  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFood();
  }

  onAddFood() {
    this.route.navigate(['/addfood']);
  }

  getFood() {
    this.isLoading = true;
    this.http.get<any[]>(`${baseUrl}Food/datatable`).subscribe((posts) => {
      console.log(posts);
      this.foods = posts;
      this.isLoading = false;
    });
  }
  onDeleteFood(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this food item from list. This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${baseUrl}Food/delete/${id}`).subscribe(
          () => {
            console.log('Food deleted successfully');
            this.getFood();
            this.toastr.success('Food Deleted', 'Delete');
            this.route.navigate(['/foods']);
          },
          (error) => {
            console.error('Error deleting food:', error);
          }
        );
      }
    });
  }
}
