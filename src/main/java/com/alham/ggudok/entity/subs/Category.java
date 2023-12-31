package com.alham.ggudok.entity.subs;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "category_id")
    private Long categoryId;

    private String categoryName;

    private String categoryEng;

    private String categoryImage;

    @OneToMany(mappedBy = "category",cascade = ALL)
    private List<Subs> subsList = new ArrayList<>();

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public Category(String categoryName, String categoryEng,String categoryImage) {
        this.categoryName = categoryName;
        this.categoryEng = categoryEng;
        this.categoryImage = categoryImage;
    }
    public Category(String categoryName, String categoryEng) {
        this.categoryName = categoryName;
        this.categoryEng = categoryEng;
    }

    public void updateCategory(String categoryName, String categoryEng) {
        this.categoryName = categoryName;
        this.categoryEng = categoryEng;

    }

    public void updateCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
    }
}
