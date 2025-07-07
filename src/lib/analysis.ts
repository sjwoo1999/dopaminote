/**
 * 도파민 기록 분석 로직 (웰빙 전략 기반)
 */

import { 
  DopamineRecord, 
  AnalysisResult, 
  WordToSelfContract, 
  ResetRoutine,
  WeeklyTrend 
} from "@/types";
import { calculateDopamineScore } from "./utils";

/**
 * 도파민 기록 데이터를 기반으로 종합 분석 결과를 생성합니다.
 */
export function generateAnalysisResult(records: DopamineRecord[]): AnalysisResult {
  if (records.length === 0) {
    return {
      totalRecords: 0,
      situationBreakdown: {},
      moodBreakdown: {},
      averageMood: 0,
      mostCommonSituation: '',
      averageDopamineScore: 0,
      integrityScore: 0,
      weeklyTrend: [],
      feedback: []
    };
  }

  // 상황별 분포
  const situationBreakdown = records.reduce((acc, record) => {
    const situation = getSituationKoreanName(record.situation);
    acc[situation] = (acc[situation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 기분별 분포
  const moodBreakdown = records.reduce((acc, record) => {
    const mood = getMoodKoreanName(record.mood);
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 평균 기분 (숫자로 변환)
  const moodScores = records.map(record => {
    switch (record.mood) {
      case 'good': return 3;
      case 'neutral': return 2;
      case 'bad': return 1;
      default: return 2;
    }
  });
  const averageMood = moodScores.reduce((sum, score) => sum + score, 0) / moodScores.length;

  // 가장 흔한 상황
  const mostCommonSituation = Object.entries(situationBreakdown)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

  // 평균 도파민 스코어
  const averageDopamineScore = records.reduce((sum, record) => sum + record.dopamine_score, 0) / records.length;

  // 주간 트렌드 계산
  const weeklyTrend = calculateWeeklyTrend(records);

  // 피드백 생성
  const feedback = generateFeedback(records, averageDopamineScore, situationBreakdown);

  return {
    totalRecords: records.length,
    situationBreakdown,
    moodBreakdown,
    averageMood,
    mostCommonSituation,
    averageDopamineScore: Math.round(averageDopamineScore),
    integrityScore: calculateIntegrityScore(records),
    weeklyTrend,
    feedback
  };
}

/**
 * 주간 트렌드를 계산합니다.
 */
function calculateWeeklyTrend(records: DopamineRecord[]): WeeklyTrend[] {
  const weeklyData = new Map<string, { scores: number[], count: number, goals: number }>();

  records.forEach(record => {
    const date = new Date(record.created_at);
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!weeklyData.has(weekKey)) {
      weeklyData.set(weekKey, { scores: [], count: 0, goals: 0 });
    }

    const weekData = weeklyData.get(weekKey)!;
    weekData.scores.push(record.dopamine_score);
    weekData.count++;
  });

  return Array.from(weeklyData.entries())
    .map(([week, data]) => ({
      week,
      averageScore: Math.round(data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length),
      recordCount: data.count,
      goalCompletionRate: calculateGoalCompletionRate(data.count, data.goals)
    }))
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());
}

/**
 * 주의 시작일을 계산합니다.
 */
function getWeekStart(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

/**
 * 목표 달성률을 계산합니다.
 */
function calculateGoalCompletionRate(actual: number, goals: number): number {
  if (goals === 0) return 100;
  return Math.min((actual / goals) * 100, 100);
}

/**
 * 자기 신뢰도 점수를 계산합니다.
 */
function calculateIntegrityScore(records: DopamineRecord[]): number {
  if (records.length === 0) return 100;

  // 최근 7일간의 기록만 고려
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentRecords = records.filter(record => 
    new Date(record.created_at) >= sevenDaysAgo
  );

  if (recentRecords.length === 0) return 100;

  // 도파민 스코어가 낮을수록 신뢰도가 높음
  const averageScore = recentRecords.reduce((sum, record) => sum + record.dopamine_score, 0) / recentRecords.length;
  
  // 0-100 점수로 변환 (낮은 도파민 스코어 = 높은 신뢰도)
  return Math.max(0, Math.round(100 - averageScore));
}

/**
 * 개인화된 피드백을 생성합니다.
 */
function generateFeedback(
  records: DopamineRecord[], 
  averageScore: number, 
  situationBreakdown: Record<string, number>
): string[] {
  const feedback: string[] = [];

  // 도파민 스코어 기반 피드백
  if (averageScore > 70) {
    feedback.push("도파민 스코어가 높습니다. 디지털 웰빙을 위해 사용 시간을 제한하고 리셋 루틴을 실천해보세요.");
  } else if (averageScore > 40) {
    feedback.push("도파민 스코어가 보통 수준입니다. 꾸준한 관찰과 개선을 통해 더 건강한 패턴을 만들어보세요.");
  } else {
    feedback.push("건강한 도파민 소비 패턴을 보이고 있습니다! 계속 유지하시고 긍정적인 루틴을 실천해보세요.");
  }

  // 상황별 피드백
  const topSituations = Object.entries(situationBreakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2);

  topSituations.forEach(([situation, count]) => {
    const percentage = Math.round((count / records.length) * 100);
    if (percentage > 30) {
      feedback.push(`${situation} 상황이 ${percentage}%로 높습니다. 이 상황에서의 대안 행동을 찾아보세요.`);
    }
  });

  // 기록 지속성 피드백
  if (records.length >= 7) {
    feedback.push("꾸준히 기록하고 계시네요! 패턴을 파악하는 데 도움이 될 것입니다.");
  } else if (records.length >= 3) {
    feedback.push("기록을 시작하셨네요. 일주일간 꾸준히 기록해보세요.");
  } else {
    feedback.push("첫 기록을 시작하셨네요. 작은 변화부터 시작해보세요.");
  }

  return feedback;
}

/**
 * 상황을 한국어로 변환합니다.
 */
function getSituationKoreanName(situation: string): string {
  const situationMap: Record<string, string> = {
    'boredom': '심심함',
    'stress': '스트레스',
    'habit': '습관',
    'social': '소셜미디어',
    'work': '업무',
    'entertainment': '엔터테인먼트',
    'other': '기타'
  };
  return situationMap[situation] || situation;
}

/**
 * 기분을 한국어로 변환합니다.
 */
function getMoodKoreanName(mood: string): string {
  const moodMap: Record<string, string> = {
    'good': '좋음',
    'neutral': '무감정',
    'bad': '나쁨'
  };
  return moodMap[mood] || mood;
}

/**
 * Word to Self 계약의 완성도를 계산합니다.
 */
export function calculateContractCompletion(contract: WordToSelfContract): number {
  if (contract.status === 'completed') return 100;
  if (contract.status === 'failed') return 0;
  
  // 진행 중인 계약의 경우 시간 경과에 따른 완성도 계산
  const startDate = new Date(contract.start_date);
  const endDate = contract.end_date ? new Date(contract.end_date) : new Date();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.ceil((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);
}

/**
 * 리셋 루틴의 효과를 계산합니다.
 */
export function calculateRoutineEffect(routines: ResetRoutine[]): number {
  const completedRoutines = routines.filter(routine => routine.completed);
  return completedRoutines.reduce((total, routine) => total + routine.dopamine_reduction, 0);
}

/**
 * 목업 데이터를 생성합니다 (개발용).
 */
export function generateMockData() {
  const mockRecords: DopamineRecord[] = [
    {
      id: '1',
      user_id: 'user1',
      situation: 'social',
      mood: 'neutral',
      notes: '인스타그램 스크롤링',
      usage_time: 45,
      pattern_repetition: 8,
      situation_stress: 3,
      dopamine_score: 65,
      created_at: '2025-01-03T20:30:00Z'
    },
    {
      id: '2',
      user_id: 'user1',
      situation: 'stress',
      mood: 'bad',
      notes: '업무 중 유튜브 시청',
      usage_time: 30,
      pattern_repetition: 5,
      situation_stress: 4,
      dopamine_score: 55,
      created_at: '2025-01-02T19:45:00Z'
    }
  ];

  const mockContracts: WordToSelfContract[] = [
    {
      id: '1',
      user_id: 'user1',
      title: '주 5시간 이하 SNS 사용',
      description: '소셜미디어 사용 시간을 제한하여 더 의미 있는 시간을 만들어보겠습니다.',
      goal_type: 'time_limit',
      target_value: 5,
      unit: '시간',
      start_date: '2025-01-01T00:00:00Z',
      status: 'active',
      integrity_score: 85,
      created_at: '2025-01-01T00:00:00Z'
    }
  ];

  const mockRoutines: ResetRoutine[] = [
    {
      id: '1',
      user_id: 'user1',
      name: '아침 명상',
      description: '10분간 마음을 진정시키는 명상',
      category: 'meditation',
      duration: 10,
      completed: false,
      dopamine_reduction: 15,
      created_at: '2025-01-01T00:00:00Z'
    }
  ];

  return {
    records: mockRecords,
    contracts: mockContracts,
    routines: mockRoutines
  };
}
