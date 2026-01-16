package com.korit.allways_back.controller;

import com.korit.allways_back.security.PrincipalUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    PrincipalUser principalUser = PrincipalUser.get();

    @GetMapping("/me")
    public ResponseEntity<Void> tokenCheckValid() {
        PrincipalUser principalUser = PrincipalUser.get();

        if (principalUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok().build();
    }
}
