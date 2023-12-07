import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutService } from './services/aut.service';
import { AdminComponent } from './pages/admin/admin.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { TablesComponent } from './pages/tables/tables.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './layout/main/main.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AddFoodComponent } from './pages/add-food/add-food.component';
import { AddTableComponent } from './pages/add-table/add-table.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { AssignEmployeeComponent } from './pages/tables/assign-employee/assign-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EmployeesComponent,
    TablesComponent,
    FoodsComponent,
    OrdersComponent,
    NewOrderComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    AddEmployeeComponent,
    AddFoodComponent,
    AddTableComponent,
    LoadingSpinnerComponent,
    CartComponent,
    AssignEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AutService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
