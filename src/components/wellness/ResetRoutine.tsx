import React, { useState } from 'react';
import { 
  Heart, 
  BookOpen, 
  Sun, 
  Activity, 
  PenTool, 
  Play, 
  CheckCircle,
  Clock,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ResetRoutine } from '@/types';

interface ResetRoutineProps {
  routine?: ResetRoutine;
  onComplete: (routineId: string) => void;
}

const routineCategories = [
  {
    id: 'meditation',
    name: '명상',
    icon: <Heart className="h-6 w-6" />,
    color: 'text-purple-600 bg-purple-50',
    description: '마음을 진정시키고 집중력을 높입니다',
    defaultDuration: 10
  },
  {
    id: 'breathing',
    name: '호흡 운동',
    icon: <Activity className="h-6 w-6" />,
    color: 'text-blue-600 bg-blue-50',
    description: '깊은 호흡으로 스트레스를 해소합니다',
    defaultDuration: 5
  },
  {
    id: 'gratitude',
    name: '감사 쓰기',
    icon: <PenTool className="h-6 w-6" />,
    color: 'text-green-600 bg-green-50',
    description: '감사한 일들을 기록하며 긍정적 마음을 기릅니다',
    defaultDuration: 5
  },
  {
    id: 'exercise',
    name: '가벼운 운동',
    icon: <Activity className="h-6 w-6" />,
    color: 'text-orange-600 bg-orange-50',
    description: '스트레칭이나 가벼운 운동으로 몸을 이완시킵니다',
    defaultDuration: 15
  },
  {
    id: 'reading',
    name: '독서',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'text-indigo-600 bg-indigo-50',
    description: '책을 읽으며 마음을 차분히 만듭니다',
    defaultDuration: 20
  }
];

export function ResetRoutineCard({ routine, onComplete }: ResetRoutineProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(routine?.duration || 0);
  
  const category = routineCategories.find(cat => cat.id === routine?.category);

  const startRoutine = () => {
    setIsActive(true);
    setTimeLeft(routine?.duration || 0);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsActive(false);
          onComplete(routine?.id || '');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!routine || !category) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${category.color}`}>
          {category.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{routine.name}</h3>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      </div>

      {!isActive ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>예상 소요 시간</span>
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{routine.duration}분</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>도파민 감소 예상</span>
            <span className="flex items-center space-x-1 text-green-600">
              <TrendingDown className="h-4 w-4" />
              <span>-{routine.dopamine_reduction}점</span>
            </span>
          </div>

          <Button 
            onClick={startRoutine} 
            variant="primary" 
            className="w-full"
            disabled={routine.completed}
          >
            {routine.completed ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                완료됨
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                루틴 시작하기
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {formatTime(timeLeft)}
          </div>
          <p className="text-gray-600">집중해서 루틴을 완료해보세요</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 이 루틴을 완료하면 도파민 스코어가 {routine.dopamine_reduction}점 감소합니다!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ResetRoutineList({ routines, onComplete }: { 
  routines: ResetRoutine[], 
  onComplete: (routineId: string) => void 
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Sun className="h-6 w-6 text-yellow-600" />
        <h3 className="text-xl font-semibold text-gray-800">도파민 리셋 루틴</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routines.map((routine) => (
          <ResetRoutineCard 
            key={routine.id} 
            routine={routine} 
            onComplete={onComplete}
          />
        ))}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Sun className="h-5 w-5 text-yellow-600" />
          <h4 className="font-medium text-yellow-800">루틴의 효과</h4>
        </div>
        <p className="text-sm text-yellow-700">
          정기적인 루틴은 도파민 수용체를 재조정하고, 
          더 건강한 보상 시스템을 구축하는 데 도움이 됩니다.
        </p>
      </div>
    </div>
  );
} 