import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignIn_Admin from './Signin_Admin';
import Signin_Teacher from './Signin_Teacher';

export default function Navbar_Teacher() {
  
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
   
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">ระบบโรงเรียน</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="tableteacher">รายชื่อนักเรียนในห้อง</Nav.Link>
            <Nav.Link href="createphysical">บันทึกสมรรถภาพนักเรียน</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a onClick={signout} href="#logout">ออกจากระบบ</a>
          </Navbar.Text>
        </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
    
}

