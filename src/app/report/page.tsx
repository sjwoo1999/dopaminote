/**
 * 도파민 기록 분석 결과 페이지
 * 사용자의 기록 데이터를 분석하고 차트와 피드백을 제공합니다.
 */

import Link from 'next/link';
import { ArrowLeft, BarChart3, RefreshCw, TrendingUp, Brain, Target, Plus } from 'lucide-react';

export default function ReportPage() {
  // 목업 데이터
  const mockData = {
    totalRecords: 12,
    averageMood: 2.3,
    mostCommonSituation: '소셜미디어',
    situationBreakdown: {
      '소셜미디어': 5,
      '심심함': 3,
      '습관': 2,
      '스트레스': 1,
      '업무': 1,
    },
    moodBreakdown: {
      '좋음': 4,
      '무감정': 5,
      '나쁨': 3,
    },
    feedback: [
      '소셜미디어 사용이 많습니다. 디지털 웰빙을 위해 사용 시간을 제한해보세요.',
      '꾸준히 기록하고 계시네요! 패턴을 파악하는 데 도움이 될 것입니다.',
      '건강한 도파민 소비 패턴을 보이고 있습니다. 계속 관찰해보세요!'
    ]
  };

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
            총 {mockData.totalRecords}개의 기록을 분석한 결과입니다.
          </p>
        </div>

        {/* 전체 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600">총 기록</h3>
            <p className="text-2xl font-bold text-blue-800">{mockData.totalRecords}회</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-600">평균 기분</h3>
            <p className="text-2xl font-bold text-green-800">
              {mockData.averageMood.toFixed(1)}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600">주요 상황</h3>
            <p className="text-2xl font-bold text-purple-800">
              {mockData.mostCommonSituation}
            </p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">상황별 기록 분포</h3>
          <div className="space-y-4">
            {Object.entries(mockData.situationBreakdown).map(([situation, count]) => (
              <div key={situation} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700">{situation}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(count / mockData.totalRecords) * 100}%` }}
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
            {Object.entries(mockData.moodBreakdown).map(([mood, count]) => (
              <div key={mood} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800 mb-2">{count}회</div>
                <div className="text-sm text-gray-600">{mood}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {((count / mockData.totalRecords) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
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
            {mockData.feedback.map((feedback, index) => (
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
              <p>• 일주일간 꾸준히 기록해보세요</p>
              <p>• 패턴을 발견하면 회고 노트에 기록해보세요</p>
              <p>• 목표를 설정하고 개선 계획을 세워보세요</p>
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