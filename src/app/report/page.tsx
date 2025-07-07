/**
 * 도파민 기록 분석 결과 페이지
 * 사용자의 기록 데이터를 분석하고 차트와 피드백을 제공합니다.
 */

import Link from 'next/link';
import { ArrowLeft, BarChart3, RefreshCw, TrendingUp, Brain, Target, Plus, Heart, Users } from 'lucide-react';
import { DopamineScoreCard } from '@/components/wellness/DopamineScoreCard';
import { generateMockData } from '@/lib/analysis';

export default function ReportPage() {
  // 목업 데이터 사용
  const { records } = generateMockData();
  
  // 분석 데이터 계산
  const totalRecords = records.length;
  const averageDopamineScore = records.length > 0 
    ? Math.round(records.reduce((sum, record) => sum + record.dopamine_score, 0) / records.length)
    : 0;
  
  const situationBreakdown = records.reduce((acc, record) => {
    const situation = getSituationKoreanName(record.situation);
    acc[situation] = (acc[situation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodBreakdown = records.reduce((acc, record) => {
    const mood = getMoodKoreanName(record.mood);
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonSituation = Object.entries(situationBreakdown)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

  const feedback = generateFeedback(records, averageDopamineScore, situationBreakdown);

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

  function getMoodKoreanName(mood: string): string {
    const moodMap: Record<string, string> = {
      'good': '좋음',
      'neutral': '무감정',
      'bad': '나쁨'
    };
    return moodMap[mood] || mood;
  }

  function generateFeedback(
    records: any[], 
    averageScore: number, 
    situationBreakdown: Record<string, number>
  ): string[] {
    const feedback: string[] = [];

    if (averageScore > 70) {
      feedback.push("도파민 스코어가 높습니다. 디지털 웰빙을 위해 사용 시간을 제한하고 리셋 루틴을 실천해보세요.");
    } else if (averageScore > 40) {
      feedback.push("도파민 스코어가 보통 수준입니다. 꾸준한 관찰과 개선을 통해 더 건강한 패턴을 만들어보세요.");
    } else {
      feedback.push("건강한 도파민 소비 패턴을 보이고 있습니다! 계속 유지하시고 긍정적인 루틴을 실천해보세요.");
    }

    const topSituations = Object.entries(situationBreakdown)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);

    topSituations.forEach(([situation, count]) => {
      const percentage = Math.round((count / records.length) * 100);
      if (percentage > 30) {
        feedback.push(`${situation} 상황이 ${percentage}%로 높습니다. 이 상황에서의 대안 행동을 찾아보세요.`);
      }
    });

    if (records.length >= 7) {
      feedback.push("꾸준히 기록하고 계시네요! 패턴을 파악하는 데 도움이 될 것입니다.");
    } else if (records.length >= 3) {
      feedback.push("기록을 시작하셨네요. 일주일간 꾸준히 기록해보세요.");
    } else {
      feedback.push("첫 기록을 시작하셨네요. 작은 변화부터 시작해보세요.");
    }

    return feedback;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>홈으로</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">도파민 분석 결과</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <RefreshCw className="h-4 w-4" />
                <span>새로고침</span>
              </button>
              <nav className="hidden md:flex space-x-8">
                <Link href="/record" className="text-gray-600 hover:text-blue-600 transition-colors">
                  기록하기
                </Link>
                <Link href="/report" className="text-blue-600 font-medium">
                  분석보기
                </Link>
                <Link href="/wellness" className="text-gray-600 hover:text-blue-600 transition-colors">
                  웰빙
                </Link>
                <Link href="/journal" className="text-gray-600 hover:text-blue-600 transition-colors">
                  회고노트
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            도파민 소비 패턴 분석
          </h2>
          <p className="text-lg text-gray-600">
            총 {totalRecords}개의 기록을 분석한 결과입니다.
          </p>
        </div>

        {/* 도파민 스코어 카드 */}
        <div className="mb-8">
          <DopamineScoreCard 
            score={averageDopamineScore} 
            showTrend={false}
          />
        </div>

        {/* 전체 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600">총 기록</h3>
            <p className="text-2xl font-bold text-blue-800">{totalRecords}회</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-600">평균 도파민 스코어</h3>
            <p className="text-2xl font-bold text-green-800">
              {averageDopamineScore}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600">주요 상황</h3>
            <p className="text-2xl font-bold text-purple-800">
              {mostCommonSituation}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-orange-600">평균 사용 시간</h3>
            <p className="text-2xl font-bold text-orange-800">
              {records.length > 0 
                ? Math.round(records.reduce((sum, record) => sum + record.usage_time, 0) / records.length)
                : 0}분
            </p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">상황별 기록 분포</h3>
          <div className="space-y-4">
            {Object.entries(situationBreakdown).map(([situation, count]) => (
              <div key={situation} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700">{situation}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(count / totalRecords) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">{count}회</div>
              </div>
            ))}
          </div>
        </div>

        {/* 기분별 차트 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">기분별 분포</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(moodBreakdown).map(([mood, count]) => (
              <div key={mood} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800 mb-2">{count}회</div>
                <div className="text-sm text-gray-600">{mood}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {((count / totalRecords) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 웰빙 인사이트 */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">웰빙 인사이트</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">도파민 스코어 분석</h4>
              <p className="text-sm text-gray-600">
                현재 평균 도파민 스코어는 {averageDopamineScore}점입니다. 
                {averageDopamineScore > 70 ? ' 높은 수준이므로 리셋 루틴을 실천해보세요.' : 
                 averageDopamineScore > 40 ? ' 보통 수준입니다. 꾸준한 관찰을 통해 개선해보세요.' : 
                 ' 건강한 수준입니다. 계속 유지하세요.'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">개선 제안</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Word to Self 계약을 통해 목표 설정</li>
                <li>• 리셋 루틴으로 도파민 수용체 재조정</li>
                <li>• 정기적인 회고로 패턴 인식</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 피드백 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">분석 결과 & 피드백</h2>
          </div>

          {/* 피드백 목록 */}
          <div className="space-y-3">
            {feedback.map((feedback, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <Brain className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-blue-800 text-sm leading-relaxed">
                      {feedback}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 다음 단계 제안 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🚀 다음 단계</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• 웰빙 대시보드에서 종합적인 관리</p>
              <p>• Word to Self 계약으로 목표 설정</p>
              <p>• 리셋 루틴으로 도파민 수용체 재조정</p>
              <p>• 회고 노트로 패턴 인식 및 개선</p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/record"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 기록 추가하기
            </Link>
            <Link
              href="/wellness"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Heart className="h-4 w-4 mr-2" />
              웰빙 대시보드
            </Link>
            <Link
              href="/journal"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Target className="h-4 w-4 mr-2" />
              회고 노트 작성하기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 