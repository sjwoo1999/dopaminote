/**
 * 도파민 기록 분석 및 피드백 생성 로직
 */

import { DopamineRecord, Situation, Mood, AnalysisResult } from '@/types';

/**
 * 사용자의 도파민 기록을 분석하여 통계와 피드백을 생성합니다.
 */
export function analyzeRecords(records: DopamineRecord[]): AnalysisResult {
  if (records.length === 0) {
    return {
      totalRecords: 0,
      situationBreakdown: {
        boredom: 0,
        stress: 0,
        habit: 0,
        social: 0,
        work: 0,
        entertainment: 0,
        other: 0,
      },
      moodBreakdown: {
        good: 0,
        neutral: 0,
        bad: 0,
      },
      averageMood: 0,
      mostCommonSituation: 'other',
      feedback: ['아직 기록이 없습니다. 첫 번째 도파민 기록을 추가해보세요!'],
    };
  }

  // 상황별 카운트
  const situationBreakdown = records.reduce((acc, record) => {
    acc[record.situation] = (acc[record.situation] || 0) + 1;
    return acc;
  }, {} as Record<Situation, number>);

  // 기분별 카운트
  const moodBreakdown = records.reduce((acc, record) => {
    acc[record.mood] = (acc[record.mood] || 0) + 1;
    return acc;
  }, {} as Record<Mood, number>);

  // 평균 기분 계산 (좋음: 3, 무감정: 2, 나쁨: 1)
  const moodScores = records.map(record => {
    switch (record.mood) {
      case 'good': return 3;
      case 'neutral': return 2;
      case 'bad': return 1;
      default: return 2;
    }
  });
  const averageMood = moodScores.reduce((sum, score) => sum + score, 0) / moodScores.length;

  // 가장 많이 발생한 상황 찾기
  const mostCommonSituation = Object.entries(situationBreakdown).reduce((a, b) => 
    situationBreakdown[a[0] as Situation] > situationBreakdown[b[0] as Situation] ? a : b
  )[0] as Situation;

  // 피드백 생성
  const feedback = generateFeedback(records, situationBreakdown, moodBreakdown, averageMood);

  return {
    totalRecords: records.length,
    situationBreakdown,
    moodBreakdown,
    averageMood,
    mostCommonSituation,
    feedback,
  };
}

/**
 * 기록 데이터를 바탕으로 개인화된 피드백을 생성합니다.
 */
function generateFeedback(
  records: DopamineRecord[],
  situationBreakdown: Record<Situation, number>,
  moodBreakdown: Record<Mood, number>,
  averageMood: number
): string[] {
  const feedback: string[] = [];

  // 소셜미디어 사용량 분석
  if (situationBreakdown.social >= 5) {
    feedback.push('소셜미디어 사용이 많습니다. 디지털 웰빙을 위해 사용 시간을 제한해보세요.');
  }

  // 스트레스 상황 분석
  if (situationBreakdown.stress >= 3) {
    feedback.push('스트레스 상황에서 도파민을 찾는 패턴이 보입니다. 건강한 스트레스 해소 방법을 찾아보세요.');
  }

  // 습관적 사용 분석
  if (situationBreakdown.habit >= 4) {
    feedback.push('습관적으로 도파민을 소비하는 패턴이 있습니다. 의식적인 사용을 고려해보세요.');
  }

  // 전반적인 기분 분석
  if (averageMood < 2) {
    feedback.push('전반적으로 기분이 좋지 않은 상황에서 도파민을 찾는 것 같습니다. 근본적인 원인을 탐색해보세요.');
  } else if (averageMood > 2.5) {
    feedback.push('도파민 소비 후 기분이 좋아지는 경험을 하고 있습니다. 건강한 도파민 소스도 함께 찾아보세요.');
  }

  // 기록 빈도 분석
  if (records.length >= 10) {
    feedback.push('꾸준히 기록하고 계시네요! 패턴을 파악하는 데 도움이 될 것입니다.');
  }

  // 긍정적인 피드백
  if (feedback.length === 0) {
    feedback.push('건강한 도파민 소비 패턴을 보이고 있습니다. 계속 관찰해보세요!');
  }

  return feedback;
}

/**
 * 차트 데이터를 위한 변환 함수들
 */
export function getSituationChartData(situationBreakdown: Record<Situation, number>) {
  const situationLabels = {
    boredom: '심심함',
    stress: '스트레스',
    habit: '습관',
    social: '소셜미디어',
    work: '업무',
    entertainment: '엔터테인먼트',
    other: '기타',
  };

  return Object.entries(situationBreakdown).map(([key, value]) => ({
    name: situationLabels[key as Situation],
    value,
    color: getSituationColor(key as Situation),
  }));
}

export function getMoodChartData(moodBreakdown: Record<Mood, number>) {
  const moodLabels = {
    good: '좋음',
    neutral: '무감정',
    bad: '나쁨',
  };

  return Object.entries(moodBreakdown).map(([key, value]) => ({
    name: moodLabels[key as Mood],
    value,
    color: getMoodColor(key as Mood),
  }));
}

/**
 * 상황별 색상 반환
 */
function getSituationColor(situation: Situation): string {
  const colors = {
    boredom: '#6366f1',    // 인디고
    stress: '#ef4444',     // 빨강
    habit: '#f59e0b',      // 주황
    social: '#8b5cf6',     // 보라
    work: '#10b981',       // 초록
    entertainment: '#06b6d4', // 청록
    other: '#6b7280',      // 회색
  };
  return colors[situation];
}

/**
 * 기분별 색상 반환
 */
function getMoodColor(mood: Mood): string {
  const colors = {
    good: '#10b981',       // 초록
    neutral: '#6b7280',    // 회색
    bad: '#ef4444',        // 빨강
  };
  return colors[mood];
} 