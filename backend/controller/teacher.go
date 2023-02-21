package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /teachers

func CreateTeacher(c *gin.Context) {

	var teacher entity.Teacher

	if err := c.ShouldBindJSON(&teacher); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&teacher).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teacher})

}

// GET /teacher/:id

func GetTeacher(c *gin.Context) {

	var teacher entity.Teacher

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM teachers WHERE id = ?", id).Scan(&teacher).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teacher})

}

// GET /teachers

func ListTeachers(c *gin.Context) {

	var teachers []entity.Teacher

	if err := entity.DB().Raw("SELECT * FROM teachers").Scan(&teachers).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teachers})

}

// DELETE /teachers/:id

func DeleteTeacher(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM teachers WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /teachers

func UpdateTeacher(c *gin.Context) {
	var teacher entity.Teacher
	var newteacher entity.Teacher
	id := c.Param("id")
	if err := c.ShouldBindJSON(&teacher); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", id).Find(&newteacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New data teacher not found"})
		return
	}

	newteacher.Picture = teacher.Picture
	newteacher.First_Name = teacher.First_Name
	newteacher.Last_Name = teacher.Last_Name
	newteacher.Full_Name = teacher.First_Name + " " + teacher.Last_Name
	newteacher.Email = teacher.Email
	newteacher.Address = teacher.Address
	newteacher.Province = teacher.Province
	newteacher.ZipCode = teacher.ZipCode
	newteacher.PhoneNumber = teacher.PhoneNumber
	newteacher.BirthDay = teacher.BirthDay
	newteacher.BirthMonth = teacher.BirthMonth
	newteacher.BirthYear = teacher.BirthYear

	updates := entity.Student{
		Picture:     newteacher.Picture,
		First_Name:  newteacher.First_Name,
		Last_Name:   newteacher.Last_Name,
		Full_Name:   newteacher.First_Name + " " + newteacher.Last_Name,
		PhoneNumber: newteacher.PhoneNumber,
		Email:       newteacher.Email,
		Address:     newteacher.Address,
		Province:    newteacher.Province,
		ZipCode:     newteacher.ZipCode,
		BirthDay:    newteacher.BirthDay,
		BirthMonth:  newteacher.BirthMonth,
		BirthYear:   newteacher.BirthYear,
	}

	if _, err := govalidator.ValidateStruct(updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&newteacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newteacher})
}
