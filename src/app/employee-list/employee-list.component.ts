import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../services/employee.service';
import { Router } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
employees:Employee[]=[];
loading:boolean=false;
  constructor(private employeeService:EmployeeService,
    private router:Router
  ) { }

  ngOnInit(): void {
   this.loadEmployees();
  }
 loadEmployees(){
  this.loading=true;
  this.employeeService.getAllEmployees().subscribe({
  next: (val) => {
    this.employees = val;
    this.loading = false;
  },
  error: (err) => {
    console.log(err);
    this.loading = false;
  }
});
 }
  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe(()=>{
this.loadEmployees();
    });
  }
  Edit(id:number){
    this.router.navigate(['add-employee',id]);
  }
  view(id:number){
    this.router.navigate(['employee-view',id]);
  }
}
