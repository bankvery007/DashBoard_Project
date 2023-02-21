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
	database.AutoMigrate(&Physical_Fitness{})
	database.AutoMigrate(&Article{})
	database.AutoMigrate(&StatusFamily{})
	database.AutoMigrate(&Physical_Fitness_Backup{})
	database.AutoMigrate(&Grade{})
	database.AutoMigrate(&BirthMonth{})

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	admin1 := Admin{
		Name:     "Rinrada",
		CodeID:   "A1234",
		Password: string(password),
	}
	db.Model(&Admin{}).Create(&admin1)

	teacher1 := Teacher{
		First_Name:  "บุญญฤทธิ์ ",
		Last_Name:   "สบายดี",
		Email:       "bunyarith@gmail.com",
		Address:     "249/19",
		Province:    "โคราช",
		ZipCode:     "3000",
		PhoneNumber: "063516",
		CodeID:      "T1111",
		Password:    string(password),
		BirthYear:   2553,
		Admin:       admin1,
	}
	db.Model(&Teacher{}).Create(&teacher1)

	teacher2 := Teacher{
		First_Name:  "อาจารย์ตั้ม ",
		Last_Name:   "คับผม",
		Email:       "bunyarith@gmail.com",
		Address:     "249/19",
		Province:    "โคราช",
		ZipCode:     "3000",
		PhoneNumber: "063516",
		CodeID:      "T2222",
		Password:    string(password),
		BirthYear:   2553,
		Admin:       admin1,
	}
	db.Model(&Teacher{}).Create(&teacher2)

	month1 := BirthMonth{
		Name: "มกราคม",
	}
	db.Model(&BirthMonth{}).Create(&month1)

	month2 := BirthMonth{
		Name: "กุมภาพันธ์",
	}
	db.Model(&BirthMonth{}).Create(&month2)

	month3 := BirthMonth{
		Name: "มีนาคม",
	}
	db.Model(&BirthMonth{}).Create(&month3)

	month4 := BirthMonth{
		Name: "เมษายน",
	}
	db.Model(&BirthMonth{}).Create(&month4)

	month5 := BirthMonth{
		Name: "พฤษภาคม",
	}
	db.Model(&BirthMonth{}).Create(&month5)

	month6 := BirthMonth{
		Name: "กรกฎาคม",
	}
	db.Model(&BirthMonth{}).Create(&month6)

	month7 := BirthMonth{
		Name: "มิถุนายน",
	}
	db.Model(&BirthMonth{}).Create(&month7)

	month8 := BirthMonth{
		Name: "สิงหาคม",
	}
	db.Model(&BirthMonth{}).Create(&month8)

	month9 := BirthMonth{
		Name: "กันยายน",
	}
	db.Model(&BirthMonth{}).Create(&month9)

	month10 := BirthMonth{
		Name: "ตุลาคม",
	}
	db.Model(&BirthMonth{}).Create(&month10)

	month11 := BirthMonth{
		Name: "พฤศจิกายน",
	}
	db.Model(&BirthMonth{}).Create(&month11)

	month12 := BirthMonth{
		Name: "ธันวาคม",
	}
	db.Model(&BirthMonth{}).Create(&month12)

	//StatusFamily
	status1 := StatusFamily{
		Name: "อยู่ด้วยกัน",
	}
	db.Model(&StatusFamily{}).Create(&status1)

	status2 := StatusFamily{
		Name: "แยกกันอยู่",
	}
	db.Model(&StatusFamily{}).Create(&status2)

	status3 := StatusFamily{
		Name: "พ่อม่าย",
	}
	db.Model(&StatusFamily{}).Create(&status3)

	status4 := StatusFamily{
		Name: "แม่ม่าย",
	}
	db.Model(&StatusFamily{}).Create(&status4)

	article1 := Article{
		Name: "ด.ช.",
	}
	db.Model(&Article{}).Create(&article1)

	article2 := Article{
		Name: "ด.ญ.",
	}
	db.Model(&Article{}).Create(&article2)

	student1 := Student{
		Article:        article1,
		First_Name:     "บุญญฤทธิ์",
		Last_Name:      "สุขมงคล",
		Full_Name:      "บุญญฤทธิ์ สุขมงคล",
		ID_Card:        "1309902829428",
		Email:          "bunyarith@gmail.com",
		Address:        "249/190",
		Province:       "โคราช",
		ZipCode:        "3000",
		PhoneNumber:    "063516",
		CodeID:         "B1234",
		BirthYear:      2553,
		Father_Name:    "ประหยัด สุขมงคล",
		Father_Career:  "-",
		Father_Phone:   "0123456789",
		Father_income:  0,
		Mother_Name:    "เอ็กเฮียง",
		Mother_Career:  "ค้าขาย",
		Mother_Phone:   "063516859",
		Mother_income:  10000,
		Parent_Name:    "เอ็กเฮียง",
		Parent_Career:  "ค้าขาย",
		Parent_Phone:   "063516859",
		Parent_About:   "แม่",
		Family_income:  10000,
		StatusFamily:   status1,
		Number_brother: 3,
		Status:         1,
	}
	db.Model(&Student{}).Create(&student1)

	student2 := Student{
		First_Name:  "รินรดา",
		Last_Name:   "วัฒน",
		Full_Name:   "รินรดา วัฒน",
		Email:       "bunyarith@gmail.com",
		Address:     "249/190",
		Province:    "โคราช",
		ZipCode:     "3000",
		PhoneNumber: "063516",
		CodeID:      "B6212",
		BirthYear:   2553,
		Status:      1,
	}
	db.Model(&Student{}).Create(&student2)

	student3 := Student{
		First_Name:  "พัทรชาติ",
		Last_Name:   "ซอยจุก",
		Email:       "bunyarith@gmail.com",
		Address:     "249/190",
		Province:    "โคราช",
		ZipCode:     "3000",
		PhoneNumber: "063516",
		CodeID:      "B6222",
		BirthYear:   2553,
		Status:      1,
	}
	db.Model(&Student{}).Create(&student3)

	student4 := Student{
		First_Name:  "Test0",
		Last_Name:   "ซอยจุก",
		Email:       "bunyarith@gmail.com",
		Address:     "249/190",
		Province:    "โคราช",
		ZipCode:     "3000",
		PhoneNumber: "063516",
		CodeID:      "B6111",
		BirthYear:   2553,
		Status:      0,
	}
	db.Model(&Student{}).Create(&student4)

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

	StudentRecord1_1_2 := StudentRecord{
		Student:           student1,
		Grade:             grade1,
		ClassRoom:         Room2,
		StudentRecordYear: 2565,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord1_1_2)

	StudentRecord1_2_2 := StudentRecord{
		Student:           student1,
		Grade:             grade2,
		ClassRoom:         Room3,
		StudentRecordYear: 2566,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord1_2_2)

	StudentRecord1_3_2 := StudentRecord{
		Student:           student1,
		Grade:             grade3,
		ClassRoom:         Room2,
		StudentRecordYear: 2567,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord1_3_2)

	StudentRecord2_1_2 := StudentRecord{
		Student:           student2,
		Grade:             grade1,
		ClassRoom:         Room2,
		StudentRecordYear: 2565,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord2_1_2)

	StudentRecord2_2_2 := StudentRecord{
		Student:           student2,
		Grade:             grade2,
		ClassRoom:         Room2,
		StudentRecordYear: 2566,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord2_2_2)

	StudentRecord2_3_2 := StudentRecord{
		Student:           student2,
		Grade:             grade3,
		ClassRoom:         Room2,
		StudentRecordYear: 2567,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord2_3_2)

	StudentRecord3_1_1 := StudentRecord{
		Student:           student3,
		Grade:             grade2,
		ClassRoom:         Room2,
		StudentRecordYear: 2565,
	}
	db.Model(&StudentRecord{}).Create(&StudentRecord3_1_1)

	TeacherRecord1 := TeacherRecord{
		Teacher:           teacher1,
		Grade:             grade1,
		ClassRoom:         Room2,
		TeacherRecordYear: 2565,
	}
	db.Model(&TeacherRecord{}).Create(&TeacherRecord1)

	TeacherRecord2 := TeacherRecord{
		Teacher:           teacher1,
		Grade:             grade2,
		ClassRoom:         Room2,
		TeacherRecordYear: 2566,
	}
	db.Model(&TeacherRecord{}).Create(&TeacherRecord2)

	TeacherRecord3 := TeacherRecord{
		Teacher:           teacher1,
		Grade:             grade3,
		ClassRoom:         Room2,
		TeacherRecordYear: 2567,
	}
	db.Model(&TeacherRecord{}).Create(&TeacherRecord3)

	TeacherRecord4 := TeacherRecord{
		Teacher:           teacher2,
		Grade:             grade1,
		ClassRoom:         Room1,
		TeacherRecordYear: 2565,
	}
	db.Model(&TeacherRecord{}).Create(&TeacherRecord4)

	//rin

	Physical1 := Physical_Fitness{
		Run50:         7,
		Longjump:      160,
		SitUp:         13,
		GripStrength:  20,
		Wieght:        30,
		Height:        150,
		Student:       student2,
		TeacherRecord: TeacherRecord1,
		Created_date:  time.Now().Format("2006-01-02"),
	}
	db.Model(&Physical_Fitness{}).Create(&Physical1)

	Physical2 := Physical_Fitness{
		Run50:         7.1,
		Longjump:      162,
		SitUp:         15,
		GripStrength:  20,
		Wieght:        30,
		Height:        155,
		Student:       student2,
		TeacherRecord: TeacherRecord2,
		Created_date:  time.Now().Format("2006-01-02"),
	}
	db.Model(&Physical_Fitness{}).Create(&Physical2)

	Physical3 := Physical_Fitness{
		Run50:         7.2,
		Longjump:      165,
		SitUp:         16,
		GripStrength:  20,
		Wieght:        30,
		Height:        160,
		Student:       student2,
		TeacherRecord: TeacherRecord3,
		Created_date:  time.Now().Format("2006-01-02"),
	}
	db.Model(&Physical_Fitness{}).Create(&Physical3)

	//bun

	Physical11 := Physical_Fitness{
		Run50:         7.25,
		Longjump:      165,
		SitUp:         13,
		GripStrength:  20,
		Wieght:        30,
		Height:        150,
		Student:       student1,
		TeacherRecord: TeacherRecord1,
		Created_date:  time.Now().Format("2006-01-02"),
	}
	db.Model(&Physical_Fitness{}).Create(&Physical11)

	Physical12 := Physical_Fitness{
		Run50:         7.25,
		Longjump:      165,
		SitUp:         13,
		GripStrength:  20,
		Wieght:        30,
		Height:        150,
		Student:       student1,
		TeacherRecord: TeacherRecord1,
		Created_date:  time.Now().Format("2006-01-02"),
	}
	db.Model(&Physical_Fitness{}).Create(&Physical12)

}
