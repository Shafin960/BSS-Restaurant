import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetFood } from 'src/app/models/getFood';
import { baseUrl } from 'src/app/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  foods: GetFood[] = [];
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
    this.http.get<any[]>(`${baseUrl}Food/datatable`).subscribe((posts) => {
      console.log(posts);
      this.foods = posts;
    });
  }
  onDeleteFood(id: number) {
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
}
