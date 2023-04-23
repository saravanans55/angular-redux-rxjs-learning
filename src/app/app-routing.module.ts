import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './students/student.component';
import { AppComponent } from './app.component';
import { MyCounterComponent } from './my-counter.component';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  { 
    path: "", 
    redirectTo: 'student', 
    pathMatch: 'full' 
  },
  {
    "path" : "",
    "component" : MyCounterComponent
  },
  {
    "path" : "student",
    "component" : StudentComponent
  },
  {
    "path" : "staff",
    "component" : StaffComponent
  },
  { 
    "path": "**", 
    "redirectTo": ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
