import React, { useState } from 'react';
import { FileText, Target, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WordToSelfContract } from '@/types';

interface WordToSelfContractProps {
  contract?: WordToSelfContract;
  onSave: (contract: Partial<WordToSelfContract>) => void;
}

export function WordToSelfContractForm({ contract, onSave }: WordToSelfContractProps) {
  const [formData, setFormData] = useState({
    title: contract?.title || '',
    description: contract?.description || '',
    goal_type: contract?.goal_type || 'time_limit',
    target_value: contract?.target_value || 0,
    unit: contract?.unit || '시간',
    end_date: contract?.end_date || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      start_date: new Date().toISOString(),
      status: 'active',
      integrity_score: 100
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="h-6 w-6 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-800">Word to Self 계약</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            계약 제목
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="예: 주 5시간 이하 SNS 사용"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            계약 설명
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="자신과의 약속에 대한 자세한 설명을 작성하세요..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 유형
            </label>
            <select
              value={formData.goal_type}
              onChange={(e) => setFormData({ ...formData, goal_type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="time_limit">시간 제한</option>
              <option value="frequency_limit">횟수 제한</option>
              <option value="behavior_change">행동 변화</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표값
            </label>
            <input
              type="number"
              value={formData.target_value}
              onChange={(e) => setFormData({ ...formData, target_value: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              단위
            </label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              placeholder="시간, 횟수, 일수 등"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 완료일
            </label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-purple-600" />
            <h4 className="font-medium text-purple-800">계약의 중요성</h4>
          </div>
          <p className="text-sm text-purple-700">
            자신과의 약속을 지키는 것은 '완전함(wholeness)'의 기반입니다. 
            이 계약은 단순한 목표가 아닌, 자신에 대한 신뢰를 구축하는 중요한 도구입니다.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="submit" variant="primary">
            <CheckCircle className="h-4 w-4 mr-2" />
            계약 체결하기
          </Button>
        </div>
      </form>
    </div>
  );
}

// 계약 상태 표시 컴포넌트
export function WordToSelfContractStatus({ contract }: { contract: WordToSelfContract }) {
  const getStatusIcon = () => {
    switch (contract.status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (contract.status) {
      case 'active':
        return '진행 중';
      case 'completed':
        return '완료';
      case 'failed':
        return '실패';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{contract.title}</h4>
        {getStatusIcon()}
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{contract.description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          목표: {contract.target_value} {contract.unit}
        </span>
        <span className="text-gray-500">
          신뢰도: {contract.integrity_score}%
        </span>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>진행률</span>
          <span>{getStatusText()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              contract.status === 'completed' ? 'bg-green-500' : 
              contract.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${contract.integrity_score}%` }}
          />
        </div>
      </div>
    </div>
  );
} 