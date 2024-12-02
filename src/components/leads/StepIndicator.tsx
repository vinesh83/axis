import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div
            key={stepNumber}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${isCompleted
                ? 'bg-indigo-100 text-indigo-600'
                : isCurrent
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-500'
              }
            `}
          >
            {isCompleted ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="text-sm font-medium">{stepNumber}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;