import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Lead } from '../../types/leads';
import { PROFILE_PHOTOS } from '../../data/mockPhotos';
import FormAssembly from '../forms/FormAssembly';

interface LeadDrawerProps {
  lead: Lead;
  onClose: () => void;
}

type Tab = 'chat' | 'intake' | 'services' | 'documents' | 'contacts' | 'history' | 'forms';

const LeadDrawer = ({ lead, onClose }: LeadDrawerProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('forms');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'chat', label: 'Chat' },
    { id: 'forms', label: 'Forms' },
    { id: 'intake', label: 'Intake form' },
    { id: 'services', label: 'Services & fees' },
    { id: 'documents', label: 'Documents' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'history', label: 'History' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'forms':
        return <FormAssembly />;
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            <div className="flex space-x-4 mb-6">
              <button className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                Client chat
              </button>
              <button className="flex-1 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Team chat
              </button>
            </div>

            <div className="flex-1">
              <div className="text-center text-sm text-gray-500 mb-6">Today</div>
              
              {/* Example Messages */}
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-indigo-500 text-white rounded-lg px-4 py-2 max-w-[80%]">
                    <p>Good morning! How can I help you today?</p>
                    <div className="text-xs text-indigo-100 mt-1 flex items-center justify-end">
                      <Clock className="w-3 h-3 mr-1" />
                      09:15
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                    <p>Thank you for reaching out. I have some questions about my case.</p>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      09:20
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="mt-6 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Content for {activeTab} tab coming soon
          </div>
        );
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-[800px] bg-white shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200">
          <div className="flex justify-between items-start p-6">
            <div className="flex items-center space-x-4">
              <img
                src={PROFILE_PHOTOS[lead.lastName] || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${lead.firstName} ${lead.lastName}`)}&background=random`}
                alt={`${lead.firstName} ${lead.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {lead.lastName} {lead.firstName}
                </h2>
                <div className="flex items-center mt-1 space-x-3">
                  <button className="text-gray-600 hover:text-gray-900">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Status Information */}
          <div className="px-6 py-4 bg-gray-50 grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500">Stage</div>
              <div className="font-medium">{lead.status.replace(/_/g, ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Days</div>
              <div className="font-medium">{lead.days}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Added by</div>
              <div className="font-medium">{lead.addedBy}</div>
            </div>
          </div>

          {/* Status Pills */}
          <div className="px-6 py-4 flex items-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              {lead.questionnaire || 'Questionnaire not started'}
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {lead.consultation || 'Consultation not scheduled'}
            </div>
          </div>

          {/* Services */}
          {lead.services && lead.services.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Services</div>
              <div className="flex flex-wrap gap-2">
                {lead.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 border-b-2 font-medium text-sm whitespace-nowrap
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
        <div className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default LeadDrawer;