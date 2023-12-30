package com.project.Controller;

import com.project.form.ContentsForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.form.SearchForm;
import com.project.service.HomeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = {com.project.AnoSonoApplication.class})
@AutoConfigureMockMvc
class HomeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private HomeService homeService;

    private ContentsForm form;

    /**
     * テストデータの作成
     */
    @BeforeEach
    void setUp() {
        form = new ContentsForm();
        form.setTitle("テストタイトル");
        form.setUrl("https://example.com");
        form.setDescription("テストの説明");
    }

    /**
     * URL登録処理のテスト
     * @throws Exception
     */
    @Test
    void handlePostRequest() throws Exception {
        doNothing().when(homeService).registBlogUrl(form);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/blog")
                .content(objectMapper.writeValueAsString(form))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("redirect:/"));
    }

    /**
     *
     * @throws Exception
     */
    @Test
    void handleGetRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/blog/get")
                .param("startIndex", "0"))
                .andExpect(status().isOk());
    }

    /**
     * 登録されているURLの総数を取得する処理テスト
     * @throws Exception
     */
    @Test
    void handleGetCountRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/blog/count"))
                .andExpect(status().isOk());
    }

    /**
     * 登録されている情報の編集更新処理テスト
     * @throws Exception
     */
    @Test
    void handlePutRequest() throws Exception {
        doNothing().when(homeService).updateBlogContents(form);

        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/blog/edit/1")
                .content(objectMapper.writeValueAsString(form))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("redirect:/"));
    }

    /**
     * 登録されている情報の削除処理テスト
     * @throws Exception
     */
    @Test
    void handleDeleteRequest() throws Exception {
        doNothing().when(homeService).deleteBlogContents(1L);

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/blog/delete/1"))
                .andExpect(status().isOk());
    }

    /**
     * 検索処理テスト
     * @throws Exception
     */
    @Test
    void handleSearchRequest() throws Exception {
        SearchForm searchForm = new SearchForm();
        searchForm.setTitle("テスト");

        when(homeService.getSearchResult(searchForm)).thenReturn(new ArrayList<>());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/blog/search")
                        .content(objectMapper.writeValueAsString(searchForm))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}