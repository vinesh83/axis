import React from 'react';
import { X, Clock, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

interface Deadline {
  id: number;
  client: string;
  type: string;
  deadline: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  description: string;
}

interface DeadlinesModalProps {
  onClose: () => void;
  deadlines: Deadline[];
}

const DeadlinesModal = ({ onClose, deadlines }: DeadlinesModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h2>
            <p className="text-gray-600 mt-1">Track and manage case deadlines</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {deadlines.map((deadline) => (
              <div 
                key={deadline.id} 
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`
                      p-2 rounded-lg
                      ${deadline.priority === 'high' ? 'bg-red-100' :
                        deadline.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'}
                    `}>
                      <Clock className={`
                        w-5 h-5
                        ${deadline.priority === 'high' ? 'text-red-600' :
                          deadline.priority === 'medium' ? 'text-yellow-600' :
                          'text-green-600'}
                      `} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{deadline.client}</h3>
                      <p className="text-sm text-gray-600 mt-1">{deadline.type}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {deadline.deadline}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {deadline.priority.charAt(0).toUpperCase() + deadline.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${deadline.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      deadline.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {deadline.status === 'pending' ? 'Pending' :
                     deadline.status === 'in_progress' ? 'In Progress' :
                     'Completed'}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">{deadline.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(deadline.assignedTo)}&background=random`}
                      alt={deadline.assignedTo}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{deadline.assignedTo}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button className="btn-primary w-full">
            Add New Deadline
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeadlinesModal;