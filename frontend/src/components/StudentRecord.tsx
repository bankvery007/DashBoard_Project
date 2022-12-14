import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { StudentRecordsInterface } from '../models/IStudentRecord';
import { StudentsInterface } from '../models/IStudent';
import { ClassroomsInterface } from '../models/IClassRoom';
import { GradesInterface } from '../models/IGrade';
import Nav from 'react-bootstrap/Nav';


function StudentRecord() {

  const [date, setDate] = React.useState<Date | null>(null);

  const [StudentRecord, setStudentRecord] = React.useState<Partial<StudentRecordsInterface>>({});
  const [Student, setStudent] = React.useState<StudentsInterface[]>([]);
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

    const id = event.target.id as keyof typeof StudentRecord;

    const { value } = event.target;

    setStudentRecord({ ...StudentRecord, [id]: value });

  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof StudentRecord;
    setStudentRecord({
      ...StudentRecord,
      [name]: event.target.value,
    });
  };


  function submit() {

    let data = {
    StudentID: typeof StudentRecord?.StudentID === "string" ? parseInt(StudentRecord?.StudentID) : 0,
    ClassRoomID: typeof StudentRecord?.ClassRoomID === "string" ? parseInt(StudentRecord?.ClassRoomID) : 0,
    GradeID: typeof StudentRecord?.GradeID === "string" ? parseInt(StudentRecord?.GradeID) : 0,
    StudentRecordYear: typeof StudentRecord?.StudentRecordYear === "string" ? parseInt(StudentRecord?.StudentRecordYear) : 0,
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

    fetch(`${apiUrl}/studentrecords`, requestOptionsPost)
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



  const getstudent = async () => {
    fetch(`${apiUrl}/students`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setStudent(res.data);
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
    fetch(`${apiUrl}/gradesNoid`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGrade(res.data);
        } else {
          console.log("else");
        }
      });
  }

  console.log(StudentRecord)

  useEffect(() => {
    getstudent();
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
                  <Nav.Link href="/createstudent">?????????????????????????????????????????????</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#first">????????????????????????????????????????????????????????????????????????</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col xs={8}>
                    <Form.Group className="mb-2" >
                      <Form.Label>????????????????????????</Form.Label>
                      <Form.Select 
                        name="StudentID"
                        aria-label="StudentID"
                        value={StudentRecord?.StudentID}
                        onChange={handleChange}
                        >
                        <option>??????????????????????????????</option>
                        {Student.map((item: StudentsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Name}
                          </option>
          
                        ))}
                   

                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>??????????????????????????????</Form.Label>
                      <Form.Control type="number"
                        className="Form-control"
                        id="StudentRecordYear"
                        aria-describedby='StudentRecordYearHelp'
                        value={StudentRecord.StudentRecordYear || ""}
                        onChange={handleInputChange} />

                    </Form.Group>
                  </Col>


                </Row>

                <Row>

                  <Col xs={6}>
                    <Form.Group className="mb-2" >
                      <Form.Label>?????????????????????????????????????????????????????????</Form.Label>
                      <Form.Select 
                        name="GradeID"
                        value={StudentRecord.GradeID}
                        onChange={handleChange}>
                        <option>??????????????????????????????</option>
                        {Grade.map((item: GradesInterface) => (
                          <option value={item.ID} key={item.ID}>
                            ?????????????????????????????????????????? {item.Grade}
                          </option>
                        ))}

                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2" >
                      <Form.Label>????????????</Form.Label>
                      <Form.Select 
                        name="ClassRoomID"
                        value={StudentRecord.ClassRoomID}
                        onChange={handleChange}>
                        <option>??????????????????????????????</option>
                        {ClassRoom.map((item: ClassroomsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            ???????????? {item.Room}
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
                      href="/tablestudent"
                      variant="secondary">????????????</Button>{' '}


                  </Col>
                  <Col xs={6}>
                    <Button style={{ float: "right" }}
                      onClick={submit}
                      variant="success">??????????????????</Button>{' '}

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

export default StudentRecord;



{/* <input
type="Name"
className="Form-control"
id="Name"
aria-describedby='NameHelp'
onChange={(e) => setName(e.target.value)}>
</input> */}