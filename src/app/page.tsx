/**
 * Dopaminote 홈 페이지
 * 앱의 주요 기능들을 소개하고 사용자를 안내합니다.
 */

import Link from 'next/link';
import { Brain, BarChart3, BookOpen, Plus, TrendingUp, Target, Zap, Heart } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Plus className="h-8 w-8 text-blue-600" />,
      title: '도파민 기록',
      description: '스크린샷을 업로드하고 상황, 기분, 첨언을 기록하여 도파민 소비 패턴을 추적하세요.',
      href: '/record',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: '패턴 분석',
      description: '기록된 데이터를 분석하여 도파민 소비 패턴을 시각화하고 인사이트를 얻으세요.',
      href: '/report',
      color: 'bg-green-50 border-green-200',
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: '웰빙 대시보드',
      description: '도파민 스코어, Word to Self 계약, 리셋 루틴으로 종합적인 디지털 웰빙을 관리하세요.',
      href: '/wellness',
      color: 'bg-pink-50 border-pink-200',
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: '회고 노트',
      description: '일일 회고를 작성하고 개선 목표를 설정하여 건강한 디지털 라이프를 만들어보세요.',
      href: '/journal',
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  const benefits = [
    {
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      title: '의식적 소비',
      description: '무의식적인 도파민 소비를 의식적으로 바꿔보세요.',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      title: '패턴 발견',
      description: '언제, 왜 도파민을 찾게 되는지 패턴을 발견하세요.',
    },
    {
      icon: <Target className="h-6 w-6 text-red-600" />,
      title: '목표 설정',
      description: '건강한 디지털 라이프를 위한 구체적인 목표를 세우세요.',
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      title: '즉시 개선',
      description: '분석 결과를 바탕으로 즉시 개선 행동을 시작하세요.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dopaminote</h1>
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
              <Link href="/journal" className="text-gray-600 hover:text-blue-600 transition-colors">
                회고노트
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            도파민 소비 패턴을
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              분석하고 개선하세요
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            스크린샷을 업로드하고 상황을 기록하여 도파민 소비 패턴을 추적하고, 
            데이터 기반의 인사이트로 건강한 디지털 라이프를 만들어보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/record"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              첫 번째 기록 시작하기
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              분석 결과 보기
            </Link>
          </div>
        </div>

        {/* 주요 기능 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            주요 기능
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className={`block p-6 rounded-xl border-2 ${feature.color} hover:shadow-lg transition-all duration-200 group`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* 혜택 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Dopaminote로 얻을 수 있는 것들
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            지금 바로 시작해보세요
          </h3>
          <p className="text-xl mb-8 opacity-90">
            단 1분만에 첫 번째 도파민 기록을 만들어보세요.
          </p>
          <Link
            href="/record"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            기록 시작하기
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Dopaminote</span>
            </div>
            <p className="text-gray-400 mb-4">
              건강한 디지털 라이프를 위한 도파민 소비 패턴 분석 도구
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 Dopaminote. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
