import React, { useState } from 'react';
import { X } from 'lucide-react';
import { NewCase } from '../../types/case';
import ClientTypeStep from './wizard/ClientTypeStep';
import ClientInfoStep from './wizard/ClientInfoStep';
import ContactStep from './wizard/ContactStep';
import CaseDetailsStep from './wizard/CaseDetailsStep';

interface NewCaseWizardProps {
  onClose: () => void;
  onSubmit: (data: NewCase) => void;
}

const INITIAL_STATE: NewCase = {
  clientType: 'new',
  clientInfo: {
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: ''
  },
  birthInfo: {
    month: '',
    day: '',
    year: '',
    countryOfBirth: '',
    citizenship: '',
    gender: 'Male',
    languages: [],
    preferredLanguage: 'English'
  },
  contact: {
    type: 'client',
    contacts: []
  },
  caseDetails: {
    type: '',
    description: '',
    leadSource: 'Meta',
    notes: ''
  }
};

const NewCaseWizard = ({ onClose, onSubmit }: NewCaseWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<NewCase>(INITIAL_STATE);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const updateFormData = (data: Partial<NewCase>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold">Create</h2>
            <p className="text-gray-600">a new case</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-4 p-6">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${step === currentStep 
                  ? 'bg-blue-500 text-white border-2 border-blue-200' 
                  : step < currentStep
                  ? 'bg-blue-100 text-blue-500'
                  : 'bg-gray-100 text-gray-500'
                }
              `}
            >
              {step < currentStep ? '✓' : step}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="p-6">
          {currentStep === 1 && (
            <ClientTypeStep
              data={formData}
              onUpdate={updateFormData}
              onNext={handleNext}
              onCancel={onClose}
            />
          )}
          {currentStep === 2 && (
            <ClientInfoStep
              data={formData}
              onUpdate={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <ContactStep
              data={formData}
              onUpdate={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <CaseDetailsStep
              data={formData}
              onUpdate={updateFormData}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCaseWizard;