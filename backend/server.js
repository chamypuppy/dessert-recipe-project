/* 1. 환경 변수 설정 */
require('dotenv').config({ path: '../.env' }); // 루트 디렉토리의 .env 파일 로드

console.log('front ORIGIN:', process.env.CLOUDTYPE_FRONTEND_URL);

/* 2. 필요 모듈 불러오기 */
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dbConfig = require('./config/db.config');
const axios = require('axios');
const session = require('express-session');


/* 3. Express 애플리케이션 생성 */
const app = express();
const port = process.env.PORT || 5000; // 백엔드 서버 포트, React와 통신

/* 4. 세션 미들웨어 설정 */
app.use(session({
  secret: process.env.SESSION_SECRET, // 비밀 키
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    httpOnly: true, // 클라이언트에서 쿠키 접근 방지
    /* sameSite: 'lax', */ // 또는 'none' (배포 시 'none' + secure: true)
    maxAge: 1000 * 60 * 60 * 3 }, // 개발 환경에서는 false, 배포 시에는 true로 변경
    name: 'kakao_session'
}));

/* 5. CORS 미들웨어 설정 */
//app.use(cors());
app.use(cors({
  origin: process.env.CLOUDTYPE_FRONTEND_URL,
  credentials: true, // 인증 정보 허용 = 요청에 쿠키 포함
}));

/* 6. MySQL연결 설정 */
const db = mysql.createConnection(dbConfig);

// 6-1. MySQL 연결 확인
db.connect(err => {
  if (err) {
    console.error('💦MySQL 연결에 실패하였습니다!: \n', err);
    process.exit(1); // 연결 실패 시 프로세스 종료
  } else {
    console.log('MySQL에 연결되었습니다.');
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});


/* 레시피 목록 불러오기 */
/*
app.get('/api/recipe', (req, res) => {
  const query = 'SELECT * FROM recipe';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('서버 오류');
    } else {
      res.json(results);
    }
  });
});
*/

/* 레시피 목록 불러오기 */
app.get('/api/recipes', (req, res) => {
  const query = `
    SELECT 
      r.recipe_pk_id, 
      r.recipe_name, 
      r.recipe_image,
      r.scrap_count, 
      u.users_name AS author_name
    FROM recipe r
    LEFT JOIN users u ON r.author_id = u.users_pk_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('💦recipes API의 DB 쿼리에 에러가 발생했습니다!: \n', err);
      res.status(500).send('recipes API 오류');
    } else {
      res.json(results);
    }
  });
}); 

/* DetailPage에 users_intro 가져오기 */
app.get('/api/users_info/:recipePkId', (req, res) => {
  const { recipePkId } = req.params;
  const query = `
    SELECT 
    u.users_name,
    u.users_intro
    FROM recipe r
    LEFT JOIN users u ON r.author_id = u.users_pk_id
    WHERE r.recipe_pk_id = ?;
  `;
    db.query(query, [recipePkId], (err, results) => {

      if(err) {
        console.error('💦users_info API의 DB 쿼리에 에러가 발생했습니다!: \n', err);
      res.status(500).send('users_info API 오류');
      } else {
        if(results.length > 0) {
          res.json({ users_name: results[0].users_name, 
                     users_intro: results[0].users_intro });
        } else {
          res.status(404).send('해당 레시피에 맞는 유저가 아닙니다.');
        }
      }

    })
    
});

/* 레시피 방법 불러오기 + recipe와 recipe_method 테이블의 공통된 recipe_pk_id랑 매칭되어야 함 */
app.get('/api/recipe_method', (req, res) => {
  const query = 
  `
  select r.*, m.* from recipe r
  LEFT JOIN recipe_method m ON r.recipe_pk_id = m.recipe_pk_id;  
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('💦recipe_method API 처리 시 에러가 발생하였습니다!: \n', err);
      res.status(500).send('서버 오류');
      return;
    } 

    const recipe_table_result = [];
    const recipe_method_results = [];

    results.forEach((row) => {
      if (row.recipe_pk_id) {
        const existingRecipe = recipe_table_result.find(r => r.recipe_pk_id === row.recipe_pk_id);
        if (!existingRecipe) {
          recipe_table_result.push({
            recipe_pk_id: row.recipe_pk_id,
            recipe_name: row.recipe_name,
            recipe_intro: row.recipe_intro,
            recipe_image: row.recipe_image,
            recipe_servings: row.recipe_servings,
            baking_level: row.baking_level,
            tags: row.tags,
            scrap_count: row.scrap_count,
            ingredient1: row.ingredient1,
            ingredient2: row.ingredient2,
            author_id: row.author_id,
            tips: row.tips,
          });
        }
      }

      if (row.method) {
        recipe_method_results.push({
          method_pk_id: row.method_pk_id,
          recipe_pk_id: row.recipe_pk_id,
          method: row.method,
          method_number: row.method_number,
        });
      }
    });

    res.json({
      recipeResult: recipe_table_result,
      recipeMethodResult: recipe_method_results,
    });
  });
});


