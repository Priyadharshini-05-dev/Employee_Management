import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
employees:Employee[]=[];
  constructor(private employeeService:EmployeeService,
    private router:Router
  ) { }

  ngOnInit(): void {
   this.loadEmployees();
  }
  loadEmployees(){
     this.employeeService.getAllEmployees().subscribe((val)=>{
      this.employees=val;
    })
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
