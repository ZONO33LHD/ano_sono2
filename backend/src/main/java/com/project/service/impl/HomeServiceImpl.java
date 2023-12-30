package com.project.service.impl;

import com.project.entity.UrlStorage;
import com.project.form.SearchForm;
import com.project.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mapper.HomeMapper;
import com.project.form.ContentsForm;

import java.util.ArrayList;
import java.util.List;

/**
 * HoME画面サービスクラス
 *
 * @Author s.nakazono
 */
@Service
public class HomeServiceImpl implements HomeService {

	@Autowired
	private HomeMapper homeMapper;

	// URLを登録するメソッド
	@Override
	public void registBlogUrl(ContentsForm form) {
		try {
			homeMapper.registBlogUrl(form);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// URLを取得するメソッド
	@Override
	public List<UrlStorage> getBlogUrls(int limit, int offset) {
		try {
			// offsetが0未満の場合は0に設定
			offset = Math.max(0, offset);
			return homeMapper.getBlogUrls(limit, offset);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 登録されているURLの総数を取得するメソッド
	@Override
	public int getCountUrls() {
		try {
			return homeMapper.getCountUrls();
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	// 登録されている情報の編集更新処理
	@Override
	public void updateBlogContents(ContentsForm form) {
		try {
			homeMapper.updateBlogContents(form);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 登録されている情報の削除処理
	@Override
	public void deleteBlogContents(Long id) {
		try {
			homeMapper.deleteBlogContents(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 検索結果を取得するメソッド
	// HomeServiceImpl.java
	@Override
	public List<UrlStorage> getSearchResult(SearchForm searchForm) {
		try {
			System.out.println("Debug: getSearchResult is called with " + searchForm);
			List<UrlStorage> results = homeMapper.getSearchResult(searchForm, 100, 0);
			if (results == null || results.isEmpty()) {
				System.out.println("No search results found!!");
				return new ArrayList<>(); // 空のリストを返す
			}
			return results;
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<>(); // エラーが発生した場合も空のリストを返す
		}
	}
}
