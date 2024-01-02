package com.project.service.impl;

import com.project.dto.LoginDto;
import com.project.form.CreateAccountForm;
import com.project.form.LoginForm;
import com.project.mapper.LoginMapper;
import com.project.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Loginに関わる処理を記述するServiceクラス
 */
@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginMapper loginMapper;

    /**
     * ユーザ新規登録メソッド
     */
    @Override
    public LoginDto register(CreateAccountForm createForm) {
        String salt = getSalt();
        String hashedPassword = hashPassword(createForm.getPassword(), salt);
        // hashedPasswordとsaltをformにセットします
        createForm.setPassword(hashedPassword);
        createForm.setSalt(salt);

        int result = loginMapper.register(createForm);
        LoginDto dto = new LoginDto();
        if (result >= 1) {
            dto.setResultFlag(1L); // 登録成功
            // saltをnullに設定します
            dto.setSalt(null);
        } else {
            dto.setResultFlag(0L); // 登録失敗
        }
        return dto;
    }

    /**
     * ログインメソッド
     */
    @Override
    public LoginDto login(LoginForm form) {
        LoginDto dto = loginMapper.login(form);
        if (dto != null) {
            String hashedPassword = hashPassword(form.getPassword(), dto.getSalt());
            if (dto.getPassword().equals(hashedPassword)) {
                dto.setResultFlag(1L); // ログイン成功
                // 自動ログインのためemailとpasswordをセットします
                dto.setEmail(form.getEmail());
            } else {
                dto.setResultFlag(0L); // ログイン失敗
            }
        } else {
            dto = new LoginDto();
            dto.setResultFlag(0L); // ログイン失敗
        }
        return dto;
    }

    /**
     * パスワードのハッシュ化を行うメソッド
     */
    public String hashPassword(String password, String salt) {
        String generatedPassword = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt.getBytes());
            byte[] bytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return generatedPassword;
    }

    /**
     * ランダムなsaltを生成するメソッド
     */
    public String getSalt() {
        SecureRandom sr = new SecureRandom();
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

}
