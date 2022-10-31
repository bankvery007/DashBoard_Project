import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Signins_AdminInterface } from "../models/ISignin_Admin";
import Tab from 'react-bootstrap/Tab';


function Signin_Teacher() {
  const [signin, setSignin] = useState<Partial<Signins_AdminInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const login = () => {
    const apiUrl = "http://localhost:8080/login_teacher";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    console.log(requestOptions)
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          console.log(res.data)
          localStorage.setItem("token", res.data.token);//ยืนยัน
          localStorage.setItem("uid", res.data.id);//ส่ง id มาพร้อมกับ token
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("role", "Teacher");
          window.location.reload()
        } else {
          // console.log(res.error)
          setError(true);
          
        }
      });
  };
  

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
    console.log(signin)
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };



  return (
    <div className="Auth-form-container">

    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">เข้าสู่ระบบ</h3>
        <div className="form-group mt-3">
          <label>รหัสประจำตัวคุณครู</label>
          <input
            type="string"
            name="codeid"
            id="codeid"
            onChange={handleInputChange}
            className="form-control mt-1"
            placeholder="กรุณากรอกรหัสประจำตัว"

          />
        </div>
        <div className="form-group mt-3">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mt-1"
            placeholder="กรุณากรอกรหัสผ่าน"
            onChange={handleInputChange}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={login} type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>

  </div>

  )
}

export default Signin_Teacher;

 /* <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">เข้าสู่ระบบ</h3>
          <div className="form-group mt-3">
            <label>รหัสประจำตัวคุณครู</label>
            <input
              type="string"
              name="code_admin"
              id="code_admin"
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Enter email"
            
            />
          </div>
          <div className="form-group mt-3">
            <label>รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleInputChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={login} type="button"  className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form> */