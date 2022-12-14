package controller

import (
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Students

func CreateStudentRecord(c *gin.Context) {
	var student entity.Student
	var classroom entity.ClassRoom
	var grade	entity.Grade
	var studentrecord entity.StudentRecord

	if err := c.ShouldBindJSON(&studentrecord); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", studentrecord.StudentID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", studentrecord.GradeID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
		return
	}



	if tx := entity.DB().Where("id = ?", studentrecord.ClassRoomID).First(&classroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "classroom not found"})
		return
	}

	sr := entity.StudentRecord{
		Student:           	student,
		Grade: 				grade,
		ClassRoom:         	classroom,
		StudentRecordYear: 	studentrecord.StudentRecordYear,
	}
	if err := entity.DB().Create(&sr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sr})
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

// GET /studentrecord

func ListStudentRecords(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records ORDER BY student_record_year ASC").Find(&studentrecord).Error; err != nil {

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
