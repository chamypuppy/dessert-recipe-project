/* 1. 환경 변수 설정 */
require('dotenv').config({ path: '../.env' }); // 루트 디렉토리의 .env 파일 로드

console.log('front ORIGIN:', process.env.CLOUDTYPE_FRONTEND_URL);

/* 2. 필요 모듈 불러오기 */
const express = require('express');
const router = express.Router();
const cors = require('cors');
// const mysql = require('mysql2');
// const dbConfig = require('./config/db.config');
const db = require("./config/db");
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
    name: 'KAKAO_SESSION'
}));

/* 5. CORS 미들웨어 설정 */
//app.use(cors());
app.use(cors({
  origin: process.env.CLOUDTYPE_FRONTEND_URL,
  credentials: true, // 인증 정보 허용 = 요청에 쿠키 포함
}));




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


app.use("/api/kakao", require("./routes/kakaoLoginRoutes"));


  /* 저장된 세션(userPkId)을 반환하는 API */
  app.get('/api/users/session', (req, res) => {
    if (req.session.userPkId) {
      res.status(200).json({ loggedIn: true, userPkId: req.session.userPkId });
    } else {
      res.status(401).json({ loggedIn: false, message: '로그인되지 않았습니다.' });
    }
  });

  /* Mypage API: 나의 정보 불러오기 ✅*/
  app.get('/api/users/:userPkId', (req, res) => {
    const userPkId = req.params.userPkId;
  
    const query = 'SELECT users_kakao_id, users_id, users_name, nickname, DATE_FORMAT(signup_date, "%Y-%m-%d %H:%i:%s") AS format_signup_date, users_img FROM users WHERE users_pk_id = ?';
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



/* ✅ 레시피 검색 기능 */
app.get('/api/recipes/search', (req, res) => {
  const keyword = req.query.keyword;
  const query = `SELECT 
        r.recipe_pk_id,
        r.recipe_name, 
        r.recipe_image,
        r.scrap_count, 
        u.nickname AS author_name
      FROM recipe r
      LEFT JOIN users u ON r.author_id = u.users_pk_id
      WHERE recipe_name LIKE ?;`

  const param = `%${keyword}%`;

  db.query(query, [param], (err, results) => {
    if(err) {
      console.error('💦recipe search API의 DB query에 에러가 발생했습니다!: \n', err);
      res.status(500).send('recipes search API 오류');
    } else {
      res.json(results);
      console.log('받은 API 확인:', results);
      console.log('받은 req.query:', JSON.stringify(req.query));
    }
  })
})

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

/* ✅ DetailPage에 users_intro 가져오기 */
app.get('/api/users_info/:recipePkId', (req, res) => {
  const { recipePkId } = req.params;
  const query = `
    SELECT 
    u.nickname,
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
          res.json({ nickname: results[0].nickname,  // ✅
                     users_intro: results[0].users_intro });
        } else {
          res.status(404).send('해당 레시피에 맞는 유저가 아닙니다.');
        }
      }

    })
    
});

app.use('/api/users/logout', require('./routes/logoutRoutes'));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/recipes", require("./routes/recipesRoutes"));


//app.use(router);

  // 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
