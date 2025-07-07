"use client";

/**
 * 도파민 기록 추가 페이지
 * 스크린샷 업로드와 상황/기분 기록을 위한 페이지입니다.
 */

import Link from 'next/link';
import { ArrowLeft, Plus, Upload, CheckCircle, Clock, Repeat, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { TouchFriendlyInput, TouchFriendlySelect } from '@/components/ui/TouchFriendlyInput';
import { calculateDopamineScore } from '@/lib/utils';

export default function RecordPage() {
  const [formData, setFormData] = useState({
    situation: '',
    mood: '',
    notes: '',
    usage_time: 0,
    pattern_repetition: 0,
    situation_stress: 1
  });

  const [dopamineScore, setDopamineScore] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      
      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // 도파민 스코어 실시간 계산
    const score = calculateDopamineScore(
      newFormData.usage_time,
      newFormData.pattern_repetition,
      newFormData.situation_stress
    );
    setDopamineScore(score);
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-50';
    if (score < 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreLevel = (score: number) => {
    if (score < 30) return '건강';
    if (score < 60) return '주의';
    return '위험';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('이미지를 업로드해주세요.');
      return;
    }
    
    if (!formData.situation || !formData.mood) {
      alert('상황과 기분을 선택해주세요.');
      return;
    }
    
    setUploadStatus('uploading');
    
    try {
      // 실제 구현에서는 여기에 API 호출이 들어갑니다
      // const formDataToSend = new FormData();
      // formDataToSend.append('image', selectedFile);
      // formDataToSend.append('data', JSON.stringify(formData));
      
      // 목업: 2초 후 성공으로 처리
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus('success');
      
      // 성공 후 폼 초기화
      setTimeout(() => {
        setFormData({
          situation: '',
          mood: '',
          notes: '',
          usage_time: 0,
          pattern_repetition: 0,
          situation_stress: 1
        });
        setSelectedFile(null);
        setDopamineScore(0);
        setUploadStatus('idle');
      }, 3000);
      
    } catch (error) {
      setUploadStatus('error');
      console.error('업로드 실패:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      situation: '',
      mood: '',
      notes: '',
      usage_time: 0,
      pattern_repetition: 0,
      situation_stress: 1
    });
    setSelectedFile(null);
    setDopamineScore(0);
    setUploadStatus('idle');
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
              <Link href="/wellness" className="text-gray-600 hover:text-blue-600 transition-colors">
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

        {/* 실시간 도파민 스코어 표시 */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className={`p-4 rounded-lg border ${getScoreColor(dopamineScore)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">실시간 도파민 스코어</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{dopamineScore}</div>
                <div className="text-sm">{getScoreLevel(dopamineScore)}</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    dopamineScore < 30 ? 'bg-green-500' : dopamineScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${dopamineScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 업로드 폼 */}
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">도파민 기록 추가</h2>
          
          <div className="space-y-6">
            {/* 이미지 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                스크린샷 업로드
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="file-upload"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={URL.createObjectURL(selectedFile)} 
                          alt="Preview" 
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">클릭하여 이미지 선택</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (최대 5MB)</p>
                    </>
                  )}
                </div>
              </div>
              {uploadStatus === 'uploading' && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-600">업로드 중...</p>
                </div>
              )}
              {uploadStatus === 'success' && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600">이미지 업로드 완료!</p>
                  </div>
                </div>
              )}
              {uploadStatus === 'error' && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">업로드 실패. 다시 시도해주세요.</p>
                </div>
              )}
            </div>

            {/* 상황 선택 */}
            <TouchFriendlySelect
              label="어떤 상황이었나요?"
              value={formData.situation}
              onChange={(e) => handleInputChange('situation', e.target.value)}
              options={[
                { value: "", label: "상황을 선택하세요" },
                { value: "boredom", label: "심심함" },
                { value: "stress", label: "스트레스" },
                { value: "habit", label: "습관" },
                { value: "social", label: "소셜미디어" },
                { value: "work", label: "업무" },
                { value: "entertainment", label: "엔터테인먼트" },
                { value: "other", label: "기타" }
              ]}
              helperText="도파민을 소비하게 된 상황을 선택해주세요"
            />

            {/* 기분 선택 */}
            <TouchFriendlySelect
              label="기분은 어땠나요?"
              value={formData.mood}
              onChange={(e) => handleInputChange('mood', e.target.value)}
              options={[
                { value: "", label: "기분을 선택하세요" },
                { value: "good", label: "좋음" },
                { value: "neutral", label: "무감정" },
                { value: "bad", label: "나쁨" }
              ]}
              helperText="도파민 소비 후의 기분을 선택해주세요"
            />

            {/* 새로운 웰빙 필드들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 사용 시간 */}
              <TouchFriendlyInput
                label="사용 시간 (분)"
                type="number"
                value={formData.usage_time}
                onChange={(e) => handleInputChange('usage_time', Number(e.target.value))}
                placeholder="0"
                min="0"
                icon={<Clock className="h-4 w-4" />}
                helperText="도파민을 소비한 총 시간을 입력하세요"
                variant="default"
              />

              {/* 반복 패턴 */}
              <TouchFriendlyInput
                label="반복 횟수"
                type="number"
                value={formData.pattern_repetition}
                onChange={(e) => handleInputChange('pattern_repetition', Number(e.target.value))}
                placeholder="0"
                min="0"
                icon={<Repeat className="h-4 w-4" />}
                helperText="같은 행동을 반복한 횟수를 입력하세요"
                variant="default"
              />

              {/* 스트레스 수준 */}
              <TouchFriendlySelect
                label="스트레스 수준"
                value={formData.situation_stress}
                onChange={(e) => handleInputChange('situation_stress', Number(e.target.value))}
                options={[
                  { value: "1", label: "1 - 매우 낮음" },
                  { value: "2", label: "2 - 낮음" },
                  { value: "3", label: "3 - 보통" },
                  { value: "4", label: "4 - 높음" },
                  { value: "5", label: "5 - 매우 높음" }
                ]}
                helperText="도파민 소비 시의 스트레스 수준을 선택하세요"
              />
            </div>

            {/* 첨언 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                추가 메모 (선택사항)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                placeholder="이 상황에 대한 생각이나 느낌을 자유롭게 적어보세요..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none touch-manipulation"
              />
              <p className="text-sm text-gray-500">
                도파민 소비에 대한 추가적인 생각이나 느낌을 자유롭게 적어보세요
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex gap-3">
              <AccessibleButton 
                variant="primary" 
                className="flex-1"
                onClick={handleSubmit}
                disabled={uploadStatus === 'uploading'}
                ariaLabel="도파민 기록 저장"
                ariaDescribedBy="save-description"
              >
                {uploadStatus === 'uploading' ? '저장 중...' : '기록 저장'}
              </AccessibleButton>
              <AccessibleButton 
                variant="outline"
                onClick={handleReset}
                disabled={uploadStatus === 'uploading'}
                ariaLabel="폼 초기화"
                ariaDescribedBy="reset-description"
              >
                초기화
              </AccessibleButton>
            </div>
            
            {/* 접근성 설명 */}
            <div className="sr-only">
              <div id="save-description">도파민 소비 기록을 저장합니다</div>
              <div id="reset-description">모든 입력 필드를 초기화합니다</div>
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
            기록을 완료하셨나요? 웰빙 대시보드에서 종합적인 분석을 확인해보세요!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/wellness"
              className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              웰빙 대시보드 보기
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              상세 분석 보기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 