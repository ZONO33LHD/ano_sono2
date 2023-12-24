package com.project.service;

import com.project.dto.LoginDto;
import com.project.form.LoginForm;

public interface LoginService {

    public LoginDto login(LoginForm form);
}
