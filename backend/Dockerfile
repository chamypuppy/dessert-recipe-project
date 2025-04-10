# Node.js 베이스 이미지
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 복사 & 설치
COPY package*.json ./

# npm install로 모듈 설치
RUN npm install

# 전체 소스 복사
COPY . .

# 서버가 사용할 포트
EXPOSE 5000

# 서버 시작 명령어
CMD ["node", "server.js"]
