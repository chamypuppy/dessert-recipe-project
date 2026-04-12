디저트 레시피 공유
--
다양한 디저트 조리 방식을 공유하는 Full-Stack 웹 서비스 구축 및 AWS 기반 인프라 운영<br/><br/><br/>
<a href="https://web-frontend-m9r49kx74d07a286.sel4.cloudtype.app/">🧩 서비스링크</a><br/><br/>
<a href="https://drive.google.com/file/d/10gRyNFK0QM_UHB-dk4h19GfrIHsmmN-M/view?usp=sharing">🌏 [Full-Stack] 포트폴리오 (26.03.09~)</a><br/><br/>
<a href="https://drive.google.com/file/d/1lO6QEEfBS95ZxL3NH_gb-l-K71d_y81y/view?usp=sharing)">🌏 [Cloud Engineer] 포트폴리오 (26.03.09~)</a><br/><br/>
<a href="https://drive.google.com/file/d/1EkWlBU6DzKug0rMW-6adauH68t_aGzri/view?usp=sharing">🌏 서비스링크 작동 시연 (25.09.21~)</a><br/><br/>


<br/>

프로젝트 소개
--
### 개발 목표

#### 1. 기획 의도
사용자 중심의 크로스 플랫폼 개발 및 다양성 존중
- 반응형 웹 디자인: PC 및 모바일 환경 어디서든 동일하게 최적화된 UX를 제공하는 레시피 웹앱 구현
- 식문화 다양성 대응: 저당, 비건, 통밀 등 특수 식단을 고려한 세부 카테고리 설계 및 사용자 맞춤형 큐레이션 서비스 제공<br/><br/>

#### 2. 기술적 도전
- 인프라 한계 극복 및 트러블슈팅: 이전 프로젝트(VOCA)의 정적 호스팅 환경(Netlify)에서 발견한 데이터 휘발성 문제를 분석하고 해결하기 위한 Express 기반 백엔드 시스템 도입<br/><br/>
- 인프라 마이그레이션(PaaS to IaaS):
  - 초기 배포 단계에서 설정이 간편한 CloudType(PaaS)을 활용하였으나 실무에서 널리 쓰이는 리눅스 기반 인프라 운영 경험을 쌓고 서버 제어권을 확보하기 위해 AWS(IaaS) 환경으로 이전
  - 비용 효율성을 고려하여 AWS 프리티어 범위 내에서 Ubuntu 서버로 구축 및 보안그룹 설정을 통해 외부 환경에서의 보안을 강화함<br/><br/>
- PM2를 통한 무중단 서비스 운영: 고가의 유료 플랜 없이도 안정적인 서비스를 운영하기 위해 pm2 프로세스 관리 기능 도입<br/><br/>
- 데이터 영속성 확보: Netlify 등 정적 호스팅 환경의 데이터 휘발성 문제를 인지하고 Express 서버 AWS 연결을 통해 지속적인 서비스 유지가 가능한 Full-Stack 아키텍처 구축<br/><br/>


### 핵심 역할
AWS 인프라 아키텍처 설계, 백엔드 API 서버 구축, 데이터베이스 스키마 설계

<br/>

### 개발 기간
24.10 ~ ~~개발 중단 (26.03)~~ > 개발 재개 (26.04)

<br/>


### 사용 기술
```Infra: AWS (EC2, RDS, S3), Cloudtype(PaaS), Git, GitHub```<br/><br/>
```Back-end: NodeJS, Express, MySQL```<br/><br/>
```Front-end: React, JavaScript, Tailwind CSS, Bootstrap```<br/><br/>
```IDE: VSCode, Cursor```

<br/><br/>

개발 노트
--
### 설계 구조
프로젝트 규모 확장에 따른 컴포넌트 간 높은 결합도를 해소하고자 기존 레이어 구조의 한계를 분석하고 **FSD(Feature-Sliced Design)** 아키텍처를 도입하여 모듈화와 유지보수성을 극대화하였습니다.<br/><br/>

- **app:**<br/>
  route 페이지 그룹화<br/><br/>
- **context:** <br/>전역 상태 저장 및 사용<br/><br/>
- **features:** <br/>특정 서비스 기능 구조 그룹화<br/><br/>
- **pages:** <br/>route UI 실현 페이지<br/><br/>
- **entities:** <br/>데이터 중심 그룹화 (useHooks)<br/><br/>
- **widget:** <br/>features와 entities 구조 결합 및 공유 UI<br/><br/>
- **shared:** <br/>재사용 가능성 & 포괄적인 레이아웃 코드<br/><br/><br/>

<sub>기능(model)과 화면(ui)을 물리적으로 분리하고 ```js```와 ```jsx``` 확장자를 전락적으로 활용하여 파일의 역할과 책임을 명확히 정의했습니다.<br/>
복잡한 프로젝트 구조 내에서도 기능 단위의 빠른 파악이 가능하도록 설계했습니다.</sub>



<br/><br/>
### 개발 기능
※ FSD 아키텍처 마이그레이션으로 인해 바로가기 아이콘, 회원가입 & 로그인 & 마이페이지 이용이 제한됩니다.
빠른 시일 내 개선 예정입니다.<br/><br/>
#### pages
- **홈 & 상세 페이지**
  <br/> pc, 태블릿, 모바일 환경에 따라 홈화면 레이아웃 개선(✔ 25.12, Z폴드 지원)
  <br/><br/>
