package com.project.dto;

import lombok.Data;

@Data
public class LoginDto {
    private Long resultFlag;
    private String username;
    private String email;
    private String password;
    private String salt;
}
