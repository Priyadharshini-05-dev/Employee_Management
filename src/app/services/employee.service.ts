import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  address: string;
  joiningDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://employeemanagementbackend-production-27ed.up.railway.app/employee';

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get<Employee[]>(`${this.apiUrl}/getAll`);
  }

  getEmployeeById(id: number) {
    return this.http.get<Employee>(`${this.apiUrl}/getById/${id}`);
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee) {
    return this.http.put<Employee>(`${this.apiUrl}/update/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}