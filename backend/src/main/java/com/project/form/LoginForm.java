package com.project.form;

import lombok.Data;

@Data
public class LoginForm {
    private String username;
    private String email;
    private String password;
    private String salt;
}
