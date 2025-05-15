import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const severities = ['Low', 'Medium', 'High'];

function NewTaskPage() {
  const [taskName, setTaskName] = useState('');
  const [employeeList, setEmployeeList] = useState([]); 
  const [selectedEmployee, setSelectedEmployee] = useState(''); 
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [submissionDate, setSubmissionDate] = useState(dayjs());
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`http://localhost:8080/tasks/admin/${id}/employees`)
      .then((response) => {
        setEmployeeList(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, [id]);

  const handleSubmit = () => {
    const subDate = submissionDate.format('YYYY-MM-DD');
    const subTime = submissionDate.format('HH:mm:ss');
  
    const newTask = {
      taskName,
      taskDescription: description,
      taskSeverity: severity,
      assignedTo: selectedEmployee,
      assignedBy: parseInt(id), 
      subDate,
      subTime,
    };
  
    axios
      .post('http://localhost:8080/tasks/add', newTask)
      .then((response) => {
        console.log('Task added successfully:', response.data);
        alert('Task assigned successfully!');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
        alert('Failed to assign task.');
      });
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', p: 5 }}>
        <Paper elevation={1} sx={{ p: 5, borderRadius: 3, maxWidth: '1000px', mx: 'auto' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            New Task
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Task Name"
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <Box mt={3}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>

              <Box mt={3}>
                <TextField
                  label="Task Severity"
                  fullWidth
                  select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  {severities.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Employee"
                fullWidth
                select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                {employeeList.map((emp) => (
                  <MenuItem key={emp.empId} value={emp.empId}>
                    {emp.empName}
                  </MenuItem>
                ))}
              </TextField>

              <Box mt={4}>
                <Typography fontSize={14} fontWeight="bold" gutterBottom>
                  Select Submission Date
                </Typography>
                <DateTimePicker
                  value={submissionDate}
                  onChange={setSubmissionDate}
                  format="ddd, MMM D YYYY hh:mm A"
                  sx={{ width: '100%' }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="space-between" mt={5}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '4px' }}
              onClick={handleGoBack} 
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '4px' }}
              onClick={handleSubmit}
            >
              Assign New Task
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}

export default NewTaskPage;