const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const db = require("../config/db");

router
  .route('/signup/register')
  .post(async (req, res) => {
    const { form_id, form_pwd1, form_pwd2, form_name, form_tel, form_birthday, form_email } = req.body;

    try {
      /* 
      // Signup.jsx에서 잘 막고 있음.

      if(form_pwd1 !== form_pwd2) {
      return res.status(400).json({
        success: false,
        message: "비밀번호가 불일치합니다."
      });
    }; */

    if(form_pwd1.length < 5) {
      // return res.status(403).send("비밀번호는 5글자 이상부터 가능합니다.");
      res.json({
        ok: false,
        alert: "비밀번호는 5글자 이상부터 가능합니다.",
      })
      return;
    };

    const existingUserInfo = 'SELECT * FROM users WHERE users_id = ?';

    db.query(existingUserInfo, [form_id], async (err, results) => {
      console.log(results);

      if (err) {
        console.error("🟡 첫번째 try문: existingUserInfo 사용자 정보 불러오는 중 발생한 오류입니다.");
      }

      DBsameData = 0;
      if(results.length !== DBsameData) {
        console.log("🟡 중복된 아이디입니다. \n 다른 아이디를 입력해 주세요.");
        return res.status(409).send("이미 존재하는 아이디입니다.");
      };

        try {
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

            };


          })
        } catch(err) {

        }
      
    });

    console.log(form_id, form_pwd1, form_name, form_tel, form_birthday, form_email);

    } catch(err) {
      console.error("🟡 첫번째 catch문: existingUserInfo 사용자 정보 불러오는 중 발생한 오류입니다.");
      console.log("에러메세지: ", err);
    }

    
  });

module.exports = router;