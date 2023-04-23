import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MyCounterComponent } from './my-counter.component';
import { StudentComponent } from './students/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    StudentComponent,
    StaffComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  providers: [
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
