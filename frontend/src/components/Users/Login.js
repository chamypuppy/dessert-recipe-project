import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Login = () => {
  /* const [userInfo, setUserInfo] = useState(null); */

  // 카카오 로그인 버튼 클릭 시 백엔드 서버의 로그인 엔드포인트로 이동
  const btnKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/auth/kakao/login`; // 백엔드로 리다이렉트
  };

   // 로그인 후 사용자 정보 받기
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/auth/kakao/request/redirect_uri`, {
        method: 'GET',
        credentials: 'include', // 쿠키 기반 인증을 사용할 경우
      });
      const data = await response.json();
      if (data.accessToken) {
        console.log("받은 Access Token:", data.accessToken);

        // 🔥 Access Token을 localStorage에 저장
        localStorage.setItem("kakao_access_token", data.accessToken);
      }

      /* if (data.user) {
        setUserInfo(data.user); // 사용자 정보 상태에 저장
      } */

    } catch (error) {
      console.error('사용자 정보 요청 실패:', error);
    }
  }; 


   // 컴포넌트가 렌더링된 후, 카카오 인증 후 
   // 카카오가 파라미터로 보낸 리디렉트 URI 뒷편에 붙인 인증코드 추출 작업(server에서 하고 있으므로 주석 처리)
/*    useEffect(() => {
    // query string에서 code를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    if (!authCode) {
      console.log('카카오 인증 코드가 없습니다.');
      // 코드가 있을 경우 사용자 정보를 가져옴 (지금은 반대경우)
    }
  }, []); // 빈 배열로 첫 렌더링 시 한번만 실행되도록 설정 
*/

// 🔹 3️⃣ 컴포넌트 마운트 시, Access Token을 가져와 사용자 정보 요청
useEffect(() => {
  fetchUserInfo();
}, []);

function clickLoginSubmit(e) {
  //useNavigate();
  e.preventDefault();
  
}


   return (
    <div className='container_login_box'  id='all_container'>
      <div className='login_box'>
        <h2 style={{fontWeight: "bold"}}>로그인</h2>
        <div className='l_box'>
          <h3 style={{fontWeight: "bold"}}>1초만에 회원가입하고 로그인하세요!</h3>
          <h4>다양한 맞춤형 레시피를 알려드릴게요💘</h4>
        </div>
        <button onClick={() => btnKakaoLogin()} 
        style={{border:"none", backgroundColor:"transparent"}}>
          <img src='/imgs/kakao_login_medium_wide.webp'
          className='btn_kakao_login'
          alt="카카오 로그인 아이콘" />
        </button>
      </div>

      <hr style={{margin: "50px 30px 80px 30px", color:"lightgray"}}/>

      <form className='login_box basic_login_box' onSubmit={(e) => clickLoginSubmit(e)}>
        <h2 style={{fontWeight: "bold", marginBottom: "30px", fontSize: "1.2rem"}}>일반 로그인</h2>
        <div className='l_box bl_box'>
          <input type='text' placeholder='아이디'/>
          <input type='password' placeholder='비밀번호'/>
        </div>
        <div className="d-grid gap-2">
          <Button variant="secondary" size="lg" type="submit" style={{backgroundColor: "var(--color-strawberry3)", border: "var(--color-drak--strawberry)"}}>
            로그인
          </Button>
        </div>
        
        {/* <div class="input-group">
          <input type="text" class="form-control" placeholder="아이디" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div class="input-group">
          <input type="password" class="form-control" placeholder="비밀번호" aria-label="Username" aria-describedby="basic-addon1"/>
        </div> */}

      </form>
        <Link to='/users/signup'>회원가입</Link>
      {/* {userInfo && (
        <div>
          <h3>로그인한 사용자</h3>
          <p>이름: {userInfo.kakao_account.profile.nickname}</p>
          <img src={userInfo.kakao_account.profile.profile_image_url} alt="프로필 이미지" />
        </div>
      )} */}
    </div>
  );
};

export default Login;
