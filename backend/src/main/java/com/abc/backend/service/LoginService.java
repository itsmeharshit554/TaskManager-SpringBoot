package com.abc.backend.service;

import com.abc.backend.model.Admin;
import com.abc.backend.model.Employee;
import com.abc.backend.model.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean authenticateAdmin(String username, String password) {
        String sql = "SELECT COUNT(*) FROM admin WHERE admin_user = ? AND admin_password = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{username, password}, Integer.class);
        return count != null && count > 0;
    }

    public boolean authenticateEmployee(String username, String password) {
        String sql = "SELECT COUNT(*) FROM employee WHERE emp_user = ? AND password = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{username, password}, Integer.class);
        return count != null && count > 0;
    }
    public Integer getEmployeeIdIfValid(String username, String password) {
        String sql = "SELECT emp_id FROM employee WHERE emp_user = ? AND password = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{username, password}, Integer.class);
        } catch (Exception e) {
            return null; // if no match is found
        }
    }
    public Integer getAdminIdIfValid(String username, String password) {
        String sql = "SELECT admin_id FROM admin WHERE admin_user = ? AND admin_password = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{username, password}, Integer.class);
        } catch (Exception e) {
            return null; // if no match is found
        }
    }

}

