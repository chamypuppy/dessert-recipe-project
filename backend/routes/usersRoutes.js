const express = require("express");
const router = express.Router();

router
  .route('/api/signup/register')
  .post((req, res) => {
    const {form_id, form_pwd1, form_name, form_tel, form_birthday, form_email } = req.body;

    db.query(`INSERT INTO users(users_id, users_pwd, users_name, email, birthday, tel) users VALUES(?,?,?,?,?,?)`);

    console.log(form_id, form_pwd1, form_pwd2, form_name, form_tel, form_birthday, form_email);
  })

module.exports = router;