import React, { useState } from 'react';
import { Scale, FileText, UserPlus, Building2, Gavel, GraduationCap, Shield, Heart, UserCheck, Briefcase } from 'lucide-react';
import { NewCase } from '../../../types/case';

interface CaseDetailsStepProps {
  data: NewCase;
  onUpdate: (data: Partial<NewCase>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const CASE_TYPES = [
  { id: 'asylum', label: 'Asylum', icon: Shield },
  { id: 'citizenship', label: 'Citizenship & naturalization', icon: UserCheck },
  { id: 'deportation', label: 'Deportation concern & defence', icon: Gavel },
  { id: 'employment', label: 'Employment-based visas', icon: Briefcase },
  { id: 'family', label: 'Family-based immigration', icon: Heart },
  { id: 'student', label: 'Student visas', icon: GraduationCap },
  { id: 'tps', label: 'Temporary protected status', icon: Building2 },
  { id: 'u-visa', label: 'U visa / T visa', icon: FileText },
  { id: 'vawa', label: 'VAWA', icon: Scale }
];

const LEAD_SOURCES = ['Meta', 'Google', 'LinkedIn', 'Referral'];

const CaseDetailsStep = ({ data, onUpdate, onSubmit, onBack }: CaseDetailsStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCaseDetails = (field: keyof typeof data.caseDetails, value: string) => {
    onUpdate({
      caseDetails: { ...data.caseDetails, [field]: value }
    });
  };

  const isFormValid = () => {
    const { type, description, leadSource } = data.caseDetails;
    return Boolean(type && description && leadSource);
  };

  const handleSubmit = async () => {
    if (!isFormValid() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit();
    } catch (err) {
      console.error('Error submitting case:', err);
      setError('Failed to create case. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Case Type Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Case Type</h3>
        <div className="grid grid-cols-3 gap-4">
          {CASE_TYPES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => updateCaseDetails('type', label)}
              className={`
                flex items-center p-4 rounded-lg border-2 transition-all
                ${data.caseDetails.type === label
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50'
                }
              `}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Case Description */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Case Description</h3>
        <textarea
          value={data.caseDetails.description}
          onChange={(e) => updateCaseDetails('description', e.target.value)}
          placeholder="Provide details about the case..."
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* Lead Source */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Lead Source</h3>
        <div className="flex flex-wrap gap-3">
          {LEAD_SOURCES.map((source) => (
            <button
              key={source}
              onClick={() => updateCaseDetails('leadSource', source)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${data.caseDetails.leadSource === source
                  ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
        <textarea
          value={data.caseDetails.notes}
          onChange={(e) => updateCaseDetails('notes', e.target.value)}
          placeholder="Add any additional notes or special instructions..."
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Creating Case...
            </>
          ) : (
            'Create Case'
          )}
        </button>
      </div>
    </div>
  );
};

export default CaseDetailsStep;