import { Student } from "./students/student.model";
import { Staff } from "./staff.model";

export interface AppState {
  students: Student[];
  staffs: Staff[];
}
