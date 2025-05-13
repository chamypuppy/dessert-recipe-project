디저트 레시피 공유
--
다양한 식문화를 반영하는 맞춤형 디저트 레시피 SPA

<br/>

프로젝트 소개
--
### 개발 목표
- 디저트 레시피를 찾을 때 pc와 모바일에서 편리하게 확인할 수 있는 웹앱 페이지를 만들고자 함
- 저당, 비건, 통밀 등 다양한 식문화를 가진 이색 디저트 레시피도 카테고리화 하여 수록하고, 맞춤형 서비스로도 추천할 수 있게 하기 위함
- 사이드 프로젝트 암기장 VOCA를 배포하며 알게된 문제점과 원인으로 예측되는 개념들을 사용해보기 위함<br/>
  ```
  문제: netlify에 빌드하여 기능들을 수행해보았는데 DB에 저장된 data들이 하나도 반영이 되지 않아 기능이 작동되지 않음
  
  해결 접근: 새 프로젝트를 통해 해당되는 개념들을 직접 사용해보고 해결하기 위함 (그래서 express를 사용)
  
  원인 추정: https://chamypuppy.tistory.com/108
  ```

- 직접 사용의 목적

<br/>

### 개발 기간
24.10 ~ 진행 중

<br/>

### 개발 환경
```Language: react```
```DB: MySQL```

<br/>

### 사용 기술
```front: bootstrap```
```back: node.js, express```

<br/><br/>

개발 노트
--
### 개발 기능
- 리액트와 node.js 그리고 MySQL을 연동하기
- node.js를 이용하여 필요한 API를 만들기
- node.js와 카카오 로그인 API를 연동하기 (REST API로 개발)
- 세션과 쿠키 사용
- 로컬 MySQL Workbench와 cloudtype 연결 & 배포하기 (✔ 25.04.25 배포 성공)
- 깃허브 backend 서버와 cloudtype 연결하기 (✔ 25.04.25 연결 성공)
- 깃허브 서브 디렉토리 frontend 폴더와 cloudtype 연결하기 (✔ 25.05.09 연결 성공)

<br/>

### 개발 예정 기능
- 카카오 로그아웃 기능 해결(✔ 25.02.23 해결)
- 프로젝트 코드 배포 (✔ 25.04.25 DB와 server 연결 성공)
- 레시피 CRUD 기능 개발
- 레시피 좋아요 기능과 모아보기 기능 개발
- 추천하고픈 레시피들 모음 페이지 개발
- 맞춤형 서비스 리서치
  회원가입시 내가 이 디저트 레시피 페이지에서 원하는 기능들을 리서치
  리서치 후 나의 선호도에 맞는 레시피를 우선적으로 보여줄 수 있게 맞춤형 서비스 반영하기

<br/><br/>

회고 및 트러블슈팅
--
<a href="https://chamypuppy.tistory.com/category/%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A1%9C%20%EC%9B%B9%20%EA%B0%9C%EB%B0%9C%20A%20to%20Z" target="_blank">🔗티스토리</a>

<br/><br/>
<br/>

개발 현황
--

### login
<img src="https://private-user-images.githubusercontent.com/91423376/422253218-ad87cff6-f2e2-41a3-8516-241468f6a739.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDE4NTU2MTMsIm5iZiI6MTc0MTg1NTMxMywicGF0aCI6Ii85MTQyMzM3Ni80MjIyNTMyMTgtYWQ4N2NmZjYtZjJlMi00MWEzLTg1MTYtMjQxNDY4ZjZhNzM5LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzEzVDA4NDE1M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNiOGI0NGJiMGY4MzBiYTEzM2JjNGM5YzM3NzlhMDM2NmVmNTllNGRlOTQ3ZGNhOWU3YWI5NzA5YzViYzc2MzUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Df3PrfqYHjzOaWc7-yB93aSsW5e_zuQ7Vx9Arc5SXsg" width="500"/>
<br/><br/>

### logout
<img src="https://github.com/user-attachments/assets/7ff62a95-09aa-4490-bf30-01093a6f786c" width="500"/>
<br/><br/>

### detail page1
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/91423376/422249699-7a934fd9-802a-48cb-b806-021704b826c2.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250313%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250313T083406Z&X-Amz-Expires=300&X-Amz-Signature=5402c795bf9d8010870ad7eb150af7683b029e805a39c9b010c44e788ca94022&X-Amz-SignedHeaders=host" width="500"/>
<br/><br/>

### detail page2
<img src="https://github.com/user-attachments/assets/fbd58a79-5f78-4514-b5a0-8a68d9be2bb8" width="500"/>
<br/><br/>

```
💬 업로드 용량 문제로 인해 gif 압축이 진행되어 화면 전환과 화면의 일부가 매끄럽지 못할 수 있습니다.

💬 리드미 gif 이미지 누락 관련:
재업로드 후에도 지속적으로 파일이 내려가는 경우가 확인되어 불편하시더라도 Issues 탭에서도 gif 이미지 확인이 가능함을 안내 및 양해 부탁드리겠습니다 (_ _)
```

<br/><br/>

배포하기
--

### 배포 현황

### DB
연결 & 배포 완료✔<br/>
로컬 리액트 프로젝트에서 배포 도메인 연결 및 데이터 불러오기 확인 ✔<br/>
레시피 CRUD 영역 개발 후 배포 도메인을 통해 DB에 잘 반영되는지 확인 예정
<br/><br/>

### back
연결 완료✔<br/>
레시피 API 엔드포인트 주소들은 추후에 교체 예정
<br/><br/>

### front
연결 완료✔<br/>
Home 컴포, hooks 파일 API 주소 호스팅 플랫폼 주소로 변경 중
<br/><br/>
### 배포 관련 회고 및 성공
<a href="https://chamypuppy.tistory.com/135" target="_blank">🔗티스토리</a>
