# Dopaminote 🧠

도파민 소비 패턴을 분석하고 개선하는 웹 애플리케이션입니다.

## 📋 프로젝트 개요

Dopaminote는 사용자가 스크린샷을 업로드하고 상황/감정/첨언을 기록하여, 도파민 소비 패턴을 분석하고 회고하는 웹 앱입니다.

### 주요 기능
- 📸 **스크린샷 업로드**: 도파민을 소비하는 순간을 캡처
- 📊 **패턴 분석**: 상황별, 기분별 통계 및 시각화
- 💡 **개인화된 피드백**: 데이터 기반 개선 조언 제공
- 📝 **회고 노트**: 일일 회고 작성 및 목표 설정
- 📈 **데이터 시각화**: 차트를 통한 직관적인 패턴 확인

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Charts**: Recharts
- **Icons**: Lucide React

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone <repository-url>
cd dopaminote
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성하세요.
2. SQL Editor에서 다음 테이블을 생성하세요:

```sql
-- 도파민 기록 테이블
CREATE TABLE dopamine_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT NOT NULL,
  situation TEXT NOT NULL CHECK (situation IN ('boredom', 'stress', 'habit', 'social', 'work', 'entertainment', 'other')),
  mood TEXT NOT NULL CHECK (mood IN ('good', 'neutral', 'bad')),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 회고 노트 테이블
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  date DATE NOT NULL,
  reflection TEXT,
  goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE dopamine_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- 정책 설정 (개발용 - 모든 사용자가 모든 데이터에 접근 가능)
CREATE POLICY "Allow all access" ON dopamine_records FOR ALL USING (true);
CREATE POLICY "Allow all access" ON journal_entries FOR ALL USING (true);
```

3. Storage 버킷 생성:
   - Storage > New Bucket
   - Bucket name: `screenshots`
   - Public bucket: ✅ 체크
   - File size limit: 5MB

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📁 프로젝트 구조

```
dopaminote/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 홈 페이지
│   │   ├── record/            # 기록 추가 페이지
│   │   ├── report/            # 분석 결과 페이지
│   │   └── journal/           # 회고 노트 페이지
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── UploadForm.tsx     # 업로드 폼
│   │   ├── ChartView.tsx      # 차트 뷰
│   │   ├── FeedbackBox.tsx    # 피드백 박스
│   │   └── JournalEditor.tsx  # 회고 에디터
│   ├── lib/                   # 유틸리티 및 설정
│   │   ├── supabaseClient.ts  # Supabase 클라이언트
│   │   └── analysis.ts        # 분석 로직
│   └── types/                 # TypeScript 타입 정의
│       └── index.ts
├── public/                    # 정적 파일
└── package.json
```

## 🎯 주요 기능 설명

### 1. 도파민 기록 (`/record`)
- 스크린샷 업로드 (최대 5MB)
- 상황 선택 (심심함, 스트레스, 습관, 소셜미디어, 업무, 엔터테인먼트, 기타)
- 기분 선택 (좋음, 무감정, 나쁨)
- 추가 메모 작성

### 2. 패턴 분석 (`/report`)
- 상황별, 기분별 통계 차트
- 평균 기분 및 주요 상황 분석
- 개인화된 피드백 제공
- 상황별 개선 조언

### 3. 회고 노트 (`/journal`)
- 일일 회고 작성
- 개선 목표 설정
- 과거 회고 기록 조회
- 확장/축소 가능한 카드 뷰

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
1. `src/components/` 디렉토리에 컴포넌트 생성
2. TypeScript 타입 정의 추가 (`src/types/index.ts`)
3. 필요한 경우 분석 로직 추가 (`src/lib/analysis.ts`)

### 데이터베이스 스키마 변경
1. Supabase SQL Editor에서 스키마 수정
2. TypeScript 타입 정의 업데이트
3. 관련 컴포넌트 수정

## 🚀 배포

### Vercel 배포 (권장)
1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경 변수 설정
4. 배포 완료

### 환경 변수 설정 (배포 시)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 익명 키

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Supabase](https://supabase.com/) - 백엔드 서비스
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Recharts](https://recharts.org/) - 차트 라이브러리
- [Lucide](https://lucide.dev/) - 아이콘 라이브러리

---

**Dopaminote** - 건강한 디지털 라이프를 위한 도파민 소비 패턴 분석 도구 🧠✨
