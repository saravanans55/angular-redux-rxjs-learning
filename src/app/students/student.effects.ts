import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StudentService } from './student.service';
import * as StudentActions from './student.actions';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      mergeMap(() =>
        this.studentService.getStudents().pipe(
          map((students) => StudentActions.loadStudentsSuccess({ students })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      mergeMap(({ student }) =>
        this.studentService.addStudent(student).pipe(
          map((addedStudent) =>
            StudentActions.addStudentSuccess({ student: addedStudent })
          ),
          catchError((error) => of(StudentActions.addStudentFailure({ error })))
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      mergeMap(({ student }) =>
        this.studentService.updateStudent(student).pipe(
          map((updatedStudent) =>
            StudentActions.updateStudentSuccess({ student: updatedStudent })
          ),
          catchError((error) =>
            of(StudentActions.updateStudentFailure({ error }))
          )
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      mergeMap(({ id }) =>
        this.studentService.deleteStudent(id).pipe(
          map(() => StudentActions.deleteStudentSuccess({ id })),
          catchError((error) =>
            of(StudentActions.deleteStudentFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private studentService: StudentService
  ) {}
}
