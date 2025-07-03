/**
 * 도파민 기록 데이터 시각화 컴포넌트
 * Recharts를 사용하여 상황별, 기분별 차트를 표시합니다.
 */

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AnalysisResult, ChartData } from '@/types';

interface ChartViewProps {
  analysisResult: AnalysisResult;
}

export default function ChartView({ analysisResult }: ChartViewProps) {
  // 상황별 데이터 변환
  const situationData = Object.entries(analysisResult.situationBreakdown)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: getSituationLabel(key),
      value,
      color: getSituationColor(key),
    }));

  // 기분별 데이터 변환
  const moodData = Object.entries(analysisResult.moodBreakdown)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: getMoodLabel(key),
      value,
      color: getMoodColor(key),
    }));

  // 상황별 색상
  function getSituationColor(situation: string): string {
    const colors: Record<string, string> = {
      boredom: '#6366f1',    // 인디고
      stress: '#ef4444',     // 빨강
      habit: '#f59e0b',      // 주황
      social: '#8b5cf6',     // 보라
      work: '#10b981',       // 초록
      entertainment: '#06b6d4', // 청록
      other: '#6b7280',      // 회색
    };
    return colors[situation] || '#6b7280';
  }

  // 기분별 색상
  function getMoodColor(mood: string): string {
    const colors: Record<string, string> = {
      good: '#10b981',       // 초록
      neutral: '#6b7280',    // 회색
      bad: '#ef4444',        // 빨강
    };
    return colors[mood] || '#6b7280';
  }

  // 상황별 라벨
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

  // 기분별 라벨
  function getMoodLabel(mood: string): string {
    const labels: Record<string, string> = {
      good: '좋음',
      neutral: '무감정',
      bad: '나쁨',
    };
    return labels[mood] || mood;
  }

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value}회 ({((payload[0].value / analysisResult.totalRecords) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (analysisResult.totalRecords === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">아직 기록이 없습니다</h3>
        <p className="text-gray-500">첫 번째 도파민 기록을 추가하면 차트가 표시됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 전체 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">총 기록</h3>
          <p className="text-2xl font-bold text-blue-800">{analysisResult.totalRecords}회</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">평균 기분</h3>
          <p className="text-2xl font-bold text-green-800">
            {analysisResult.averageMood.toFixed(1)}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600">주요 상황</h3>
          <p className="text-2xl font-bold text-purple-800">
            {getSituationLabel(analysisResult.mostCommonSituation)}
          </p>
        </div>
      </div>

      {/* 상황별 막대 차트 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">상황별 기록 분포</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={situationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 기분별 파이 차트 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">기분별 분포</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={moodData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {moodData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 기분별 막대 차트 (대안) */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">기분별 기록 분포</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 