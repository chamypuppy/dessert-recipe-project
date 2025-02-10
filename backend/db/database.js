// backend/db/database.js
import mysql from 'mysql2';
import config from '../config/dbConfig.js';  // dbConfig.js에서 MySQL 설정 가져오기

// DB 연결 풀 생성
const pool = mysql.createPool(config.db).promise();

// 연결 풀을 외부로 내보내기
export default pool;
