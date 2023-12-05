import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/app/environments/environment';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employee = new Employee();
  imageUl: string | ArrayBuffer | null = '../../../assets/blank-profile.png';
  genderId = '';
  genderIdValue = 1;

  onGenderChange() {
    if (this.genderId.toLowerCase() == 'male') {
      this.genderIdValue = 1;
    } else if (this.genderId.toLowerCase() == 'female') {
      this.genderIdValue = 2;
    } else {
      this.genderIdValue = 3;
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

  onAddEmployee(employee: Employee) {
    if (employee.firstName == '') {
      this.toastr.error('Please Provide a First Name', 'Failed');
      return;
    }
    if (employee.lastName == '') {
      this.toastr.error('Please Provide a Last Name', 'Failed');
      return;
    }
    if (employee.designantion == '') {
      this.toastr.error('Please Provide your Designation', 'Failed');
      return;
    }
    if (employee.email == '') {
      this.toastr.error('Please Provide a Valid Email', 'Failed');
      return;
    }
    if (employee.phoneNumber == '') {
      this.toastr.error('Please Provide a Valid PhoneNumber', 'Failed');
      return;
    }
    if (!employee.dob) {
      this.toastr.error('Please Provide Your Date Of Birth', 'Failed');
      return;
    }
    if (!employee.joinDate) {
      this.toastr.error('Please Provide Your Joining Date', 'Failed');
      return;
    }
    employee.genderId = this.genderIdValue;
    employee.base64 = this.imageUl;
    this.http.post(`${baseUrl}Employee/create`, employee).subscribe(() => {
      console.log(employee);
      this.toastr.success('EmployeeCreated', 'Operation Successful!');
      this.route.navigate(['/employees']);
    });
  }
}
