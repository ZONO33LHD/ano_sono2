package com.project.service.impl;

import com.project.entity.UrlStorage;
import com.project.form.ContentsForm;
import com.project.form.SearchForm;
import com.project.mapper.HomeMapper;
import com.project.service.impl.HomeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class HomeServiceImplTest {

    @InjectMocks
    private HomeServiceImpl homeService;

    @Mock
    private HomeMapper homeMapper;

    private ContentsForm form;

    private SearchForm searchForm;

    /**
     * テストデータの作成
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        form = new ContentsForm();
        form.setTitle("テストタイトル");
        form.setUrl("https://example.com");
        form.setDescription("テストの説明");
    }

    /**
     * テストケースの設定（検索）
     */
    @BeforeEach
    void setUpSearch() {
        MockitoAnnotations.openMocks(this);
        form = new ContentsForm();
        form.setTitle("テストタイトル");
        form.setDescription("テストの説明");
    }

    /**
     * URL登録処理のテスト
     */
    @Test
    void registBlogUrl() {
        homeService.registBlogUrl(form);
        verify(homeMapper, times(1)).registBlogUrl(form);
    }

    /**
     * URL取得処理のテスト
     */
    @Test
    void getBlogUrls() {
        homeService.getBlogUrls(5, 0);
        verify(homeMapper, times(1)).getBlogUrls(5, 0);
    }

    /**
     * 登録されているURLの総数を取得するテスト
     */
    @Test
    void getCountUrls() {
        homeService.getCountUrls();
        verify(homeMapper, times(1)).getCountUrls();
    }

    /**
     * 登録されている情報の編集更新処理テスト
     */
    @Test
    void updateBlogContents() {
        homeService.updateBlogContents(form);
        verify(homeMapper, times(1)).updateBlogContents(form);
    }

    /**
     * 登録されている情報の削除処理テスト
     */
    @Test
    void deleteBlogContents() {
        homeService.deleteBlogContents(1L);
        verify(homeMapper, times(1)).deleteBlogContents(1L);
    }

    /**
     * 検索結果を取得するテスト
     */
    @Test
    void getSearchResult() {
        List<UrlStorage> expectedResults = new ArrayList<>();
        when(homeMapper.getSearchResult(searchForm, 100, 0)).thenReturn(expectedResults);

        List<UrlStorage> actualResults = homeService.getSearchResult(searchForm);
        assertEquals(expectedResults, actualResults);
    }
}