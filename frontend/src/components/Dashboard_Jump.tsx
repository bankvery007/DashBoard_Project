import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { StudentRecordsInterface } from '../models/IStudentRecord';
import { Physical_FitnessInterface } from '../models/IPhysical_Fitness';
import { TeacherReocrdsInterface } from '../models/ITeacherRecord';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const optionJump = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'ยืนกระโดดไกล',
    },
  },
  scales: {
    y: {
      min : 100,
      max : 200
    }
  }
};

export const optionRun = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'วิ่ง 50 เมตร',
    },
  },
  scales: {
    y: {
      min : 0,
      max : 20
    }
  }
};


export const optionStrength = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'แรงบีบมือที่ถนัด',
    },
  },
  scales: {
    y: {
      min : 0,
      max : 50
    }
  }
};

export const optionsitup = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'ลุก-นั่ง 30 วินาที ',
    },
  },
  scales: {
    y: {
      min : 0,
      max : 30
    }
  }
};

export const optionWeight = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'น้ำหนัก',
    },
  },
  scales: {
    y: {
      min : 20,
      max : 80
    }
  }
};

export const optionHieght = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'ส่วนสูง',
    },
  },
  scales: {
    y: {
      min : 100,
      max : 190
    }
  }
};


function Dashboard() {

  const [Student, setStudent] = React.useState<StudentRecordsInterface[]>([]);


  const [TeacherRecord, setTeacherRecord] = React.useState<Partial<TeacherReocrdsInterface>>({});

  const [Selectstudent, setSelectstudent] = React.useState<StudentRecordsInterface[]>([]);

  
  
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (event.target.value === "กรุณาเลือก")
      return
    // const name = event.target.name as keyof typeof Physical;
    getstudentbyid(event.target.value as number)
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
    fetch(`${apiUrl}/teacherrecord/detail/${localStorage.getItem("uid")}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTeacherRecord(res.data);
          getstudent(res.data.TeacherRecordYear, res.data.GradeID, res.data.ClassRoomID);
        } else {
          console.log("else");
        }
      });
  }

  const getstudent = async (teacheryear: number, teachergrade: number, teacherclassroom: number) => {
    fetch(`${apiUrl}/studentrecordswithphysical/${teacheryear}/${teachergrade}/${teacherclassroom}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudent(res.data);
          console.log(res.data)
        } else {
          console.log("else");
        }
      });
  }

  const getstudentbyid = async (studentid: number) => {
    fetch(`${apiUrl}/studentrecordbyid/${studentid}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSelectstudent(res.data);
          console.log('setSelectstudent',res.data)
        } else {
          console.log("else");
        }
      });
  }

  

  const labels = Selectstudent.map(x => {return x.Physical_Fitness ? moment(x.Physical_Fitness.CreatedAt).format('l'): null})

  
  const dataJump = {
    labels,
    datasets: [
      {
        label:'ยืนกระโดดไกล ',
        data: Selectstudent.map(x => {return x.Physical_Fitness ? x.Physical_Fitness.Longjump: null}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };

  const dataRun = {
    labels,
    datasets: [
      {
        label:'วิ่ง 50 เมตร',
        data: Selectstudent.map(x => {return x.Physical_Fitness ? x.Physical_Fitness.Run50: null}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };

    const dataStrength = {
    labels,
    datasets: [
      {
        label:'แรงบีบมือที่ถนัด',
        data: Selectstudent.map(x => {return x.Physical_Fitness ? x.Physical_Fitness.GripStrength: null}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };


    const dataSitup = {
    labels,
    datasets: [
      {
        label:'ลุก-นั่ง 30 วินาที',
        data: Selectstudent.map(x => {return x.Physical_Fitness ? x.Physical_Fitness.SitUp: null}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };

  const dataWeight = {
    labels,
    datasets: [
      {
        label:'น้ำหนัก',
        data: Selectstudent.map(x => {return x.Physical_Fitness ? x.Physical_Fitness.Wieght: null}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };



  const dataHeight = {
    labels,
    datasets: [
      {
        label:'ส่วนสูง',
        data: Selectstudent.map(x => {return x.Physical_Fitness ? x.Physical_Fitness.Height: null}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };








  useEffect(() => {

    getteacher();
    

  }, []);

  return (
    <Container>
      <br></br>
      <Row>
        <Col sm={3}><Form.Group className="mb-2" >
          <Form.Label>ชั้น</Form.Label>
          <Form.Select
            name="GradeID"
            aria-label="GradeID"
            disabled
          >
            <option>{TeacherRecord.Grade?.Grade}</option>


          </Form.Select>
        </Form.Group></Col>

        <Col sm={3}><Form.Group className="mb-2" >
          <Form.Label>ห้องเรียน</Form.Label>
          <Form.Select
            name="TeacherID"
            aria-label="TeacherID"
            disabled
          >
            <option>{TeacherRecord.ClassRoom?.Room}</option>

          </Form.Select>
        </Form.Group>
        </Col>
        <Col sm={6}><Form.Group className="mb-2" >
          <Form.Label>นักเรียน</Form.Label>
          <Form.Select
            name="StudentRecordID"
            aria-label="StudentRecordID"
            onChange={handleChange}
          >
            <option>กรุณาเลือก</option>
            {Student.map((item: StudentRecordsInterface) => (
              <option value={item.StudentID} key={item.ID}>
                {item.Student.First_Name + " " + item.Student.Last_Name}
              </option>

            ))}

          </Form.Select>
        </Form.Group>
        </Col>
      </Row>
      <br></br>
      <Row>
      <Col>      <Line options={optionJump} data={dataJump} /></Col>
      <Col>      <Line options={optionRun} data={dataRun} /></Col>
      </Row>
      <Row>
      <Col>      <Line options={optionStrength} data={dataStrength} /></Col>
      <Col>      <Line options={optionsitup} data={dataSitup} /></Col>
      </Row>

      <Row>
      <Col>      <Line options={optionWeight} data={dataWeight} /></Col>
      <Col>      <Line options={optionHieght} data={dataHeight} /></Col>
      </Row>


      <br></br>

    </Container>

  )
}
export default Dashboard;