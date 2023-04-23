import { Component, OnInit, ViewChild } from '@angular/core';
import { from, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Staff } from './staff.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
        <h1>RxJS Example CRUD Operation</h1>
        <h2>Staff</h2>
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let staff of staffsList">
            <td>{{ staff.name }}</td>
            <td>{{ staff.email }}</td>
            <td>{{ staff.phone }}</td>
            <td><button (click)="deleteStaff(staff.id)">Delete</button></td>
            </tr>
        </tbody>
        </table>

        <form #createStaffForm="ngForm" (ngSubmit)="createStaff()">
        <input type="text" [(ngModel)]="name" name="name" placeholder="Name">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email">
        <input type="text" [(ngModel)]="phone" name="phone" placeholder="Phone">
        <button type="submit">Create</button>
        </form>`
})
export class StaffComponent implements OnInit {
  staffsList:any  = [];
  name:any;
  email:any;
  phone:any;
  @ViewChild('createStaffForm', {static: false}) createStaffForm!: NgForm;

  constructor() { }

  ngOnInit() {
    this.getStaff();
  }

  getStaff() {
    // Get the staff from local storage
    let staffsList:any = localStorage.getItem('staffsList');
    if(staffsList){
        staffsList = JSON.parse(staffsList);
    }else{
        staffsList = [];
    }

    console.log(staffsList)

    // Subscribe to the observable and update the staff array when it changes
    of(staffsList).pipe(
      tap(() => this.staffsList = staffsList),
      map(staff => this.staffsList)
    ).subscribe();
  }

  createStaff() {
    // Create a new staff object
    const staff = {
        id: this.staffsList.length+1,
        name : this.name,
        email : this.email,
        phone: this.phone
    };

    // Add the staff object to the array
    this.staffsList.push(staff);

    // Save the staff array to local storage
    localStorage.setItem('staffsList', JSON.stringify(this.staffsList));
    this.resetForm();
  }

  updateStaff(id:any, name:any, email:any, phone:any) {
    // Find the staff object with the given id
    const staff = this.staffsList.find((s:Staff) => s.id === id);

    // Update the staff object's properties
    staff.name = name;
    staff.email = email;
    staff.phone = phone;

    // Save the staff array to local storage
    localStorage.setItem('staffsList', JSON.stringify(this.staffsList));
  }

  deleteStaff(id:any) {
    // Find the staff object with the given id
    // const staff = this.staffsList.find(s => s.id === id);
    const staff = this.staffsList.find((s: Staff) => s.id === id);

    // Remove the staff object from the array
    this.staffsList.splice(this.staffsList.indexOf(staff), 1);

    // Save the staff array to local storage
    localStorage.setItem('staffsList', JSON.stringify(this.staffsList));
  }

  resetForm() {
    this.createStaffForm.reset();
  }
}
