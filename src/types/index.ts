/**
 * Dopaminote 앱의 타입 정의 (웰빙 전략 기반)
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
  image_url?: string;
  situation: Situation;
  mood: Mood;
  notes?: string;
  usage_time: number; // 사용 시간 (분)
  pattern_repetition: number; // 반복 패턴 횟수
  situation_stress: number; // 스트레스 수준 (1-5)
  dopamine_score: number; // 계산된 도파민 스코어
  created_at: string;
}

// Word to Self 계약 타입
export interface WordToSelfContract {
  id: string;
  user_id: string;
  title: string;
  description: string;
  goal_type: 'time_limit' | 'frequency_limit' | 'behavior_change';
  target_value: number;
  unit: string; // 시간, 횟수, 일수 등
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'failed';
  integrity_score: number; // 자기 신뢰도 점수 (0-100)
  signature_image?: string;
  created_at: string;
}

// 도파민 리셋 루틴 타입
export interface ResetRoutine {
  id: string;
  user_id: string;
  name: string;
  description: string;
  category: 'meditation' | 'breathing' | 'gratitude' | 'exercise' | 'reading';
  duration: number; // 분
  completed: boolean;
  dopamine_reduction: number; // 도파민 점수 감소량
  completed_at?: string;
  created_at: string;
}

// Integrity Circle (사회적 연대) 타입
export interface IntegrityCircle {
  id: string;
  name: string;
  description: string;
  members: CircleMember[];
  shared_goals: SharedGoal[];
  created_at: string;
}

export interface CircleMember {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface SharedGoal {
  id: string;
  title: string;
  description: string;
  target_date: string;
  progress: number; // 0-100
  status: 'active' | 'completed' | 'failed';
  created_by: string;
  created_at: string;
}

// 회고 노트 타입
export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  reflection?: string;
  goals?: string;
  gratitude_notes?: string; // 감사 노트
  mood_trend: number; // 기분 트렌드 (1-10)
  created_at: string;
}

// 분석 결과 타입
export interface AnalysisResult {
  totalRecords: number;
  situationBreakdown: Record<string, number>;
  moodBreakdown: Record<string, number>;
  averageMood: number;
  mostCommonSituation: string;
  averageDopamineScore: number;
  integrityScore: number; // 자기 신뢰도 평균
  weeklyTrend: WeeklyTrend[];
  feedback: string[];
}

export interface WeeklyTrend {
  week: string;
  averageScore: number;
  recordCount: number;
  goalCompletionRate: number;
}

// 업로드 폼 데이터 타입
export interface UploadFormData {
  image?: File;
  situation: Situation;
  mood: Mood;
  notes?: string;
  usage_time: number;
  pattern_repetition: number;
  situation_stress: number;
}

// 차트 데이터 타입
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

// 도파민 스코어 히스토리 타입
export interface DopamineScoreHistory {
  date: string;
  score: number;
  level: 'healthy' | 'warning' | 'danger';
  records_count: number;
}

// 알림 설정 타입
export interface NotificationSettings {
  id: string;
  user_id: string;
  dopamine_score_threshold: number; // 도파민 스코어 임계값
  vibration_enabled: boolean;
  color_warning_enabled: boolean;
  sound_enabled: boolean;
  reset_routine_reminder: boolean;
  integrity_circle_updates: boolean;
  created_at: string;
} 