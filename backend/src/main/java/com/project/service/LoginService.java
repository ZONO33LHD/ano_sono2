package com.project.service;

import com.project.dto.LoginDto;
import com.project.form.LoginForm;

public interface LoginService {

    /**
     * ユーザ新規登録メソッド
     */
    public LoginDto register(LoginForm form);

    /**
     * ログイン処理を行うメソッド
     */
    public LoginDto login(LoginForm form);
}
