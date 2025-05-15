package com.abc.backend.controller;

import com.abc.backend.model.Employee;
import com.abc.backend.model.Task;
import com.abc.backend.service.TaskService;
import com.abc.backend.service.TaskService.TaskDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public String addTask(@RequestBody Task task) {
        taskService.addTask(task);
        return "Task added successfully";
    }

    @DeleteMapping("/{taskId}")
    public String deleteTask(@PathVariable int taskId) {
        taskService.deleteTask(taskId);
        return "Task deleted successfully";
    }

    @GetMapping("/employee/{empId}")
    public List<Task> getTasksByEmployee(@PathVariable int empId) {
        return taskService.getTasksByEmployeeId(empId);
    }

    @GetMapping("/admin/{adminId}")
    public List<Task> getTasksByAdmin(@PathVariable int adminId) {
        return taskService.getTasksByAdminId(adminId);
    }

    @GetMapping("/{taskId}")
    public Task getTaskById(@PathVariable int taskId) {
        return taskService.getTaskByTaskId(taskId);
    }

    @GetMapping("/details/{taskId}")
    public TaskDetails getTaskDetailsByTaskId(@PathVariable int taskId) {
        return taskService.getTaskDetailsByTaskId(taskId);
    }
    @GetMapping("/admin/{adminId}/employees")
    public List<Employee> getEmployeesByAdminId(@PathVariable int adminId) {
        return taskService.getEmployeesByAdminId(adminId);
    }
    @PostMapping("/submit/{taskId}")
    public ResponseEntity<String> submitTask(@PathVariable int taskId) {
        taskService.submitTask(taskId);
        return ResponseEntity.ok("Task submitted successfully.");
    }
    @GetMapping("/submittedTask/admin/{adminId}")
    public List<Task> getSubmittedTasksByAdmin(@PathVariable int adminId) {
        return taskService.getSubmittedTasksByAdminId(adminId);
    }
    @GetMapping("/submittedTask/employee/{empId}")
    public List<Task> getSubmittedTasksByEmployee(@PathVariable int empId) {
        return taskService.getSubmittedTasksByEmployeeId(empId);
    }
}
