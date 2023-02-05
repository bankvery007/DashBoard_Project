package controller

import (
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /teachers

func Createphysical_fitness(c *gin.Context) {
	var studentrecord entity.StudentRecord
	var teacherrecord entity.TeacherRecord
	var physicalfiness entity.Physical_Fitness

	if err := c.ShouldBindJSON(&physicalfiness); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", physicalfiness.TeacherRecordID).First(&teacherrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", physicalfiness.StudentRecordID).First(&studentrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	pf := entity.Physical_Fitness{

		Wieght:        physicalfiness.Wieght,
		Height:        physicalfiness.Height,
		SitUp:         physicalfiness.SitUp,
		GripStrength:  physicalfiness.GripStrength,
		Run50:         physicalfiness.Run50,
		Longjump:      physicalfiness.Longjump,
		Datetime: 	   physicalfiness.Datetime,		
		TeacherRecord: teacherrecord,
		StudentRecord: studentrecord,
	}

	if err := entity.DB().Create(&pf).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pf})

}

// GET /teacher/:id

func Getphysical_fitness(c *gin.Context) {

	var physicalfiness entity.Physical_Fitness

	id := c.Param("id")

	if err := entity.DB().Preload("TeacherRecord").Preload("StudentRecord").Raw("SELECT * FROM physical_finesses WHERE id = ?", id).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

// GET /teachers

func Listphysical_fitnesses(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	if err := entity.DB().Preload("TeacherRecord").Preload("StudentRecord").Raw("SELECT * FROM physical_fitnesses").Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Listjumpofphysical_fitnesses(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	if err := entity.DB().Preload("TeacherRecord").Preload("StudentRecord").Raw("SELECT longjump FROM physical_fitnesses").Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Listphysical_fitnessesid(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	codeid := c.Param("codeid")

	if err := entity.DB().Preload("TeacherRecord").Preload("StudentRecord").Raw("SELECT * FROM physical_fitnesses WHERE student_record_id = ?", codeid).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

// DELETE /teachers/:id

func Deletephysical_fitness(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM physical_fitnesses WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "physical_finesses not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
