import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// css import
import style from '../styles/Item.module.css';
// component import
import Filteraside from '../components/Filteraside';
import ErrorItem from '../components/ErrorItem';
// redux import
import { setIsLoading, setIsResult, fetchItemsSuccess, filterItem } from '../redux/actions/itemActions';
import { setSelectedPrice, setSelectedRating, setSelectedTag } from '../redux/actions/filterActions';

const ITEMS_PER_PAGE = 15;
const NO_IMAGE_URL = '/images/common/noimg.png';

const Itemlist = ({ category, categoryEng }) => {
  let dispatch = useDispatch()
  const selectedPrice = useSelector(state => state.filter.selectedPrice);
  const selectedRating = useSelector(state => state.filter.selectedRating);
  const selectedTag = useSelector(state => state.filter.selectedTag);
  const items = useSelector(state => state.item.items);
  const filtereditems = useSelector(state => state.item.filtereditems);
  const IsResult = useSelector(state => state.item.IsResult);
  const IsLoading = useSelector(state => state.item.IsLoading);
  const [filterTag, setFilterTag] = useState([]);
  const [IsPager, setIsPager] = useState(false);
  const [slicedItems, setSlicedItems] = useState([]);

  // ************************** 기본 아이템 fetch ***************************
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/subs/${categoryEng}`);
        const data = response.data.items;

        // 아이템 데이터를 받아온 후에 filterTag을 계산하고 상태를 업데이트
        const tagsAll = data.map(item => item.tags.map(tag => tag.tagName)).flat();
        setFilterTag(tagsAll.reduce((ac, v) => ac.includes(v) ? ac : [...ac, v], []));
        dispatch(fetchItemsSuccess(data));
        setSlicedItems([...items]);
        dispatch(setIsLoading(false));
        dispatch(setIsResult(true));
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setIsResult(false));
      }
    };
    fetchData();
  }, [categoryEng]);

  // ****************************** 필터 버튼 핸들러 *******************************
  // 리셋 버튼 핸들러
  const resetFilters = () => {
    window.location.reload();
  };

  // 가격 체크박스 핸들러
  const handleSelectedPrice = (e) => {
    // 선택한 필터 reducer에 업데이트
    let updateSelectedPrice = null;
    if (selectedPrice === e.target.value) {
      updateSelectedPrice = null;
    } else {
      updateSelectedPrice = e.target.value;
    }
    dispatch(setSelectedPrice(updateSelectedPrice));
  };
  // 별점 체크박스 핸들러
  const handleSelectedRating = (e) => {
    // 선택한 필터 reducer에 업데이트
    let updateSelectedRating = null;
    if (selectedRating === e.target.value) {
      updateSelectedRating = null;
    } else {
      updateSelectedRating = e.target.value;
    }
    dispatch(setSelectedRating(updateSelectedRating));
  };
  // 태그 체크박스 핸들러
  const handleSelectedTag = (e) => {
    // 선택한 필터 reducer에 업데이트
    let updateSelectedTag = [];
    if (selectedTag.includes(e.target.value)) {
      updateSelectedTag = selectedTag.filter((tag) => tag !== e.target.value);
      if (updateSelectedTag.length === 0){ updateSelectedTag = [] }
    } else {
      updateSelectedTag = [...selectedTag, e.target.value];
    }
    dispatch(setSelectedTag(updateSelectedTag));
  };

  // 필터적용 핸들러
  const handleFilteredItems = async() => {
    let updateditems = items;
    if(selectedPrice !== null){
      updateditems = updateditems.filter(item => {
        if (selectedPrice === 'priceRow') {
          return item.ranks.some(rank => rank.price < 5900);
        } else if (selectedPrice === 'priceMedium') {
          return item.ranks.some(rank => 5900 <= rank.price && rank.price <= 9900);
        } else {
          return item.ranks.some(rank => rank.price > 9900);
        }
      });
    };
    if(selectedRating !== null){
      let selectedRatingAvg = parseInt(selectedRating.substr(-1));
      updateditems = updateditems.filter(item => item.ratingAvg === selectedRatingAvg );
    };
    if(selectedTag.length !== 0){
      updateditems = updateditems.filter(item => 
        selectedTag.every(selectedtag => 
          item.tags.some(tag => tag.tagName === selectedtag)
        )
      );
    };
    dispatch(filterItem(updateditems));
    setSlicedItems(updateditems);
  }
  useEffect(() => {
    handleFilteredItems();
  }, [selectedPrice, selectedRating, selectedTag]);

  useEffect(() => {
    if (!IsLoading) {
      if (selectedPrice || selectedRating || selectedTag.length > 0) {
        if(filtereditems.length !== 0){
          dispatch(setIsResult(true));
          setSlicedItems([...filtereditems]);
        } else if((filtereditems.length === 0)) {
          dispatch(setIsResult(false));
          setSlicedItems([]);
        }
      } else {
        dispatch(setIsResult(true));
        setSlicedItems([...items]);
      }
    }
  }, [IsLoading, filtereditems, items, selectedPrice, selectedRating, selectedTag]);


  return (
    <section className={style.pagewrap}>
      <div className='webwidth'>
        <div className='page_tit page_tit-side'>
          <h2>{category}</h2>
        </div>
        <div className={style.categorysection}>
          <Filteraside resetFilters={resetFilters} handleSelectedPrice={handleSelectedPrice} handleSelectedRating={handleSelectedRating} handleSelectedTag={handleSelectedTag} filterTag={filterTag} handleFilteredItems={handleFilteredItems} />
          <section className={style.right}>
            <div className={style.section}>
              <div className={style.itemlist}>
                {IsResult ? slicedItems.map((item, index) => (
                  <Link to={`/subs/detail/${item.id}`} key={index} className={style.item}>
                    <div className={style.img}>
                      <img src={`${item.image}`} alt={item.name} onError={(e) => {e.target.src = NO_IMAGE_URL;}}/>
                    </div>
                    <div className={style.txt}>
                      <h3>{item.name}</h3>
                      <div className={style.tag}>
                        {/* <p>{item.category}</p> */}
                        {
                          item.tags.map((tag, tagindex) => (
                            <p key={tagindex}>{tag.tagName}</p>
                          ))
                        }
                      </div>
                    </div>
                  </Link>
                )) : <ErrorItem />}
              </div>
            </div>

            {/* {IsPager && <div className='pagination-wrap'>
              <div className='pagination'>
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <span className='material-icons'>chevron_left</span>
                  </button>
                  <span>{currentPage}</span> / <span>{totalPages}</span>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <span className='material-icons'>chevron_right</span>
                  </button>
                </div>
            </div>} */}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Itemlist;
