import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { CaseStage, USCISStatus } from '../../types/clients';
import USCISStatusCard from './USCISStatusCard';

interface CaseProgressBarProps {
  stages: CaseStage[];
  currentStage: number;
  totalStages: number;
  uscisStatus?: USCISStatus;
}

const CaseProgressBar = ({ stages, currentStage, totalStages, uscisStatus }: CaseProgressBarProps) => {
  if (!stages || stages.length === 0) {
    return null;
  }

  const progress = Math.round((currentStage / totalStages) * 100);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-sm font-medium text-gray-700">Case Progress</h3>
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
              Stage {currentStage} of {totalStages}
            </span>
          </div>
          <span className="text-sm text-gray-500">{progress}% Complete</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stage Indicators */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isCompleted = index + 1 <= currentStage;
            const isCurrent = index + 1 === currentStage;
            
            return (
              <div 
                key={stage.id} 
                className={`
                  flex flex-col items-center relative group
                  ${index === 0 ? 'flex-1' : index === stages.length - 1 ? 'flex-1' : 'flex-[2]'}
                `}
              >
                {/* Stage Indicator */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center z-10
                    transition-all duration-200 
                    ${isCompleted 
                      ? 'bg-indigo-500 text-white' 
                      : isCurrent
                      ? 'bg-white border-2 border-indigo-500 text-indigo-500'
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>

                {/* Stage Label */}
                <div className="mt-3 text-center">
                  <p className={`
                    text-sm font-medium
                    ${isCurrent ? 'text-indigo-600' : 'text-gray-600'}
                  `}>
                    {stage.name}
                  </p>
                  {stage.dueDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(stage.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 max-w-[200px]">
                    <p className="font-medium">{stage.name}</p>
                    <p className="text-gray-300 mt-1">{stage.description}</p>
                    {stage.estimatedDuration && (
                      <p className="text-gray-300 mt-1">
                        Est. Duration: {stage.estimatedDuration}
                      </p>
                    )}
                  </div>
                  <div className="w-2 h-2 bg-gray-900 transform rotate-45 mx-auto mt-[-4px]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* USCIS Status Card */}
      {uscisStatus && <USCISStatusCard status={uscisStatus} />}
    </div>
  );
};

export default CaseProgressBar;