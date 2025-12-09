# ⛷️ Ski MBTI - 우리 아이 스키 성향 테스트

> 부모님이 아이의 성향을 파악하고 최적의 스키 강습 스타일을 추천받는 웹 애플리케이션입니다.

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fski-mbti.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=flat-square&logo=vercel&logoColor=white)

---

## 📖 프로젝트 소개 (Project Overview)

**Ski MBTI**는 스키장을 처음 방문하는 아이들의 반응과 행동 패턴을 분석하여, 아이에게 **가장 적합한 스키 강습 스타일**을 부모님에게 추천해주는 서비스입니다.

### 🎯 주요 타겟
- 아이의 첫 스키 강습을 고민 중인 부모님
- 우리 아이가 어떤 환경에서 가장 잘 배울지 궁금한 학부모님

---

## ✨ 주요 기능 (Key Features)

1.  **⛷️ 성향 테스트**: 12개의 직관적인 문항을 통해 아이의 동물 유형(북극곰, 펭귄, 치타, 돌고래)을 정밀 분석합니다.
2.  **📊 맞춤형 결과 카드**: 각 유형에 맞는 강습 스타일(1:1 스파르타, 눈높이 안심, 다이내믹, 또래 팀)이 담긴 고퀄리티 이미지 카드를 제공합니다.
3.  **🔗 스마트 공유 기능**:
    *   **Mobile**: 카카오톡 등 앱에서 "공유하기" (Web Share API)
    *   **Desktop**: "이미지 저장" (Direct Download)
    *   **KakaoTalk In-App**: 꾹 눌러서 저장하기 (Base64 Modal Fallback) 지원
4.  **📝 상담 신청 및 연결**: 테스트 결과에 기반한 맞춤형 강습 상담 신청 및 "낭만스키" 선생님 연결 기능.
5.  **📈 실시간 참여자 수**: Supabase를 통한 실시간 참여 데이터 동기화 (Server Component).
6.  **⚡ 최적화된 성능**:
    *   **Server-Side Rendering (SSR)**: CLS(누적 레이아웃 이동) 0.0 달성.
    *   **Edge Runtime OG**: Vercel Edge Server에서 폰트와 이미지를 최적화하여 동적 생성.

---

## 🛠️ 기술 스택 (Tech Stack)

### Core
-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Database**: Supabase (PostgreSQL)

### Styling & UI
-   **CSS**: Tailwind CSS
-   **Components**: Mantine UI, Radix UI (Icons)
-   **Animation**: Framer Motion

### Deployment & Analytics
-   **Hosting**: Vercel
-   **Analytics**: Vercel Analytics, Speed Insights
-   **Image Gen**: @vercel/og (Satori)

---

## 🚀 시작하기 (Getting Started)

### 1. 프로젝트 클론
```bash
git clone https://github.com/lok4/ski-mbti.git
cd ski-mbti
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정 (.env.local)
프로젝트 루트에 `.env.local` 파일을 생성하고 Supabase 키를 입력하세요.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`을 열어 확인합니다.

---

## 📂 폴더 구조 (Folder Structure)

```
src/
├── app/              # Next.js App Router (SSR/CSR)
│   ├── api/          # Serverless Functions (OG Image)
│   ├── result/       # Result Page Logic
│   └── page.tsx      # Home Page (Server Component)
├── components/       # React Components
│   ├── home/         # Home UI Components
│   ├── leads/        # DB Connection Components
│   └── quiz/         # Quiz Logic & Result Card
├── constants/        # Quiz Data & Static Assets
└── lib/              # Client Utilities (Supabase, Utils)
```

---

## 🔗 배포 (Deployment)

이 프로젝트는 [Vercel](https://vercel.com)에 배포되어 있습니다.
main 브랜치에 푸시하면 자동으로 배포가 트리거됩니다.

[👉 라이브 데모 보러가기](https://ski-mbti.vercel.app)

---

All rights reserved by 낭만스키.
