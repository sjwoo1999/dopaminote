/**
 * Supabase 클라이언트 설정
 * 환경 변수에서 Supabase URL과 API 키를 가져와 클라이언트를 초기화합니다.
 */

import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase 설정 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경 변수가 없으면 에러 발생
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 데이터베이스 테이블 이름 상수
export const TABLES = {
  DOPAMINE_RECORDS: 'dopamine_records',
  JOURNAL_ENTRIES: 'journal_entries',
} as const;

// Storage 버킷 이름 상수
export const STORAGE_BUCKETS = {
  SCREENSHOTS: 'screenshots',
} as const; 