package com.project.Controller;


import com.project.entity.UrlStorage;
import com.project.form.SearchForm;
import com.project.service.HomeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.project.form.ContentsForm;

import java.util.*;


@RestController
public class HomeController {
	
	Logger logger = LoggerFactory.getLogger(HomeController.class);

	@Autowired
	private HomeService homeService;

	private List<UrlStorage> urlList;

	@Value("${spring.application.name}")
	private String name;
	

	// URL登録処理
	@PostMapping("/api/blog")
	public String handlePostRequest(@Valid @RequestBody ContentsForm form, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return bindingResult.getFieldError().getDefaultMessage();
		}
		homeService.registBlogUrl(form);
		return "redirect:/";
	}

	// URL取得処理
	@GetMapping("/api/blog/get")
	public List<UrlStorage> handleGetRequest(@RequestParam int startIndex) {
		int limit = 6;
		// startIndexが0未満の場合は0に設定
		startIndex = Math.max(0, startIndex);
		urlList = homeService.getBlogUrls(limit, startIndex);
		return urlList;
	}

	// 登録されているURLの総数を取得する処理
	@GetMapping("/api/blog/count")
	public int handleGetCountRequest() {
		int countList = homeService.getCountUrls();
		return countList;
	}

	// 登録されている情報の編集更新処理
	@PutMapping("/api/blog/edit/{id}")
	public String handlePutRequest(@PathVariable("id") Long id, @Valid @RequestBody ContentsForm form, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return bindingResult.getFieldError().getDefaultMessage();
		}

		homeService.updateBlogContents(form);
		return "redirect:/";
	}

	// 登録されている情報の削除処理
	@DeleteMapping("/api/blog/delete/{id}")
	public void handleDeleteRequest(@PathVariable("id") Long id) {
		homeService.deleteBlogContents(id);
	}

	// 検索処理
	@PostMapping("/api/blog/search")
	public List<UrlStorage> handleSearchRequest(@RequestBody SearchForm searchForm) {
		return homeService.getSearchResult(searchForm);
	}
}

