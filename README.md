# ALBUM.BIRD89

부부레코드 앨범 관리 웹 애플리케이션

## 📋 프로젝트 소개

Nuxt.js 2 기반의 SPA(Single Page Application) 앨범 관리 시스템입니다. 사진 앨범, 건강 기록, 히스토리, 노트 등의 기능을 제공합니다.

## 🚀 기술 스택

- **Framework**: Nuxt.js 2.15.8 (Vue.js 2.6.14)
- **UI Framework**: Vuetify 2.6.1
- **HTTP Client**: Axios
- **State Management**: Vuex (with vuex-persist)
- **Styling**: SCSS
- **File Upload**: AWS SDK, Multer, Multer-S3
- **Database**: MySQL2, Sequelize
- **Image Processing**: Sharp, Compressorjs
- **Date/Time**: Moment.js
- **Authentication**: JWT

## 📁 프로젝트 구조

```
buburecord-front/
├── assets/           # 스타일시트 및 정적 리소스
│   └── scss/         # SCSS 파일 (reset, common, variable, mixin)
├── components/       # Vue 컴포넌트
├── layouts/          # 레이아웃 컴포넌트
├── pages/            # 페이지 컴포넌트 (라우팅)
│   ├── album/        # 앨범 페이지
│   ├── health/       # 건강 기록 페이지
│   ├── history/      # 히스토리 페이지
│   ├── join/         # 회원가입 페이지
│   ├── login/        # 로그인 페이지
│   └── note/         # 노트 페이지
├── plugins/          # Nuxt 플러그인
│   ├── axios.js      # Axios 플러그인
│   └── vuex-persist  # Vuex 영속화
├── static/           # 정적 파일
├── store/            # Vuex 스토어
└── nuxt.config.js    # Nuxt 설정 파일
```

## 🛠️ 설치 및 실행

### 필수 요구사항

- Node.js (권장: v14 이상)
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
# 또는
yarn install
```

### 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 설정합니다:

```bash
# 개발 서버 설정
APP_HOST=localhost
APP_PORT=3000

# API 서버 URL
API_URL=http://localhost:4000
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 프로덕션 빌드

```bash
# 프로덕션 빌드
npm run build
# 또는
yarn build

# 프로덕션 서버 시작
npm start
# 또는
yarn start
```

### 정적 사이트 생성

```bash
npm run generate
# 또는
yarn generate
```

## 🌐 배포

현재 이 프로젝트는 **Vercel**을 통해 배포되고 있습니다.

### Vercel 배포 설정

1. Vercel 프로젝트와 Git 저장소 연결
2. 환경 변수 설정:
   - `API_URL`: 백엔드 API 서버 URL
3. 빌드 설정:
   - Build Command: `npm run build` 또는 `yarn build`
   - Output Directory: `.nuxt/dist`
4. `main` 브랜치에 푸시하면 자동으로 배포됩니다.

## 🔧 주요 설정

### Nuxt 설정 ([nuxt.config.js](nuxt.config.js))

- **SSR**: 비활성화 (SPA 모드)
- **Auto Import**: 컴포넌트 자동 import 활성화
- **Global CSS**: reset.scss, common.scss
- **Style Resources**: variable.scss, mixin.scss 전역 사용 가능
- **Plugins**: Axios, Vuex-persist
- **Modules**:
  - @nuxtjs/axios (HTTP 클라이언트)
  - @nuxtjs/style-resources (스타일 리소스)
  - @nuxtjs/moment (날짜/시간 처리)

### Axios 설정

- Base URL: 환경 변수 `API_URL`에서 설정
- 플러그인을 통한 인터셉터 설정 가능

## 📦 주요 기능

- **앨범 관리**: 사진 업로드 및 앨범 관리
- **건강 기록**: 건강 관련 데이터 기록 및 조회
- **히스토리**: 활동 내역 관리
- **노트**: 메모 및 노트 작성
- **회원 인증**: 로그인, 회원가입 (JWT 기반)

## 🐳 Docker 지원

프로젝트에 Dockerfile이 포함되어 있어 컨테이너화된 배포가 가능합니다.

```bash
# Docker 이미지 빌드
docker build -t buburecord-front .

# Docker 컨테이너 실행
docker run -p 3000:3000 buburecord-front
```

## 📝 라이선스

Private

## 👥 기여

Private Repository

---

**Note**: 이 프로젝트는 Nuxt 2를 사용하고 있습니다. Nuxt 3로의 마이그레이션을 고려할 수 있습니다.
