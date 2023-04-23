import { createAction, props } from '@ngrx/store';
import { Student } from './student.model';

// Actions for CRUD operations
export const loadStudents = createAction('[Student] Load Students');
export const loadStudentsSuccess = createAction('[Student] Load Students Success', props<{ students: Student[] }>());
export const loadStudentsFailure = createAction('[Student] Load Students Failure', props<{ error: any }>());

export const addStudent = createAction('[Student] Add Student', props<{ student: Student }>());
export const addStudentSuccess = createAction('[Student] Add Student Success', props<{ student: Student }>());
export const addStudentFailure = createAction('[Student] Add Student Failure', props<{ error: any }>());

export const updateStudent = createAction('[Student] Update Student', props<{ student: Student }>());
export const updateStudentSuccess = createAction('[Student] Update Student Success', props<{ student: Student }>());
export const updateStudentFailure = createAction('[Student] Update Student Failure', props<{ error: any }>());

export const deleteStudent = createAction('[Student] Delete Student', props<{ id: number }>());
export const deleteStudentSuccess = createAction('[Student] Delete Student Success', props<{ id: number }>());
export const deleteStudentFailure = createAction('[Student] Delete Student Failure', props<{ error: any }>());
