const express = require("express");
const router = express.Router();

router
  .route('/signup/register')
  .post((req, res) => {
    const { form_id, form_pwd1, form_name, form_tel, form_birthday, form_email } = req.body;

    db.query(`INSERT INTO users(users_id, users_pwd, users_name, email, birthday, tel) VALUES(?,?,?,?,?,?)`);

    db.query(query, [form_id, form_pwd1, form_name, form_email, form_birthday, form_tel], (err, results) => {
      if(err) {
        console.log("회원가입 에러:  usersRoutes server 에러입니다.", err);
        res.status(500).send("회원가입 [userRoutes] server 오류");
      } else {
        // res.json(results); // 프론트로 결과값 전송
        res.json({
          success: true,
          message: "회원가입이 완료되었습니다😄🔅"
        })

      }


    })

    console.log(form_id, form_pwd1, form_pwd2, form_name, form_tel, form_birthday, form_email);
  });

module.exports = router;