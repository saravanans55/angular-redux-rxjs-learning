// student.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Student } from './student.model';
import * as StudentActions from './student.actions';

export interface StudentState {
  students: Student[];
  error: any;
}

export const initialState: StudentState = {
  students: [],
  error: null,
};

export const studentReducer = createReducer(
  initialState,
  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
  })),
  on(StudentActions.addStudentSuccess, (state, { student }) => ({
    ...state,
    students: [...state.students, student],
  })),
  on(StudentActions.updateStudentSuccess, (state, { student }) => {
    const updatedStudents = state.students.map((s) =>
      s.id === student.id ? student : s
    );
    return { ...state, students: updatedStudents };
  }),
  on(StudentActions.deleteStudentSuccess, (state, { id }) => ({
    ...state,
    students: state.students.filter((s) => s.id !== id),
  })),
  on(
    StudentActions.loadStudentsFailure,
    StudentActions.addStudentFailure,
    StudentActions.updateStudentFailure,
    StudentActions.deleteStudentFailure,
    (state, { error }) => ({ ...state, error })
  )
);
