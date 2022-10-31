package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model

	Name		string
	CodeID 	string
	Password	string

	Teachers []Teacher `gorm:"foreignKey:AdminID"`
	Students []Student `gorm:"foreignKey:AdminID"`
}

type Teacher struct {
	gorm.Model

	Name string

	Email string

	Address string

	Province string

	ZipCode string

	PhoneNumber string

	CodeID string `gorm:"uniqueIndex"`

	Password	string

	Age uint8

	BirthDay time.Time

	AdminID *uint
	Admin   Admin

	//1 teacher to many teacherrecord
	TeacherRecords []TeacherRecord `gorm:"foreignKey:TeacherID"`
}

type Student struct {
	gorm.Model

	Name string

	Email string

	Address string

	Province string

	ZipCode string

	PhoneNumber string

	CodeID string `gorm:"uniqueIndex"`

	Password	string

	Age uint8

	BirthDay time.Time

	AdminID *uint
	Admin   Admin

	//1 student to many studentrecord
	StudentRecords []StudentRecord `gorm:"foreignKey:StudentID"`
}



type ClassRoom struct {
	gorm.Model
	Room uint8
	//1 ClassRoom to many teacherrecord
	TeacherRecords []TeacherRecord `gorm:"foreignKey:ClassRoomID"`

	StudentRecords []StudentRecord `gorm:"foreignKey:ClassRoomID"`
}

type Grade struct {
	gorm.Model
	Grade uint8

	//1 ClassRoom to many teacherrecord
	TeacherRecords []TeacherRecord `gorm:"foreignKey:GradeID"`

	StudentRecords []StudentRecord `gorm:"foreignKey:GradeID"`
}


type TeacherRecord struct {
	gorm.Model

	TeacherRecordYear	uint

	TeacherID *uint
	Teacher   Teacher


	GradeID *uint
	Grade   Grade

	ClassRoomID *uint
	ClassRoom   ClassRoom

	Physical_Fitnesses []Physical_Fitness	`gorm:"foreignKey:TeacherRecordID"`
	StudentRecords []StudentRecord `gorm:"foreignKey:TeacherRecordID"`
}

type StudentRecord struct {
	gorm.Model

	StudentRecordYear	uint

	StudentID *uint
	Student   Student

	GradeID *uint
	Grade   Grade

	ClassRoomID *uint
	ClassRoom   ClassRoom

	TeacherRecordID *uint
	TeacherRecord	TeacherRecord

	Physical_Fitness *Physical_Fitness `gorm: "foreignKey:StudentRecordID"`
}


type Physical_Fitness struct {
	gorm.Model

	run_50	float32

	long_jump float32

	StudentRecordID *uint   `gorm:"uniqueIndex"`
	StudentRecord	StudentRecord

	TeacherRecordID *uint
	TeacherRecord	TeacherRecord

	

}

