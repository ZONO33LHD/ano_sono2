package com.project.Controller;

import com.project.dto.LoginDto;
import com.project.form.LoginForm;
import com.project.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


/**
 * Loginに関わる処理を記述するControllerクラス
 */
@RestController

public class LoginController {

    Logger logger = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private LoginService loginService;

    @Value("${spring.application.name}")
    private String name;

    /**
     * ログイン処理を行うメソッド
     */
    @PostMapping("/api/login")
    public LoginDto login(@RequestBody LoginForm form) {
        logger.info(name);
        LoginDto response = loginService.login(form);
        logger.info("Response: " + response);
        return response;
    }
}
