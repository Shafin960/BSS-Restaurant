import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MainComponent } from './layout/main/main.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { TablesComponent } from './pages/tables/tables.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AddFoodComponent } from './pages/add-food/add-food.component';
import { AddTableComponent } from './pages/add-table/add-table.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { CartComponent } from './components/cart/cart.component';
import { AssignEmployeeComponent } from './pages/tables/assign-employee/assign-employee.component';
import { AuthGuard } from './shared/auth-guard.guard';
import { goBackGuard } from './shared/go-back.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [goBackGuard] },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: AdminComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'foods', component: FoodsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'addemployee', component: AddEmployeeComponent },
      { path: 'addfood', component: AddFoodComponent },
      { path: 'addtable', component: AddTableComponent },
      { path: 'neworder', component: NewOrderComponent },
      { path: 'cart', component: CartComponent },
      { path: 'assign', component: AssignEmployeeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
