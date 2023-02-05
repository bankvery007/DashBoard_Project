package controller

import (
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Students

func CreateStudentRecord(c *gin.Context) {

	var payload struct {
		GradeID           uint
		ClassRoomID       uint
		StudentRecordYear uint
	}

	if err := c.ShouldBindJSON(&payload); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// var student []string
	var studentrecords []entity.StudentRecord

	if err := entity.DB().Model(&entity.StudentRecord{}).Where("student_record_year = ? AND grade_id = ? AND class_room_id = ?", payload.StudentRecordYear, payload.GradeID, payload.ClassRoomID).
		Preload("Student").Find(&studentrecords).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// c.JSON(http.StatusOK, gin.H{"data": studentrecords})

	var resultStudentRecord []entity.StudentRecord

	for _, studentrecord := range studentrecords {
		var grade entity.Grade
		if tx := entity.DB().Where("id = ?", payload.GradeID).First(&grade); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
			return
		}
		grade.Grade++
		var newgrade entity.Grade
		if tx := entity.DB().Where("grade = ?", grade.Grade).First(&newgrade); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
			return
		}
		studentrecord.StudentRecordYear++
		newstudentRecord := entity.StudentRecord{
			Student:           studentrecord.Student,
			Grade:             newgrade,
			ClassRoomID:       studentrecord.ClassRoomID,
			StudentRecordYear: studentrecord.StudentRecordYear,
		}
		if err := entity.DB().Create(&newstudentRecord).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		resultStudentRecord = append(resultStudentRecord, newstudentRecord)
	}
	c.JSON(http.StatusOK, gin.H{"data": resultStudentRecord})

}

// GET /studentrecord/:id

func GetStudentRecord(c *gin.Context) {

	var studentrecord entity.StudentRecord

	id := c.Param("id")

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records WHERE id = ? ", id).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

func GetStudentRecordfromyearandclassroom(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	year := c.Param("year")

	gradeid := c.Param("grade")

	classroomid := c.Param("classroom")

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records WHERE student_record_year = ? AND grade_id = ? AND class_room_id = ?", year, gradeid, classroomid).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

func GetStudentRecordbyID(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	studentid := c.Param("studentid")

	if err := entity.DB().Preload("Student").Preload("Physical_Fitness").Raw("SELECT * FROM student_records join physical_fitnesses on student_records.id = physical_fitnesses.student_record_id where student_id =?", studentid).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

func GetStudentRecordwithPhysical(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	year := c.Param("year")

	gradeid := c.Param("grade")

	classroomid := c.Param("classroom")

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Preload("Physical_Fitness").Raw("SELECT * FROM student_records WHERE student_record_year = ? AND grade_id = ? AND class_room_id = ?", year, gradeid, classroomid).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

// GET /studentrecord

func ListStudentRecords(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records ORDER BY student_record_year, class_room_id ASC").Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

// DELETE /studentrecord/:id

func DeleteStudentRecord(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM student_records WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "student_records not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /studentrecord

func UpdateStudentRecord(c *gin.Context) {

	var studentrecord entity.StudentRecord

	if err := c.ShouldBindJSON(&studentrecord); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", studentrecord.ID).First(&studentrecord); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "studentrecord not found"})

		return

	}

	if err := entity.DB().Save(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}
