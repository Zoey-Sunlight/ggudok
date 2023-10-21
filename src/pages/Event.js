import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// component import
import Error from '../components/Error';
import Loading from '../components/Loading';
// css import
import style from '../styles/Item.module.css';
// redux import
import { setEvent } from '../redux/actions/eventActions';

const NO_IMAGE_URL = '/images/common/noimg.png';

const Event = () => {
  let dispatch = useDispatch();
  const events = useSelector(state => state.event.events);
  const [IsResult, setIsResult] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  
  // ************************** 기본 events fetch ***************************
  const fetchEventData = async () => {
    try {
      const response = await axios.get(`/event`);
      const data = response.data.eventSubs;
      console.log('data : ', data)

      if(data !== 0){
        dispatch(setEvent(data));
      } else {
        dispatch(setEvent([]));
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEventData();
  }, [dispatch]);

  // 결과 유무
  useEffect(() => {
    setIsResult(events.length > 0);
  }, [dispatch, events]);

  return (
    <section className={style.pagewrapPd}>
      <div className='webwidth'>
        <div className='page_tit'>
          <h2>이벤트</h2>
        </div>

        {!IsLoading ? (IsResult ?
          <section className='section'>
            {
              events.map((event, index) => (
                <section key={index} className='bannerslider'>
                  <img style={{ width: '100%' }} src={event.image} alt={event.subsName}onError={(e) => {e.target.src = NO_IMAGE_URL;}}/>
                  <div className='tag'>
                    <p>{event.categoryName}</p>
                    <p>{event.infoTag}</p>
                  </div>
                  <h3>{event.subsName}</h3>
                  <h4>{event.info}</h4>
                  <p>{event.startDate} - {event.endDate}</p>
                </section>
              ))
            }
          </section>
        : <Error />) : <Loading />}
      </div>
    </section>
  );
};

export default Event;
