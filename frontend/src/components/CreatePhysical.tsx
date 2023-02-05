import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { StudentRecordsInterface } from "../models/IStudentRecord";
import { Physical_FitnessInterface } from "../models/IPhysical_Fitness";
import { TeacherReocrdsInterface } from "../models/ITeacherRecord";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import moment from 'moment';
interface Props {
  param : number;
}


function CreatePhysical({param}:Props) {



  const [Student, setStudent] = React.useState<StudentRecordsInterface>();


  const [Physical, setPhysical] = React.useState<
    Partial<Physical_FitnessInterface>
  >({}); //patch



  const [TeacherRecord, setTeacherRecord] = React.useState<
    Partial<TeacherReocrdsInterface>
  >({});



  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Physical;

    const { value } = event.target;

    setPhysical({ ...Physical, [id]: value });
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Physical;
    setPhysical({
      ...Physical,
      [name]: event.target.value,
    });
  };

  let CurrentDate = moment(Physical.CreatedAt).format('l');
  function submit() {
    
    let data = {
      Longjump: typeof Physical?.Longjump === "string" ? parseFloat(Physical?.Longjump): 0,
      Run50: typeof Physical?.Run50 === "string" ? parseFloat(Physical?.Run50) : 0,
      GripStrength: typeof Physical?.GripStrength === "string" ? parseFloat(Physical?.GripStrength) : 0,
      SitUp: typeof Physical?.SitUp === "string" ? parseFloat(Physical?.SitUp) : 0,
      Wieght: typeof Physical?.Wieght === "string" ? parseFloat(Physical?.Wieght) : 0,
      Height: typeof Physical?.Height === "string" ? parseFloat(Physical?.Height) : 0,
      Datetime : CurrentDate,
      StudentRecordID: Student?.ID,
      TeacherRecordID: TeacherRecord?.ID,
    };

    console.log(data);

    const apiUrl = "http://localhost:8080";

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/physicals`, requestOptionsPost)
      .then((response) => response.json())

      .then((res) => {
        console.log('res',res)
       
          toast.success("บันทึกสำเร็จ") 
        
      })
      .catch((error) => {
          toast.error("บันทึกไม่สำเร็จ")
      });
  }

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
        } else {
          console.log("else");
        }
      });
  };


  const getstudent = async (
    // teacheryear: number,
    // teachergrade: number,
    // teacherclassroom: number
  ) => {
    fetch(
      
      `${apiUrl}/studentrecord/${param}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudent(res.data);

        } else {

        }
      });
  };

  useEffect(() => {
    getteacher();
    getstudent();
  }, []);

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label>นักเรียน</Form.Label>
        <Form.Select
          name="StudentRecordID"
          aria-label="StudentRecordID"
          value={Student?.Student.ID}
          onChange={handleChange}
          disabled
        >
          <option>{Student?.Student.First_Name} {Student?.Student.Last_Name}</option>

        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>ยืนกระโดดไกล</Form.Label>
        <Form.Control
          type="number"
          className="Form-control"
          id="Longjump"
          aria-describedby="LongjumpHelp"
          value={Physical.Longjump}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>วิ่ง 50 เมตร</Form.Label>
        <Form.Control
          type="number"
          className="Form-control"
          id="Run50"
          aria-describedby="Run50Help"
          value={Physical.Run50}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>แรงบีบมือที่ถนัด</Form.Label>
        <Form.Control
          type="number"
          className="Form-control"
          id="GripStrength"
          aria-describedby="GripStrength"
          value={Physical.GripStrength}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>ลุก-นั่ง 30 วินาที</Form.Label>
        <Form.Control
          type="number"
          className="Form-control"
          id="SitUp"
          aria-describedby="SitUp"
          value={Physical.SitUp}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>น้ำหนัก</Form.Label>
        <Form.Control
          type="number"
          className="Form-control"
          id="Wieght"
          aria-describedby="Wieght"
          value={Physical.Wieght}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>ส่วนสูง</Form.Label>
        <Form.Control
          type="number"
          className="Form-control"
          id="Height"
          aria-describedby="Height"
          value={Physical.Height}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button style={{ float: "right" }} onClick={submit} variant="success">
        ยืนยัน
      </Button>{" "}
    </>
  );
}

export default CreatePhysical;
