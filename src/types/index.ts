/**
 * Dopaminote 앱의 타입 정의
 */

// 상황 카테고리 타입
export type Situation = 
  | 'boredom'      // 심심함
  | 'stress'       // 스트레스
  | 'habit'        // 습관
  | 'social'       // 소셜미디어
  | 'work'         // 업무
  | 'entertainment' // 엔터테인먼트
  | 'other';       // 기타

// 기분 타입
export type Mood = 
  | 'good'         // 좋음
  | 'neutral'      // 무감정
  | 'bad';         // 나쁨

// 도파민 기록 타입
export interface DopamineRecord {
  id: string;
  user_id: string;
  image_url: string;
  situation: Situation;
  mood: Mood;
  note: string;
  created_at: string;
  updated_at: string;
}

// 회고 노트 타입
export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  reflection: string;
  goals: string;
  created_at: string;
  updated_at: string;
}

// 분석 결과 타입
export interface AnalysisResult {
  totalRecords: number;
  situationBreakdown: Record<Situation, number>;
  moodBreakdown: Record<Mood, number>;
  averageMood: number;
  mostCommonSituation: Situation;
  feedback: string[];
}

// 업로드 폼 데이터 타입
export interface UploadFormData {
  image: File | null;
  situation: Situation;
  mood: Mood;
  note: string;
}

// 차트 데이터 타입
export interface ChartData {
  name: string;
  value: number;
  color?: string;
} 