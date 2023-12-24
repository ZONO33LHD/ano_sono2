package com.project.mapper;

import com.project.dto.LoginDto;
import com.project.form.LoginForm;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    LoginDto login(LoginForm form);
}
