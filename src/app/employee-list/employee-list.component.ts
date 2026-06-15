import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../services/employee.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
employees:Employee[]=[];
loading:boolean=false;

search:string="";
  constructor(private employeeService:EmployeeService,
    private router:Router,
    private snackBar:MatSnackBar
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

 searchEmployee(){
  if(this.search.trim()==""){
    this.loadEmployees();
    return;
  }
  this.employeeService.searchEmployee(this.search).subscribe({
    next:(data)=>{
      console.log(data)
      this.employees=data;
    },
    error:(err)=>{
      console.log(err);
    }
  })
 }
  deleteEmployee(id:number){

    const isConfirmed=confirm('Are you sure you want to delete this employee?');
    if(isConfirmed){
  this.employeeService.deleteEmployee(id).subscribe(()=>{
  this.snackBar.open(
   'Employee Deleted Successfully',
   'Close', {
    duration:3000
   }
  );
    
this.loadEmployees();
    });
    }
  
  }
  Edit(id:number){
    this.router.navigate(['add-employee',id]);
  }
  view(id:number){
    this.router.navigate(['employee-view',id]);
  }
}
