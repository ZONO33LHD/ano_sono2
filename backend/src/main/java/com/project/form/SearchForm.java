package com.project.form;

import lombok.Data;

/**
 * 検索フォーム
 */
@Data
public class SearchForm {
    private String title;
    private String description;
    private int startIndex;
    private int limit;
    private String searchType;

    public String getTitleWithWildcards() {
        return "%" + this.title + "%";
    }

    public String getDescriptionWithWildcards() {
        return "%" + this.description + "%";
    }
}
