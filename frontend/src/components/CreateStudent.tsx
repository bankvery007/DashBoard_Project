import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { StudentsInterface } from '../models/IStudent';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import StudentRecord from './StudentRecord';



function CreateStudent() {

    const [date, setDate] = React.useState<Date | null>(null);

    const [Student, setStudent] = React.useState<Partial<StudentsInterface>>({});

    const [success, setSuccess] = React.useState(false);

    const [error, setError] = React.useState(false);


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


    function submit() {

        let data = {

            Name: Student.Name ?? "",

            Email: Student.Email ?? "",

            Address: Student.Address ?? "",

            Province: Student.Province ?? "",

            ZipCode: Student.ZipCode ?? "",

            PhoneNumber: Student.PhoneNumber ?? "",

            CodeStudent: Student.CodeID ?? "",

            Age: typeof Student.Age === "string" ? parseInt(Student.Age) : 0,

        };


        const apiUrl = "http://localhost:8080";

     
        const requestOptionsPost = {
            method: "POST",
            headers: {  
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", },
            body: JSON.stringify(data),
          };


        fetch(`${apiUrl}/students`, requestOptionsPost)

            .then((response) => response.json())

            .then((res) => {

                if (res.data) {

                    setSuccess(true);
                    console.log("สำเร็จ");

                } else {

                    setError(true);

                }

            });

    }

    console.log(Student)


    console.log('render Name', Student)
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
                                <Nav.Item>
                                    <Nav.Link href="/studentrecord">
                                    ประวัติระดับชั้นนักเรียน</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col xs={12}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>ชื่อ-นามสกุล</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Name"
                                                aria-describedby='Name'
                                                value={Student.Name || ""}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col xs={8}>
                                        <Form.Group >
                                            <Form.Label>วันเกิด</Form.Label>
                                            <Form.Control type="Date" name="dob" placeholder="Date of Birth" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>อายุ</Form.Label>
                                            <Form.Control type="number"
                                                className="Form-control"
                                                id="Age"
                                                aria-describedby='AgeHelp'
                                                value={Student.Age || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Row>
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
                                    </Row>

                                    <Row>
                                        <Col xs={8}>
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

                                        <Col xs={4}>
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
                                    </Row>

                                    <Row>
                                        <Col xs={6}>
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
                                                <Form.Label>อีเมล</Form.Label>
                                                <Form.Control type="string"
                                                    className="Form-control"
                                                    id="Email"
                                                    aria-describedby='EmailHelp'
                                                    value={Student.Email || ""}
                                                    onChange={handleInputChange} />

                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col xs={8}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>รหัสนักเรียน</Form.Label>
                                                <Form.Control type="String"
                                                    className="Form-control"
                                                    id="CodeStudent"
                                                    aria-describedby='CodeStudentHelp'
                                                    value={Student.CodeID || ""}
                                                    onChange={handleInputChange} />

                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Row>
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



{/* <input
type="Name"
className="Form-control"
id="Name"
aria-describedby='NameHelp'
onChange={(e) => setName(e.target.value)}>
</input> */}