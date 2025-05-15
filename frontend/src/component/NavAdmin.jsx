import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };
  const addNewTask = () => {
    navigate(`/newTask/${id}`);
  }
  const viewSubmittedTask = () => {
    navigate(`/admin/viewSubmittedTask/${id}`);
  }
  const goToHome = () => {
    navigate(`/adminHome/${id}`);
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={goToHome}>
          TSK_MGR
        </Typography>
        <Box>
          <Button color="secondary" onClick={addNewTask}>Add New Task</Button>
          <Button color="info" onClick={viewSubmittedTask}>VIEW SUBMITTED TASK</Button>
          <Button color="warning" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;