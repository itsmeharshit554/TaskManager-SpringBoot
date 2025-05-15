import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import axios from "axios";

function TaskCard({ taskID, title, severity, timeDead, subDate, assignedTo, assignedBy }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming `id` is the user or admin ID
  console.log("Task ID:", taskID);

  // Navigate to the task details page
  const handleView = (t_id) => {
    navigate(`/viewTask/${id}/${t_id}`, { state: { id: t_id } });
  };

  // Submit the task
  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/tasks/submit/${taskID}`);
      alert("Congrats, Task Completed!");
      window.location.reload(); 
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Failed to Submit TASK");
    }
  };

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
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold">
            {title}
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
            <strong>Deadline:</strong> {timeDead}
          </Typography>

          <Box mt={2} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleView(taskID)} // Pass a function reference
            >
              View Task
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleSubmit} // Correctly pass the handleSubmit function
            >
              Submit Task
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TaskCard;