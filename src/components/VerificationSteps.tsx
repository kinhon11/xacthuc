import React from 'react';
import { CheckCircle, Upload, Clock, UserCheck } from 'lucide-react';

interface VerificationStepsProps {
  currentStep: number;
}

const VerificationSteps: React.FC<VerificationStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Tải lên', icon: Upload },
    { id: 2, name: 'Đang xét duyệt', icon: Clock },
    { id: 3, name: 'Hoàn thành', icon: UserCheck }
  ];

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = step.id <= currentStep;
          const isComplete = step.id < currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full
                    transition-all duration-300 z-10
                    ${isActive 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-white border-2 border-slate-200 text-slate-400'}
                    ${isComplete ? 'bg-green-600 border-green-600' : ''}
                  `}
                >
                  {isComplete ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <span 
                  className={`
                    mt-2 text-sm font-medium
                    ${isActive ? 'text-slate-800' : 'text-slate-400'}
                    ${isComplete ? 'text-green-600' : ''}
                  `}
                >
                  {step.name}
                </span>
              </div>
              
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div 
                  className={`
                    flex-1 h-1 mx-2
                    ${currentStep > i + 1 ? 'bg-green-600' : 'bg-slate-200'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationSteps;