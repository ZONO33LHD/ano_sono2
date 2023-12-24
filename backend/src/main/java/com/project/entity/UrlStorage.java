package com.project.entity;

import lombok.Data;

@Data
public class UrlStorage {

    private Long id;
    private String url;
    private String title;
    private String description;
    private int count;
}
