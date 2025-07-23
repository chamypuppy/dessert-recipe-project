/* 6. MySQL연결 설정 */
const mysql = require('mysql2');
const dbConfig = require('./db.config');
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

module.exports = db;