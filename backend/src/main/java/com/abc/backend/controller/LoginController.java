package com.abc.backend.controller;
import com.abc.backend.model.LoginRequest;
import com.abc.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest request) {
        Integer adminId = loginService.getAdminIdIfValid(request.getUsername(), request.getPassword());
        if (adminId != null) {
            return ResponseEntity.ok(adminId);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin credentials");
        }
    }

    @PostMapping("/employee/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginRequest request) {
        Integer employeeId = loginService.getEmployeeIdIfValid(request.getUsername(), request.getPassword());
        if (employeeId != null) {
            return ResponseEntity.ok(employeeId);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid employee credentials");
        }
    }
}