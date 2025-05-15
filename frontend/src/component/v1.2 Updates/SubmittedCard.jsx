import React from 'react';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';

const SubmittedTask = ({ 
  task_id, 
  task_description, 
  task_name, 
  subDate, 
  severity, 
  subTime, 
  
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 3,
        backgroundColor: "#f4f4f4",
        p: 3,
        maxWidth: 900,
        mx: "auto", 
        mt: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold">
            {task_name}
          </Typography>
          <Typography variant="body1" mt={1}>
            <strong>Description:</strong> {task_description}
          </Typography>
          <Typography variant="body1" mt={1}>
            <strong>Severity:</strong> {severity}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Submission Date:</strong> {subDate}
          </Typography>
          <Typography variant="body1" mt={1}>
            <strong>Submission Time:</strong> {subTime}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SubmittedTask;