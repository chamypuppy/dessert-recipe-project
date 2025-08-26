const express = require("express");
const router = express.Router();

const db = require("../config/db");

router
  .route('/signup/register')
  .post((req, res) => {
    const { form_id, form_pwd1, form_name, form_tel, form_birthday, form_email } = req.body;

    const insertUserInfo = 'INSERT INTO users(users_id, users_pwd, users_name, email, birthday, tel) VALUES(?,?,?,?,?,?)';

    db.query(insertUserInfo, [form_id, form_pwd1, form_name, form_email, form_birthday, form_tel], (err, results) => {
      if(err) {
        console.error("🟡 회원가입 중 에러가 발생했습니다.");
        console.error("🟡 응답 상태:", err.response?.status);
        console.error("🟡 응답 데이터:", err.response?.data);
        console.error("🟡 에러 메시지:", err.message);
        return res.status(500).send("🟡 회원가입 userRoutes 서버 오류입니다.");
      } else {
        // res.json(results); // 프론트로 결과값 전송
        return res.json({
          success: true,
          message: "회원가입이 완료되었습니다😄🔅"
        });

      }


    })

    console.log(form_id, form_pwd1, form_name, form_tel, form_birthday, form_email);
  });

module.exports = router;