package com.project.service.impl;

import com.project.dto.LoginDto;
import com.project.form.LoginForm;
import com.project.mapper.LoginMapper;
import com.project.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Loginに関わる処理を記述するServiceクラス
 */
@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginMapper loginMapper;

    @Override
    public LoginDto login(LoginForm form) {
        LoginDto dto = loginMapper.login(form);
        return dto;
    }
}
