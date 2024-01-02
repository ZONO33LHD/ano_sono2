package com.project.Controller;

import com.project.dto.LoginDto;
import com.project.form.CreateAccountForm;
import com.project.form.LoginForm;
import com.project.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @Value("${spring.application.name}")
    private String name;

    /**
     * ユーザ新規登録メソッド
     */
    @PostMapping("/api/register")
    public LoginDto register(@RequestBody CreateAccountForm form) {
        logger.info("Form: " + form.toString());
        logger.info(name);
        LoginDto response = loginService.register(form);
        logger.info("Response: " + response);
        return response;
    }

    /**
     * ログインメソッド
     */
    @PostMapping("/api/login")
    public LoginDto login(@RequestBody LoginForm form) {
        logger.info("Form: " + form.toString());
        logger.info(name);
        LoginDto response = loginService.login(form);
        logger.info("Response: " + response);
        return response;
    }
}