/**
 * 도파민 기록 업로드 폼 컴포넌트
 * 스크린샷 업로드, 상황/기분 선택, 첨언 입력 기능을 제공합니다.
 */

'use client';

import { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { supabase, TABLES, STORAGE_BUCKETS } from '@/lib/supabaseClient';
import { Situation, Mood, UploadFormData } from '@/types';

interface UploadFormProps {
  onSuccess?: () => void;
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [formData, setFormData] = useState<UploadFormData>({
    image: null,
    situation: 'other',
    mood: 'neutral',
    note: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 상황 옵션
  const situationOptions = [
    { value: 'boredom', label: '심심함' },
    { value: 'stress', label: '스트레스' },
    { value: 'habit', label: '습관' },
    { value: 'social', label: '소셜미디어' },
    { value: 'work', label: '업무' },
    { value: 'entertainment', label: '엔터테인먼트' },
    { value: 'other', label: '기타' },
  ];

  // 기분 옵션
  const moodOptions = [
    { value: 'good', label: '좋음' },
    { value: 'neutral', label: '무감정' },
    { value: 'bad', label: '나쁨' },
  ];

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일 검증
      if (!file.type.startsWith('image/')) {
        setErrorMessage('이미지 파일만 업로드 가능합니다.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        setErrorMessage('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setErrorMessage('');
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      setErrorMessage('이미지를 선택해주세요.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      // 1. 이미지를 Supabase Storage에 업로드
      const fileName = `${Date.now()}-${formData.image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.SCREENSHOTS)
        .upload(fileName, formData.image);

      if (uploadError) {
        throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
      }

      // 2. 이미지 URL 생성
      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKETS.SCREENSHOTS)
        .getPublicUrl(fileName);

      // 3. 데이터베이스에 기록 저장
      const { error: dbError } = await supabase
        .from(TABLES.DOPAMINE_RECORDS)
        .insert({
          image_url: publicUrl,
          situation: formData.situation,
          mood: formData.mood,
          note: formData.note,
        });

      if (dbError) {
        throw new Error(`데이터 저장 실패: ${dbError.message}`);
      }

      // 성공 처리
      setUploadStatus('success');
      setFormData({
        image: null,
        situation: 'other',
        mood: 'neutral',
        note: '',
      });
      
      // 파일 입력 초기화
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // 성공 콜백 호출
      if (onSuccess) {
        onSuccess();
      }

      // 3초 후 상태 초기화
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  // 폼 리셋
  const handleReset = () => {
    setFormData({
      image: null,
      situation: 'other',
      mood: 'neutral',
      note: '',
    });
    setErrorMessage('');
    setUploadStatus('idle');
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">도파민 기록 추가</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스크린샷 업로드
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">
                {formData.image ? formData.image.name : '클릭하여 이미지 선택'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (최대 5MB)</p>
            </label>
          </div>
          {formData.image && (
            <div className="mt-2 flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              {formData.image.name}
            </div>
          )}
        </div>

        {/* 상황 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            어떤 상황이었나요?
          </label>
          <select
            value={formData.situation}
            onChange={(e) => setFormData(prev => ({ ...prev, situation: e.target.value as Situation }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isUploading}
          >
            {situationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 기분 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기분은 어땠나요?
          </label>
          <select
            value={formData.mood}
            onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value as Mood }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isUploading}
          >
            {moodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 첨언 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            추가 메모 (선택사항)
          </label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            rows={3}
            placeholder="이 상황에 대한 생각이나 느낌을 자유롭게 적어보세요..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isUploading}
          />
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        {/* 성공 메시지 */}
        {uploadStatus === 'success' && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600">기록이 성공적으로 저장되었습니다!</p>
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isUploading || !formData.image}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? '업로드 중...' : '기록 저장'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isUploading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
} 