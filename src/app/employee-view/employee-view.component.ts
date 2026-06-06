import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../services/employee.service';
@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
employee!:Employee;
  constructor(private route:ActivatedRoute,
    private employeeService:EmployeeService
  ) { }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id')
    if(id){
      this.employeeService.getEmployeeById(+id).subscribe(data=>{
        this.employee=data;
      })
    }
  }

}
