import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { GetOrderedFoodDetails } from 'src/app/models/getOrderDetails';
import Swal from 'sweetalert2';

export class OrderStatus {
  text = 'Pending';
  value = 0;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  isLoading = false;
  orderStatus: OrderStatus[] = [
    {
      text: 'Pending',
      value: 0,
    },
    {
      text: 'Confirmed',
      value: 1,
    },
    {
      text: 'Preparing',
      value: 2,
    },
    {
      text: 'PreparedToServe',
      value: 3,
    },
    {
      text: 'Served',
      value: 4,
    },
    {
      text: 'Paid',
      value: 5,
    },
  ];
  showDropdown: boolean[] = [];
  selectedStatus: any[] = [];
  selectedStatusText: string[] = [];

  toggleDropdown(index: number) {
    this.showDropdown[index] = !this.showDropdown[index];
  }

  onStatusChange(index: number) {
    const selectedIndex = this.selectedStatus[index];
    this.selectedStatusText[index] =
      this.orderStatus.find(
        (status: OrderStatus) => status.value === selectedIndex
      )?.text || '';
    this.showDropdown[index] = false;
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.orders.forEach(() => {
      this.showDropdown.push(false);
      this.selectedStatus.push(null);
    });
    console.log(this.orders);
  }
  orders: GetOrderedFoodDetails[] = [];

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.isLoading = true;
    this.http.get<any[]>(`${baseUrl}Order/datatable`).subscribe((posts) => {
      console.log(posts);
      this.orders = posts;
      this.isLoading = false;
    });
  }

  ondeleteOrder(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Order from list. This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${baseUrl}Order/delete/${id}`).subscribe(
          () => {
            console.log('Order deleted successfully');
            this.getOrder();
            this.toastr.success('Order Deleted', 'Operation Successful');
            this.route.navigate(['/orders']);
          },
          (error) => {
            console.error('Order deleting food:', error);
          }
        );
      }
    });
  }
}
