import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent {
  food = new Food();
  imageUl: string | ArrayBuffer | null = '../../../assets/newfood.png';

  price = 0;
  discountType = '';
  discountTypevalue = 1;
  discountIn = '';
  discountedPrice = 0;
  discountInvalue = 0;
  selectedyet = true;

  onDiscountTypeChange() {
    if (this.discountType.toLowerCase() == 'none') {
      this.discountTypevalue = 1;
      this.discountIn = '';
      this.selectedyet = true;
    } else if (this.discountType.toLowerCase() == 'flat') {
      this.discountTypevalue = 2;
      this.discountIn = 'bdt';
      this.selectedyet = false;
    } else if (this.discountType.toLowerCase() == 'percentage') {
      this.discountTypevalue = 3;
      this.discountIn = '%';
      this.selectedyet = false;
    }
    console.log('Selected discount type:', this.discountTypevalue);
  }
  onDiscountCaclulate() {
    if (this.discountTypevalue == 2) {
      this.discountedPrice = this.price - this.discountInvalue;
    } else if (this.discountTypevalue == 3) {
      this.discountedPrice =
        this.price - this.price * (this.discountInvalue / 100);
    }
  }

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
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: Router
  ) {}

  onAddFood(food: Food) {
    if (food.name == '') {
      this.toastr.error('Food Name Required', 'Failed');
      return;
    }

    if (food.description == '') {
      this.toastr.error('Food Description Required', 'Failed');
      return;
    }

    if (food.price <= 0) {
      this.toastr.error('Price must be greater than Zero', 'Failed');
      return;
    }
    food.discount = this.discountInvalue;
    food.price = this.price;
    food.discountType = this.discountTypevalue;
    if (this.discountType == 'none') {
      food.discountPrice = this.price;
    } else {
      food.discountPrice = this.discountedPrice;
    }

    food.base64 = this.imageUl;

    this.http.post(`${baseUrl}Food/create`, food).subscribe((resonseData) => {
      console.log(food);
      this.toastr.success('Food Created', 'Operation Successful!');
      this.route.navigate(['/foods']);
    });
  }
}
