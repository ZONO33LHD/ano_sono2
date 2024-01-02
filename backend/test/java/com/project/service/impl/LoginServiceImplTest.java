package com.project.service.impl;

import com.project.dto.LoginDto;
import com.project.form.CreateAccountForm;
import com.project.form.LoginForm;
import com.project.mapper.LoginMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class LoginServiceImplTest {

    @InjectMocks
    private LoginServiceImpl loginService;

    @Mock
    private LoginMapper loginMapper;

    private CreateAccountForm createAccountForm;
    private LoginForm form;
    private LoginDto dto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);

        createAccountForm = new CreateAccountForm();
        createAccountForm.setUsername("test");
        createAccountForm.setEmail("test@gmail.com");
        // パスワードをハッシュ化して設定します
        String salt = loginService.getSalt();
        String hashedPassword = loginService.hashPassword("Test1020h!", salt);
        createAccountForm.setPassword(hashedPassword);
        createAccountForm.setSalt(salt);

        form = new LoginForm();
        form.setEmail("test@gmail.com");
        form.setPassword("Test1020h!");

        dto = new LoginDto();
        dto.setEmail("test@gmail.com");
        dto.setPassword(hashedPassword);
        dto.setSalt(salt);
    }

    @Test
    public void testRegister() {
        when(loginMapper.register(createAccountForm)).thenReturn(1);

        LoginDto response = loginService.register(createAccountForm);

        assertEquals(1L, response.getResultFlag());
    }

    @Test
    public void testLogin() {
        when(loginMapper.login(form)).thenReturn(dto);

        LoginDto response = loginService.login(form);

        assertEquals(1L, response.getResultFlag());
    }
}