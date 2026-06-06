import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Routes = [
  {path:"",component:DashboardComponent},
  {path:"employee",component:EmployeeListComponent},
  {path:"add-employee",component:AddEmployeeComponent},
  {path:"add-employee/:id",component:AddEmployeeComponent},
  {path:"employee-view/:id",component:EmployeeViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