// 레시피 추가하기
app.post('/api/recipe/add', (req, res) => {
  const { recipe_name, recipe_intro, recipe_servings, baking_level } = req.body;
  const query = `INSERT INTO recipe (
    recipe_name, recipe_intro, recipe_image, recipe_servings, 
    baking_level, author_id, category_big, category_middle, 
    category_machine, ingredient1, ingredient2, tips, tags
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [recipe_name, recipe_intro, recipe_image, recipe_servings, 
    baking_level, author_id, category_big, category_middle, 
    category_machine, ingredient1, ingredient2, tips, tags], (err, results) => {
    if (err) {
      console.error('💦add_recipe API 처리 시 에러가 발생하였습니다!: \n', err);
      res.status(500).send('레시피 추가에 실패: add_recipe API 오류');
    } else {
      res.status(201).send('레시피가 추가되었습니다.');
    }
  });
});

// 스크랩된 레시피 가져오기 API
app.get('/api/scraps/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const query = `
    SELECT r.recipe_pk_id, r.recipe_name, r.recipe_intro, r.recipe_image, s.scrap_date
    FROM scraps s
    JOIN recipe r ON s.scrap_recipe_id = r.recipe_pk_id
    WHERE s.scrap_user_id = ?;
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('💦 스크랩한 레시피 불러오는 API 작업에 오류가 발생하였습니다!: \n', err);
      res.status(500).send('스크랩된 레시피 불러오기에 실패하였습니다: 서버 오류');
    } else {
      res.json(results);
    }
  });
});


/* 좋아요 API */

// 좋아요 추가
app.post('/api/likes', async (req, res) => {
  const { userPkId, recipePkId } = req.body;
  try {
    await db.query(`INSERT INTO likes (likes_users_pk_id, likes_recipe_pk_id) VALUES (?, ?)`, [userPkId, recipePkId]);
    res.status(200).send({ message: "좋아요 추가 성공" });
  } catch (err) {
    res.status(500).send({ error: "좋아요 추가 실패", details: err });
  }
});

// 좋아요 취소
app.delete('/api/likes', async (req, res) => {
  const { userPkId, recipePkId } = req.body;
  try {
    await db.query(`DELETE FROM likes WHERE likes_users_pk_id = ? AND likes_recipe_pk_id = ?`, [userPkId, recipePkId]);
    res.status(200).send({ message: "좋아요 취소 성공" });
  } catch (err) {
    res.status(500).send({ error: "좋아요 취소 실패", details: err });
  }
});

