package com.project.mapper;

import com.project.entity.UrlStorage;
import com.project.form.SearchForm;
import org.apache.ibatis.annotations.Mapper;

import com.project.form.ContentsForm;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface HomeMapper {

	// URLを登録するマッパー
	void registBlogUrl(ContentsForm form);

	// URLを取得するマッパー
	List<UrlStorage> getBlogUrls(@Param("limit") int limit, @Param("offset") int offset);

	// 登録されているURLの総数を取得するマッパー
	int getCountUrls();

	// 登録されている情報の編集更新処理
	void updateBlogContents(ContentsForm form);

	// 登録されている情報の削除処理
	void deleteBlogContents(Long id);

	// 検索結果を取得するマッパー
	// HomeMapper.java
	List<UrlStorage> getSearchResult(SearchForm searchForm, @Param("limit") int limit, @Param("offset") int offset);
}
