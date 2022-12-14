package main

import (
	"github.com/bankvery007/dashboard/controller"

	"github.com/bankvery007/dashboard/entity"
	
	"github.com/bankvery007/dashboard/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
	// Teacher Routes

	protected.GET("/teachers", controller.ListTeachers)

	protected.GET("/teacher/:id", controller.GetTeacher)

	protected.POST("/teachers", controller.CreateTeacher)

	protected.PATCH("/teachers", controller.UpdateTeacher)

	protected.DELETE("/teachers/:id", controller.DeleteTeacher)

	// Student Routes

	protected.GET("/students", controller.ListStudents)

	protected.GET("/student/:id", controller.GetStudent)

	protected.POST("/students", controller.CreateStudent)

	protected.PATCH("/students", controller.UpdateStudent)

	protected.DELETE("/students/:id", controller.DeleteStudent)

	//ClassRoom Routes
	protected.GET("/classrooms", controller.ListClassRooms)

	protected.GET("/classroom/:id", controller.GetClassRoom)

	protected.POST("/classrooms", controller.CreateClassRoom)

	protected.PATCH("/classrooms", controller.UpdateClassRoom)

	protected.DELETE("/classrooms/:id", controller.DeleteClassRoom)

	//Grade Routes
	protected.GET("/grades", controller.ListGrades)

	protected.GET("/grades/:id", controller.GetGradenodis)

	protected.GET("/grade/:id", controller.GetGrade)

	protected.POST("/grades", controller.CreateGrade)

	protected.PATCH("/grades", controller.UpdateGrade)

	protected.DELETE("/grades/:id", controller.DeleteGrade)

	// TeacherRecord Routes

	protected.GET("/teacherrecords", controller.ListTeacherRecords)

	protected.GET("/teacherrecord/:id", controller.GetTeacherRecord)

	protected.POST("/teacherrecords", controller.CreateTeacherRecord)

	protected.PATCH("/teacherrecords", controller.UpdateTeacherRecord)

	protected.DELETE("/teacherrecords/:id", controller.DeleteTeacherRecord)

	//StudentRecord

	
	protected.GET("/studentrecords", controller.ListStudentRecords)

	protected.GET("/studentrecord/:id", controller.GetStudentRecord)

	protected.POST("/studentrecords", controller.CreateStudentRecord)

	protected.PATCH("/studentrecords", controller.UpdateStudentRecord)

	protected.DELETE("/studentrecords/:id", controller.DeleteStudentRecord)

	
		}
	}
	
	r.POST("/login_admin", controller.LoginByAdmin)
	r.POST("/login_teacher", controller.LoginByTeacher)

	// Run the server

	r.Run()

}


func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
