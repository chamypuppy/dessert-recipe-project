import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* import CSS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';  // 아이콘 추가

function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 세션에 있는 userPkId를 사용해 사용자 정보를 가져오기
    fetch(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/session`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })
    .then((response) => response.json())
    .then((data) => {
      const userPkId = data.USER_PK_ID;

      if (!userPkId) {
        alert("로그인 후 방문해 주세요!");
        navigate("/users/login");
        /* return; */
      } else {
        // 사용자 정보를 서버에서 가져오기
        fetch(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/${userPkId}`)
          .then((res) => res.json())
          .then((user) => setUserInfo(user))
          .catch((error) => console.error('🟡 Mypage.js 사용자 정보 불러오기 실패:', error));
      }      
    })
    .catch((error) => console.error('🟡 Mypage.js 로그인 상태 확인 오류:', error));
  }, [navigate]);

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }
    /* if (!userInfo) {
      alert("로그인 후 방문해 주세요!");
      navigate("/users/login");
      return;
    } */

  console.log(userInfo);

  async function btnKakaoLogout () {
    //const accessToken = localStorage.getItem('kakao_access_token', accessToken);

    try {
      const response = await fetch(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/kakao/logout`, {
          method: 'POST',  
          credentials: 'include',
      });

      const result = await response.json(); // {message: "🔵 쿠키 삭제 성공!"}
      console.log('로그아웃 응답:', result);

      if (response.ok) {
          alert('로그아웃 되었습니다!');
          window.location.href = '/';
      } else {
          alert('로그아웃에 실패하였습니다.' + result.message);
      }
    } catch (error) {
        console.error('react 로그아웃 요청 실패:', error);
    } 

  }
  
  return (
    <div className='container_mypage_box'>
      <div className='mypage_box' id='mypage_margin_special'>
          <div className='mp_img_box'><img src={userInfo.users_img} className='mp_img'/></div>
          <div className='mp_box'>
            {/* <h2>내 정보</h2> */}
            <p className='mp_name'><span style={{fontWeight: "600"}}>{userInfo.nickname}</span> 님
            </p>
            <p className='mp_hello'>오늘도 달콤한 베이킹 시간되세요!</p>
          </div>
      </div>

      <div id='common_hr_box' className='detail_hr_box'></div>

      {/* <p>가입일: {userInfo.format_signup_date}</p> */}
      {/* <section>
          <h3></h3>
          <div>
            <div className='my_box'>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <span>관심 디저트</span>
          </div>
          <div>
            <div className='my_box'></div>
            <span>관심 디저트</span>
          </div>
        </section> */}

        {/* <hr/> */}
        {/* <div id='common_hr_box' className='detail_hr_box'></div> */}

        <button onClick={() => btnKakaoLogout()} className='btn_logout'><div>로그아웃</div></button>
        
    </div>
  );
}

export default Mypage;
