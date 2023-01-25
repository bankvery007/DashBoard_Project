import { StudentRecordsInterface } from "./IStudentRecord";
import { TeacherReocrdsInterface } from "./ITeacherRecord";

export interface Physical_FitnessInterface {
  ID: number;

  Run50: number;

  Longjump: number;

  SitUp: number;

  GripStrength: number;

  Wieght: number;

  Height: number;



  StudentRecordID: number;
  StudentRecord: StudentRecordsInterface;

  TeacherRecordID: number;
  TeacherRecord: TeacherReocrdsInterface;
}
