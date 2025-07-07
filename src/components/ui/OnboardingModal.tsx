"use client";

import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  action?: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "도파민 소비 패턴을 기록하세요",
    description: "스크린샷을 업로드하고 상황, 기분을 기록하여 도파민 소비 패턴을 추적합니다.",
    action: "기록하기"
  },
  {
    title: "실시간으로 도파민 스코어를 확인하세요",
    description: "입력할 때마다 즉시 도파민 스코어가 계산되어 현재 상태를 알려줍니다.",
    action: "스코어 확인"
  },
  {
    title: "Word to Self 계약으로 목표를 설정하세요",
    description: "자신과의 약속을 통해 구체적인 디지털 웰빙 목표를 설정하고 추적합니다.",
    action: "계약 만들기"
  },
  {
    title: "리셋 루틴으로 도파민 균형을 회복하세요",
    description: "명상, 호흡, 감사 등의 활동으로 도파민 균형을 회복합니다.",
    action: "루틴 시작"
  }
];

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 진행률 표시 */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>단계 {currentStep + 1} / {onboardingSteps.length}</span>
            <span>{Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {onboardingSteps[currentStep].title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {onboardingSteps[currentStep].description}
          </p>
        </div>

        {/* 액션 버튼 */}
        {onboardingSteps[currentStep].action && (
          <div className="mb-6">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={handleNext}
            >
              {onboardingSteps[currentStep].action}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            이전
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleSkip}
            >
              건너뛰기
            </Button>
            
            {currentStep < onboardingSteps.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
              >
                다음
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={onComplete}
              >
                시작하기
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 