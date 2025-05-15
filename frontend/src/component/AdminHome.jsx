import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import TaskCardAd from "./TaskAd"; // Adjust the import path as necessary
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminNavbar from "./NavAdmin"; // Adjust the import path as necessary

function Home() {
  const [tasks, setTasks] = useState([]);
  const { id }  = useParams(); // Ensure empID is used consistently
  console.log(id);

  useEffect(() => {
    // Fetch tasks from the Spring Boot backend
    axios
      .get(`http://localhost:8080/tasks/admin/${id}`) // Corrected empID usage
      .then((response) => {
        setTasks(response.data);
        console.log("Tasks fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [id]); // Added empID as a dependency to re-fetch if it changes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
       <AdminNavbar></AdminNavbar>
      <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ marginLeft:10,marginTop:5 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" sx={{ marginLeft:10 }}>
              Welcome! Here you can view and manage your tasks.
            </Typography>

      {tasks.map((task, index) => (
        <TaskCardAd taskID={task.taskId} title={task.taskName} severity={task.taskSeverity} timeDead={task.subTime} subDate={task.subDate} assignedBy={task.assignedBy} assignedTo={task.assignedTo} />
      ))}
    </div>
  );
}

export default Home;