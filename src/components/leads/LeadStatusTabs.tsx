import React from 'react';
import { LeadStatus } from '../../types/leads';

interface LeadStatusTabsProps {
  activeStatus: LeadStatus;
  onStatusChange: (status: LeadStatus) => void;
  counts?: Record<LeadStatus, number>;
}

const STATUSES: { id: LeadStatus; label: string }[] = [
  { id: 'new_prospects', label: 'New prospects' },
  { id: 'under_attorney_review', label: 'Under attorney review' },
  { id: 'awaiting_hire', label: 'Awaiting hire' },
  { id: 'hired', label: 'Hired' },
  { id: 'not_hired', label: 'Not hired' },
  { id: 'completed', label: 'Completed' }
];

const LeadStatusTabs = ({ activeStatus, onStatusChange, counts = {} }: LeadStatusTabsProps) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {STATUSES.map((status) => (
          <button
            key={status.id}
            onClick={() => onStatusChange(status.id)}
            className={`
              group relative whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
              ${activeStatus === status.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span className="flex items-center">
              {status.label}
              {counts[status.id] > 0 && (
                <span className={`
                  ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium transition-all duration-200
                  ${activeStatus === status.id
                    ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-600 border border-indigo-200/50'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200/50 group-hover:border-gray-300/50'
                  }
                `}>
                  {counts[status.id]}
                </span>
              )}
            </span>
            <span className={`
              absolute inset-x-0 -bottom-px h-0.5 transition-all duration-200
              ${activeStatus === status.id
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                : 'bg-transparent group-hover:bg-gray-200'
              }
            `} />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LeadStatusTabs;