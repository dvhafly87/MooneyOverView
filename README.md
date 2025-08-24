# MooneyOverView

Mooney AI 가계부 프로젝트의 기술서 및 데모 페이지입니다.

## 🚀 배포된 사이트

**Live Demo**: [https://dvhafly87.github.io/MooneyOverView](https://dvhafly87.github.io/MooneyOverView)

## 📋 프로젝트 개요

이 프로젝트는 실제 MooneyFront 프로젝트의 기능들을 기술 문서 형태로 소개하는 데모 페이지입니다.

### 🎯 주요 기능

- **메인 페이지**: 프로젝트 소개 및 팀 정보
- **가계부 관리**: 수입/지출 CRUD 기능 데모
- **챌린지 시스템**: 게임화된 목표 달성 시스템
- **일기 작성**: 개인 일기 및 지출 기록
- **구독 서비스 관리**: 정기 결제 서비스 관리
- **AI 챗봇**: Meta-Llama3-8b 기반 재무 상담
- **사용자 관리**: 세션 기반 인증 시스템

### 🛠️ 기술 스택

- **Frontend**: React 19, Vite
- **Styling**: CSS3, Framer Motion
- **Icons**: React Icons
- **Charts**: ApexCharts
- **Routing**: React Router DOM

### 📱 반응형 웹

- **데스크톱**: 1200px 이상
- **태블릿**: 768px ~ 1199px  
- **모바일**: 767px 이하

## 🚀 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📦 배포

이 프로젝트는 GitHub Pages를 통해 자동 배포됩니다.

### 배포 과정

1. `main` 브랜치에 푸시
2. GitHub Actions가 자동으로 빌드 및 배포
3. `gh-pages` 브랜치에 배포됨
4. [https://dvhafly87.github.io/MooneyOverView](https://dvhafly87.github.io/MooneyOverView)에서 확인 가능

### 배포 설정

- **Base URL**: `/MooneyOverView/`
- **Build Output**: `dist/` 폴더
- **GitHub Pages Source**: `gh-pages` 브랜치

## 📁 프로젝트 구조

```
MooneyOverView/
├── src/
│   ├── pages/          # 페이지 컴포넌트
│   ├── css/           # 스타일 파일
│   ├── img/           # 이미지 파일
│   └── main.jsx       # 앱 진입점
├── public/            # 정적 파일
├── .github/           # GitHub Actions
└── dist/              # 빌드 결과물
```

## 🔧 주요 설정 파일

- `vite.config.js`: Vite 설정 (base URL)
- `package.json`: 프로젝트 메타데이터
- `.github/workflows/deploy.yml`: 배포 워크플로우
- `public/404.html`: SPA 라우팅 지원

## 📝 라이선스

MIT License
