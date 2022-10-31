package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"

	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("Project.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema
	database.AutoMigrate(&Admin{})
	database.AutoMigrate(&Teacher{})
	database.AutoMigrate(&Student{})
	database.AutoMigrate(&TeacherRecord{})
	database.AutoMigrate(&StudentRecord{})
	database.AutoMigrate(&ClassRoom{})

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	admin1 := Admin{
		Name: "Rinrada",
		CodeID: "G1234",
		Password:   string(password),
		
	}
	db.Model(&Admin{}).Create(&admin1)

	teacher1 := Teacher{
		Name:   "สุขมงคล บุญญฤทธิ์",
		Email:       "bunyarith@gmail.com",
		Address:     "249/19",
		Province:    "โคราช",
		ZipCode:     "3000",
		PhoneNumber: "063516",
		CodeID: "M1234",
		Password:   string(password),
		Age:         38,
		BirthDay:    time.Now(),
		Admin : admin1 ,
	}
	db.Model(&Teacher{}).Create(&teacher1)

	student1 := Student{
		Name:   "บุญญฤทธิ์ สุขมงคล",
		Email:       "bunyarith@gmail.com",
		Address:     "249/190",
		Province:    "โคราช",
		ZipCode:     "3000",
		PhoneNumber: "063516",
		CodeID: "B1234",
		Password:   string(password),
		Age:         38,
		BirthDay:    time.Now(),
	}
	db.Model(&Student{}).Create(&student1)


	Room1 := ClassRoom{
		Room: 1,
	}
	db.Model(&ClassRoom{}).Create(&Room1)

	Room2 := ClassRoom{
		Room: 2,
	}
	db.Model(&ClassRoom{}).Create(&Room2)

	Room3 := ClassRoom{
		Room: 3,
	}
	db.Model(&ClassRoom{}).Create(&Room3)



	grade1 := Grade{
		Grade: 1,
	}

	db.Model(&Grade{}).Create(&grade1)

	grade2 := Grade{
		Grade: 2,
	}

	db.Model(&Grade{}).Create(&grade2)

	grade3 := Grade{
		Grade: 3,
	}

	db.Model(&Grade{}).Create(&grade3)

	grade4 := Grade{
		Grade: 4,
	}

	db.Model(&Grade{}).Create(&grade4)

	StudentRecord1 := StudentRecord{
		Student:           student1,
		Grade:				grade1,
		ClassRoom:         	Room2,
		StudentRecordYear: 	2565,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord1)

	TeacherRecord1 := TeacherRecord{
		Teacher:           	teacher1,
		Grade:				grade1,
		ClassRoom:         	Room2,
		TeacherRecordYear: 	2565,
	}
	db.Model(&TeacherRecord{}).Create(&TeacherRecord1)


	db.Model(&Physical_Fitness{}).Create(&Physical_Fitness{
		TeacherRecord:           	TeacherRecord1,
		StudentRecord: 				StudentRecord1,
		run_50: 4.25,
		long_jump: 10,
	
	})
}
