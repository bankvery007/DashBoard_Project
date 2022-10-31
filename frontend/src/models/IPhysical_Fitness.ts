import { StudentRecordsInterface } from "./IStudentRecord"
import { TeacherReocrdsInterface } from "./ITeacherRecord"

export interface Physical_FitnessInterface {
    ID: number,

    run_50: Float32Array

    long_jump: Float32Array

    StudentRecordID: number
    StudentRecord: StudentRecordsInterface

    TeacherRecordID: number
    TeacherRecord: TeacherReocrdsInterface


}
