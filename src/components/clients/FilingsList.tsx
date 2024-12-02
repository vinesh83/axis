import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, ExternalLink, Filter, ChevronDown, ChevronRight } from 'lucide-react';

interface Filing {
  id: string;
  formNumber: string;
  formName: string;
  receiptNumber: string;
  status: 'completed' | 'pending' | 'in_progress';
  substatus?: 'approved' | 'denied' | 'rfe' | 'scheduled' | 'waiting';
  filedDate: Date;
  lastUpdated: Date;
  processingTime?: string;
  priority?: 'normal' | 'expedited';
  alerts?: string[];
}

interface FilingsListProps {
  filings: Filing[];
}

const FilingsList = ({ filings }: FilingsListProps) => {
  const [expandedSections, setExpandedSections] = useState({
    inProgress: true,
    pending: true,
    completed: false
  });

  const completedFilings = filings.filter(f => f.status === 'completed');
  const pendingFilings = filings.filter(f => f.status === 'pending');
  const inProgressFilings = filings.filter(f => f.status === 'in_progress');

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusColor = (status: Filing['status'], substatus?: Filing['substatus']) => {
    if (substatus) {
      switch (substatus) {
        case 'approved':
          return 'bg-green-50 text-green-700 border-green-100';
        case 'denied':
          return 'bg-red-50 text-red-700 border-red-100';
        case 'rfe':
          return 'bg-yellow-50 text-yellow-700 border-yellow-100';
        case 'scheduled':
          return 'bg-blue-50 text-blue-700 border-blue-100';
        default:
          return 'bg-gray-50 text-gray-700 border-gray-100';
      }
    }

    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getStatusIcon = (status: Filing['status'], substatus?: Filing['substatus']) => {
    if (substatus) {
      switch (substatus) {
        case 'approved':
          return <CheckCircle className="w-4 h-4" />;
        case 'denied':
          return <AlertCircle className="w-4 h-4" />;
        case 'rfe':
          return <Clock className="w-4 h-4" />;
        default:
          return <FileText className="w-4 h-4" />;
      }
    }

    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const FilingCard = ({ filing }: { filing: Filing }) => (
    <div className="group relative bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">
              Form {filing.formNumber}
            </span>
            {filing.priority === 'expedited' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                Expedited
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {filing.formName}
          </p>
        </div>
        
        <a
          href={`https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=${filing.receiptNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(filing.status, filing.substatus)}`}>
            {getStatusIcon(filing.status, filing.substatus)}
            <span>{filing.substatus?.toUpperCase() || filing.status.toUpperCase()}</span>
          </span>
          <span className="text-xs text-gray-500">
            Filed: {filing.filedDate.toLocaleDateString()}
          </span>
        </div>
        
        {filing.processingTime && (
          <span className="text-xs text-gray-500">
            ~{filing.processingTime}
          </span>
        )}
      </div>

      {filing.alerts && filing.alerts.length > 0 && (
        <div className="mt-2 space-y-1">
          {filing.alerts.map((alert, index) => (
            <div
              key={index}
              className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded"
            >
              {alert}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        Receipt #: {filing.receiptNumber}
      </div>
    </div>
  );

  const Section = ({ 
    title, 
    filings, 
    isExpanded, 
    onToggle 
  }: { 
    title: string; 
    filings: Filing[]; 
    isExpanded: boolean; 
    onToggle: () => void;
  }) => (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">({filings.length})</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && filings.length > 0 && (
        <div className="p-3 space-y-3 bg-white">
          {filings.map((filing) => (
            <FilingCard key={filing.id} filing={filing} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filings</h2>
        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="space-y-4">
        {inProgressFilings.length > 0 && (
          <Section
            title="In Progress"
            filings={inProgressFilings}
            isExpanded={expandedSections.inProgress}
            onToggle={() => toggleSection('inProgress')}
          />
        )}

        {pendingFilings.length > 0 && (
          <Section
            title="Pending"
            filings={pendingFilings}
            isExpanded={expandedSections.pending}
            onToggle={() => toggleSection('pending')}
          />
        )}

        {completedFilings.length > 0 && (
          <Section
            title="Completed"
            filings={completedFilings}
            isExpanded={expandedSections.completed}
            onToggle={() => toggleSection('completed')}
          />
        )}
      </div>
    </div>
  );
};

export default FilingsList;