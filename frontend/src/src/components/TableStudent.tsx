import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import UpdateStudent from "./UpdateStudent";

// import { StudentRecordsInterface } from "../models/IStudentRecord";
import { StudentsInterface } from "../models/IStudent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TableStudent() {


  const [students, setstudents] = React.useState<StudentsInterface[]>([]);
  const navigate = useNavigate();

  const handleEdit = (item: any) => {
    const id = item.id
    navigate(`/update-student/${id}`)
}


  const getStudents = async () => {

    const apiUrl = "http://localhost:8080/students";

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


  const deleteStudent = async (id:number) => {

    const apiUrl = "http://localhost:8080/student/"+id;

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

        <Col xs={6} className="button-size" >
        <Button 
            href="/studentrecord"
            variant="secondary">สร้างประวัติชั้นเรียน</Button>
          <Button
            href="/createstudent"
            variant="secondary">สร้างประวัตินักเรียน</Button>{' '}
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
            <th>เบอร์ผู้ปกครอง</th>
            <th>จัดการ</th>
            {/* <th>ปีการศึกษา</th>
            <th>ชื่อ</th>
            <th>รหัสนักเรียน</th>
            <th>ระดับชั้น</th>
            <th>ห้อง</th> */}


          </tr>
        </thead>
        <tbody>
          {students.map((item: StudentsInterface, index) => (
            <tr key={item.ID}>
              <td>{item.CodeID}</td>
              <td>{item.First_Name+" "+item.Last_Name}</td>
              <td>{2566-item.BirthYear}</td>
              <td>{item.Parent_Phone}</td>
              <td className="button-mange">{<Button as="input" type="button" value="แก้ไขข้อมูล" onClick={(e) => handleEdit(item) }/>} 
              {/* {<Button as="input" type="button" value="ลบข้อมูล" onClick={(e) => deleteStudent(item.id) }/>} */}
              </td>
            
              
              {/* <td >{item.StudentRecordYear}</td>
              <td >{item.Student.First_Name} {item.Student.Last_Name}</td>
              <td >{item.Student.CodeID}</td>
              <td >ประถมศึกษาปีที่ {item.Grade.Grade}</td>
              <td >ห้อง {item.ClassRoom.Room}</td> */}
          
    
         
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableStudent;