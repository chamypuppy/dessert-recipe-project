const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const db = require("../config/db");

router
  .route('/signup/register')
  .post(async (req, res) => {
    const { form_id, form_pwd1, form_pwd2, form_name, form_tel, form_birthday, form_email } = req.body;

    if(form_pwd1 !== form_pwd2) {
      return res.status(400).json({
        success: false,
        message: "비밀번호가 불일치합니다."
      });
    };

    const hashPwd = await bcrypt.hash(form_pwd1, 10);
  
    const insertUserInfo = 'INSERT INTO users(users_id, users_pwd, users_name, tel, birthday, email) VALUES(?,?,?,?,?,?)';

    db.query(insertUserInfo, [form_id, hashPwd, form_name, form_tel, form_birthday, form_email], (err, results) => {
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