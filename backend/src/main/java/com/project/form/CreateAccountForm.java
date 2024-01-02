package com.project.form;

import lombok.Data;

@Data
public class CreateAccountForm {
    private String username;
    private String email;
    private String password;
    private String salt;
}
