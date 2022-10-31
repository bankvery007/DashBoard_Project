import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { TeachersInterface } from '../models/ITeacher';
import Button from 'react-bootstrap/Button';
import TeacherRecord from './TeacherRecord';
import Nav from 'react-bootstrap/Nav';


function CreateTeacher() {

    const [date, setDate] = React.useState<Date | null>(null);

    const [Teacher, setTeacher] = React.useState<Partial<TeachersInterface>>({});

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

        const id = event.target.id as keyof typeof CreateTeacher;

        const { value } = event.target;

        setTeacher({ ...Teacher, [id]: value });

    };


    function submit() {

        let data = {

            Name: Teacher?.Name ?? "",

            Email: Teacher?.Email ?? "",

            Address: Teacher?.Address ?? "",

            Province: Teacher?.Province ?? "",

            ZipCode: Teacher?.ZipCode ?? "",

            PhoneNumber: Teacher?.PhoneNumber ?? "",

            CodeTeacher: Teacher?.CodeID ?? "",

            Age: typeof Teacher?.Age === "string" ? parseInt(Teacher?.Age) : 0,

        };


        const apiUrl = "http://localhost:8080";

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

                    setSuccess(true);

                } else {

                    setError(true);

                }

            });

    }

    console.log(Teacher)



    // console.log('render Name', setTeacher)
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
                                <Nav.Item>
                                    <Nav.Link href="/teacherrecord">ประวัติระดับชั้นคุณครู</Nav.Link>
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
                                                value={Teacher?.Name || ""}
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
                                                value={Teacher?.Age || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
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
                                </Row>

                                <Row>
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
                                </Row>

                                <Row>
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
                                </Row>


                                <Row>
                                    <Col xs={12}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>รหัสคุณครู</Form.Label>
                                            <Form.Control type="String"
                                                className="Form-control"
                                                id="CodeTeacher"
                                                aria-describedby='CodeTeacherHelp'
                                                value={Teacher?.CodeID || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col>
                                </Row>


                                <Row>
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