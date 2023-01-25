import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { StudentsInterface, Status_FamiliesInterface, ArticlesInterface } from '../models/IStudent';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';



function CreateStudent() {

    const [date, setDate] = React.useState<Date | null>(null);

    const [Student, setStudent] = React.useState<Partial<StudentsInterface>>({});

    const [Article, setArticle] = React.useState<ArticlesInterface[]>([]);

    const [StatusFamily, setStatusFamily] = React.useState<Status_FamiliesInterface[]>([]);

    const [success, setSuccess] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [file, setFiles] = useState(null)

    const [filebase64,setFileBase64] = useState<string>("")




    const handleClose = (

        event?: React.SyntheticEvent | Event,

        reason?: string

    ) => {

        if (reason === "clickaway") {

            return;

        }

        setSuccess(false);

        setError(false);

    };
    

    const handleInputChange = (

        event: React.ChangeEvent<{ id?: string; value: any }>

    ) => {

        const id = event.target.id as keyof typeof CreateStudent;

        const { value } = event.target;

        setStudent({ ...Student, [id]: value });
    };




    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof Student;
        setStudent({
            ...Student,
            [name]: event.target.value,
        });
    };

    function formSubmit(e: any) {
        e.preventDefault();
        // Submit your form with the filebase64 as 
        // one of your fields
        console.log({filebase64})
        alert("here you'd submit the form using\n the filebase64 like any other field")
      }
    
      // The Magic all happens here.
      function convertFile(files: FileList|null) {
        if (files) {
          const fileRef = files[0] || ""
          const fileType: string= fileRef.type || ""
          console.log("This file upload is of type:",fileType)
          const reader = new FileReader()
          reader.readAsBinaryString(fileRef)
          reader.onload=(ev: any) => {
            // convert it to base64
            setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
          }
        }
      }


    

    const apiUrl = "http://localhost:8080";

    function submit() {

        let data = {

            Picture: filebase64 ?? "",

            First_Name: Student.First_Name ?? "",

            Last_Name: Student.Last_Name ?? "",

            ID_Card: Student.ID_Card ?? "",

            Email: Student.Email ?? "",

            Address: Student.Address ?? "",

            Province: Student.Province ?? "",

            ZipCode: Student.ZipCode ?? "",

            PhoneNumber: Student.PhoneNumber ?? "",

            CodeID: Student.CodeID ?? "",

            BirthYear: typeof Student.BirthYear === "string" ? parseInt(Student.BirthYear) : 0,

            Father_Name: Student.Father_Name,

            Father_Career: Student.Father_Career,

            Father_Phone: Student.Father_Phone,

            Father_income: typeof Student.Father_income === "string" ? parseInt(Student.Father_income) : 0, 

            Mother_Name: Student.Mother_Name,

            Mother_Career: Student.Mother_Career,

            Mother_Phone: Student.Mother_Phone,

            Mother_income: typeof Student.Mother_income === "string" ? parseInt(Student.Mother_income) : 0, 

            Parent_Name: Student.Parent_Name,

            Parent_Career: Student.Parent_Career,

            Parent_Phone: Student.Parent_Phone,

            Parent_About: Student.Parent_About,

            StatusFamilyID: typeof  Student.StatusFamilyID === "string" ? parseInt( Student.StatusFamilyID) : 0,

            ArticleID: typeof  Student.ArticleID === "string" ? parseInt( Student.ArticleID) : 0,

            Family_income : typeof Student.Family_income === "string" ? parseInt(Student.Family_income) : 0, 

            Number_brother: typeof Student.Number_brother === "string" ? parseInt(Student.Number_brother) : 0,
            

        };

        const requestOptionsPost = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };


        fetch(`${apiUrl}/students`, requestOptionsPost)

            .then((response) => response.json())

            .then((res) => {

                if (res.data) {

                    toast.success("บันทึกสำเร็จ")
                } else {
                  toast.error("บันทึกไม่สำเร็จ")

                }

            });

    }


    const requestOptionsget = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const getarticle = async () => {
        fetch(`${apiUrl}/articles`, requestOptionsget)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setArticle(res.data);
                    console.log(res.data)
                } else {
                    console.log("else");
                }
            });
    }

    const getstatus = async () => {
        fetch(`${apiUrl}/status`, requestOptionsget)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStatusFamily(res.data);
                    console.log(res.data)
                } else {
                    console.log("else");
                }
            });
    }

    console.log(Student)

    useEffect(() => {
        getarticle();
        getstatus();
    }, []);

    // useEffect(() => {
    //     if (image.length < 1) return;
    //     const newImageUrls : any = [];
    //     image.forEach((image) => { newImageUrls.push(URL.createObjectURL(image))})
    //     setImageURLs(newImageUrls);
    // },[image]);

    



    console.log( Student)
    return (

        <Container>

            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>

                    <br></br>
                    <br></br>
                    <Card border="secondary">
                        <Card.Header>
                            <Nav variant="tabs" defaultActiveKey="#first">
                                <Nav.Item>    <Nav.Link href="#first">ประวัตินักเรียน</Nav.Link>

                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link href="/">
                                        import export </Nav.Link>
                                </Nav.Item> */}
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>


                                    <Col xs={12}>
                                    {filebase64 && <img src={filebase64} alt=""/>}
                                        <Form.Group className="mb-2">
                                            <Form.Label>รูปประจำตัว</Form.Label>
                                            <Form.Control type="file"
                                                id="Picture"
                                                onSubmit={formSubmit}
                                              
                                                onChange={(e)=> convertFile((e.target as HTMLInputElement).files)}
                                                />
                                        
                                        </Form.Group>
                                        
                                    </Col>






                                    <Col xs={3}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>คำนำหน้า</Form.Label>
                                            <Form.Select
                                                name="ArticleID"
                                                aria-label="Article"
                                                onChange={handleChange}
                                            >
                                                <option>กรุณาเลือก</option>
                                                {Article.map((item: ArticlesInterface) => (
                                                    <option value={item.ID} key={item.ID}>
                                                        {item.Name}
                                                    </option>

                                                ))}

                                            </Form.Select>
                                        </Form.Group>
                                    </Col>


                                    <Col xs={4}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>ชื่อจริง</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="First_Name"
                                                aria-describedby='First_Name'
                                                value={Student.First_Name || ""}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>


                                    <Col xs={4}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>นามสกุล</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Last_Name"
                                                aria-describedby='Last_Name'
                                                value={Student.Last_Name || ""}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>

                                       <Col xs={2}>
                                        <Form.Group >
                                        <Form.Label>วัน</Form.Label>
                                            <Form.Control type="number"
                                                className="Form-control"
                                                id="BirthDay"
                                                aria-describedby='BirthDayHelp'
                                                value={Student?.BirthDay || ""}
                                                min={1}
                                                max={31}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={5}>
                                        <Form.Group >
                                        <Form.Label>เดือน</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="BirthMonth"
                                                aria-describedby='BirthMonth'
                                                value={Student?.BirthMonth || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>




                                    <Col xs={5}>
                                        <Form.Group >
                                            <Form.Label>ปีเกิด</Form.Label>
                                            <Form.Control type="number"
                                                className="Form-control"
                                                id="BirthYear"
                                                aria-describedby='BirthYear'
                                                value={Student.BirthYear|| "" } 
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>


                                    <Col xs={4}>
                                        <Form.Group >
                                            <Form.Label>บัตรประจำตัวประชาชน</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="ID_Card"
                                                aria-describedby='ID_Card'
                                                value={Student.ID_Card || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>



                                    <Col xs={4}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>รหัสนักเรียน</Form.Label>
                                            <Form.Control type="String"
                                                className="Form-control"
                                                id="CodeID"
                                                aria-describedby='CodeID'
                                                value={Student.CodeID || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>




                                    <Col xs={12}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>ที่อยู่</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Address"
                                                aria-describedby='AddressHelp'
                                                value={Student.Address || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>



                                    <Col xs={5}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>จังหวัด</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Province"
                                                aria-describedby='ProvinceHelp'
                                                value={Student.Province || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={3}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>รหัสไปรษณีย์</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="ZipCode"
                                                aria-describedby='ZipCode'
                                                value={Student.ZipCode || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>



                                    <Col xs={4}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>เบอร์ติดต่อ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="PhoneNumber"
                                                aria-describedby='PhoneNumberHelp'
                                                value={Student.PhoneNumber || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>ชื่อบิดา</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Father_Name"
                                                aria-describedby='Father_Name'
                                                value={Student.Father_Name || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>อาชีพ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Father_Career"
                                                aria-describedby='Father_Career'
                                                value={Student.Father_Career || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>รายได้</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Father_income"
                                                aria-describedby='Father_income'
                                                value={Student.Father_income || ""}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>เบอร์ติดต่อ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Father_Phone"
                                                aria-describedby='Father_Phone'
                                                value={Student.Father_Phone || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>ชื่อมารดา</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Mother_Name"
                                                aria-describedby='Mother_Name'
                                                value={Student.Mother_Name || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>อาชีพ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Mother_Career"
                                                aria-describedby='Mother_Career'
                                                value={Student.Mother_Career || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>รายได้</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Mother_income"
                                                aria-describedby='Mother_income'
                                                value={Student.Mother_income || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>เบอร์ติดต่อ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Mother_Phone"
                                                aria-describedby='Mother_Phone'
                                                value={Student.Mother_Phone || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>สถานะของครอบครัว</Form.Label>
                                            <Form.Select
                                                name="StatusFamilyID"
                                                aria-label="StatusFamilyID"
                                                onChange={handleChange}
                                            >
                                                <option>กรุณาเลือก</option>
                                                {StatusFamily.map((item: Status_FamiliesInterface) => (
                                                    <option value={item.ID} key={item.ID}>
                                                        {item.Name}
                                                    </option>

                                                ))}

                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>รายได้ครอบครัว</Form.Label>
                                            <Form.Control type="number"
                                                className="Form-control"
                                                id="Family_income"
                                                aria-describedby='Family_income'
                                                value={Student.Family_income || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>




                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>ชื่อผู้ปกครอง</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Parent_Name"
                                                aria-describedby='Parent_Name'
                                                value={Student.Parent_Name || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>อาชีพ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Parent_Career"
                                                aria-describedby='Parent_Career'
                                                value={Student.Parent_Career || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>เบอร์ติดต่อ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Parent_Phone"
                                                aria-describedby='Parent_Phone'
                                                value={Student.Parent_Phone || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>เกี่ยวข้องเป็น</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Parent_About"
                                                aria-describedby='Parent_About'
                                                value={Student.Parent_About || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                             



                                    {/* 
                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>อีเมล</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Email"
                                                aria-describedby='EmailHelp'
                                                value={Student.Email || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col> */}






                                    <Col xs={6}>
                                        <Button
                                            style={{ float: "left" }}
                                            href="/tablestudent"
                                            variant="secondary">กลับ</Button>{' '}


                                    </Col>
                                    <Col xs={6}>
                                        <Button style={{ float: "right" }}
                                            onClick={submit}
                                            variant="success">ยืนยัน</Button>{' '}

                                    </Col>






                                </Row>


                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3}></Col>



            </Row>
        </Container>

    );

}

export default CreateStudent;

