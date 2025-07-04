/**
 * 도파민 기록 추가 페이지
 * 스크린샷 업로드와 상황/기분 기록을 위한 페이지입니다.
 */

import Link from 'next/link';
import { ArrowLeft, Plus, Upload, CheckCircle } from 'lucide-react';

export default function RecordPage() {
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">도파민 기록 추가</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/record" className="text-blue-600 font-medium">
                기록하기
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-blue-600 transition-colors">
                분석보기
              </Link>
              <Link href="/journal" className="text-gray-600 hover:text-blue-600 transition-colors">
                회고노트
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 안내 섹션 */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            도파민 소비 기록하기
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            스크린샷을 업로드하고 어떤 상황에서, 어떤 기분으로 도파민을 소비했는지 기록해보세요.
            <br />
            꾸준한 기록을 통해 패턴을 발견하고 개선할 수 있습니다.
          </p>
        </div>

        {/* 목업 업로드 폼 */}
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">도파민 기록 추가</h2>
          
          <div className="space-y-6">
            {/* 이미지 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                스크린샷 업로드
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">클릭하여 이미지 선택</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (최대 5MB)</p>
              </div>
            </div>

            {/* 상황 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                어떤 상황이었나요?
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">상황을 선택하세요</option>
                <option value="boredom">심심함</option>
                <option value="stress">스트레스</option>
                <option value="habit">습관</option>
                <option value="social">소셜미디어</option>
                <option value="work">업무</option>
                <option value="entertainment">엔터테인먼트</option>
                <option value="other">기타</option>
              </select>
            </div>

            {/* 기분 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기분은 어땠나요?
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">기분을 선택하세요</option>
                <option value="good">좋음</option>
                <option value="neutral">무감정</option>
                <option value="bad">나쁨</option>
              </select>
            </div>

            {/* 첨언 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                추가 메모 (선택사항)
              </label>
              <textarea
                rows={3}
                placeholder="이 상황에 대한 생각이나 느낌을 자유롭게 적어보세요..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 성공 메시지 (목업) */}
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-600">기록이 성공적으로 저장되었습니다!</p>
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                기록 저장
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* 추가 안내 */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💡 기록 팁
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">언제 기록하나요?</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 소셜미디어를 오래 스크롤할 때</li>
                  <li>• 유튜브/넷플릭스를 연속 시청할 때</li>
                  <li>• 게임을 오래 할 때</li>
                  <li>• 온라인 쇼핑을 할 때</li>
                  <li>• 기타 도파민을 소비하는 순간</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">어떻게 기록하나요?</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 스크린샷을 찍어서 업로드</li>
                  <li>• 상황을 정확히 선택</li>
                  <li>• 기분 변화를 솔직히 기록</li>
                  <li>• 추가 생각이나 느낌을 메모</li>
                  <li>• 꾸준히 기록하기</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 다음 단계 안내 */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            기록을 완료하셨나요? 분석 결과를 확인해보세요!
          </p>
          <Link
            href="/report"
            className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            분석 결과 보기
          </Link>
        </div>
      </main>
    </div>
  );
} 