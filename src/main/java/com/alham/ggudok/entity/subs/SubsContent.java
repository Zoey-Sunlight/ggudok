package com.alham.ggudok.entity.subs;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class SubsContent {

    @Id
    @GeneratedValue
    @Column(name = "content_id")
    private Long contentId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "rank_id")
    private SubsRank subsRank;

    private String content;

    public SubsContent(String content) {
        this.content = content;
    }

    public void addSubsRank(SubsRank subsRank) {
        this.subsRank = subsRank;
        subsRank.getContents().add(this);
    }
}