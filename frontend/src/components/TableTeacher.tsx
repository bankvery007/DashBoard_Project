import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


import { TeacherReocrdsInterface } from "../models/ITeacherRecord";

function TableTeacher() {


  const [teachers, setTeachers] = React.useState<TeacherReocrdsInterface[]>([]);


  const getTeachers = async () => {

    const apiUrl = "http://localhost:8080/teacherrecords";

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

          setTeachers(res.data);

        }

      });

  };

  useEffect(() => {

    getTeachers();

  }, []);


  return (
    <Container>
     
        <br></br>
        <br></br>
      <Row>
        <Col xs={6}>
        <h4>รายการประวัติของคุณครู</h4>
        </Col>
        <Col xs={6}>
          <Button
            style={{ float: "right" }}
            href="/createteacher"
            variant="secondary">สร้างประวัติคุณครู</Button>{' '}
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table responsive striped bordered hover variant="light ">
        <thead>
          <tr>
            <th>ปีการศึกษา</th>
            <th>ชื่อ</th>
            <th>รหัสคุณครู</th>
            <th>ระดับชั้น</th>
            <th>ห้อง</th>


          </tr>
        </thead>
        <tbody>
          {teachers.map((item: TeacherReocrdsInterface, index) => (
            <tr key={item.ID}>
              
              <td >{item.TeacherRecordYear}</td>
              <td >{item.Teacher.Name}</td>
              <td >{item.Teacher.CodeID}</td>
              <td >ประถมศึกษาปีที่ {item.Grade.Grade}</td>
              <td >ห้อง {item.ClassRoom.Room}</td>
    
         
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableTeacher;