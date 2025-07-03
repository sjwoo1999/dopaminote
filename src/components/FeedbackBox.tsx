/**
 * 도파민 기록 분석 피드백 컴포넌트
 * 사용자의 패턴을 분석하여 개인화된 피드백을 제공합니다.
 */

'use client';

import { Lightbulb, TrendingUp, AlertTriangle, Heart } from 'lucide-react';
import { AnalysisResult } from '@/types';

interface FeedbackBoxProps {
  analysisResult: AnalysisResult;
}

export default function FeedbackBox({ analysisResult }: FeedbackBoxProps) {
  // 피드백 타입별 아이콘과 스타일
  const getFeedbackStyle = (feedback: string) => {
    if (feedback.includes('건강한') || feedback.includes('좋아지는') || feedback.includes('꾸준히')) {
      return {
        icon: <Heart className="h-5 w-5 text-green-600" />,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
      };
    } else if (feedback.includes('주의') || feedback.includes('제한') || feedback.includes('습관')) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
      };
    } else {
      return {
        icon: <Lightbulb className="h-5 w-5 text-blue-600" />,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
      };
    }
  };

  // 상황별 구체적인 조언
  const getSituationAdvice = (situation: string, count: number) => {
    const advice: Record<string, string> = {
      social: '소셜미디어 사용 시간을 제한하고, 실제 대화나 활동으로 대체해보세요.',
      stress: '스트레스 해소를 위한 건강한 방법(운동, 명상, 취미)을 찾아보세요.',
      habit: '의식적인 사용을 위해 알림을 끄거나 앱을 숨겨보세요.',
      boredom: '새로운 취미나 활동을 시작하여 건설적인 시간을 만들어보세요.',
      work: '업무 중 휴식 시간을 정하고, 업무 외 활동으로 균형을 맞춰보세요.',
      entertainment: '다양한 엔터테인먼트를 즐기며 과도한 소비를 피해보세요.',
    };
    return advice[situation] || '패턴을 관찰하고 개선점을 찾아보세요.';
  };

  if (analysisResult.totalRecords === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">첫 번째 기록을 시작해보세요!</h3>
            <p className="text-blue-700">
              도파민 소비 패턴을 기록하고 분석하여 더 건강한 디지털 라이프를 만들어보세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">분석 결과 & 피드백</h2>
      </div>

      {/* 주요 통계 요약 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-800 mb-2">📊 기록 요약</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">총 기록:</span>
            <span className="ml-1 font-medium">{analysisResult.totalRecords}회</span>
          </div>
          <div>
            <span className="text-gray-600">평균 기분:</span>
            <span className="ml-1 font-medium">{analysisResult.averageMood.toFixed(1)}</span>
          </div>
          <div>
            <span className="text-gray-600">주요 상황:</span>
            <span className="ml-1 font-medium">
              {getSituationLabel(analysisResult.mostCommonSituation)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">분석 완료:</span>
            <span className="ml-1 font-medium text-green-600">✓</span>
          </div>
        </div>
      </div>

      {/* 피드백 목록 */}
      <div className="space-y-3">
        {analysisResult.feedback.map((feedback, index) => {
          const style = getFeedbackStyle(feedback);
          return (
            <div
              key={index}
              className={`${style.bgColor} ${style.borderColor} border rounded-lg p-4`}
            >
              <div className="flex items-start space-x-3">
                {style.icon}
                <div className="flex-1">
                  <p className={`${style.textColor} text-sm leading-relaxed`}>
                    {feedback}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 상황별 구체적 조언 */}
      {analysisResult.totalRecords > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 상황별 개선 조언</h3>
          <div className="space-y-3">
            {Object.entries(analysisResult.situationBreakdown)
              .filter(([_, count]) => count > 0)
              .sort(([_, a], [__, b]) => b - a)
              .slice(0, 3)
              .map(([situation, count]) => (
                <div key={situation} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {getSituationLabel(situation)} ({count}회)
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {getSituationAdvice(situation, count)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 다음 단계 제안 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">🚀 다음 단계</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• 일주일간 꾸준히 기록해보세요</p>
          <p>• 패턴을 발견하면 회고 노트에 기록해보세요</p>
          <p>• 목표를 설정하고 개선 계획을 세워보세요</p>
        </div>
      </div>
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