/**
 * 도파민 기록 분석 결과 페이지
 * 사용자의 기록 데이터를 분석하고 차트와 피드백을 제공합니다.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, RefreshCw } from 'lucide-react';
import { supabase, TABLES } from '@/lib/supabaseClient';
import { analyzeRecords } from '@/lib/analysis';
import { DopamineRecord, AnalysisResult } from '@/types';
import ChartView from '@/components/ChartView';
import FeedbackBox from '@/components/FeedbackBox';

export default function ReportPage() {
  const [records, setRecords] = useState<DopamineRecord[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로드
  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from(TABLES.DOPAMINE_RECORDS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`데이터 로드 실패: ${error.message}`);
      }

      setRecords(data || []);
      
      // 분석 실행
      const result = analyzeRecords(data || []);
      setAnalysisResult(result);

    } catch (err) {
      console.error('Error loading records:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 새로고침
  const handleRefresh = () => {
    loadRecords();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">오류가 발생했습니다</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleRefresh}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
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
            {records.length > 0 
              ? `총 ${records.length}개의 기록을 분석한 결과입니다.`
              : '아직 기록이 없습니다. 첫 번째 기록을 추가해보세요!'
            }
          </p>
        </div>

        {records.length === 0 ? (
          /* 기록이 없는 경우 */
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-auto">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">아직 기록이 없습니다</h3>
              <p className="text-gray-500 mb-6">
                첫 번째 도파민 기록을 추가하면 분석 결과를 볼 수 있습니다.
              </p>
              <Link
                href="/record"
                className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                첫 번째 기록 추가하기
              </Link>
            </div>
          </div>
        ) : (
          /* 분석 결과 표시 */
          <div className="space-y-8">
            {/* 차트 섹션 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <ChartView analysisResult={analysisResult!} />
            </div>

            {/* 피드백 섹션 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <FeedbackBox analysisResult={analysisResult!} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// 상황별 라벨 함수
function getSituationLabel(situation: string): string {
  const labels: Record<string, string> = {
    boredom: '심심함',
    stress: '스트레스',
    habit: '습관',
    social: '소셜미디어',
    work: '업무',
    entertainment: '엔터테인먼트',
    other: '기타',
  };
  return labels[situation] || situation;
}

// 기분별 라벨 함수
function getMoodLabel(mood: string): string {
  const labels: Record<string, string> = {
    good: '좋음',
    neutral: '무감정',
    bad: '나쁨',
  };
  return labels[mood] || mood;
} 