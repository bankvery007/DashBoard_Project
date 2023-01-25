import React, { useEffect, useState } from "react";
import { Container, Modal, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { TeachersInterface } from "../models/ITeacher";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TableTeacher() {


  const [teachers, setTeachers] = React.useState<TeachersInterface[]>([]);
  const navigate = useNavigate();

  const handleEdit = (item: any) => {
    console.log("edit===>",item)
    const id = item.ID
    navigate(`/update-teacher/${id}`)
}


  const getTeachers = async () => {

    const apiUrl = "http://localhost:8080/teachers";

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

  const deleteTeacher = async (id:any) => {

    console.log("delelte",id)

    const apiUrl = "http://localhost:8080/teacher/"+id;

    const requestOptionsget = {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", },
    };


    fetch(apiUrl, requestOptionsget)

      .then((response) => response.json())

      .then((res) => {
        toast.success("ลบข้อมูลสำเร็จ");
        window.location.reload();
      }
      )
      .catch((error) => {
        toast.error("ลบข้อมูลไม่สำเร็จ");
      })
 
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
        <Col xs={6} className="button-size" >
        <Button 
            href="/teacherrecord"
            variant="secondary">สร้างประวัติชั้นเรียน</Button>
          <Button
            href="/createteacher"
            variant="secondary">สร้างประวัติคุณครู</Button>{' '}
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table responsive striped bordered hover variant="light ">
        <thead>
          <tr>
            <th>รหัสคุณครู</th>
            <th>ชื่อ</th>
            <th>อายุ</th>
            <th>จัดการ</th>


          </tr>
        </thead>
        <tbody>
          {teachers.map((item: TeachersInterface, index) => (
            <tr key={item.ID}>
              <td >{item.CodeID}</td>
              <td >{item.First_Name+" "+item.Last_Name}</td>
              <td >{2566-item.BirthYear}</td>
              <td className="button-mange">{<Button as="input" type="button" value="แก้ไขข้อมูล" onClick={(e) => handleEdit(item) }/>} 
              {/* {<Button as="input" type="button" value="ลบข้อมูล" onClick={(e) => deleteTeacher(item.ID) }/>} */}
              </td>
              
         
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableTeacher;