"use client";

/**
 * 웰빙 대시보드 페이지
 * 도파민 스코어, Word to Self 계약, 리셋 루틴을 종합적으로 보여주는 페이지
 */

import Link from 'next/link';
import { ArrowLeft, Plus, Target, TrendingUp, Users, Heart } from 'lucide-react';
import { DopamineScoreCard } from '@/components/wellness/DopamineScoreCard';
import { WordToSelfContractForm, WordToSelfContractStatus } from '@/components/wellness/WordToSelfContract';
import { ResetRoutineList } from '@/components/wellness/ResetRoutine';
import { generateMockData } from '@/lib/analysis';
import { WordToSelfContract, ResetRoutine } from '@/types';

export default function WellnessPage() {
  // 목업 데이터 사용 (실제로는 API에서 가져올 데이터)
  const { records, contracts, routines } = generateMockData();
  
  // 현재 도파민 스코어 계산 (실제로는 분석 로직 사용)
  const currentScore = records.length > 0 ? records[0].dopamine_score : 50;
  const previousScore = records.length > 1 ? records[1].dopamine_score : undefined;

  const handleContractSave = (contract: Partial<WordToSelfContract>) => {
    console.log('새 계약 저장:', contract);
    // 실제로는 API 호출
  };

  const handleRoutineComplete = (routineId: string) => {
    console.log('루틴 완료:', routineId);
    // 실제로는 API 호출
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
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">웰빙 대시보드</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/record" className="text-gray-600 hover:text-blue-600 transition-colors">
                기록하기
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-blue-600 transition-colors">
                분석보기
              </Link>
              <Link href="/wellness" className="text-blue-600 font-medium">
                웰빙
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
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            디지털 웰빙 대시보드
          </h2>
          <p className="text-lg text-gray-600">
            도파민 소비 패턴을 의식적으로 관리하고 건강한 디지털 라이프를 만들어보세요.
          </p>
        </div>

        {/* 도파민 스코어 섹션 */}
        <div className="mb-8">
          <DopamineScoreCard 
            score={currentScore} 
            previousScore={previousScore}
            showTrend={true}
          />
        </div>

        {/* 주요 기능 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Word to Self 계약 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Word to Self 계약</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Plus className="h-4 w-4 inline mr-1" />
                새 계약
              </button>
            </div>
            
            {contracts.length > 0 ? (
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <WordToSelfContractStatus key={contract.id} contract={contract} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-800 mb-2">첫 번째 계약을 만들어보세요</h4>
                <p className="text-gray-600 mb-4">
                  자신과의 약속을 통해 디지털 웰빙 목표를 설정하고 추적해보세요.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  계약 만들기
                </button>
              </div>
            )}
          </div>

          {/* 도파민 리셋 루틴 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">리셋 루틴</h3>
              <span className="text-sm text-gray-500">
                완료된 루틴: {routines.filter(r => r.completed).length}/{routines.length}
              </span>
            </div>
            
            <ResetRoutineList 
              routines={routines} 
              onComplete={handleRoutineComplete}
            />
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">활성 계약</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">평균 신뢰도</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.length > 0 
                    ? Math.round(contracts.reduce((sum, c) => sum + c.integrity_score, 0) / contracts.length)
                    : 100
                  }%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">완료된 루틴</p>
                <p className="text-2xl font-bold text-gray-900">
                  {routines.filter(r => r.completed).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 웰빙 팁 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 오늘의 웰빙 팁
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">도파민 스코어 관리</h4>
              <p className="text-sm text-gray-600">
                스코어가 60 이상일 때는 리셋 루틴을 실천해보세요. 
                명상이나 호흡 운동이 도파민 수용체 재조정에 도움이 됩니다.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">자기 신뢰도 향상</h4>
              <p className="text-sm text-gray-600">
                작은 목표부터 시작하여 자신과의 약속을 지키는 습관을 만들어보세요. 
                이는 장기적인 행동 변화의 기반이 됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/record"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 기록 추가하기
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              상세 분석 보기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 