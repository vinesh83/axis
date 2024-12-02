import React, { useState } from 'react';
import { Save, ArrowLeft, Upload, Download } from 'lucide-react';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea';
  required: boolean;
  options?: string[];
  value: string;
  part?: string;
  helpText?: string;
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

interface FormEditorProps {
  formNumber: string;
  formName: string;
  sections: FormSection[];
  onSave: (data: any) => void;
  onBack: () => void;
}

const FormEditor = ({ formNumber, formName, sections, onSave, onBack }: FormEditorProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (sectionId: string, fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(formData);
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h2 className="text-xl font-semibold">Form {formNumber}</h2>
              <p className="text-gray-600">{formName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </button>
            <button className="btn-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={index !== activeSection ? 'hidden' : undefined}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                {section.description && (
                  <p className="mt-1 text-sm text-gray-600">{section.description}</p>
                )}
              </div>

              <div className="space-y-6">
                {section.fields.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    
                    {field.helpText && (
                      <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
                    )}

                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={formData[section.id]?.[field.id] || ''}
                        onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        value={formData[section.id]?.[field.id] || ''}
                        onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    )}

                    {field.type === 'select' && field.options && (
                      <select
                        value={formData[section.id]?.[field.id] || ''}
                        onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Select an option</option>
                        {field.options.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
        <button
          onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
          disabled={activeSection === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
          disabled={activeSection === sections.length - 1}
          className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormEditor;