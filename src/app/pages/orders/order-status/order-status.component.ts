import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import Swal from 'sweetalert2';

export class OrderStatus {
  text = 'Pending';
  value = 0;
}
enum OrderStatusE {
  Pending = 1,
  Confirmed = 2,
  Preparing = 3,
  PreparedToServe = 4,
  Served = 5,
  Paid = 6,
}
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
})
export class OrderStatusComponent implements OnInit {
  ngOnInit(): void {
    this.statusO = OrderStatusE[this.orderStatustext];
  }
  statusO = '';
  @Input() orderId = '';
  @Input() orderStatustext = 1;
  isLoading = false;
  @Output() reloadOrders = new EventEmitter<void>();
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
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

  showDropdown = false;
  selectedStatus = 0;
  selectedStatusText = '';

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onStatusChange(selectedValue: number) {
    const selectedStatusObj = this.orderStatus.find(
      (status) => status.value === this.selectedStatus
    );

    if (selectedStatusObj) {
      this.selectedStatusText = selectedStatusObj.text;
    }
    this.showDropdown = !this.showDropdown;
    selectedValue++;
    this.http
      .put<any>(`${baseUrl}Order/update-status/${this.orderId}`, {
        orderStatusValue: selectedValue,
      })
      .subscribe(
        (response) => {
          console.log('Order status updated successfully:', response);
          this.reloadOrders.emit();
          Swal.fire({
            title: 'Succesful!',
            text: 'Order Status Updated',
            icon: 'success',
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      );
  }
}
