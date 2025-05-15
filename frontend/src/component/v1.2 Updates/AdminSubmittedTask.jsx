import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubmittedTask from './SubmittedCard';
import Navbar from '../Nav';
import { Button } from '@mui/material';
import AdminNavbar from '../NavAdmin';
const AdminSubmittedTask = () => {
  const { id } = useParams(); // Get admin ID from the URL
  const [submittedTasks, setSubmittedTasks] = useState([]); 
  useEffect(() => {
    // Fetch submitted tasks from the backend
    axios
      .get(`http://localhost:8080/tasks/submittedTask/admin/${id}`)
      .then((response) => {
        setSubmittedTasks(response.data); // 
        console.log('Submitted tasks fetched:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching submitted tasks:', error);
      });
  }, [id]);

  return (
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-8">
        <AdminNavbar />
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textAlign: "center", mb: 4, marginTop: 5 }}>
          Submitted Tasks
        </Typography>
        {submittedTasks.map((task) => (
          <SubmittedTask
            key={task.task_id}
            task_id={task.task_id}
            task_name={task.taskName}
            task_description={task.taskDescription}
            subDate={task.subDate}
            severity={task.taskSeverity}
            subTime={task.subTime}
            submittedOn={task.submittedOn}
          />
        ))}
    </div>
  )
};

export default AdminSubmittedTask;
