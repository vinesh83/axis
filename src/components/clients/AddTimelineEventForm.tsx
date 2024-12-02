import React, { useState } from 'react';
import { Calendar, FileText, Plus, X } from 'lucide-react';

interface AddTimelineEventFormProps {
  onSubmit: (event: {
    type: 'document' | 'milestone' | 'update';
    date: Date;
    title: string;
    description: string;
    category?: string;
    documentType?: string;
  }) => void;
  onClose: () => void;
}

const EVENT_TYPES = [
  { id: 'milestone', label: 'Case Event', icon: <Calendar className="w-5 h-5" /> },
  { id: 'document', label: 'Document', icon: <FileText className="w-5 h-5" /> },
];

const COMMON_EVENTS = [
  { category: 'Personal Events', events: [
    'Birth of Child',
    'Marriage',
    'Divorce',
    'Change of Address',
    'Employment Change'
  ]},
  { category: 'Immigration Events', events: [
    'Initial Consultation',
    'Form Filing',
    'Biometrics Appointment',
    'Interview Notice Received',
    'Interview Completed',
    'RFE Received',
    'RFE Response Filed',
    'Notice of Intent to Deny',
    'Appeal Filed',
    'Approval Notice'
  ]},
  { category: 'Court Events', events: [
    'Notice to Appear',
    'Master Calendar Hearing',
    'Individual Hearing',
    'Motion Filed',
    'Court Decision'
  ]}
];

const DOCUMENT_CATEGORIES = [
  'Identity Documents',
  'Immigration Forms',
  'Legal Documents',
  'Evidence',
  'Financial Documents',
  'Medical Records',
  'Employment Records',
  'Educational Documents'
];

const AddTimelineEventForm = ({ onSubmit, onClose }: AddTimelineEventFormProps) => {
  const [eventType, setEventType] = useState<'document' | 'milestone'>('milestone');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [showCommonEvents, setShowCommonEvents] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: eventType,
      date: new Date(date),
      title,
      description,
      ...(eventType === 'document' && { category, documentType })
    });
    onClose();
  };

  const selectCommonEvent = (eventTitle: string) => {
    setTitle(eventTitle);
    setShowCommonEvents(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Add Timeline Event</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Event Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              {EVENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setEventType(type.id as 'document' | 'milestone')}
                  className={`
                    flex items-center justify-center space-x-2 p-4 rounded-lg border-2
                    ${eventType === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                    }
                  `}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Title with Common Events */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Event title"
                />
                {eventType === 'milestone' && (
                  <button
                    type="button"
                    onClick={() => setShowCommonEvents(!showCommonEvents)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Common Events Dropdown */}
              {showCommonEvents && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  {COMMON_EVENTS.map((category) => (
                    <div key={category.category} className="p-2">
                      <h3 className="text-sm font-medium text-gray-700 px-2 py-1 bg-gray-50">
                        {category.category}
                      </h3>
                      <div className="mt-1">
                        {category.events.map((event) => (
                          <button
                            key={event}
                            type="button"
                            onClick={() => selectCommonEvent(event)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                          >
                            {event}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Document-specific fields */}
            {eventType === 'document' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select category</option>
                    {DOCUMENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <input
                    type="text"
                    required
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., PDF, Image"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-32"
                placeholder="Add details about this event..."
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimelineEventForm;