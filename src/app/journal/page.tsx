/**
 * 회고 노트 페이지
 * 일일 회고 작성과 과거 회고 기록을 조회할 수 있는 페이지입니다.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, TABLES } from '@/lib/supabaseClient';
import { JournalEntry } from '@/types';
import JournalEditor from '@/components/JournalEditor';

export default function JournalPage() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  // 데이터 로드
  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from(TABLES.JOURNAL_ENTRIES)
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        throw new Error(`데이터 로드 실패: ${error.message}`);
      }

      setJournalEntries(data || []);

    } catch (err) {
      console.error('Error loading journal entries:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 회고 저장 후 콜백
  const handleJournalSave = () => {
    loadJournalEntries();
    setShowEditor(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
                onClick={loadJournalEntries}
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
            <button
              onClick={() => setShowEditor(!showEditor)}
              className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {showEditor ? '에디터 닫기' : '오늘의 회고 작성'}
            </button>
          </div>
        </div>

        {/* 회고 에디터 */}
        {showEditor && (
          <div className="mb-8">
            <JournalEditor onSave={handleJournalSave} />
          </div>
        )}

        {/* 회고 목록 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              회고 기록 ({journalEntries.length})
            </h3>
          </div>

          {journalEntries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">아직 회고가 없습니다</h3>
              <p className="text-gray-500 mb-6">
                첫 번째 회고를 작성해보세요. 도파민 소비 패턴을 돌아보고 개선점을 찾아보세요.
              </p>
              <button
                onClick={() => setShowEditor(true)}
                className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                첫 번째 회고 작성하기
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {journalEntries.map((entry) => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// 회고 항목 카드 컴포넌트
function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6">
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
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isExpanded ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {entry.reflection && (
            <div>
              <h5 className="font-medium text-gray-800 mb-2">💭 회고</h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{entry.reflection}</p>
              </div>
            </div>
          )}
          
          {entry.goals && (
            <div>
              <h5 className="font-medium text-gray-800 mb-2">🎯 목표</h5>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{entry.goals}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!isExpanded && (
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
      )}
    </div>
  );
} 