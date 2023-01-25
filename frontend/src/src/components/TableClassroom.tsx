import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { TeacherReocrdsInterface } from "../models/ITeacherRecord";
import { StudentRecordsInterface } from "../models/IStudentRecord";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import CreatePhysical from "./CreatePhysical";
import { type } from "os";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function TableClassroom() {
  const [Student, setStudent] = React.useState<StudentRecordsInterface[]>([]);
  const [show, setShow] = useState(false);
  
  const [TeacherRecord, setTeacherRecord] = React.useState<
    Partial<TeacherReocrdsInterface>
  >({});
  const [param,setparam] = useState(0);
  const apiUrl = "http://localhost:8080";
  const requestOptionsget = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getteacher = async () => {
    fetch(
      `${apiUrl}/teacherrecord/detail/${localStorage.getItem("uid")}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTeacherRecord(res.data);
          getstudent(
            res.data.TeacherRecordYear,
            res.data.GradeID,
            res.data.ClassRoomID
          );
        } else {
          console.log("else");
        }
      });
  };

  const getstudent = async (
    teacheryear: number,
    teachergrade: number,
    teacherclassroom: number
  ) => {
    fetch(
      `${apiUrl}/studentrecordswithphysical/${teacheryear}/${teachergrade}/${teacherclassroom}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudent(res.data);
          console.log(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getteacher();

  }, []);

  return (
    <Container>
      <br></br>
      <br></br>
      <Row>
        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ปีการศึกษา</Form.Label>
            <Form.Select name="GradeID" aria-label="GradeID" disabled>
              <option>{TeacherRecord.TeacherRecordYear}</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ชั้น</Form.Label>
            <Form.Select name="GradeID" aria-label="GradeID" disabled>
              <option>ประถมศึกษาปีที่ {TeacherRecord.Grade?.Grade}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ห้องเรียน</Form.Label>
            <Form.Select name="TeacherID" aria-label="TeacherID" disabled>
              <option>{TeacherRecord.ClassRoom?.Room}</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ครูประจำชั้น</Form.Label>
            <Form.Select name="TeacherID" aria-label="TeacherID" disabled>
              <option>{TeacherRecord.Teacher?.First_Name} {TeacherRecord.Teacher?.Last_Name}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table responsive striped bordered hover variant="light ">
        <thead>
          <tr>
            <th>รหัสนักเรียน</th>
            <th>ชื่อ</th>
            <th>อายุ</th>
            <th>ที่อยู่</th>
          </tr>
        </thead>
        <tbody>
          {Student.map((item: StudentRecordsInterface, index) => (
            <tr key={item.ID}>
            
              <td>{item.Student.CodeID}</td>
              <td>
                {item.Student.First_Name} {item.Student.Last_Name}
              </td>
              <td>{item.StudentRecordYear - item.Student.BirthDay} ปี</td>
              <td>{item.Student.Address}</td>
             
              <td>
                {/* {<Button>เครื่องหมาย</Button>}  */}
                {
                     <Button disabled={item.Status}
                     variant="primary" onClick={() => {
                       setShow(true)
                       setparam(item.ID)} } >
                       บันทึกสมรรถนะ
                     </Button>

                }
             

                <Modal
                  show={show}
                  onHide={() => setShow(false)}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        บันทึกสมรรถนะ
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <CreatePhysical param ={param} />
                  </Modal.Body>
   
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableClassroom;
