# ⛷️ Ski MBTI - 우리 아이 스키 성향 테스트

> 부모님이 아이의 성향을 파악하고 최적의 스키 강습 스타일을 추천받는 웹 애플리케이션입니다.

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fski-mbti.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-7.0-blue?style=flat-square&logo=mantine&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase&logoColor=white)

---

## 📖 프로젝트 소개 (Project Overview)

**Ski MBTI**는 스키장을 처음 방문하는 아이들의 반응과 행동 패턴을 분석하여, 아이에게 **가장 적합한 스키 강습 스타일**을 부모님에게 추천해주는 서비스입니다.

### 🎯 주요 타겟
- 아이의 첫 스키 강습을 고민 중인 부모님
- 우리 아이가 어떤 환경에서 가장 잘 배울지 궁금한 학부모님

---

## ✨ 주요 기능 (Key Features)

1.  **⛷️ 성향 테스트**: 12개의 문항을 통해 아이의 동물 유형(북극곰, 펭귄, 치타, 돌고래)을 분석합니다.
2.  **📊 맞춤형 결과**: 각 유형에 맞는 강습 스타일(1:1 스파르타, 눈높이 안심, 다이내믹, 또래 팀)을 제안합니다.
3.  **📝 상담 신청**: 테스트 결과에 기반한 맞춤형 강습 상담을 신청할 수 있습니다.
4.  **📈 실시간 참여자 수**: 참여자 수가 실시간으로 업데이트되어(Supabase 연동) 보여집니다.
5.  **⚡ 최적화된 성능**: Next.js App Router와 Vercel Speed Insights를 통해 빠르고 쾌적한 UX를 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, Mantine UI, Framer Motion (Animations)
-   **Database**: Supabase (PostgreSQL)
-   **Deployment**: Vercel

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
NEXT_PUBLIC_SUPABASE_ANON_KE=your_supabase_anon_key
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
├── app/              # Next.js App Router pages
├── components/       # UI Components
│   ├── leads/        # Lead Form Components
│   ├── quiz/         # Quiz & Result Components
│   └── ui/           # Basic UI Elements (Button, etc.)
├── constants/        # Quiz Data & Static Text
├── lib/              # Utils & Supabase Client
└── types/            # TypeScript Interfaces
```

---

## 🔗 배포 (Deployment)

이 프로젝트는 [Vercel](https://vercel.com)에 배포되어 있습니다.
main 브랜치에 푸시하면 자동으로 배포가 트리거됩니다.

[👉 라이브 데모 보러가기](https://ski-mbti.vercel.app)

---

All rights reserved by Minsu Son.
