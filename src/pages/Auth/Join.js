import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// css import
import style from '../../styles/Auth.module.css'
// redux import
import { join } from '../../redux/actions/userActions';

const Join = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    const emailId = e.target.emailid.value;
    const password = e.target.password.value;
    if (emailId === '') {
      alert('이메일 아이디를 입력하세요.')
    } else if (password === '') {
      alert('비밀번호를 입력하세요.')
    } else {
      dispatch(Join(emailId, password));
      navigate('/Home');
    }
  };

  return (
    <section className={`${style.join} ${style.auth}`}>
      <div className='webwidth webwidth_pd'>
        <div className='page_tit'><h4>3초만에 끝나는 간편회원가입</h4></div>
        <div className={style.form}>
          <div className={style.easySignup}>
            <Link to="" className={`${style.sns} ${style.naver}`}>
              <img src='../images/icons/icon_naver.png' alt='naver' />
              <p>네이버 간편가입하기</p>
            </Link>
            <Link to="" className={`${style.sns} ${style.kakao}`}>
              <img src='../images/icons/icon_kakaotalk.png' alt='kakao' />
              <p>카카오톡 간편가입하기</p>
            </Link>
            <Link to="" className={`${style.sns} ${style.facebook}`}>
              <img src='../images/icons/icon_facebook.png' alt='facebook' />
              <p>페이스북 간편가입하기</p>
            </Link>
            <Link to="" className={`${style.sns} ${style.google}`}>
              <img src='../images/icons/icon_google.png' alt='google' />
              <p>구글 간편가입하기</p>
            </Link>
            <Link to="" className={`${style.sns} ${style.apple}`}>
              <img src='../images/icons/icon_apple.png' alt='apple' />
              <p>애플 간편가입하기</p>
            </Link>
          </div>
          <div className={style.doublebutton}>
            <Link to="/Auth/JoinEmail" className='btn btn_full'>이메일로 회원가입하기</Link>
            <Link className='btn btn_normal' onClick={ ()=>{ navigate(-1) } }>뒤로 가기</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Join;