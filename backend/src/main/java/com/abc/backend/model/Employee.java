package com.abc.backend.model;
import org.springframework.stereotype.Component;

@Component
public class Employee {
    private int empId;
    private String empName;
    private String empMail;
    private String empUser;
    private String password;

    // Constructors
    public Employee() {}

    public Employee(int empId, String empName, String empMail, String empUser, String password) {
        this.empId = empId;
        this.empName = empName;
        this.empMail = empMail;
        this.empUser = empUser;
        this.password = password;
    }

    // Getters and Setters
    public int getEmpId() { return empId; }
    public void setEmpId(int empId) { this.empId = empId; }

    public String getEmpName() { return empName; }
    public void setEmpName(String empName) { this.empName = empName; }

    public String getEmpMail() { return empMail; }
    public void setEmpMail(String empMail) { this.empMail = empMail; }

    public String getEmpUser() { return empUser; }
    public void setEmpUser(String empUser) { this.empUser = empUser; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
