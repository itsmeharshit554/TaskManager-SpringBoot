import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleLogout = () => {
    localStorage.removeItem('employeeLoggedIn');
    navigate('/');
  };
  const addNewTask = () => {
    navigate(`/newTask/${id}`);
  }
  const viewSubmittedTask = () => {
    navigate(`/employee/viewSubmittedTask/${id}`);
  }
  const goToHome = () => {
    navigate(`/user/${id}`);
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={goToHome}>
          TSK_MGR 
        </Typography>
        <Box>
          <Button color="info" onClick={viewSubmittedTask}>VIEW SUBMITTED TASK</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;