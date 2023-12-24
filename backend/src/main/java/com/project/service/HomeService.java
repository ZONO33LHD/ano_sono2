package com.project.service;

import com.project.entity.UrlStorage;
import com.project.form.ContentsForm;
import com.project.form.SearchForm;

import java.util.List;

public interface HomeService {

   // URLを登録するメソッド
   void registBlogUrl(ContentsForm form);

   // URLを取得するメソッド
   List<UrlStorage> getBlogUrls(int limit, int offset);

    // 登録されているURLの総数を取得するメソッド
    int getCountUrls();

    // 登録されている情報の編集更新処理
    void updateBlogContents(ContentsForm form);

    // 登録されている情報の削除処理
    void deleteBlogContents(Long id);

    // 検索結果を取得するメソッド
    public List<UrlStorage> getSearchResult(SearchForm searchForm);
    
}
