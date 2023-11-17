import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// css import
import style from '../../styles/Auth.module.css';
// redux import
import { editSubscribe, deleteSubscribe } from '../../redux/actions/subscribeActions';

const DelSubs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const subsId = location.state.subsId;
  const [rankLevel, setRankLevel] = useState('');

  const handleEdit = (e) => {
    e.preventDefault();
    const userData = {
      subsId,
      rankLevel,
    };
    dispatch(editSubscribe(userData, navigate));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const userData = {
      subsId,
    };
    dispatch(deleteSubscribe(userData, navigate));
  };

  return (
    <section className={style.pagewrapPd}>
      <div className='webwidth'>
        <div className='page_tit'>
          <h2>구독 변경/해지</h2>
        </div>
        <div className={style.subscribeCur}>
          <div className={style.left}>
            <h2 className={style.name}>베이직</h2>
            <p className={style.detail}>HD(720p)로 좋은 화질 제공. 스마트폰, 태블릿, 컴퓨터 또는 TV로 광고 없이 시청. 1개 디바이스에 저장 가능.</p>
          </div>
          <div className={style.right}>
            <p className={style.price}>
            월 <span className={style.point}>9,500</span>원
            </p>
          </div>
        </div>

        <form className={`${style.form} ${style.subscribe}`}>
          <div className={style.box}>
            <div className={style.radioWrap}>
              <input type='radio' name='subscribe' value='STANDARD' className='radtioInput' onChange={(e) => { setRankLevel(e.target.value); }} />
            </div>
            <div className={style.left}>
              <h2 className={style.name}>스탠다드</h2>
              <p className={style.detail}>풀 HD(1080p)로 매우 좋은 화질 제공. 스마트폰, 태블릿, 컴퓨터 또는 TV로 광고 없이 시청. 2개 디바이스에 저장 가능.</p>
            </div>
            <div className={style.right}>
              <p className={style.price}>
              월 <span className={style.point}>13,500</span>원
              </p>
            </div>
          </div>
          <div className={style.box}>
            <div className={style.radioWrap}>
              <input type='radio' name='subscribe' value='PRIME' className='radtioInput' onChange={(e) => { setRankLevel(e.target.value); }} />
            </div>
            <div className={style.left}>
              <h2 className={style.name}>프리미엄</h2>
              <p className={style.detail}>풀 HD(1080p)로 매우 좋은 화질 제공. 스마트폰, 태블릿, 컴퓨터 또는 TV로 시청. 대부분의 시리즈와 영화를 이용할 수 있지만, 라이선스 제한으로 인해 시청할 수 없는 콘텐츠도 일부 있음. 저장 기능 불포함.</p>
            </div>
            <div className={style.right}>
              <p className={style.price}>
              월 <span className={style.point}>17,000</span>원
              </p>
            </div>
          </div>
          <div className={`mt_40 ${style.doublebutton}`}>
            <button type='button' className='btn btn_normal' onClick={ handleDelete }>해지하기</button>
            <button type='submit' className='btn btn_full' onClick={ handleEdit }>변경하기</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DelSubs;