// 좋아요 상태 확인
app.get('/api/likes', async (req, res) => {
  const { userPkId, recipePkId } = req.query;
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM likes WHERE likes_users_pk_id = ? AND likes_recipe_pk_id = ?`,
      [userPkId, recipePkId]
    );
    res.status(200).send({ isLiked: rows[0].count > 0 });
  } catch (err) {
    res.status(500).send({ error: "좋아요 상태 확인 실패", details: err });
  }
});

// 레시피별 좋아요 개수
/* app.get('/api/recipes/:recipePkId/likeCount', async (req, res) => {
  const { recipePkId } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM likes WHERE likes_recipe_pk_id = ?`,
      [recipePkId]
    );
    res.status(200).send({ likeCount: rows[0].count });
  } catch (err) {
    res.status(500).send({ error: "좋아요 개수 가져오기 실패", details: err });
  }
}); */


/* env에서 카카오 REST API키와 Redirect URI 불러오기 */
require('dotenv').config({ path: './backend/.env' }); // 백엔드 디렉의 .env

//console.log('KAKAO_REST_API_KEY:', process.env.KAKAO_REST_API_KEY);

const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;


// 카카오 로그인 요청
app.get('/auth/kakao/login', (req, res) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=profile_nickname`;
  res.redirect(kakaoAuthUrl);
});

// 카카오 Redirect 처리
app.get('/auth/kakao/login/callback', async (req, res) => {
  const authCode = req.query.code; // 카카오가 보내준 인증 코드
  try {

    if (!authCode) {
      console.error('💦카카오 <인증 코드>가 없습니다!');
      return res.status(400).send('카카오 <인증 코드> 없음');
    }

    // 인증 코드로 Access Token 요청
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        client_secret:CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: authCode,
      },
    });

    //console.log('Token Response:', tokenResponse.data); // tokenResponse 전체 출력
    
    const { access_token } = tokenResponse.data;

  
    if (!access_token) {
      console.error('💦 카카오 <액세스 토큰>이 없습니다.');
      return res.status(400).send('카카오 <액세스 토큰> 없음');
    }

    /* res.json({ access_token }); */
    console.log('Access Token:', access_token); // 액세스 토큰이 제대로 나오는지 확인

    // 5. Access Token으로 사용자 정보 요청
    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    //console.log('User Info Response:', userInfoResponse.data);  // 사용자 정보 응답 데이터 확인

    const userInfo = userInfoResponse.data; // user의 id랑 connected_at
    const kakaoId = userInfo.id;
    /* const nickname = userInfo.kakao_account.profile.nickname; */
    const nickname = userInfo?.kakao_account?.profile?.nickname || '사용자';
    const email = userInfo?.kakao_account?.email || null;
    const birthday = userInfo?.kakao_account?.birthday || null;
    const users_img = userInfo.kakao_account.profile.profile_image_url || 'http://localhost:3000/imgs/default.png';

    if (!nickname) {
      console.error('💦닉네임 정보가 없습니다!');
      return res.status(500).json({ message: 'kakao 정보 없음 오류: 사용자의 닉네임 정보 없음' });
    }

    // 3. 사용자 정보 데이터베이스에 저장 또는 조회
    const queryCheckUser = 'SELECT * FROM users WHERE users_kakao_id = ?';
    db.query(queryCheckUser, [kakaoId, nickname, email, birthday, users_img], (err, results) => {
      if (err) {
        console.error('💦사용자 정보를 DB에서 조회시 오류가 발생했습니다: \n', err);
        return res.status(500).json({ message: 'DB 오류: 사용자 정보 접근 오류' });
      }

      if (results.length > 0) {
        console.log('기존 사용자:', results);

         // 세션에 userPkId, access token 저장
        req.session.userPkId = results[0].users_pk_id;  // `user_pk_id`는 db에서 가져오는 실제 컬럼명
        req.session.access_token = access_token;

        console.log(req.session);
        console.log("액세스토큰값: ", req.session.access_token);
        console.log("user_PK_ID 값:", results[0].users_pk_id);
        console.log("req.session.userPkId: ", req.session.userPkId);
    
        // 4. 기존 유저 -> Home.js로 이동
        res.redirect(`${CLOUDTYPE_FRONTEND_URL}/`);
      } else {
        // 5. 신규 유저 (사용자 정보 입력 페이지로 이동)
        const queryInsertUser = users_img
        ? `INSERT INTO users (users_kakao_id, users_name, users_img) VALUES (?, ?, ?)`
        : `INSERT INTO users (users_kakao_id, users_name) VALUES (?, ?)`;

        const params = users_img ? [kakaoId, nickname, users_img] : [kakaoId, nickname];

        db.query(queryInsertUser, params, (err, results) => {
          if (err) {
            console.error('💦신규 유저 DB 저장 시 오류가 발생했습니다!: \n', err);
            return res.status(500).json({ message: 'DB 오류: 신규 유저 DB 저장 오류' });
          }
          console.log('신규 사용자 저장 성공');

          // 신규 유저가 저장되었으면, 세션에 userPkId 저장
          req.session.userPkId = results.insertId;  // 새로 추가된 사용자의 user_pk_id 값

          // 신규 유저 -> research 페이지로 이동
          res.redirect(`${CLOUDTYPE_FRONTEND_URL}/users/research`);
        });
      }
    });

  } catch (error) {
    console.error('💦카카오 로그인에 실패하였습니다!: \n', error);
    //res.status(500).json({ message: '카카오 로그인 실패(Login failed)', error: error.message });

    
    // 로그인 실패시 리다이렉트 재시도(인가 코드 새로발급)
    return res.redirect('/auth/kakao/login'); 
  }
});

  /* 저장된 세션(userPkId)을 반환하는 API */
  app.get('/api/users/session', (req, res) => {
    if (req.session.userPkId) {
      res.status(200).json({ loggedIn: true, userPkId: req.session.userPkId });
    } else {
      res.status(401).json({ loggedIn: false, message: '로그인되지 않았습니다.' });
    }
  });

  /* Mypage API: 나의 정보 불러오기 */
  app.get('/api/users/:userPkId', (req, res) => {
    const userPkId = req.params.userPkId;
  
    const query = 'SELECT users_kakao_id, users_id, users_name, DATE_FORMAT(signup_date, "%Y-%m-%d %H:%i:%s") AS format_signup_date, users_img FROM users WHERE users_pk_id = ?';
    db.query(query, [userPkId], (err, results) => {
      if (err) {
        console.error('💦MyPage API 사용자 정보 조회 오류: \n', err);
        return res.status(500).send('Mypage 사용자 정보 조회 오류');
      }
  
      if (results.length > 0) { //userPkId가 users 테이블에 존재하는지 유무 확인
        res.json(results[0]);
      } else {
        res.status(404).send('Mypage API 오류: 사용자 정보 없음');
      }
    });
  });

  /* 카카오 ID 로그아웃하기 */
  app.post('/api/users/logout', async (req, res) => {
    const accessToken = req.session.access_token;

    if (!accessToken) {
        return res.status(400).json({ message: '액세스 토큰이 없습니다.' });
    }

    try {
        await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });


         // 카카오 로그아웃 성공 후 세션 삭제
    req.session.destroy((err) => {
      if (err) {
        console.error('세션 삭제 오류:', err);
        return res.status(500).json({ message: '로그아웃: 세션 삭제 중 에러 발생' });
      }
      console.log('세션이 성공적으로 삭제되었습니다.');
      // 쿠키 삭제
      res.clearCookie('kakao_session');  // 기존에 설정했던 세션 쿠키명으로 삭제
      //res.redirect('http://localhost:3000');

      return res.status(200).json({ message: '로그아웃: 쿠키 삭제 성공!' });
            
    });
  } catch (error) {
    console.error('카카오 로그아웃 오류:\n', error.response?.data || error.message);
    return res.status(500).json({ message: '카카오 로그아웃 실패...' });
  }
  
});
