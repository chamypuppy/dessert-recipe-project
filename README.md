디저트 레시피 공유 풀스택 서비스 `Made Sweet`
--
다양한 디저트 조리 방식을 공유하는 Full-Stack 웹 서비스 구축 및 AWS 기반 인프라 운영<br/><br/>
- <a href="https://d27y0w51j8dqvr.cloudfront.net/">서비스링크</a><br/><br/>
- <a href="https://drive.google.com/file/d/10gRyNFK0QM_UHB-dk4h19GfrIHsmmN-M/view?usp=sharing">[Full-Stack] 포트폴리오 (26.03.09~)</a><br/><br/>
- <a href="https://drive.google.com/file/d/1lO6QEEfBS95ZxL3NH_gb-l-K71d_y81y/view?usp=sharing)">[Cloud Engineer] 포트폴리오 (26.03.09~)</a><br/><br/>
- <a href="https://drive.google.com/file/d/1EkWlBU6DzKug0rMW-6adauH68t_aGzri/view?usp=sharing">서비스링크 작동 시연 (25.09.21~)</a><br/><br/>

※ AWS 배포 이후부터는 ```EC2``` 및 ```s3, cloudFront``` 연결을 위해 ```aws-dessert-server```와 ```aws-dessert-client``` 2개의 리포지토리로 나누어 운영 중이며<br/>
이 레포지토리는 ```이전 개발 및 ReadMe``` 전용 링크로 소개하고 있습니다.<br/><br/>
- <a href="https://github.com/chamypuppy/aws-dessert-server">백엔드 리포지토리 (aws-dessert-server)</a><br/>
- <a href="https://github.com/chamypuppy/aws-dessert-client">프론트 리포지토리 (aws-dessert-client)</a><br/><br/>

<br/>

프로젝트 소개
--
### 개발 목표

#### 1. 기획 의도
사용자 중심의 크로스 플랫폼 개발 및 다양성 존중
- **반응형 웹 디자인**: <br/>PC 및 모바일 환경 어디서든 동일하게 최적화된 UX를 제공하는 레시피 웹앱 구현<br/><br/>
- **식문화 다양성 대응**: <br/>저당, 비건, 통밀 등 특수 식단을 고려한 세부 카테고리 설계 및 사용자 맞춤형 큐레이션 서비스 제공<br/><br/>

#### 2. 기술적 도전
- **인프라 한계 극복 및 트러블슈팅**: <br/>이전 프로젝트(VOCA)의 정적 호스팅 환경(Netlify)에서 발견한 데이터 휘발성 문제를 분석하고 해결하기 위한 Express 기반 백엔드 시스템 도입<br/><br/>
- **인프라 마이그레이션(PaaS to IaaS)**:
  - 초기 배포 단계에서 설정이 간편한 CloudType(PaaS)을 활용하였으나 실무에서 널리 쓰이는 리눅스 기반 인프라 운영 경험을 쌓고 서버 제어권을 확보하기 위해 **AWS(IaaS)** 환경으로 이전
  - 비용 효율성을 고려하여 AWS 프리티어 범위 내에서 Ubuntu 서버로 구축 및 보안그룹 설정을 통해 외부 환경에서의 보안을 강화함<br/><br/>
- **PM2를 통한 무중단 서비스 운영**: <br/>고가의 유료 플랜 없이도 안정적인 서비스를 운영하기 위해 pm2 프로세스 관리 기능 도입<br/><br/>
- **데이터 영속성 확보**: <br/>Netlify 등 정적 호스팅 환경의 데이터 휘발성 문제를 인지하고 Express 서버 AWS 연결을 통해 지속적인 서비스 유지가 가능한 Full-Stack 아키텍처 구축<br/><br/>


### 핵심 역할
```AWS 인프라 아키텍처 설계``` ```백엔드 API 서버 구축``` ```데이터베이스 스키마 설계```

<br/>

### 개발 기간
24.10 - 
<br/> <h6>~~개발 중단 (26.03)~~ 개발 재개 (26.04)</h6>

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
<sub>※ FSD 아키텍처 마이그레이션으로 인해 바로가기 아이콘, 회원가입 & 로그인 & 마이페이지 이용이 제한됩니다.
빠른 시일 내 개선 예정입니다.</sub><br/><br/>
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

프로젝트 개발 로그
--
<a href="https://chamypuppy.tistory.com/category/%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A1%9C%20%EC%9B%B9%20%EA%B0%9C%EB%B0%9C%20A%20to%20Z" target="_blank">🔗 티스토리</a>

<br/><br/>


배포 타임라인
--
-  ```Phase 1. 초기 서비스 배포 clouytype(PaaS)```<br/>
   - PaaS 기반 풀스택 인프라 구축: 초기 빠른 서비스 검증을 위한 PaaS환경에서 Backend, Front-end, DB를 통합 배포
   - 모노레포 구조 배포: Github 서브 디렉토리 구조를 활용하여 Front-end와 Backend를 독립적으로 관리 및 배포
  
- ```Phase 2. 기능 고도화 및 안정화```
  - 내부 CORS 설정과 server 내 API 연결 최적화<br/><br/>
  
- ```Phase 3. AWS 인프라 마이그레이션(IaaS)```
  - 인프라 고도화: 실무 수준의 클라우드 인프라 설정을 위한 AWS(EC2, RDS, S3) 환경으로 시스템 마이그레이션
  - 무중단 운영: PM2 프로세스 매니저 도입과 Ubuntu 환경의 보안 설정
<br/><br/>


### 인프라 및 배포 (기술적 성장)
<a href="https://chamypuppy.tistory.com/142" target="_blank">🔗티스토리-서비스배포</a> <br/>
<a href="https://chamypuppy.tistory.com/135" target="_blank">🔗티스토리-플랫폼연결</a>


