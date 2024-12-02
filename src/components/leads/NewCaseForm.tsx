import React, { useState } from 'react';
import { UserPlus, Scale, PenLine, Calendar } from 'lucide-react';
import StepIndicator from './StepIndicator';

interface FormData {
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  caseType: string;
  description: string;
  leadSource: string;
  notes: string;
  appointment: {
    date: string;
    time: string;
  };
}

const CASE_TYPES = [
  'Asylum',
  'Citizenship & naturalization',
  'Deportation concern & defence',
  'Employment-based visas',
  'Family-based immigration',
  'Student visas',
  'Temporary protected status',
  'U visa / T visa',
  'VAWA'
];

const LEAD_SOURCES = ['Meta', 'Google', 'LinkedIn', 'Referral'];

const NewCaseForm = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    clientInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    caseType: '',
    description: '',
    leadSource: '',
    notes: '',
    appointment: {
      date: '',
      time: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold">Client Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.clientInfo.firstName}
                  onChange={(e) => setFormData({
                    ...formData,
                    clientInfo: { ...formData.clientInfo, firstName: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.clientInfo.lastName}
                  onChange={(e) => setFormData({
                    ...formData,
                    clientInfo: { ...formData.clientInfo, lastName: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.clientInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    clientInfo: { ...formData.clientInfo, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.clientInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    clientInfo: { ...formData.clientInfo, phone: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Scale className="w-6 h-6 text-yellow-700" />
              </div>
              <h3 className="text-lg font-semibold">Case Type</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CASE_TYPES.map((type) => (
                <label
                  key={type}
                  className={`
                    flex items-center p-4 rounded-lg border-2 cursor-pointer
                    ${formData.caseType === type
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="caseType"
                    value={type}
                    checked={formData.caseType === type}
                    onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                    className="sr-only"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide details about the case..."
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PenLine className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-lg font-semibold">Additional Information</h3>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Lead Source
              </label>
              <div className="flex flex-wrap gap-3">
                {LEAD_SOURCES.map((source) => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setFormData({ ...formData, leadSource: source })}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      ${formData.leadSource === source
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    `}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes..."
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold">Schedule Appointment</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.appointment.date}
                  onChange={(e) => setFormData({
                    ...formData,
                    appointment: { ...formData.appointment, date: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.appointment.time}
                  onChange={(e) => setFormData({
                    ...formData,
                    appointment: { ...formData.appointment, time: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6">
        <StepIndicator currentStep={currentStep} totalSteps={4} />
        <div className="mt-8">
          {renderStep()}
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 p-6 bg-gray-50 border-t border-gray-200">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
        )}
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="btn-primary"
          >
            Continue
          </button>
        ) : (
          <button type="submit" className="btn-primary">
            Create Case
          </button>
        )}
      </div>
    </form>
  );
};

export default NewCaseForm;