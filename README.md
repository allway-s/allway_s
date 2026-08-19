# 🥪 ALLWAY-S (서브웨이 커스터마이징 & 레시피 공유 플랫폼)

## 📌 프로젝트 소개

**ALLWAY-S**는 서브웨이 샌드위치를 자유롭게 커스터마이징하고, 나만의 레시피를 다른 사용자들과 공유할 수 있는 웹 플랫폼입니다. 

사용자는 빵, 치즈, 야채, 소스 등을 단계별로 선택하여 자신만의 조합을 만들고, 이를 '프리셋'으로 저장하거나 커뮤니티에 공유할 수 있습니다. 또한 다른 사용자들의 인기 레시피를 확인하고 바로 주문할 수 있습니다.

### 👥 팀 구성 및 역할

| 프로필 | 이름/ID | 역할 | 기술 스택 | 깃허브 |
| :---: | :--- | :--- | :--- | :---: |
| <img src="https://github.com/JINHYUN-BRIGHTEVERYDAY.png" width="80"> | **JINHYUN-BRIGHTEVERYDAY** | • 메인 페이지 UI·레이아웃 설계<br> • 메뉴 선택·옵션 설정·장바구니 영역의 컴포넌트 구조 설계<br> • 주문 단계별 화면 렌더링 흐름을 프론트엔드에 적용 | • FrameWork: ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)| [![GitHub](https://img.shields.io/badge/GitHub-Link-181717?logo=github)](https://github.com/JINHYUN-BRIGHTEVERYDAY) |
| <img src="https://github.com/Choi-Baek-gyun.png" width="80"> | **Choi-Baek-gyun** | • 지도 API 연동 및 위치 기반 기능 구현<br> • 커뮤니티·프리셋 기능의 DB 설계 및 백엔드/프론트엔드 개발 | `Java`, `Spring Boot` | [![GitHub](https://img.shields.io/badge/GitHub-Link-181717?logo=github)](https://github.com/Choi-Baek-gyun) |
| <img src="https://github.com/SMITHROWE-10.png" width="80"> | **SMITHROWE-10** | • DB 설계 및 구조 설정<br>•백엔드 로직 구현<br>•프론트엔드 전반 코드 리팩토링 | `MySQL`, `MyBatis`, `React` | [![GitHub](https://img.shields.io/badge/GitHub-Link-181717?logo=github)](https://github.com/SMITHROWE-10) |
| <img src="https://github.com/HWANGDEOK.png" width="80"> | **HWANGDEOK** | • OAuth2(네이버, 구글) 연동 및 JWT 기반 인증/인가 구현<br>• Spring Security 필터 체인 구성 및 접근 제어 설계<br>• 결제 위변조 방지를 위한 PortOne V2 백엔드 검증 로직 구현|**Frontend**<br>![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)<br>**Backend**<br>![Java](https://img.shields.io/badge/Java%2021-007396?style=for-the-badge&logo=openjdk&logoColor=white)![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)![OAuth2](https://img.shields.io/badge/OAuth2-3C873A?style=for-the-badge&logo=auth0&logoColor=white)<br>**Database**<br>![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)![MyBatis](https://img.shields.io/badge/MyBatis-000000?style=for-the-badge&logo=mybatis&logoColor=white)<br>**DevOps**<br>![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)![GCP](https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white) | [![GitHub](https://img.shields.io/badge/GitHub-Link-181717?logo=github)](https://github.com/HWANGDEOK) |

### 🎯 주요 목표
- 서브웨이 주문의 복잡함을 단순화
- 사용자 간 레시피 공유를 통한 커뮤니티 형성
- 개인화된 주문 경험 제공
- 주문 내역 기반 재주문 편의성 제공

---
## ERD

<img width="974" height="770" alt="Image" src="https://github.com/user-attachments/assets/530f30b0-4624-4069-8f1b-0b03c9d4d374" />

---

## 🛠️ 기술 스택

### Frontend
- **React** 19.2.0 - UI 라이브러리
- **Vite** - 빌드 도구
- **Emotion** - CSS-in-JS 스타일링
- **React Router** - 클라이언트 라우팅
- **Axios** - HTTP 클라이언트
- **Lucide React** - 아이콘 라이브러리
- **PortOne (구 아임포트)** - 결제 시스템

### Backend
- **Spring Boot** 3.5.9
- **Java** 21
- **MyBatis** - SQL 매퍼
- **Spring Security** - 인증/인가
- **JWT** - 토큰 기반 인증
- **OAuth2** - 소셜 로그인 (네이버, 구글)

### Database
- **MySQL** - 관계형 데이터베이스

### Infrastructure
- **Docker** - 컨테이너화
- **Maven** - 빌드 관리
- **Kakao Maps API** - 지도/매장 찾기

---

## ✨ 주요 기능

### 1️⃣ 회원 관리
- 소셜 로그인 (네이버, 구글)
- JWT 기반 인증
- 닉네임 중복 확인
- 마이페이지 (프로필 조회)

### 2️⃣ 메뉴 커스터마이징
- **카테고리별 선택**: 샌드위치, 샐러드, 랩
- **단계별 재료 선택**: 빵 → 치즈 → 야채 → 소스 → 추가재료 → 세트
- **사이즈 선택**: 15cm / 30cm (샌드위치만 해당)
- **썹픽 기능**: 서브웨이 추천 레시피 바로 주문
- **실시간 가격 계산**: 선택한 재료에 따라 가격 자동 계산

### 3️⃣ 프리셋 관리
- 커스터마이징한 조합을 프리셋으로 저장 (최대 10개)
- 주문 내역에서 프리셋 저장
- 저장된 프리셋으로 빠른 재주문
- 프리셋 삭제 기능

### 4️⃣ 커뮤니티 (Recipe-s)
- 내 프리셋을 커뮤니티에 게시
- 다른 사용자 레시피 조회 (인기순/최신순)
- 좋아요 기능
- 다른 사용자 레시피 저장 (내 프리셋으로)
- 게시글 삭제 (본인만)

### 5️⃣ 주문 & 결제
- 장바구니 기능 (수량 조절, 삭제)
- 카카오맵 기반 배송지 설정
- 포트원(PortOne) 결제 연동
- 주문 내역 조회
- 주문 취소 기능

### 6️⃣ 세트 메뉴
- 세트 구성 (음료 + 사이드)
- 세트별 선택 가능한 옵션 조회
- 세트 추가 금액 자동 계산

---

## 🖥️ 화면 구성

### 메인 페이지
- 캐러셀 배너
- 인기 메뉴 섹션
- 커뮤니티 인기 레시피 (비로그인 시 블러 처리)

### 메뉴 페이지
- 카테고리별 메뉴 조회
- 썹픽 / 커스텀 버튼
- 사이즈 선택 모달

### 커스터마이징 페이지
- 6단계 프로그레스바
- 재료 선택 그리드
- 세트 선택 시 음료/사이드 선택 UI
- 수량 선택 및 가격 확인

### 장바구니 페이지
- 상품 목록 (이미지, 재료 정보, 가격)
- 수량 조절 / 삭제
- 카카오맵 기반 배송지 검색
- 결제하기

### 마이페이지
- 프로필 정보
- 최근 프리셋 3개
- 최근 주문 내역 2개

### 프리셋 관리
- 오리지널 레시피 (내가 만든 것)
- 저장된 레시피 (다른 사용자 것)
- 공유하기 / 주문하기 / 삭제

### 커뮤니티
- 게시글 목록 (인기순/최신순)
- 좋아요 토글
- 게시글 상세 모달
- 내 프리셋에 저장

### 주문 내역
- 주문별 상품 정보
- 재료 상세 표시
- 프리셋 저장 기능

#### -메인화면
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/6c32d777-3da0-441c-be1e-46cef065545d" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/d3adaa8b-7857-4257-a563-8bb0faa61e0e" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/62c5b47d-cfd4-435e-9a71-cb6cca8303ca" />

#### -로그인 페이지
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/2e1899ce-24ed-4756-868f-5afab00b1baf" />

#### -메뉴 페이지
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/cd0a42e5-7718-46da-9322-acb9caf5a8f5" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/9f3f83c4-4ebd-46f5-8394-248646b96c3e" />

#### -커스터 마이징
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/122f85fc-ad78-4007-8ad4-81a9f0902b4c" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/28c70f3a-7fe7-415d-8ca0-14caf9085fb7" />

#### 장바구니
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/51ff6313-da85-4877-81c5-bd27024d7b53" />

#### 마이페이지 프리셋
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/2fc3ce17-ec34-4c7f-a649-10d43d94de97" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/15a04675-eb0d-4328-9602-74d804f8b181" />

#### 커뮤니티
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/17d92f45-8e8f-4489-882b-dad6ea51c35c" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/ec33e27a-0b3b-4522-9316-ea6c44010265" />

---

## 📂 프로젝트 구조

### Backend (Spring Boot)
```
allways_back/
├── src/main/java/com/korit/allways_back/
│   ├── config/              # 설정 클래스
│   │   ├── OpenApiConfig.java        # Swagger 설정
│   │   ├── SecurityConfig.java       # Spring Security 설정
│   ├── controller/          # REST API 컨트롤러
│   │   ├── AuthController.java       # 인증 (회원가입, 중복확인)
│   │   ├── UserController.java       # 사용자 정보
│   │   ├── IngredientController.java # 재료 조회
│   │   ├── ItemController.java       # 아이템 조회
│   │   ├── ProductController.java    # 상품 생성/조회
│   │   ├── OrderController.java      # 주문 생성/조회
│   │   ├── PresetController.java     # 프리셋 관리
│   │   ├── PostController.java       # 커뮤니티 게시글
│   │   ├── PaymentController.java    # 결제 검증
│   │   └── SetMenuController.java    # 세트 메뉴
│   ├── dto/                 # 데이터 전송 객체
│   │   ├── request/         # 요청 DTO
│   │   └── response/        # 응답 DTO
│   ├── entity/              # 엔티티 클래스
│   ├── filter/              # 필터
│   │   └── JwtAuthenticationFilter.java
│   ├── jwt/                 # JWT 관련
│   │   └── JwtTokenProvider.java
│   ├── mapper/              # MyBatis 매퍼 인터페이스
│   ├── security/            # 보안 관련
│   │   ├── PrincipalUser.java
│   │   ├── OAuth2SuccessHandler.java
│   │   └── OAuth2UserService.java
│   └── service/             # 비즈니스 로직
└── src/main/resources/
    ├── mapper/              # MyBatis XML 매퍼
    └── application.yml      # 설정 파일
```

### Frontend (React)
```
allways_front/
├── src/
│   ├── apis/
│   │   ├── config/
│   │   │   └── axiosConfig.js        # Axios 인스턴스 설정
│   │   └── items/
│   │       ├── userApi.js            # 사용자 API
│   │       ├── menuApi.js            # 메뉴 API
│   │       ├── orderApi.js           # 주문 API
│   │       └── communityApi.js       # 커뮤니티 API
│   ├── components/
│   │   ├── Header.jsx                # 공통 헤더
│   │   ├── PresetCard.jsx            # 프리셋 카드
│   │   └── SubwayNearbyModal.jsx     # 매장 찾기 모달
│   ├── pages/
│   │   ├── AuthPage/                 # 인증 페이지
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── LoginSuccess.jsx
│   │   ├── MainPage/                 # 메인 페이지
│   │   │   ├── HomePage.jsx
│   │   │   └── components/
│   │   ├── menu/                     # 메뉴 페이지
│   │   │   └── MenuPage.jsx
│   │   ├── order/                    # 커스터마이징 페이지
│   │   │   └── CustomPage.jsx
│   │   ├── CartPage/                 # 장바구니
│   │   ├── MyPage/                   # 마이페이지
│   │   │   ├── MyPage.jsx
│   │   │   ├── MyPreset.jsx
│   │   │   └── RecentOrder.jsx
│   │   └── CommunityPage/            # 커뮤니티
│   ├── utils/
│   │   ├── cartStore.js              # 장바구니 로컬스토리지 관리
│   │   ├── getUserId.js              # JWT 토큰 파싱
│   │   ├── getIngreByCate.js         # 재료 카테고리별 필터링
│   │   └── scrollToTop.js            # 페이지 이동시 스크롤 초기화
│   └── App.jsx                       # 메인 앱 컴포넌트
└── index.html
```

---

## 🗄️ 데이터베이스 주요 테이블

### 사용자 관련
- `user_tb` - 사용자 정보
- `preset_tb` - 저장된 프리셋
- `post_tb` - 커뮤니티 게시글
- `like_tb` - 좋아요

### 상품 관련
- `item_tb` - 기본 아이템 (샌드위치, 샐러드, 랩)
- `ingredient_tb` - 재료
- `category_tb` - 카테고리
- `product_tb` - 조합된 상품
- `product_item_tb` - 상품-아이템 연결
- `product_ingredient_tb` - 상품-재료 연결

### 주문 관련
- `order_tb` - 주문 정보
- `order_detail_tb` - 주문 상세

### 세트 관련
- `set_menu_tb` - 세트 메뉴
- `set_component_tb` - 세트 구성 요소

---

## 🚀 실행 방법

### Backend
```bash
# 프로젝트 클론
git clone [repository-url]

# 디렉토리 이동
cd allways_back

# 빌드
./mvnw clean package

# 실행
./mvnw spring-boot:run

# 또는 Docker로 실행
docker build -t allways-back .
docker run -p 8080:8080 allways-back
```

### Frontend
```bash
# 디렉토리 이동
cd allways_front

# 의존성 설치

npm install lucide-react
npm install react-icons
npm install axios
npm install react-router-dom
npm install @emotion/react
npm install @emotion/styled
npm install @portone/browser-sdk


# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 🛠️ 환경 변수 설정

### Backend (pom.xml)

#### Dependencies

##### 1. JWT (JSON Web Token)
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.13.0</version>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.13.0</version>
    <scope>runtime</scope>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.13.0</version>
    <scope>runtime</scope>
</dependency>
```

##### 2. 인증 및 보안 (Security & OAuth2)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
```

##### 3. 데이터베이스 및 ORM (MyBatis & MySQL)
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.5</version>
</dependency>
```

##### 4. 웹 및 유틸리티 (Web, Validation, Mail)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

##### 5. API 문서화 (Swagger / OpenAPI)
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.14</version>
</dependency>
```

##### 6. 개발 도구 및 편의 기능 (Lombok & Devtools)
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

##### 7. 테스트 (Test)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter-test</artifactId>
    <version>3.0.5</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-test</artifactId>
    <scope>test</scope>
</dependency>
```

---

### 환경 변수 설정

#### Backend (`application-secret.yml`)
```yaml
spring:
  datasource:
    url: jdbc:mysql://[host]:[port]/[database]
    username: [username]
    password: [password]
  security:
    oauth2:
      client:
        registration:
          naver:
            client-id: [naver-client-id]
            client-secret: [naver-client-secret]
          google:
            client-id: [google-client-id]
            client-secret: [google-client-secret]

jwt:
  secret: [jwt-secret-key]

portone:
  store-id: [portone-store-id]
  v2-api-secret: [portone-api-secret]
```

#### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080
VITE_KAKAO_MAP_API=[KakaoMapAPI_JSKey]
```

---

## 🔐 보안

- JWT 기반 토큰 인증
- OAuth2 소셜 로그인
- Spring Security 적용
- XSS/CSRF 방어
- 비밀번호 암호화 (소셜 로그인만 사용)

---

## 📱 주요 API 엔드포인트

### 인증
- `POST /api/auth/signup` - 회원가입
- `GET /api/auth/check-nickname` - 닉네임 중복 확인
- `GET /api/user/me` - 내 정보 조회

### 메뉴
- `GET /api/items?categoryName={category}` - 카테고리별 아이템 조회
- `GET /api/ingredients?categoryName={category}` - 카테고리별 재료 조회
- `GET /api/sets` - 세트 메뉴 목록
- `GET /api/sets/{setId}/detail` - 세트 상세 정보

### 상품
- `POST /api/products` - 상품 생성/조회
- `GET /api/products/{productId}/price` - 가격 계산
- `GET /api/products/subway-pick/{itemId}` - 썹픽 조회

### 주문
- `POST /api/orders` - 주문 생성
- `GET /api/orders/history` - 주문 내역
- `PUT /api/orders/{orderNumber}/cancel` - 주문 취소

### 프리셋
- `POST /api/presets/save` - 프리셋 저장
- `GET /api/presets` - 내 프리셋 목록
- `DELETE /api/presets/{presetId}` - 프리셋 삭제

### 커뮤니티
- `POST /api/posts` - 게시글 작성
- `GET /api/posts` - 게시글 목록
- `POST /api/posts/{postId}/like` - 좋아요 토글
- `DELETE /api/posts/{postId}` - 게시글 삭제

### 결제
- `POST /api/payment/verify` - 결제 검증

---

## 📝 라이센스

This project is private and proprietary.

---

## 🐛 알려진 이슈

1. 장바구니 데이터가 로컬스토리지에 저장되어 브라우저 간 동기화 불가
2. 이미지 업로드 기능 미구현 (프리셋 이미지는 기본 아이템 이미지 사용)
3. 알림 기능 미구현

---

## 🔜 향후 개선 사항

- [ ] 실시간 알림 (좋아요, 댓글)
- [ ] 리뷰 시스템
- [ ] 쿠폰/할인 시스템
- [ ] 관리자 페이지
- [ ] 환불 처리
- [ ] 실패한 주문내역 6개월 후 삭제
- [ ] 인증 및 결제로직 코드 최적화

---

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
