import React from 'react';
import { X, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

interface StatsModalProps {
  title: string;
  value: string;
  trend: string;
  onClose: () => void;
  data: {
    labels: string[];
    values: number[];
  };
}

const StatsModal = ({ title, value, trend, onClose, data }: StatsModalProps) => {
  const maxValue = Math.max(...data.values);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold mr-3">{value}</span>
              <span className={`flex items-center text-sm font-medium ${
                trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.startsWith('+') ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {trend}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Chart */}
          <div className="h-64 flex items-end space-x-2">
            {data.values.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-indigo-500 rounded-t-lg transition-all duration-500"
                  style={{ 
                    height: `${(value / maxValue) * 100}%`,
                    opacity: 0.6 + ((value / maxValue) * 0.4)
                  }}
                />
                <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-top-left">
                  {data.labels[index]}
                </div>
              </div>
            ))}
          </div>

          {/* Time Range Selector */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              Last 7 days
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-lg">
              Last 30 days
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              Last 90 days
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Custom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;