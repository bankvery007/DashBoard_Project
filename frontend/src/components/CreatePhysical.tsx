import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { StudentRecordsInterface } from '../models/IStudentRecord';
import { Physical_FitnessInterface } from '../models/IPhysical_Fitness';
import Button from 'react-bootstrap/Button';
import TeacherRecord from './TeacherRecord';
import Nav from 'react-bootstrap/Nav';


function CreatePhysical() {

    const [date, setDate] = React.useState<Date | null>(null);

    const [Student, setStudent] = React.useState<Partial<StudentRecordsInterface>>({});

    const [Physical, setPhysical] = React.useState<Partial<Physical_FitnessInterface>>({});

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

        const id = event.target.id as keyof typeof CreatePhysical;

        const { value } = event.target;

        setPhysical({ ...Physical, [id]: value });

    };


    function submit() {

        let data = {


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

    console.log(Physical)



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
                           ประวัติสรรภาพของนักเรียน
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col xs={12}>
                                    <Form.Group className="mb-2" >
                      <Form.Label>นักเรียน</Form.Label>
                     
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

export default CreatePhysical;



{/* <input
type="Name"
className="Form-control"
id="Name"
aria-describedby='NameHelp'
onChange={(e) => setName(e.target.value)}>
</input> */}