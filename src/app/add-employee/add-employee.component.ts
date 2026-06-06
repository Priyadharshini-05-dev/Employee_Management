import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  //   id?: number;
  // name: string;
  // email: string;
  // phone: string;
  // department: string;
  // designation: string;
  // salary: number;
  // address: string;
  // joiningDate: string;

  employeeId!:number;
  constructor(private employeeService:EmployeeService,
    private route:ActivatedRoute
  ) { }
  employeeForm!:FormGroup;
  ngOnInit(): void {
    this.employeeForm=new FormGroup({
      name:new FormControl(""),
      email:new FormControl(""),
      phone:new FormControl(""),
      department:new FormControl(""),
      designation:new FormControl(""),
      salary:new FormControl(""),
      address:new FormControl(""),
      joiningDate:new FormControl("")

    })

    const id=this.route.snapshot.paramMap.get('id');
 
    if(id){
      this.employeeId=+id;
      this.employeeService.getEmployeeById(this.employeeId).subscribe(data=>{
        this.employeeForm.patchValue(data);
      })
    }
  }
onSubmit(){

  if(this.employeeId){
    this.employeeService.updateEmployee(this.employeeId,this.employeeForm.value).subscribe(()=>{
      alert("Update Successfully")
    })
  }else{
     this.employeeService.addEmployee(this.employeeForm.value).subscribe((res)=>{
    console.log(res);
    this.employeeForm.reset()
  })
  }
 
}
}
