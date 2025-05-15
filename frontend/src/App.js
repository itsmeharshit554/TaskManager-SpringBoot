import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import Navbar from './component/Nav';
import Login from './component/Login';
import AdminLogin from './component/AdminLogin';
import AdminHome from './component/AdminHome';
import Home from './component/UHome';
import NewTaskPage from './component/AdminTask';
import ViewTask from './component/viewlTask';
import AdminSubmittedTask from './component/v1.2 Updates/AdminSubmittedTask';
import EmpSubmittedTask from './component/v1.2 Updates/EmpSubmittedTask';
const task = {
  name: 'Design Login Page',
  description:
    'Create a responsive login page for employees and admins using React and Tailwind.\nIntegrate with Spring Boot backend for authentication.',
  submissionDate: '20/4/2025',
  deadline: '11:59 PM',
  severity: 'High',
};
function SelectLoginType() {
  const navigate = useNavigate();
  return (
    
    <Box textAlign="center" mt={4}>
      
      <Typography variant="h5" gutterBottom>
        Select Type of Login
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
        sx={{ margin: 1 }}
      >
        Login as Employee
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/adminLogin")}
        sx={{ margin: 1 }}
      >
        Login as Admin
      </Button>
    </Box>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SelectLoginType />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path='/user/:id' element={<Home />} />
        <Route path="/adminHome/:id" element={<AdminHome />} />
        <Route path="/newTask/:id" element={<NewTaskPage />} />
        <Route path="/viewTask/:id/:task_id" element={<ViewTask task={task} />} />
        {/* <Route path="/viewSubmittedTask" element={<AdminSubmittedTask />} /> */}
        <Route path="/admin/viewSubmittedTask/:id" element={<AdminSubmittedTask />} />
        <Route path="/employee/viewSubmittedTask/:id" element={<EmpSubmittedTask />} />
      </Routes>
    </div>
  );
}

export default App;
