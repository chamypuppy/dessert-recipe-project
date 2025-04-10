/* import React */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 사용
import { InputGroup, Form, Button } from 'react-bootstrap';  // 필요한 컴포넌트 import


/* import useHook */
//import useToggle from '../../hooks/useToggle';

/* import CSS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBookmark, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';  // 아이콘 추가


function Home ({ recipes }) {

  const navigate = useNavigate(); // useNavigate 훅 초기화
  const [userPkId, setUserPkId] = useState(null);
  
  useEffect(() => {
    // 서버에서 세션에 저장된 userPkId 값 가져오기
    fetch('http://localhost:5000/api/users/session', {
      method: 'GET',
      credentials: 'include', // 세션 쿠키 포함 (CORS 설정에 따라 필요)
    })
    .then((response) => response.json())
    .then((data) => setUserPkId(data.userPkId))
    .catch((error) => console.error('로그인 상태 확인 오류:', error));
  }, []);

  

  /* 로그인 기능 관련 식 */
    const clickIconUser = () => {
      console.log(userPkId);
      if (userPkId) {
        // 로그인되어 있으면 Mypage로 이동
        navigate('/users/mypage');
      } else {
        // 로그인되지 않았으면 로그인 페이지로 이동
        navigate('/users/login');
      }
    };

  /* 좋아요 기능 관련 식 */
  const [likeRecipes, setLikeRecipes] = useState([]); // 좋아요한 레시피 상태 저장

  // 레시피의 좋아요 상태 관리
  useEffect(() => {
    const fetchLikes = async () => {
      const newLikeRecipes = await Promise.all(
        recipes.map(async (r) => {
          // 서버에서 좋아요 상태 가져오기
          const response = await fetch(`/api/likes?userPkId=${userPkId}&recipePkId=${r.recipe_pk_id}`);
          const data = await response.json();
          return { recipeId: r.recipe_pk_id, isLiked: data.isLiked }; // 각 레시피에 대해 좋아요 상태 저장
        })
      );
      setLikeRecipes(newLikeRecipes); // 상태 업데이트
    };

    if (recipes.length > 0 && userPkId) {
      fetchLikes(); // 좋아요 상태 가져오기
    }
  }, [recipes, userPkId]);

  // 좋아요 토글 함수
  const handleToggleLike = async (recipeId) => {
    if (!userPkId) {
      alert('로그인을 해주세요!');
      return; // 로그인하지 않았으면 함수 종료
    }

    // 좋아요 상태 반전
    const recipe = likeRecipes.find((state) => state.recipeId === recipeId);
    const newIsLiked = !recipe.isLiked;

    // 서버에 좋아요 상태 업데이트 요청
    await fetch('/api/likes', {
      method: newIsLiked ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPkId, recipePkId: recipeId }),
    });

    // 상태 업데이트
    setLikeRecipes((prevState) =>
      prevState.map((state) =>
        state.recipeId === recipeId
          ? { ...state, isLiked: newIsLiked } // 해당 레시피의 좋아요 상태 반영
          : state
      )
    );
  };

  
  if (!recipes || recipes.length === 0) return <div>레시피가 없습니다.</div>;

  return (
      <div id='common_container'>
        <header className='search' /* style={{paddingTop: '10px', position: 'sticky', top:0, zIndex: 1, backgroundColor: 'black'}} */>
          <InputGroup className="mb-3">
            
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            <Button>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button>
              <FontAwesomeIcon icon={faUser} onClick={()=> clickIconUser()}/>
            </Button>
            {/* <Button>
              <FontAwesomeIcon icon={faBookmark} className='h_scrap'/>
            </Button> */}
          </InputGroup>
          
        </header>


        {/* banner */}
        {/* 자체적인 맥락을 가진 article */}
        <article></article>

        {/* section */}
        {/*  */}
        {/* <section>
          <h3></h3>
          <div>
            <div className='s_box'></div>
            <span>모든 디저트</span>
          </div>
        </section> */}

        {/* recipe list1 */}
        {/* <h3>꽉's 주인장 PICK이다꽉!</h3> */}
        <ul className='home_ul'>
          {recipes.map((r) => {
            // 각 레시피의 좋아요 상태를 확인
            const recipeLike = likeRecipes.find((item) => item.recipeId === r.recipe_pk_id);

          return (
            <li key={r.recipe_pk_id} className='r_home_list'>
              <a href={`/recipe/${r.recipe_pk_id}`}>
                <img src={`/imgs/${r.recipe_image}`}/>
                <h4 id='common_recipe_name' className='r_home_name'>{r.recipe_name}</h4>
                <span className='r_home_au_name'>{r.author_name}</span>
              </a>
              <div className='like_box'>
                <FontAwesomeIcon icon={faHeart} className='icon_like'
                style={{ color: recipeLike?.isLiked ? 'red' : 'lightgray' }}
                onClick={() => handleToggleLike(r.recipe_pk_id)}
                />
              </div>
            </li> );
          })}
        </ul>
      </div>

  );

  
}

export default Home;