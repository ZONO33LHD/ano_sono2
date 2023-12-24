package com.project.form;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ContentsForm {
    // idは更新時に格納される
    private Long id;

    // title
    private String title;

    // url
    @Pattern(regexp = "^(http://|https://).+", message = "URLが正しくありません。ただしいURLを入力してください！")
    private String url;

    // description
    private String description;
}
