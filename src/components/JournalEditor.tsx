/**
 * 회고 노트 에디터 컴포넌트
 * 일일 회고 작성과 목표 설정 기능을 제공합니다.
 */

'use client';

import { useState, useEffect } from 'react';
import { Save, Target, BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { supabase, TABLES } from '@/lib/supabaseClient';
import { JournalEntry } from '@/types';

interface JournalEditorProps {
  onSave?: () => void;
}

export default function JournalEditor({ onSave }: JournalEditorProps) {
  const [reflection, setReflection] = useState('');
  const [goals, setGoals] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [todayEntry, setTodayEntry] = useState<JournalEntry | null>(null);

  // 오늘 날짜
  const today = new Date().toISOString().split('T')[0];

  // 오늘의 회고 불러오기
  useEffect(() => {
    loadTodayEntry();
  }, []);

  const loadTodayEntry = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.JOURNAL_ENTRIES)
        .select('*')
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116는 데이터가 없을 때
        console.error('Error loading today entry:', error);
        return;
      }

      if (data) {
        setTodayEntry(data);
        setReflection(data.reflection || '');
        setGoals(data.goals || '');
      }
    } catch (error) {
      console.error('Error loading today entry:', error);
    }
  };

  // 회고 저장
  const handleSave = async () => {
    if (!reflection.trim() && !goals.trim()) {
      setErrorMessage('회고나 목표 중 하나는 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage('');

    try {
      const entryData = {
        date: today,
        reflection: reflection.trim(),
        goals: goals.trim(),
      };

      let result;
      if (todayEntry) {
        // 기존 항목 업데이트
        result = await supabase
          .from(TABLES.JOURNAL_ENTRIES)
          .update(entryData)
          .eq('id', todayEntry.id);
      } else {
        // 새 항목 생성
        result = await supabase
          .from(TABLES.JOURNAL_ENTRIES)
          .insert(entryData);
      }

      if (result.error) {
        throw new Error(`저장 실패: ${result.error.message}`);
      }

      setSaveStatus('success');
      
      // 성공 콜백 호출
      if (onSave) {
        onSave();
      }

      // 3초 후 상태 초기화
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">오늘의 회고</h2>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date(today).toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
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
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="오늘의 도파민 소비 패턴을 돌아보며 생각을 정리해보세요..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            disabled={isSaving}
          />
        </div>

        {/* 목표 설정 */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">목표 설정</h3>
          </div>
          
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="내일의 개선 목표나 계획을 세워보세요..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            disabled={isSaving}
          />
        </div>
      </div>

      {/* 저장 상태 메시지 */}
      {errorMessage && (
        <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {saveStatus === 'success' && (
        <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <p className="text-sm text-green-600">회고가 성공적으로 저장되었습니다!</p>
          </div>
        </div>
      )}

      {/* 저장 버튼 */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving || (!reflection.trim() && !goals.trim())}
          className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? '저장 중...' : '저장하기'}</span>
        </button>
      </div>
    </div>
  );
} 