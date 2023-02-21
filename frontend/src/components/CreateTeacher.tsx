import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { TeachersInterface } from '../models/ITeacher';
import Button from 'react-bootstrap/Button';
import TeacherRecord from './TeacherRecord';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import { BirthMonthsInterface } from '../models/IStudent';


function CreateTeacher() {

    const [Teacher, setTeacher] = React.useState<Partial<TeachersInterface>>({});



    const [filebase64,setFileBase64] = useState<string>("")

    const [Month,setMonth] = React.useState<BirthMonthsInterface[]>([]);
    const apiUrl = "http://localhost:8080";


    function formSubmit(e: any) {
        e.preventDefault();
        // Submit your form with the filebase64 as 
        // one of your fields

        alert("here you'd submit the form using\n the filebase64 like any other field")
      }
    
      // The Magic all happens here.
      function convertFile(files: FileList|null) {
        if (files) {
          const fileRef = files[0] || ""
          const fileType: string= fileRef.type || ""

          const reader = new FileReader()
          reader.readAsBinaryString(fileRef)
          reader.onload=(ev: any) => {
            // convert it to base64
            setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
          }
        }
      }


    const handleInputChange = (

        event: React.ChangeEvent<{ id?: string; value: any }>

    ) => {

        const id = event.target.id as keyof typeof CreateTeacher;

        const { value } = event.target;

        setTeacher({ ...Teacher, [id]: value });

    };

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof Teacher;
        setTeacher({
            ...Teacher,
            [name]: event.target.value,
        });
    };





    function submit() {

        let data = {

            Picture: filebase64 ?? "",

            First_Name: Teacher?.First_Name ?? "",

            Last_Name: Teacher?.Last_Name ?? "",

            Email: Teacher?.Email ?? "",

            Address: Teacher?.Address ?? "",

            Province: Teacher?.Province ?? "",

            ZipCode: Teacher?.ZipCode ?? "",

            PhoneNumber: Teacher?.PhoneNumber ?? "",

            CodeID: Teacher?.CodeID ?? "",

            Password: Teacher.Password = "$2a$14$zD/Of05KXcKAYm8CeLY7KOFvAHnEHbNd9sElmWWsaQNKiTq6u6LaW",

            BirthYear: typeof Teacher.BirthYear === "string" ? Number(Teacher.BirthYear) : 0,

            
            BirthDay: typeof Teacher.BirthDay === "string" ? Number(Teacher.BirthDay) : 0,

            BirthMonthID: typeof  Teacher.BirthMonthID === "string" ? Number(Teacher.BirthMonthID) : 0,

      
        };




   

        const requestOptionsPost = {
            method: "POST",
            headers: {  
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", },
            body: JSON.stringify(data),
          };


        fetch(`${apiUrl}/teachers`, requestOptionsPost)

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

    const getMonth = async () => {
        fetch(`${apiUrl}/month`, requestOptionsget)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setMonth(res.data);
        
                } else {
    
                }
            });
    }

    useEffect(() => {
        getMonth();
    }, []);






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
                                <Nav.Item>    <Nav.Link href="#first">ประวัติคุณครู</Nav.Link>

                                </Nav.Item>
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
                                    
                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>ชื่อจริง</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="First_Name"
                                                aria-describedby='First_Name'
                                                value={Teacher?.First_Name || ""}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>นามสกุล</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Last_Name"
                                                aria-describedby='Last_Name'
                                                value={Teacher?.Last_Name || ""}
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
                                                value={Teacher?.BirthDay || ""}
                                                min={1}
                                                max={31}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={5}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>เดือนเกิด</Form.Label>
                                            <Form.Select
                                                name="BirthMonthID"
                                                aria-label="Month"
                                                onChange={handleChange}
                                            >
                                                <option>กรุณาเลือก</option>
                                                {Month.map((item: BirthMonthsInterface) => (
                                                    <option value={item.ID} key={item.ID}>
                                                        {item.Name}
                                                    </option>

                                                ))}

                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={5}>
                                        <Form.Group >
                                            <Form.Label>ปีเกิด</Form.Label>
                                            <Form.Control type="number"
                                                className="Form-control"
                                                id="BirthYear"
                                                aria-describedby='BirthYear'
                                                value={Teacher.BirthYear|| "" } 
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>



                                    <Col xs={8}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>รหัสคุณครู</Form.Label>
                                            <Form.Control type="String"
                                                className="Form-control"
                                                id="CodeID"
                                                aria-describedby='CodeID'
                                                value={Teacher?.CodeID || ""}
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
                                                value={Teacher?.Address || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>
                               

                             
                                    <Col xs={8}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>จังหวัด</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Province"
                                                aria-describedby='ProvinceHelp'
                                                value={Teacher?.Province || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={4}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>รหัสไปรษณีย์</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="ZipCode"
                                                aria-describedby='ZipCode'
                                                value={Teacher?.ZipCode || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>
                               

                             
                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>เบอร์ติดต่อ</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="PhoneNumber"
                                                aria-describedby='PhoneNumberHelp'
                                                value={Teacher?.PhoneNumber || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>อีเมล</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Email"
                                                aria-describedby='EmailHelp'
                                                value={Teacher?.Email || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>
                            


                      
                              
                           


                              
                                    <Col xs={6}>
                                        <Button
                                            style={{ float: "left" }}
                                            href="/tableteacher"
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

export default CreateTeacher;



{/* <input
type="Name"
className="Form-control"
id="Name"
aria-describedby='NameHelp'
onChange={(e) => setName(e.target.value)}>
</input> */}