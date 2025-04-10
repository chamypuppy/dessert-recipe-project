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

<br/>

### 개발 예정 기능
- 카카오 로그아웃 기능 해결(✔ 25.02.23 해결)
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
<img src="https://github.com/chamypuppy/dessert-recipe-project/issues/4#issue-2916313500" width="500"/>
<br/><br/>

### logout
<img src="https://github.com/chamypuppy/dessert-recipe-project/issues/5#issue-2972094932" width="500"/>
<br/><br/>

### detail page1
<img src="[https://github.com/chamypuppy/dessert-recipe-project/issues/2#issue-2916288049](https://private-user-images.githubusercontent.com/91423376/422249699-7a934fd9-802a-48cb-b806-021704b826c2.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQyNzU4MjMsIm5iZiI6MTc0NDI3NTUyMywicGF0aCI6Ii85MTQyMzM3Ni80MjIyNDk2OTktN2E5MzRmZDktODAyYS00OGNiLWI4MDYtMDIxNzA0YjgyNmMyLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDEwVDA4NTg0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJmNTkwMzllM2E0MjI0ZjU5OTM3ZWVjNzY5NGFhZmEyZjA4YzcxYzE4ZTZiM2Y1NjQ4ZTdiZjc2YzY2OWNiY2ImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.QgYEfLYuqP_2f8j4TGy1hRAiFDhdo8OBabjJqkl72lw)" width="500"/>
<br/><br/>

### detail page2
<img src="https://github.com/user-attachments/assets/fbd58a79-5f78-4514-b5a0-8a68d9be2bb8" width="500"/>
<br/><br/>

```
💬 업로드 용량 문제로 인해 gif 압축이 진행되어 화면 전환과 화면의 일부가 매끄럽지 못할 수 있습니다.
양해 부탁드리겠습니다.
```
