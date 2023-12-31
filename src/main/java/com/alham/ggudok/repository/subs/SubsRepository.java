package com.alham.ggudok.repository.subs;

import com.alham.ggudok.entity.subs.Subs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface SubsRepository extends JpaRepository<Subs, Long>, SubsRepositoryCustom {

    @Query("select s from Subs s left join fetch s.subsRelTags st left join fetch st.tag t where s.subsId = :subsId")
    Optional<Subs> findSubsByIdWithTag(@Param("subsId") Long subsId);


    @Query("select s from Subs s join fetch s.subsRanks where s.subsId = :subsId")
    Optional<Subs> findSubsByIdWithRank(@Param("subsId") Long subsId);

    Subs findSubsBySubsName(String subsName);

    @Query("select s from Subs s join fetch s.subsRelTags st join fetch st.tag t order by s.recommendSort")
    List<Subs> findRecommendSubsList();

    @Query("select s from Subs s join fetch s.category c where s.subsId =:subsId")
    Subs findByIdWithCategory(@Param("subsId") Long subsId);

    @Query("select s from Subs s join fetch s.category c")
    List<Subs> findAllWithCategory();

    @Modifying
    @Query("delete from SubsRelTag srt where srt.tag.tagId =:tagId")
    void deleteSubsRelTagByTagId(@Param("tagId") Long tagId);

}
