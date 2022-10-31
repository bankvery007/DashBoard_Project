import React,{useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeNavbar from './components/HomeNavbars';
import NavbarAdmin from './components/NavbarAdmin';
import CreateTeacher from './components/CreateTeacher';
import CreateStudent from './components/CreateStudent';
import TableTeacher from './components/TableTeacher';
import TeacherRecord from './components/TeacherRecord';
import TableStudent from './components/TableStudent';
import StudentRecord from './components/StudentRecord';
import SignInHome from './components/SigninHome';
import CreatePhysical from './components/CreatePhysical';
import "./App.css"
function App() {

  const [token, setToken] = React.useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignInHome />;
  }

  return (
                 
    <Router>
       <HomeNavbar></HomeNavbar>
   <Routes>
    <Route path="/" element={<CreateTeacher/>} />
    <Route path="/createteacher" element={<CreateTeacher/>} />
    <Route path="/createstudent" element={<CreateStudent/>} />
    <Route path="/tablestudent" element={<TableStudent/>} />
    <Route path="/tableteacher" element={<TableTeacher/>} />
    <Route path="/teacherrecord" element={<TeacherRecord/>} />
    <Route path="/studentrecord" element={<StudentRecord/>} />
    <Route path="/createphysical" element={<CreatePhysical/>} />
   </Routes>
   </Router>
  );
}

export default App;
