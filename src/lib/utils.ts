import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function calculateDopamineScore(
  usageTime: number,
  patternRepetition: number,
  situationStress: number
): number {
  // 도파민 스코어 계산 로직
  // 0-100 점수 (높을수록 도파민 소비가 많음)
  const timeScore = Math.min(usageTime / 60, 1) * 40; // 시간당 최대 40점
  const patternScore = Math.min(patternRepetition / 10, 1) * 30; // 반복 패턴당 최대 30점
  const stressScore = Math.min(situationStress / 5, 1) * 30; // 스트레스 상황당 최대 30점
  
  return Math.round(timeScore + patternScore + stressScore);
}

export function getDopamineScoreColor(score: number): string {
  if (score < 30) return 'text-green-600 bg-green-50';
  if (score < 60) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
}

export function getDopamineScoreLevel(score: number): string {
  if (score < 30) return '건강';
  if (score < 60) return '주의';
  return '위험';
} 