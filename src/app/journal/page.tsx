/**
 * 회고 노트 페이지
 * 일일 회고 작성과 과거 회고 기록을 조회할 수 있는 페이지입니다.
 */

import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, ChevronLeft, ChevronRight, Save, Target } from 'lucide-react';

export default function JournalPage() {
  // 목업 데이터
  const mockJournalEntries = [
    {
      id: '1',
      date: '2025-01-03',
      reflection: '오늘은 소셜미디어를 너무 많이 사용했다. 특히 점심시간과 저녁시간에 인스타그램을 오래 스크롤했다. 이런 패턴이 반복되고 있는 것 같다.',
      goals: '내일부터는 소셜미디어 사용 시간을 30분으로 제한하고, 대신 책을 읽거나 산책을 하자.',
      created_at: '2025-01-03T20:30:00Z'
    },
    {
      id: '2',
      date: '2025-01-02',
      reflection: '업무 중에 스트레스가 쌓여서 유튜브를 보면서 시간을 보냈다. 하지만 오히려 더 스트레스가 쌓인 것 같다.',
      goals: '스트레스 해소를 위해 명상이나 운동을 해보자. 유튜브 대신 음악을 듣는 것이 좋겠다.',
      created_at: '2025-01-02T19:45:00Z'
    },
    {
      id: '3',
      date: '2025-01-01',
      reflection: '새해 첫날이라 특별한 날이었는데, 온라인 쇼핑을 하면서 많은 시간을 보냈다. 하지만 실제로 필요한 것은 별로 없었다.',
      goals: '구매 전에 24시간 기다리는 규칙을 만들어보자. 충동구매를 줄일 수 있을 것이다.',
      created_at: '2025-01-01T22:15:00Z'
    }
  ];

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
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">회고 노트</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/record" className="text-gray-600 hover:text-blue-600 transition-colors">
                기록하기
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-blue-600 transition-colors">
                분석보기
              </Link>
              <Link href="/wellness" className="text-gray-600 hover:text-blue-600 transition-colors">
                웰빙
              </Link>
              <Link href="/journal" className="text-blue-600 font-medium">
                회고노트
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                회고 노트
              </h2>
              <p className="text-lg text-gray-600">
                도파민 소비 패턴을 돌아보고 개선 목표를 설정해보세요.
              </p>
            </div>
            <button className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <BookOpen className="h-4 w-4 mr-2" />
              오늘의 회고 작성
            </button>
          </div>
        </div>

        {/* 오늘의 회고 에디터 (목업) */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">오늘의 회고</h2>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>2025년 1월 3일</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 회고 작성 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">회고 작성</h3>
              </div>
              
              <textarea
                placeholder="오늘의 도파민 소비 패턴을 돌아보며 생각을 정리해보세요..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                defaultValue="오늘은 소셜미디어를 너무 많이 사용했다. 특히 점심시간과 저녁시간에 인스타그램을 오래 스크롤했다. 이런 패턴이 반복되고 있는 것 같다."
              />
            </div>

            {/* 목표 설정 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">목표 설정</h3>
              </div>
              
              <textarea
                placeholder="내일의 개선 목표나 계획을 세워보세요..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                defaultValue="내일부터는 소셜미디어 사용 시간을 30분으로 제한하고, 대신 책을 읽거나 산책을 하자."
              />
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="mt-6 flex justify-end">
            <button className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              <Save className="h-4 w-4" />
              <span>저장하기</span>
            </button>
          </div>
        </div>

        {/* 회고 목록 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              회고 기록 ({mockJournalEntries.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {mockJournalEntries.map((entry) => (
              <div key={entry.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {new Date(entry.date).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long',
                        })}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.created_at).toLocaleString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {entry.reflection && (
                    <span className="flex items-center space-x-1">
                      <span>💭</span>
                      <span>회고 {entry.reflection.length}자</span>
                    </span>
                  )}
                  {entry.goals && (
                    <span className="flex items-center space-x-1">
                      <span>🎯</span>
                      <span>목표 {entry.goals.length}자</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/record"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              새 기록 추가하기
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Target className="h-4 w-4 mr-2" />
              분석 결과 보기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 