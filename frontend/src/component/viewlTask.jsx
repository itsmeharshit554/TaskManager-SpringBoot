import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Divider, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewTask = () => {
  const navigate = useNavigate();
  const { task_id } = useParams();
  const [task, setTask] = useState(null); // Changed to store a single task object

  useEffect(() => {
    // Fetch task details from the backend
    axios
      .get(`http://localhost:8080/tasks/details/${task_id}`)
      .then((response) => {
        setTask(response.data); // Assuming the response contains a single task object
        console.log('Task fetched:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
      });
  }, [task_id]); // Added task_id as a dependency

  if (!task) {
    return <Typography>Loading...</Typography>; // Show a loading message while fetching data
  }

  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 5,
        p: 4,
        borderRadius: 3,
        backgroundColor: '#fdfdfd',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          {task.taskName}
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Description:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {task.taskDescription}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            Submission Date:
          </Typography>
          <Typography>{task.subDate}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            Deadline:
          </Typography>
          <Typography>{task.subTime}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            Severity:
          </Typography>
          <Typography>{task.taskSeverity}</Typography>
        </Grid>
        <br/>
        
      </Grid>
      <br></br>
      <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            Assigned By Admin 
          </Typography>
          <Typography>{task.adminName}</Typography>
        </Grid>
        <br></br>
        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
          Assigned To Employee
          </Typography>
          <Typography>{task.empName}</Typography>
        </Grid>
    </Paper>
  );
};

export default ViewTask;