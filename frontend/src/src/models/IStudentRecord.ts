import { ClassroomsInterface } from "./IClassRoom"
import { StudentsInterface } from "./IStudent"
import { TeachersInterface } from "./ITeacher"
import { GradesInterface } from "./IGrade"
import { Physical_FitnessInterface } from "./IPhysical_Fitness"

export interface StudentRecordsInterface {
    ID: number,
    StudentRecordYear: number,
    Status: false;
    TeacherID: number,
    Teacher: TeachersInterface,
    StudentID: number,
    Student: StudentsInterface,
    ClassRoomID: number,
    ClassRoom: ClassroomsInterface
    GradeID: number,
    Grade: GradesInterface
    Physical_Fitness : Physical_FitnessInterface

}
