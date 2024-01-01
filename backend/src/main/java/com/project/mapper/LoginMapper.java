package com.project.mapper;

import com.project.dto.LoginDto;
import com.project.form.LoginForm;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    /**
     * ユーザ新規登録メソッド
     */
    public int register(LoginForm form);

    /**
     * ログイン処理を行うメソッド
     */
    LoginDto login(LoginForm form);
}
