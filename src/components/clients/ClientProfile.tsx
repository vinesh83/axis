import React, { useState } from 'react';
import { X } from 'lucide-react';
import AddTimelineEventForm from './AddTimelineEventForm';
import ClientSummary from './ClientSummary';
import TimelineCard from '../timeline/TimelineCard';
import CaseList from './CaseList';
import DocumentGrid from './DocumentGrid';
import FilingsList from './FilingsList';
import FormAssembly from '../forms/FormAssembly';
import ClientInfoCard from './ClientInfoCard';
import { Client } from '../../types/clients';
import { MOCK_FILINGS } from '../../data/mockFilings';

interface ClientProfileProps {
  client: Client;
  onClose: () => void;
}

const ClientProfile = ({ client, onClose }: ClientProfileProps) => {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'forms' | 'documents'>('overview');

  const handleAddEvent = (newEvent: any) => {
    setShowAddEventForm(false);
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'forms' as const, label: 'Forms & Applications' },
    { id: 'documents' as const, label: 'Documents' }
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white rounded-t-xl">
          <div className="flex items-center space-x-4">
            <img
              src={client.imageUrl}
              alt={client.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-100"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
                <span className="text-xl" title={client.citizenship}>
                  {getFlagEmoji(client.countryCode)}
                </span>
              </div>
              <p className="text-gray-600">{client.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar - Client Info & Timeline */}
              <div className="col-span-3 space-y-6">
                <ClientInfoCard client={client} />
                <TimelineCard 
                  events={client.timeline}
                  onAddEvent={() => setShowAddEventForm(true)}
                  compact={true}
                />
              </div>

              {/* Center - Cases */}
              <div className="col-span-6">
                <CaseList cases={client.cases} />
              </div>

              {/* Right Sidebar - Filings & Documents */}
              <div className="col-span-3 space-y-6">
                <FilingsList filings={MOCK_FILINGS} />
                <DocumentGrid documents={client.documents} />
                
                {!showAIAnalysis ? (
                  <button
                    onClick={() => setShowAIAnalysis(true)}
                    className="w-full py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Generate AI Analysis
                  </button>
                ) : (
                  <ClientSummary client={client} />
                )}
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="max-w-5xl mx-auto">
              <FormAssembly />
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="max-w-5xl mx-auto">
              <DocumentGrid documents={client.documents} />
            </div>
          )}
        </div>
      </div>

      {showAddEventForm && (
        <AddTimelineEventForm
          onSubmit={handleAddEvent}
          onClose={() => setShowAddEventForm(false)}
        />
      )}
    </div>
  );
};

// Helper function to convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default ClientProfile;