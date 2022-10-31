import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { StudentRecordsInterface } from "../models/IStudentRecord";

function TableStudent() {


  const [students, setstudents] = React.useState<StudentRecordsInterface[]>([]);


  const getStudents = async () => {

    const apiUrl = "http://localhost:8080/studentrecords";

    const requestOptionsget = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", },
    };


    fetch(apiUrl, requestOptionsget)

      .then((response) => response.json())

      .then((res) => {

        console.log(res.data);

        if (res.data) {

            setstudents(res.data);

        }

      });

  };

  useEffect(() => {

    getStudents();

  }, []);


  return (
    <Container>

        <br></br>
        <br></br>
      <Row>
        <Col xs={6}>
        <h4>รายการประวัติของนักเรียน</h4>
        </Col>
        <Col xs={6}>
          <Button
            style={{ float: "right" }}
            href="/createstudent"
            variant="secondary">สร้างประวัตินักเรียน</Button>{' '}
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table responsive striped bordered hover variant="light ">
        <thead>
          <tr>
            <th>ปีการศึกษา</th>
            <th>ชื่อ</th>
            <th>รหัสนักเรียน</th>
            <th>ระดับชั้น</th>
            <th>ห้อง</th>


          </tr>
        </thead>
        <tbody>
          {students.map((item: StudentRecordsInterface, index) => (
            <tr key={item.ID}>
              
              <td >{item.StudentRecordYear}</td>
              <td >{item.Student.Name}</td>
              <td >{item.Student.CodeID}</td>
              <td >ประถมศึกษาปีที่ {item.Grade.Grade}</td>
              <td >ห้อง {item.ClassRoom.Room}</td>
    
         
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableStudent;