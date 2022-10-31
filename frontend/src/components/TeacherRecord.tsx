import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { TeachersInterface } from '../models/ITeacher';
import { TeacherReocrdsInterface } from '../models/ITeacherRecord';
import { ClassroomsInterface } from '../models/IClassRoom';
import { GradesInterface } from '../models/IGrade';
import Nav from 'react-bootstrap/Nav';


function TeacherRecord() {

  const [date, setDate] = React.useState<Date | null>(null);

  const [TeacherRecord, setTeacherRecord] = React.useState<Partial<TeacherReocrdsInterface>>({});
  const [Teacher, setTeacher] = React.useState<TeachersInterface[]>([]);
  const [ClassRoom, setClassRoom] = React.useState<ClassroomsInterface[]>([]);
  const [Grade, setGrade] = React.useState<GradesInterface[]>([]);

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

    const id = event.target.id as keyof typeof TeacherRecord;

    const { value } = event.target;

    setTeacherRecord({ ...TeacherRecord, [id]: value });

  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof TeacherRecord;
    setTeacherRecord({
      ...TeacherRecord,
      [name]: event.target.value,
    });
  };


  function submit() {

    let data = {
      TeacherID: typeof TeacherRecord?.TeacherID === "string" ? parseInt(TeacherRecord?.TeacherID) : 0,
      ClassRoomID: typeof TeacherRecord?.ClassRoomID === "string" ? parseInt(TeacherRecord?.ClassRoomID) : 0,
      GradeID: typeof TeacherRecord?.GradeID === "string" ? parseInt(TeacherRecord?.GradeID) : 0,
      TeacherRecordYear: typeof TeacherRecord?.TeacherRecordYear === "string" ? parseInt(TeacherRecord?.TeacherRecordYear) : 0,
    };

    console.log(data)


    const requestOptionsPost = {
      method: "POST",
      headers: {  
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", },
      body: JSON.stringify(data),
    };
    console.log(apiUrl)

    fetch(`${apiUrl}/teacherrecords`, requestOptionsPost)

      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });

  }



  const apiUrl = "http://localhost:8080";
  const requestOptionsget = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },
  };



  const getteacher = async () => {
    fetch(`${apiUrl}/teachers`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTeacher(res.data);
        } else {
          console.log("else");
        }
      });
  }

  const getclassroom = async () => {
    fetch(`${apiUrl}/classrooms`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setClassRoom(res.data);
        } else {
          console.log("else");
        }
      });
  }

  const getgrade = async () => {
    fetch(`${apiUrl}/grades`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGrade(res.data);
        } else {
          console.log("else");
        }
      });
  }

  console.log(TeacherRecord)

  useEffect(() => {
    getteacher();
    getclassroom();
    getgrade();
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
                <Nav.Item>
                  <Nav.Link href="/createteacher">ประวัติคุณครู</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#first">ประวัติระดับชั้นคุณครู</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col xs={8}>
                    <Form.Group className="mb-2" >
                      <Form.Label>คุณครู</Form.Label>
                      <Form.Select 
                        name="TeacherID"
                        aria-label="TeacherID"
                        value={TeacherRecord.TeacherID}
                        onChange={handleChange}
                        >
                        <option>กรุณาเลือก</option>
                        {Teacher.map((item: TeachersInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Name}
                          </option>
          
                        ))}
                   

                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>ปีการศึกษา</Form.Label>
                      <Form.Control type="number"
                        className="Form-control"
                        id="TeacherRecordYear"
                        aria-describedby='TeacherRecordYearHelp'
                        value={TeacherRecord.TeacherRecordYear || ""}
                        onChange={handleInputChange} />

                    </Form.Group>
                  </Col>


                </Row>

                <Row>

                  <Col xs={6}>
                    <Form.Group className="mb-2" >
                      <Form.Label>ระดับชั้นประถมศึกษา</Form.Label>
                      <Form.Select 
                        name="GradeID"
                        value={TeacherRecord.GradeID}
                        onChange={handleChange}>
                        <option>กรุณาเลือก</option>
                        {Grade.map((item: GradesInterface) => (
                          <option value={item.ID} key={item.ID}>
                            ชั้นประถมศึกษา {item.Grade}
                          </option>
                        ))}

                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2" >
                      <Form.Label>ห้อง</Form.Label>
                      <Form.Select 
                        name="ClassRoomID"
                        value={TeacherRecord.ClassRoomID}
                        onChange={handleChange}>
                        <option>กรุณาเลือก</option>
                        {ClassRoom.map((item: ClassroomsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            ห้อง {item.Room}
                          </option>
                        ))}

                      </Form.Select>
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

export default TeacherRecord;



{/* <input
type="Name"
className="Form-control"
id="Name"
aria-describedby='NameHelp'
onChange={(e) => setName(e.target.value)}>
</input> */}