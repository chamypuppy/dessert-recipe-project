/* import React */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 사용
import { InputGroup, Form, Button } from 'react-bootstrap';

/* import CSS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBookmark, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

export const ClickIconSearch = ({ userPkId }) => {
  const [keyword, setKeyword] = useState(''); 
  const navigate = useNavigate();

  /* 검색 기능 */
  const clickIconSearch = () => {
    //e.preventDefault();
    if(keyword) navigate(`/recipe/search?keyword=${encodeURIComponent(keyword.trim())}`);
    else alert('검색어를 입력해주세요!');
    
    console.log(keyword);
  }; 

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

  return(
    <header className='search' /* style={{paddingTop: '10px', position: 'sticky', top:0, zIndex: 1, backgroundColor: 'black'}} */>
      <InputGroup className="mb-3">
        
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={() => clickIconSearch()}>
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
  );
}