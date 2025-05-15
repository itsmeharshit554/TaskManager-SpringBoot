import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";

function TaskCardAd({ taskID, title, severity, timeDead, subDate, assignedTo, assignedBy }) {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(taskID);

  const handleView = (t_id) => {
    navigate(`/viewTask/${id}/${t_id}`, { state: { id: t_id } });
  };

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:8080/tasks/${taskID}`, {
        method: "DELETE",
      });
      alert("Task submitted successfully");
      window.location.reload(); 
    } catch (err) {
      console.error("Submit failed", err);
      alert("Submission failed");
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
              color="error"
              size="small"
              onClick={handleSubmit} // Correctly pass the handleSubmit function
            >
              Delete Task
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TaskCardAd;