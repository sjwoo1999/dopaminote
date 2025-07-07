import React from 'react';
import { Brain, TrendingUp, TrendingDown } from 'lucide-react';
import { getDopamineScoreColor, getDopamineScoreLevel } from '@/lib/utils';

interface DopamineScoreCardProps {
  score: number;
  previousScore?: number;
  showTrend?: boolean;
}

export function DopamineScoreCard({ score, previousScore, showTrend = true }: DopamineScoreCardProps) {
  const scoreColor = getDopamineScoreColor(score);
  const scoreLevel = getDopamineScoreLevel(score);
  
  const getTrendIcon = () => {
    if (!previousScore || !showTrend) return null;
    
    if (score < previousScore) {
      return <TrendingDown className="h-4 w-4 text-green-600" />;
    } else if (score > previousScore) {
      return <TrendingUp className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const getTrendText = () => {
    if (!previousScore || !showTrend) return null;
    
    if (score < previousScore) {
      return <span className="text-green-600 text-sm">개선됨</span>;
    } else if (score > previousScore) {
      return <span className="text-red-600 text-sm">증가함</span>;
    }
    return <span className="text-gray-600 text-sm">유지됨</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">도파민 스코어</h3>
        </div>
        {getTrendIcon()}
      </div>
      
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${scoreColor} mb-3`}>
          <span className="text-2xl font-bold">{score}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">현재 상태: {scoreLevel}</p>
        {getTrendText()}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>건강</span>
          <span>주의</span>
          <span>위험</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              score < 30 ? 'bg-green-500' : score < 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
} 