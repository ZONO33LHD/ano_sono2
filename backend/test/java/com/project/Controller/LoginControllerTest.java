package com.project.Controller;

import com.project.dto.LoginDto;
import com.project.form.CreateAccountForm;
import com.project.form.LoginForm;
import com.project.service.LoginService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest(classes = {com.project.AnoSonoApplication.class})
@AutoConfigureMockMvc
class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LoginService loginService;

    private CreateAccountForm createAccountForm;
    private LoginForm form;
    private LoginDto dto;

    @BeforeEach
    public void setup() {
        createAccountForm = new CreateAccountForm();
        createAccountForm.setUsername("test");
        createAccountForm.setEmail("test@gmail.com");
        createAccountForm.setPassword("Test1020h!");

        form = new LoginForm();
        form.setUsername("test");
        form.setPassword("Test1020h!");

        dto = new LoginDto();
        dto.setUsername("test"); // ユーザー名を設定します
        dto.setEmail("test@gmail.com"); // メールアドレスを設定します
    }

    @Test
    public void testRegister() throws Exception {
        when(loginService.register(createAccountForm)).thenReturn(dto);

        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"test\",\"email\":\"test@gmail.com\",\"password\":\"Test1020h!\"}")) // emailを追加します
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("test"))
                .andExpect(jsonPath("$.email").value("test@gmail.com"));
    }

    @Test
    public void testLogin() throws Exception {
        when(loginService.login(form)).thenReturn(dto);

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"test\",\"password\":\"Test1020h!\"}")) // パスワードを修正します
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("test"))
                .andExpect(jsonPath("$.email").value("test@gmail.com"));
    }
}