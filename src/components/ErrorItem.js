import { Link, useNavigate } from 'react-router-dom';

const ErrorItem = () => {
  let navigate = useNavigate();

	return (
		<div className='errorpage errorpage_sm'>
			<span className='material-icons'>warning</span>
				<p>이런! 존재하지 않는 구독서비스입니다.</p>
				<Link className='btn btn_normal' onClick={ ()=>{ navigate(-1) } }>뒤로 가기</Link>
		</div>
	)
}

export default ErrorItem;