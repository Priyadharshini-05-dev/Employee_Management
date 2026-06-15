import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
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

  employeeId!: number;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar:MatSnackBar
  ) {}
  employeeForm!: FormGroup;
  ngOnInit(): void {
    
    this.employeeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),

      email: new FormControl('', [Validators.required, Validators.email]),

      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),

      department: new FormControl('', [Validators.required]),

      designation: new FormControl('', [Validators.required]),

      salary: new FormControl('', [Validators.required, Validators.min(1000)]),

      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),

      joiningDate: new FormControl('', [Validators.required]),
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeId = +id;
      this.employeeService
        .getEmployeeById(this.employeeId)
        .subscribe((data) => {
          this.employeeForm.patchValue(data);
        });
    }
  }
  onSubmit() {
    if (this.employeeId) {
      this.employeeService
        .updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe(() => {
          this.snackBar.open(
            'Employee Updated Successfully',
            'Close',{
              duration:3000
            }
          );
             this.snackBar.open(
      'Employee Added Successfully',
      'Close',
      {
        duration: 3000
      }
    );
    
        });
        setTimeout(()=>{
          this.router.navigate(['/employee']);

          },3000)
        
    } else {
      this.employeeService
        .addEmployee(this.employeeForm.value)
        .subscribe((res) => {
          console.log(res);
             this.snackBar.open(
      'Employee Added Successfully',
      'Close',
      {
        duration: 3000
      }
    );
          this.employeeForm.reset();

          setTimeout(()=>{
          this.router.navigate(['/employee']);

          },3000)
        });
    }
  }
}
