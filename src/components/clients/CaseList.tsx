import React from 'react';
import { Clock, Archive, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  type: string;
  status: string;
  strategy: string;
  instructions: string;
  isActive: boolean;
  progress?: {
    currentStage: number;
    totalStages: number;
    stages: {
      id: number;
      name: string;
      description: string;
      completed: boolean;
      estimatedDuration?: string;
      dueDate?: string | Date;
    }[];
  };
  uscisStatus?: {
    receiptNumber: string;
    status: string;
    form: string;
    lastUpdated: string | Date;
    estimatedProcessingTime?: string;
    processingCenter?: string;
    alerts?: string[];
  };
}

const CaseList = ({ cases }: { cases: Case[] }) => {
  const activeCases = cases.filter(c => c.isActive);
  const archivedCases = cases.filter(c => !c.isActive);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Cases</h2>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-lg font-medium">Active Cases</h3>
        </div>
        <div className="space-y-6">
          {activeCases.map(case_ => (
            <CaseCard key={case_.id} case={case_} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <Archive className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium">Archived Cases</h3>
        </div>
        <div className="space-y-6">
          {archivedCases.map(case_ => (
            <CaseCard key={case_.id} case={case_} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CaseCard = ({ case: case_ }: { case: Case }) => {
  const progress = case_.progress ? Math.round((case_.progress.currentStage / case_.progress.totalStages) * 100) : 0;

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Case Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium text-gray-900">{case_.title}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-600">{case_.type}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                case_.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                case_.status === 'Completed' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {case_.status}
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Case Content */}
      <div className="p-6 space-y-6">
        {/* Strategy & Instructions */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Strategy</h5>
            <p className="text-sm text-gray-600">{case_.strategy}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Special Instructions</h5>
            <p className="text-sm text-gray-600">{case_.instructions}</p>
          </div>
        </div>

        {/* Progress Section */}
        {case_.progress && (
          <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h5 className="text-sm font-medium text-gray-900">Case Progress</h5>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                  Stage {case_.progress.currentStage} of {case_.progress.totalStages}
                </span>
              </div>
              <span className="text-sm text-gray-500">{progress}% Complete</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Stage Indicators */}
            <div className="relative flex justify-between">
              {case_.progress.stages.map((stage, index) => {
                const isCompleted = index + 1 <= case_.progress.currentStage;
                const isCurrent = index + 1 === case_.progress.currentStage;
                const dueDate = formatDate(stage.dueDate);
                
                return (
                  <div 
                    key={stage.id} 
                    className={`
                      flex flex-col items-center relative group
                      ${index === 0 ? 'flex-1' : index === case_.progress.stages.length - 1 ? 'flex-1' : 'flex-[2]'}
                    `}
                  >
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

                    <div className="mt-3 text-center">
                      <p className={`
                        text-sm font-medium
                        ${isCurrent ? 'text-indigo-600' : 'text-gray-600'}
                      `}>
                        {stage.name}
                      </p>
                      {dueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {dueDate}
                        </p>
                      )}
                    </div>

                    {/* Stage Description Tooltip */}
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* USCIS Status */}
        {case_.uscisStatus && (
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h5 className="text-sm font-medium text-gray-900">USCIS Status</h5>
                <span className="px-3 py-1 rounded-full text-sm bg-white/50">
                  Form {case_.uscisStatus.form}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                Last Updated: {formatDate(case_.uscisStatus.lastUpdated)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  <p className="text-sm text-gray-600">{case_.uscisStatus.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Receipt Number</p>
                  <p className="text-sm text-gray-600">{case_.uscisStatus.receiptNumber}</p>
                </div>
                {case_.uscisStatus.processingCenter && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Processing Center</p>
                    <p className="text-sm text-gray-600">{case_.uscisStatus.processingCenter}</p>
                  </div>
                )}
              </div>

              <div>
                {case_.uscisStatus.estimatedProcessingTime && (
                  <div className="bg-white/50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700">Processing Time</p>
                    <p className="text-sm text-gray-600">{case_.uscisStatus.estimatedProcessingTime}</p>
                  </div>
                )}

                {case_.uscisStatus.alerts && case_.uscisStatus.alerts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Important Alerts</p>
                    {case_.uscisStatus.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="bg-white/50 rounded-lg p-3 text-sm text-gray-600"
                      >
                        {alert}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseList;