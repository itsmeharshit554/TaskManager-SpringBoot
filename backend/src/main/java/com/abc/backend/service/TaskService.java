package com.abc.backend.service;

import com.abc.backend.model.Employee;
import com.abc.backend.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 1. Add task by admin
    public void addTask(Task task) {
        String sql = """
            INSERT INTO task (task_name, task_description, sub_date, sub_time, task_severity, assigned_to, assigned_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """;
        jdbcTemplate.update(sql,
                task.getTaskName(),
                task.getTaskDescription(),
                task.getSubDate(),
                task.getSubTime(),
                task.getTaskSeverity(),
                task.getAssignedTo(),
                task.getAssignedBy()
        );
    }

    // 2. Delete task by employee
    public void deleteTask(int taskId) {
        String sql = "DELETE FROM task WHERE task_id = ?";
        jdbcTemplate.update(sql, taskId);
    }
    
    public List<Task> getTasksByEmployeeId(int empId) {
        String sql = "SELECT * FROM task WHERE assigned_to = ?";
        List<Task> tasks = jdbcTemplate.query(sql, new Object[]{empId}, getTaskRowMapper());

        Map<String, Integer> severityOrder = Map.of(
                "High", 1,
                "Medium", 2,
                "Low", 3
        );

        return tasks.stream()
                .sorted(Comparator.comparingInt(
                        task -> severityOrder.getOrDefault(task.getTaskSeverity(), Integer.MAX_VALUE)))
                .toList();
    }

    public List<Task> getTasksByAdminId(int adminId) {
        String sql = "SELECT * FROM task WHERE assigned_by = ?";
        List<Task> tasks = jdbcTemplate.query(sql, new Object[]{adminId}, getTaskRowMapper());

        Map<String, Integer> severityOrder = Map.of(
                "High", 1,
                "Medium", 2,
                "Low", 3
        );

        return tasks.stream()
                .sorted(Comparator.comparingInt(
                        task -> severityOrder.getOrDefault(task.getTaskSeverity(), Integer.MAX_VALUE)))
                .toList();
    }

    // 5. Get task by Task ID
    public Task getTaskByTaskId(int taskId) {
        String sql = "SELECT * FROM task WHERE task_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{taskId}, getTaskRowMapper());
    }

    // 6. Get both Employee & Admin details by Task ID (with severity, date, time)
    public TaskDetails getTaskDetailsByTaskId(int taskId) {
        String sql = """
            SELECT t.task_id, t.task_name, t.task_description, t.task_severity,
                   t.sub_date, t.sub_time, t.assigned_to, t.assigned_by,
                   e.emp_id, e.emp_name,
                   a.admin_id, a.admin_name
            FROM task t
            JOIN employee e ON t.assigned_to = e.emp_id
            JOIN admin a ON t.assigned_by = a.admin_id
            WHERE t.task_id = ?
        """;

        return jdbcTemplate.queryForObject(sql, new Object[]{taskId}, (rs, rowNum) -> {
            TaskDetails details = new TaskDetails();
            details.setTaskId(rs.getInt("task_id"));
            details.setTaskName(rs.getString("task_name"));
            details.setTaskDescription(rs.getString("task_description"));
            details.setTaskSeverity(rs.getString("task_severity"));
            details.setSubDate(rs.getDate("sub_date"));
            details.setSubTime(rs.getTime("sub_time"));
            details.setEmpId(rs.getInt("emp_id"));
            details.setEmpName(rs.getString("emp_name"));
            details.setAdminId(rs.getInt("admin_id"));
            details.setAdminName(rs.getString("admin_name"));
            return details;
        });
    }

    // 7. Get unique employees assigned by specific admin
    public List<Employee> getEmployeesByAdminId(int adminId) {
        String sql = """
            SELECT DISTINCT e.emp_id, e.emp_name
            FROM task t
            JOIN employee e ON t.assigned_to = e.emp_id
            WHERE t.assigned_by = ?
        """;
        return jdbcTemplate.query(sql, new Object[]{adminId}, (rs, rowNum) -> {
            Employee emp = new Employee();
            emp.setEmpId(rs.getInt("emp_id"));
            emp.setEmpName(rs.getString("emp_name"));
            return emp;
        });
    }

    // 8. Submit task (move from task to submitted_task)
    public void submitTask(int taskId) {
        // Fetch task
        String fetchSql = "SELECT * FROM task WHERE task_id = ?";
        Task task = jdbcTemplate.queryForObject(fetchSql, new Object[]{taskId}, getTaskRowMapper());

        // Insert into submitted_task
        String insertSql = """
            INSERT INTO submitted_task (task_id, task_name, task_description, sub_date, sub_time,
                                        task_severity, assigned_to, assigned_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """;

        jdbcTemplate.update(insertSql,
                task.getTaskId(),
                task.getTaskName(),
                task.getTaskDescription(),
                task.getSubDate(),
                task.getSubTime(),
                task.getTaskSeverity(),
                task.getAssignedTo(),
                task.getAssignedBy()
        );

        // Delete from task
        String deleteSql = "DELETE FROM task WHERE task_id = ?";
        jdbcTemplate.update(deleteSql, taskId);
    }

    // RowMapper for Task
    private RowMapper<Task> getTaskRowMapper() {
        return (rs, rowNum) -> {
            Task task = new Task();
            task.setTaskId(rs.getInt("task_id"));
            task.setTaskName(rs.getString("task_name"));
            task.setTaskDescription(rs.getString("task_description"));
            task.setSubDate(rs.getDate("sub_date"));
            task.setSubTime(rs.getTime("sub_time"));
            task.setTaskSeverity(rs.getString("task_severity"));
            task.setAssignedTo(rs.getInt("assigned_to"));
            task.setAssignedBy(rs.getInt("assigned_by"));
            return task;
        };
    }
    public List<Task> getSubmittedTasksByAdminId(int adminId) {
        String sql = "SELECT * FROM submitted_task WHERE assigned_by = ?";
        List<Task> tasks = jdbcTemplate.query(sql, new Object[]{adminId}, getTaskRowMapper());

        Map<String, Integer> severityOrder = Map.of(
                "High", 1,
                "Medium", 2,
                "Low", 3
        );

        return tasks.stream()
                .sorted(Comparator.comparingInt(
                        task -> severityOrder.getOrDefault(task.getTaskSeverity(), Integer.MAX_VALUE)))
                .toList();
    }

    public List<Task> getSubmittedTasksByEmployeeId(int empId) {
        String sql = "SELECT * FROM submitted_task WHERE assigned_to = ?";
        List<Task> tasks = jdbcTemplate.query(sql, new Object[]{empId}, getTaskRowMapper());

        Map<String, Integer> severityOrder = Map.of(
                "High", 1,
                "Medium", 2,
                "Low", 3
        );

        return tasks.stream()
                .sorted(Comparator.comparingInt(
                        task -> severityOrder.getOrDefault(task.getTaskSeverity(), Integer.MAX_VALUE)))
                .toList();
    }
    // Inner class for full task + employee + admin detail
    public static class TaskDetails {
        private int taskId;
        private String taskName;
        private String taskDescription;
        private String taskSeverity;
        private Date subDate;
        private Time subTime;
        private int empId;
        private String empName;
        private int adminId;
        private String adminName;

        // Getters and setters...
        public int getTaskId() { return taskId; }
        public void setTaskId(int taskId) { this.taskId = taskId; }

        public String getTaskName() { return taskName; }
        public void setTaskName(String taskName) { this.taskName = taskName; }

        public String getTaskDescription() { return taskDescription; }
        public void setTaskDescription(String taskDescription) { this.taskDescription = taskDescription; }

        public String getTaskSeverity() { return taskSeverity; }
        public void setTaskSeverity(String taskSeverity) { this.taskSeverity = taskSeverity; }

        public Date getSubDate() { return subDate; }
        public void setSubDate(Date subDate) { this.subDate = subDate; }

        public Time getSubTime() { return subTime; }
        public void setSubTime(Time subTime) { this.subTime = subTime; }

        public int getEmpId() { return empId; }
        public void setEmpId(int empId) { this.empId = empId; }

        public String getEmpName() { return empName; }
        public void setEmpName(String empName) { this.empName = empName; }

        public int getAdminId() { return adminId; }
        public void setAdminId(int adminId) { this.adminId = adminId; }

        public String getAdminName() { return adminName; }
        public void setAdminName(String adminName) { this.adminName = adminName; }
    }
}