- **마이페이지**
  <br/> 카카오톡, 일반 로그인 통합 로그아웃 기능 추가
  <br/><br/>
- **회원가입 페이지**
  <br/>DB 저장 시 비밀번호 해시화
  <br/><br/>
- **로그인 페이지**
  <br/>카카오톡, 일반 로그인 기능 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(카카오톡 REST API 사용)
  <br/>카카오 로그인, 로그아웃 서버 모듈화 (✔ 25.08.24 코드 개선)
  <br/><br/>
- **리서치 페이지**
  <br/> 응답 여부 선택 가능
  <br/> 미응답자 관련 리서치 페이지 접근: 추후 마이페이지에서 응답 가능하게 리서치 페이지 추가 예정
  <br/> 응답 제출 시 DB 저장 확인 완료, 미응답 제출 시 서버 에러 발생 & 개선 예정
  <br/> ```리서치 페이지 url:``` https://web-frontend-m9r49kx74d07a286.sel4.cloudtype.app/users/research
  
<br/>

#### 부가 기능
- ~~홈 화면에 레시피 (+) 버튼 추가~~ (FSD 구조 변경으로 바로가기 아이콘들 임시 블라인드)
- 검색 기능 추가
  <br/>아이콘 및 엔터로 검색 기능 해결
  <br/>FSD 아키텍처 구조 개선으로 인해 검색한 키워드 목록 불러오기에 에러 확인 & 해결 목표 설정
- ~~홈화면 바로가기 아이콘 추가~~ (구조 변경으로 인한 바로가기 아이콘들 임시 블라인드)
- tailwind 도입(✔ 25.09.15 ~)

<br/>

### 개발 중 & 예정 기능
- ~~카카오 로그아웃 기능 해결(✔ 25.02.23 해결)~~
- ~~프로젝트 코드 배포 (✔ 25.04.25 DB와 server 연결 완료)~~
- 레시피 CRUD 기능 개발
- 레시피 좋아요 & 모아보기 기능
- 추천 레시피 페이지
- 맞춤형서비스 리서치 페이지
  <br/>미응답 제출 시 에러 발생 확인 & 개선 예정
  <br/>마이페이지에서 응답한 리서치 데이터 확인 가능하게 ux 추가 예정
  <br/>응답 데이터를 활용하여 선호도에 맞는 레시피 우선적으로 보여주기
- 엔터 검색 기능 & 검색 결과 홀수 레이아웃 수정
- 일부 모바일 기기에서 홈 바로가기 아이콘 & 레시피 추가 아이콘이 보이지 않음 개선(가로 너비 최적화 고려의 필요성)
- 디렉 구조 FSD 마이그레이션 진행 중

<br/><br/>

회고 및 트러블슈팅
--
<a href="https://chamypuppy.tistory.com/category/%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A1%9C%20%EC%9B%B9%20%EA%B0%9C%EB%B0%9C%20A%20to%20Z" target="_blank">🔗 티스토리</a>

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
💬 ReadMe 업로드 용량 문제로 인해 gif 압축이 진행되어 화면 전환과 화면의 일부가 매끄럽지 못할 수 있습니다.

💬 ReadMe gif 이미지 누락 관련:
재업로드 후에도 지속적으로 파일이 내려가는 경우가 확인되어 불편하시더라도 Issues 탭 또는 AWS Service Link & 개발 시연 영상에서 확인이 가능함을 안내드립니다.
```

<br/><br/>

배포하기
--
-  ```dessert-recipe-project``` clouytype(PaaS) 배포 완료<br/>
   - 로컬 MySQL Workbench와 cloudtype 연결 & 배포하기 (✔ 25.04.25)
    - 깃허브 backend 서버와 cloudtype 연결하기 (✔ 25.04.25)
    - 깃허브 서브 디렉토리 frontend 폴더와 cloudtype 연결하기 (✔ 25.05.09)<br/><br/>
  
- 내부 CORS 설정과 server 내 API 연결 최적화 시도 완료<br/><br/>
- 디저트 레시피 프로젝트 **서비스 배포** 완료<br/>
  - ```홈``` &nbsp; ```상세 레시피``` &nbsp; ```로그인``` &nbsp; ```마이페이지``` &nbsp; ```검색``` 페이지 모두 서비스 배포 링크에서 확인하실 수 있습니다.<br/><br/>
- 카카오 로그인 (KOE101) 에러 검토 완료<br/><br/>
- **AWS (EC2, RDS, S3) 서비스 배포 완료** (✔ 26.02.04)
<br/><br/>

### 배포 현황

### DB
연결 완료✔<br/>
로컬 리액트 프로젝트에서 배포 도메인 연결 및 데이터 불러오기 확인 ✔<br/>
레시피 CRUD 영역 개발 후 배포 도메인을 통해 DB에 잘 반영되는지 확인 예정
<br/><br/>

### back
연결 완료✔<br/>
레시피 API 엔드포인트 주소들 교체 완료 ▶ 검토 완료
<br/><br/>

### front
연결 완료✔<br/>
Home 컴포, hooks 파일 API 주소 호스팅 플랫폼 주소로 변경 완료 ▶ 검토 완료
<br/><br/>
### 배포 관련 회고 및 성공
<a href="https://chamypuppy.tistory.com/142" target="_blank">🔗티스토리_서비스배포</a> <br/>
<a href="https://chamypuppy.tistory.com/135" target="_blank">🔗티스토리_플랫폼연결</a>


