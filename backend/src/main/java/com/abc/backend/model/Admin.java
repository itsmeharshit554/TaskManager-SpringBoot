package com.abc.backend.model;

import org.springframework.stereotype.Component;

@Component
public class Admin {
    private int adminId;
    private String adminName;
    private String adminMail;
    private String adminUser;
    private String adminPassword;

    // Constructors
    public Admin() {}

    public Admin(int adminId, String adminName, String adminMail, String adminUser, String adminPassword) {
        this.adminId = adminId;
        this.adminName = adminName;
        this.adminMail = adminMail;
        this.adminUser = adminUser;
        this.adminPassword = adminPassword;
    }

    // Getters and Setters
    public int getAdminId() { return adminId; }
    public void setAdminId(int adminId) { this.adminId = adminId; }

    public String getAdminName() { return adminName; }
    public void setAdminName(String adminName) { this.adminName = adminName; }

    public String getAdminMail() { return adminMail; }
    public void setAdminMail(String adminMail) { this.adminMail = adminMail; }

    public String getAdminUser() { return adminUser; }
    public void setAdminUser(String adminUser) { this.adminUser = adminUser; }

    public String getAdminPassword() { return adminPassword; }
    public void setAdminPassword(String adminPassword) { this.adminPassword = adminPassword; }
}
