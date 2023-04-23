import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../app.state';
import { Student } from './student.model';
import { addStudent, deleteStudent, updateStudent } from './student.actions';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
//   students$: Observable<Student[]>;
  students$: Observable<Student[]> = of([]);
  studentForm!: FormGroup;
  editingStudent: any;

  constructor(
    private store: Store<AppState>, 
    private fb: FormBuilder
    ) {}

  /* constructor(
    private store: Store<{ students: number }>,
    private fb: FormBuilder
    ) {
    this.students$ = store.select('students');
  } */
 
  ngOnInit() {
    this.students$ = this.store.select((state) => state.students);
    this.initForm();
  }

  initForm() {
    this.studentForm = this.fb.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      grade: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.studentForm.value)
    if (this.studentForm.valid) {
      const student = this.studentForm.value as Student;
      if (this.editingStudent) {
        this.store.dispatch(updateStudent({ student }));
      } else {
        this.store.dispatch(addStudent({ student }));
      }
      this.editingStudent = null;
      this.studentForm.reset();
    }
  }

  editStudent(student: Student) {
    this.editingStudent = student;
    this.studentForm.setValue({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      grade: student.grade,
    });
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.store.dispatch(deleteStudent({ id }));
    }
  }

  clearForm(): void {
    this.studentForm.reset();
  }
}
