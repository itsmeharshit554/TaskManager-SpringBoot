package com.abc.backend.model;

import java.sql.Date;
import java.sql.Time;

public class Task {
    private int taskId;
    private String taskName;
    private String taskDescription;
    private Date subDate;
    private Time subTime;
    private String taskSeverity;
    private int assignedTo;
    private int assignedBy;

    // Getters and Setters
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public Date getSubDate() {
        return subDate;
    }

    public void setSubDate(Date subDate) {
        this.subDate = subDate;
    }

    public Time getSubTime() {
        return subTime;
    }

    public void setSubTime(Time subTime) {
        this.subTime = subTime;
    }

    public String getTaskSeverity() {
        return taskSeverity;
    }

    public void setTaskSeverity(String taskSeverity) {
        this.taskSeverity = taskSeverity;
    }

    public int getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(int assignedTo) {
        this.assignedTo = assignedTo;
    }

    public int getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(int assignedBy) {
        this.assignedBy = assignedBy;
    }
}
